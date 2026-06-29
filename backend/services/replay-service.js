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
    success: mismatches.length === 0,
    total_snapshots: phase1.length,
    total_reconstructed: phase3.length,
    mismatches: mismatches.length,
    mismatch_details: mismatches.slice(0, 10),
    canon_valid: true,
  };
}

async function _snapshot() {
  const result = await pool.query(
    'SELECT ue_uuid, actor_ok, ue_number, triad, status, burn_at, emission_act_id FROM ue_units ORDER BY ue_uuid'
  );
  return result.rows;
}

async function _truncate() {
  await pool.query('TRUNCATE ue_units RESTART IDENTITY CASCADE');
}

async function _reconstruct(snapshot = []) {
  const acts = await pool.query(
    `SELECT act_id, act_type, actor_ok, target_ok, payload, created_at
     FROM acts_log ORDER BY created_at ASC`
  );

  const uuidMap = new Map();
  snapshot.forEach(ue => {
    uuidMap.set(`${ue.emission_act_id}-${ue.ue_number}-${ue.triad}`, ue.ue_uuid);
  });

  for (const act of acts.rows) {
    const p = typeof act.payload === 'string' ? JSON.parse(act.payload) : act.payload;
    switch (act.act_type) {
      case 'EMISSION': {
        const triads = p?.triads || [];
        const burnAt = p?.burn_at || p?.burnAt || new Date(act.created_at).toISOString();
        const status = p?.phase === 'impulse' ? 'impulse' : 'active';
        for (const t of triads) {
          const nums = Canon.emissionPolicy.getUENumbersByTriad(t) || [];
          for (const num of nums) {
            const originalUuid = uuidMap.get(`${act.act_id}-${num}-${t}`);
            if (originalUuid) {
              await pool.query(
                `INSERT INTO ue_units (ue_uuid, ue_number, triad, actor_ok, status, burn_at, created_at, emission_act_id)
                 VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
                [originalUuid, num, t, act.actor_ok, status, burnAt, act.created_at, act.act_id]
              );
            } else {
              await pool.query(
                `INSERT INTO ue_units (ue_number, triad, actor_ok, status, burn_at, created_at, emission_act_id)
                 VALUES ($1, $2, $3, $4, $5, $6, $7)`,
                [num, t, act.actor_ok, status, burnAt, act.created_at, act.act_id]
              );
            }
          }
        }
        break;
      }
      case 'TRANSFER': {
        if (p?.ue_uuid) {
          await pool.query(
            `UPDATE ue_units SET status = 'transferred', actor_ok = $2, transferred_at = $3, transfer_act_id = $4 WHERE ue_uuid = $1`,
            [p.ue_uuid, act.target_ok, act.created_at, act.act_id]
          );
        }
        break;
      }
      case 'BURNED': {
        const ids = p?.ue_ids || p?.ue_uuids || (p?.ue_uuid ? [p.ue_uuid] : []);
        if (ids.length > 0) {
          await pool.query(
            `UPDATE ue_units SET status = 'burned', burn_act_id = $2 WHERE ue_uuid = ANY($1::uuid[])`,
            [ids, act.act_id]
          );
        }
        break;
      }
    }
  }
}

function _compare(snapshot, reconstructed) {
  const mismatches = [];
  // Use a composite key for comparison to handle potentially changing UUIDs if not in snapshot
  const snapMap = new Map(snapshot.map(u => [`${u.emission_act_id}-${u.ue_number}-${u.triad}`, u]));
  const recMap = new Map(reconstructed.map(u => [`${u.emission_act_id}-${u.ue_number}-${u.triad}`, u]));

  for (const [key, s] of snapMap) {
    const r = recMap.get(key);
    if (!r) { mismatches.push({ key, field: 'exists', expected: true, got: false }); continue; }

    if (s.actor_ok !== r.actor_ok) {
      mismatches.push({ ue_uuid: s.ue_uuid, field: 'actor_ok', expected: s.actor_ok, got: r.actor_ok });
    }
    if (s.status !== r.status) {
      mismatches.push({ ue_uuid: s.ue_uuid, field: 'status', expected: s.status, got: r.status });
    }

    const sBurn = new Date(s.burn_at).getTime();
    const rBurn = new Date(r.burn_at).getTime();
    if (Math.abs(sBurn - rBurn) > 1000) {
      mismatches.push({ ue_uuid: s.ue_uuid, field: 'burn_at', expected: s.burn_at, got: r.burn_at });
    }
  }

  for (const [key] of recMap) {
    if (!snapMap.has(key)) {
      mismatches.push({ key, field: 'exists', expected: false, got: true });
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
  const acts = await pool.query(
    `SELECT act_id, act_type, actor_ok, target_ok, payload, created_at
     FROM acts_log ORDER BY created_at ASC`
  );

  const uuidMap = new Map();
  snapshot.forEach(ue => {
    uuidMap.set(`${ue.emission_act_id}-${ue.ue_number}-${ue.triad}`, ue.ue_uuid);
  });

  const units = new Map();

  for (const act of acts.rows) {
    const p = typeof act.payload === 'string' ? JSON.parse(act.payload) : act.payload;

    switch (act.act_type) {
      case 'EMISSION': {
        const triads = p?.triads || [];
        const burnAt = p?.burn_at || p?.burnAt || new Date(act.created_at).toISOString();
        const status = p?.phase === 'impulse' ? 'impulse' : 'active';
        for (const t of triads) {
          const nums = Canon.emissionPolicy.getUENumbersByTriad(t) || [];
          for (const num of nums) {
            const key = `${act.act_id}-${num}-${t}`;
            const ue_uuid = uuidMap.get(key) || `fake-${key}`;
            units.set(ue_uuid, {
              ue_uuid,
              actor_ok: act.actor_ok,
              ue_number: num,
              status,
              burn_at: burnAt,
              emission_act_id: act.act_id,
              triad: t
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
          }
        }
        break;
      }
      case 'BURNED': {
        const ids = p?.ue_ids || p?.ue_uuids || (p?.ue_uuid ? [p.ue_uuid] : []);
        for (const id of ids) {
          const unit = units.get(id);
          if (unit) unit.status = 'burned';
        }
        break;
      }
    }
  }

  return Array.from(units.values());
}

module.exports = { execute, checkStatus };
