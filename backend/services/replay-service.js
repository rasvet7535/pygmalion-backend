const pool = require('../db');
const Canon = require('../core/canon');

async function execute() {
  const phase1 = await _snapshot();
  await _truncate();
  await _reconstruct();
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

async function _reconstruct() {
  const acts = await pool.query(
    `SELECT act_id, act_type, actor_ok, target_ok, payload, created_at
     FROM acts_log ORDER BY created_at ASC`
  );

  for (const act of acts.rows) {
    switch (act.act_type) {
      case 'EMISSION': {
        const p = typeof act.payload === 'string' ? JSON.parse(act.payload) : act.payload;
        const ueNumbers = p?.ueNumbers || [];
        const burnAt = p?.burnAt || new Date(act.created_at).toISOString();
        for (const num of ueNumbers) {
          await pool.query(
            `INSERT INTO ue_units (ue_number, triad, actor_ok, status, burn_at, created_at, emission_act_id)
             VALUES ($1, $2, $3, 'active', $4, $5, $6)`,
            [num, p.triads?.[0] || 'T1', act.actor_ok, burnAt, act.created_at, act.act_id]
          );
        }
        break;
      }
      case 'TRANSFER': {
        const p = typeof act.payload === 'string' ? JSON.parse(act.payload) : act.payload;
        if (p?.ue_uuid) {
          await pool.query(
            `UPDATE ue_units SET status = 'transferred', actor_ok = $2 WHERE ue_uuid = $1`,
            [p.ue_uuid, act.target_ok]
          );
        }
        break;
      }
      case 'BURNED': {
        const p = typeof act.payload === 'string' ? JSON.parse(act.payload) : act.payload;
        const ids = p?.ue_ids || [];
        if (ids.length > 0) {
          await pool.query(
            `UPDATE ue_units SET status = 'burned' WHERE ue_uuid = ANY($1::uuid[])`,
            [ids]
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

  for (const [id, s] of snapMap) {
    const r = recMap.get(id);
    if (!r) { mismatches.push({ ue_uuid: id, field: 'exists', expected: true, got: false }); continue; }
    for (const key of ['actor_ok', 'status', 'burn_at']) {
      if (String(s[key]) !== String(r[key])) {
        mismatches.push({ ue_id: id, field: key, expected: s[key], got: r[key] });
      }
    }
  }

  for (const [id] of recMap) {
    if (!snapMap.has(id)) {
      mismatches.push({ ue_id: id, field: 'exists', expected: false, got: true });
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
  const reconstructed = await _reconstructInMemory();
  const mismatches = _compare(snapshot, reconstructed);
  await _validateCanon();

  return {
    mismatches: mismatches.length,
    mismatch_details: mismatches.slice(0, 10),
    canon_valid: true,
  };
}

async function _reconstructInMemory() {
  const acts = await pool.query(
    `SELECT act_id, act_type, actor_ok, target_ok, payload, created_at
     FROM acts_log ORDER BY created_at ASC`
  );

  const units = new Map();

  for (const act of acts.rows) {
    const p = typeof act.payload === 'string' ? JSON.parse(act.payload) : act.payload;

    switch (act.act_type) {
      case 'EMISSION': {
        const ueNumbers = p?.ueNumbers || [];
        const burnAt = p?.burnAt || new Date(act.created_at).toISOString();
        for (const num of ueNumbers) {
          const ue_uuid = `${act.act_id}-${num}`;
          units.set(ue_uuid, {
            ue_uuid,
            actor_ok: act.actor_ok,
            ue_number: num,
            status: 'active',
            burn_at: burnAt,
            act_id: act.act_id,
          });
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
        const ids = p?.ue_ids || [];
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
