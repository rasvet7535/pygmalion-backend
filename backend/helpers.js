const pool = require('./db');
const Canon = require('./core/canon');
const Metronome = require('./core/metronome');

const COOLDOWN_PERIODS = {
  THRESHOLD_CROSSED: 60 * 60 * 1000,
  EMISSION: 10 * 60 * 1000,
  RECOGNITION: 5 * 60 * 1000,
  TRANSFER: 15 * 60 * 1000,
};

async function selectParentRefs(actor_ok, limit = 3) {
  const result = await pool.query(
    'SELECT act_id FROM acts_log WHERE actor_ok = $1 ORDER BY created_at DESC LIMIT $2',
    [actor_ok, limit]
  );
  return result.rows.map(row => row.act_id);
}

async function checkCooldown(actor_ok, act_type) {
  const result = await pool.query(
    'SELECT last_act_at, last_act_type FROM ok_identity WHERE ok_key = $1',
    [actor_ok]
  );
  if (result.rows.length === 0) return { allowed: false, reason: 'OK does not exist' };
  const { last_act_at, last_act_type } = result.rows[0];
  if (!last_act_at) return { allowed: true };
  const now = Date.now();
  const lastActTime = new Date(last_act_at).getTime();
  const timeSinceLastAct = now - lastActTime;

  if (last_act_type === 'THRESHOLD_CROSSED') {
    const cooldown = COOLDOWN_PERIODS.THRESHOLD_CROSSED;
    if (timeSinceLastAct < cooldown) {
      const remainingMin = Math.ceil((cooldown - timeSinceLastAct) / 60000);
      return { allowed: false, reason: 'cooldown_after_threshold', message: `Время наблюдения. Первый акт созреет через ${remainingMin} мин.`, remaining_ms: cooldown - timeSinceLastAct };
    }
    return { allowed: true };
  }

  if (last_act_type === act_type && COOLDOWN_PERIODS[act_type]) {
    const cooldown = COOLDOWN_PERIODS[act_type];
    if (timeSinceLastAct < cooldown) {
      const remainingMin = Math.ceil((cooldown - timeSinceLastAct) / 60000);
      const messages = { EMISSION: `Следующий импульс созреет через ${remainingMin} мин.`, RECOGNITION: `Следующее признание созреет через ${remainingMin} мин.`, TRANSFER: `Следующая передача созреет через ${remainingMin} мин.` };
      return { allowed: false, reason: 'cooldown_same_type', message: messages[act_type] || `Пауза созревания: ${remainingMin} мин.`, remaining_ms: cooldown - timeSinceLastAct };
    }
  }
  return { allowed: true };
}

async function updateLastAct(actor_ok, act_type) {
  await pool.query(
    'UPDATE ok_identity SET last_act_at = NOW(), last_act_type = $2 WHERE ok_key = $1',
    [actor_ok, act_type]
  );
}

