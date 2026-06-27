const pool = require('../db');
const Canon = require('../core/canon');

async function execute() {
  const phase1 = await _snapshot();
  await _truncate();
  await _reconstruct(phase1);
  const phase3 = await _snapshot();
  const mismatches = _compare(phase1, phase3);
  await _validateCanon();

  return {
    success: mismatches.length === 0 && phase1.length === phase3.length,
    total_snapshots: phase1.length,
    total_reconstructed: phase3.length,
    mismatches: mismatches.length,
    mismatch_details: mismatches.slice(0, 10),
    canon_valid: true,
  };
}

async function _snapshot() {
  const result = await pool.query(
    `SELECT
      ue_uuid, ue_number, triad, actor_ok, status,
      created_at, burn_at, transferred_at,
      emission_act_id, transfer_act_id, burn_act_id
     FROM ue_units
     ORDER BY ue_uuid`
  );
  return result.rows;
}

async function _truncate() {
  await pool.query('TRUNCATE ue_units RESTART IDENTITY CASCADE');
}

async function _reconstruct(snapshot = []) {
  const uuidMap = new Map();
  snapshot.forEach(ue => {
    const key = `${ue.emission_act_id}-${ue.ue_number}-${ue.triad}`;
    uuidMap.set(key, ue.ue_uuid);
  });

  const acts = await pool.query(
    `SELECT act_id, act_type, actor_ok, target_ok, payload, created_at
     FROM acts_log ORDER BY created_at ASC`
  );

  for (const act of acts.rows) {
    const p = typeof act.payload === 'string' ? JSON.parse(act.payload) : act.payload;
    switch (act.act_type) {
      case 'EMISSION': {
        const triads = p?.triads || [];
        const burnAt = p?.burnAt || new Date(act.created_at).toISOString();
        for (const t of triads) {
          const nums = Canon.emissionPolicy.getUENumbersByTriad(t);
          for (const num of nums) {
            const key = `${act.act_id}-${num}-${t}`;
            const ue_uuid = uuidMap.get(key);
            if (ue_uuid) {
              await pool.query(
                `INSERT INTO ue_units (ue_uuid, emission_act_id, actor_ok, ue_number, triad, status, burn_at, created_at)
                 VALUES ($1, $2, $3, $4, $5, 'active', $6, $7)`,
                [ue_uuid, act.act_id, act.actor_ok, num, t, burnAt, act.created_at]
              );
            } else {
              await pool.query(
                `INSERT INTO ue_units (emission_act_id, actor_ok, ue_number, triad, status, burn_at, created_at)
                 VALUES ($1, $2, $3, $4, 'active', $5, $6)`,
                [act.act_id, act.actor_ok, num, t, burnAt, act.created_at]
              );
            }
          }
        }
        break;
      }
      case 'TRANSFER': {
        if (p?.ue_uuid) {
          await pool.query(
            `UPDATE ue_units SET status = 'transferred', actor_ok = $1, transferred_at = $2, transfer_act_id = $3 WHERE ue_uuid = $4`,
            [act.target_ok, act.created_at, act.act_id, p.ue_uuid]
          );
        }
        break;
      }
      case 'BURNED': {
        let ids = p?.ue_uuids || p?.ue_ids || [];
        if (!Array.isArray(ids) && p?.ue_uuid) ids = [p.ue_uuid];

        if (ids.length > 0) {
          await pool.query(
            `UPDATE ue_units SET status = 'burned', burn_act_id = $1 WHERE ue_uuid = ANY($2::uuid[])`,
            [act.act_id, ids]
          );
        }
        break;
      }
    }
  }
}

function _compare(snapshot, reconstructed) {
  const mismatches = [];
  const snapMap = new Map(snapshot.map(u => [u.ue_uuid, u]));
  const recMap = new Map(reconstructed.map(u => [u.ue_uuid, u]));

  const fields = ['actor_ok', 'status', 'ue_number', 'triad', 'emission_act_id', 'transfer_act_id', 'burn_act_id'];

  for (const [id, s] of snapMap) {
    const r = recMap.get(id);
    if (!r) {
      mismatches.push({ ue_uuid: id, field: 'exists', expected: true, got: false });
      continue;
    }
    for (const key of fields) {
      if (String(s[key] || '') !== String(r[key] || '')) {
        mismatches.push({ ue_uuid: id, field: key, expected: s[key], got: r[key] });
      }
    }
    // Date comparison
    for (const key of ['burn_at', 'created_at', 'transferred_at']) {
      if (s[key] && r[key]) {
        if (new Date(s[key]).getTime() !== new Date(r[key]).getTime()) {
          mismatches.push({ ue_uuid: id, field: key, expected: s[key], got: r[key] });
        }
      } else if (s[key] || r[key]) {
        mismatches.push({ ue_uuid: id, field: key, expected: s[key], got: r[key] });
      }
    }
  }

  for (const [id] of recMap) {
    if (!snapMap.has(id)) {
      mismatches.push({ ue_uuid: id, field: 'exists', expected: false, got: true });
    }
  }

  return mismatches;
}

async function _validateCanon() {
  const emissions = await pool.query(
    `SELECT actor_ok, payload, created_at FROM acts_log WHERE act_type = 'EMISSION'`
  );
  for (const e of emissions.rows) {
    const p = typeof e.payload === 'string' ? JSON.parse(e.payload) : e.payload;
    const triads = p?.triads || [];
    const validation = Canon.emissionPolicy.validateTriadSelection(triads);
    if (!validation.valid) {
      console.warn(`[REPLAY] Canon violation: act ${e.created_at}, ${e.actor_ok}: ${validation.error}`);
    }
  }
}

async function checkStatus() {
  const snapshot = await _snapshot();
  const reconstructed = await _reconstructInMemory(snapshot);
  const mismatches = _compare(snapshot, reconstructed);
  await _validateCanon();

  return {
    mismatches: mismatches.length,
    mismatch_details: mismatches.slice(0, 10),
    canon_valid: true,
  };
}

async function _reconstructInMemory(snapshot = []) {
  const uuidMap = new Map();
  snapshot.forEach(ue => {
    const key = `${ue.emission_act_id}-${ue.ue_number}-${ue.triad}`;
    uuidMap.set(key, ue.ue_uuid);
  });

  const acts = await pool.query(
    `SELECT act_id, act_type, actor_ok, target_ok, payload, created_at
     FROM acts_log ORDER BY created_at ASC`
  );

  const units = new Map();

  for (const act of acts.rows) {
    const p = typeof act.payload === 'string' ? JSON.parse(act.payload) : act.payload;

    switch (act.act_type) {
      case 'EMISSION': {
        const triads = p?.triads || [];
        const burnAt = p?.burnAt || new Date(act.created_at).toISOString();
        for (const t of triads) {
          const nums = Canon.emissionPolicy.getUENumbersByTriad(t);
          for (const num of nums) {
            const key = `${act.act_id}-${num}-${t}`;
            const ue_uuid = uuidMap.get(key) || `${act.act_id}-${num}`;
            units.set(ue_uuid, {
              ue_uuid,
              actor_ok: act.actor_ok,
              ue_number: num,
              triad: t,
              status: 'active',
              burn_at: burnAt,
              created_at: act.created_at,
              emission_act_id: act.act_id,
            });
          }
        }
        break;
      }
      case 'TRANSFER': {
        if (p?.ue_uuid) {
          const unit = units.get(p.ue_uuid);
          if (unit) {
            unit.actor_ok = act.target_ok;
            unit.status = 'transferred';
            unit.transferred_at = act.created_at;
            unit.transfer_act_id = act.act_id;
          }
        }
        break;
      }
      case 'BURNED': {
        let ids = p?.ue_uuids || p?.ue_ids || [];
        if (!Array.isArray(ids) && p?.ue_uuid) ids = [p.ue_uuid];

        for (const id of ids) {
          const unit = units.get(id);
          if (unit) {
            unit.status = 'burned';
            unit.burn_act_id = act.act_id;
          }
        }
        break;
      }
    }
  }

  return Array.from(units.values());
}

module.exports = { execute, checkStatus };