async function determineCyclePhase(ok_id, mirrorData) {
  const { trace, ro_dag_status, ue_flow, directions, burn } = mirrorData;
  const { last_act_at, silence_hours } = trace;

  const hasActs = await pool.query(
    `SELECT COUNT(*) as count FROM acts_log
     WHERE actor_ok = $1 AND act_type IN ('EMISSION', 'TRANSFER')
     AND created_at > (SELECT created_at FROM acts_log WHERE actor_ok = $1 AND act_type = 'THRESHOLD_CROSSED' ORDER BY created_at DESC LIMIT 1)`,
    [ok_id]
  );
  const hasFormedActs = parseInt(hasActs.rows[0]?.count) > 0;

  if (!hasFormedActs && ue_flow === 0 && directions.given === 0) {
    return { phase: 'gestation', phase_duration_hours: silence_hours || 0, next_phase: 'awakening', next_phase_at: null, hint: 'Наблюдайте поле. Первый импульс созреет через паузу.' };
  }

  if (hasFormedActs && !ro_dag_status.received_um) {
    return { phase: 'awakening', phase_duration_hours: silence_hours || 0, next_phase: 'recognition', next_phase_at: null, hint: 'Ваше присутствие зафиксировано. Ожидайте признания.' };
  }

  if (ro_dag_status.received_um && !ro_dag_status.in_tree && ue_flow === 0) {
    return { phase: 'recognition', phase_duration_hours: silence_hours || 0, next_phase: 'weaving', next_phase_at: null, hint: 'Вы вошли в Древо Инициаторов.' };
  }

  if (burn.burn_echo?.active) {
    return { phase: 'release', phase_duration_hours: 1, next_phase: 'cooling', next_phase_at: new Date(Date.now() + 3600000).toISOString(), hint: 'Выдох системы. Импульсы сгорели.' };
  }

  if (silence_hours > 1 && silence_hours < 24 && ue_flow === 0) {
    return { phase: 'cooling', phase_duration_hours: silence_hours, next_phase: 'silence', next_phase_at: new Date(Date.now() + (24 - silence_hours) * 3600000).toISOString(), hint: 'Поле остывает. ОБЛИК остаётся.' };
  }

  if (silence_hours >= 24 && silence_hours < 168 && ue_flow === 0) {
    return { phase: 'silence', phase_duration_hours: silence_hours, next_phase: 'settled', next_phase_at: new Date(Date.now() + (168 - silence_hours) * 3600000).toISOString(), hint: 'Тишина. ОБЛИК держится.' };
  }

  if (silence_hours >= 168 && ue_flow === 0) {
    return { phase: 'settled', phase_duration_hours: silence_hours, next_phase: null, next_phase_at: null, hint: 'ОБЛИК кристаллизован.' };
  }

  return { phase: 'weaving', phase_duration_hours: silence_hours || 0, next_phase: 'release', next_phase_at: Metronome.calculateBurnAt(), hint: 'Поле живёт. Следующее сгорание в полночь UTC.' };
}

async function getMirrorData(ok_id) {
  const window_start = Metronome.getWindowStart();
  const traceResult = await pool.query('SELECT created_at FROM acts_log WHERE actor_ok = $1 ORDER BY created_at DESC LIMIT 1', [ok_id]);
  let trace = { last_act_at: null, silence_hours: null, face_window: 'silent', form_hint: 'emerging', burn_echo: { active: false, phase: 'release' } };
  if (traceResult.rows.length > 0) {
    const last_act_at = traceResult.rows[0].created_at;
    const silence_hours = (Date.now() - new Date(last_act_at).getTime()) / 3600000;
    let face_window = 'silent';
    if (silence_hours < 4) face_window = 'alive';
    else if (silence_hours < 28) face_window = 'cooling';
    trace = { last_act_at, silence_hours: parseFloat(silence_hours.toFixed(1)), face_window, form_hint: 'emerging', burn_echo: { active: false, phase: 'release' } };
  }
  const rd = await pool.query(`SELECT EXISTS(SELECT 1 FROM annotations aa JOIN acts_log al ON aa.act_ref_id = al.act_id WHERE (al.actor_ok = $1 OR al.target_ok = $1) AND aa.annotation_type = 'RECOGNITION' AND aa.author_ok != $1) AS received_um, EXISTS(SELECT 1 FROM acts_log WHERE actor_ok = $1 AND act_type = 'TRANSFER') AS sent_ue`, [ok_id]);
  const ro_dag_status = { received_um: rd.rows[0].received_um || false, sent_ue: rd.rows[0].sent_ue || false, in_tree: (rd.rows[0].received_um || false) && (rd.rows[0].sent_ue || false) };
  const ueResult = await pool.query("SELECT COUNT(*) as count FROM ue_units WHERE actor_ok = $1 AND status = 'active' AND created_at >= $2::timestamp", [ok_id, window_start]);
  const ue_flow = parseInt(ueResult.rows[0].count);
  const dirResult = await pool.query("SELECT COUNT(*) FILTER (WHERE act_type = 'EMISSION' AND actor_ok = $1) AS emissions, COUNT(*) FILTER (WHERE act_type = 'TRANSFER' AND actor_ok = $1) AS transfers_out FROM acts_log WHERE actor_ok = $1 AND created_at >= $2::timestamp", [ok_id, window_start]);
  const directions = { given: parseInt(dirResult.rows[0].emissions) + parseInt(dirResult.rows[0].transfers_out) };
  return { trace, ro_dag_status, ue_flow, directions, burn: { burn_echo: { active: false } } };
}

module.exports = { COOLDOWN_PERIODS, selectParentRefs, checkCooldown, updateLastAct, determineCyclePhase, getMirrorData };
