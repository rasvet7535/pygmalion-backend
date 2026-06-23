const PATH = '../../backend/core';
const Canon = require(`${PATH}/canon`);
const Metronome = require(`${PATH}/metronome`);

const INTENT_REGISTRY = {
  PLAN:      { handler: 'plan',      protocol: 'про.1', label: 'ПЛАН (эмиссия У.Е.)' },
  FLOW:      { handler: 'flow',      protocol: 'про.2', label: 'ТОК (передача У.Е.)' },
  MIRROR:    { handler: 'mirror',    protocol: 'про.3', label: 'ЗЕРКАЛО (присутствие)' },
  REPLAY:    { handler: 'replay',    protocol: null,     label: 'РЕПЛЕЙ (верификация)' },
  THRESHOLD: { handler: 'threshold', protocol: 'про.14', label: 'ПОРОГ (регистрация)' },
};

const INTENT_KEYS = Object.keys(INTENT_REGISTRY);

class IntentRouter {
  resolve(raw, payload = {}) {
    const action = typeof raw === 'string' ? raw.toUpperCase().trim() : null;
    if (!action || !INTENT_REGISTRY[action]) {
      return {
        valid: false,
        error: `Неизвестное намерение: "${raw}". Доступны: ${INTENT_KEYS.join(', ')}`,
        actions: INTENT_KEYS,
      };
    }

    const def = INTENT_REGISTRY[action];
    const validation = this._validate(action, payload);
    if (!validation.valid) return validation;

    return {
      valid: true,
      action: def.handler,
      protocol: def.protocol,
      label: def.label,
      payload: this._normalizePayload(def.handler, payload),
    };
  }

  _validate(action, payload) {
    switch (action) {
      case 'PLAN':
        if (!payload.triad && !payload.triads) return { valid: false, error: 'PLAN требует triad (T1-T5)' };
        if (!payload.actor_ok) return { valid: false, error: 'PLAN требует actor_ok' };
        break;
      case 'FLOW':
        if (!payload.from && !payload.actor_ok) return { valid: false, error: 'FLOW требует from/actor_ok' };
        if (!payload.to && !payload.target_ok) return { valid: false, error: 'FLOW требует to/target_ok' };
        break;
      case 'MIRROR':
        if (!payload.ok && !payload.ok_id && !payload.actor_ok) return { valid: false, error: 'MIRROR требует ok/ok_id/actor_ok' };
        break;
      case 'REPLAY':
        break;
      case 'THRESHOLD':
        if (!payload.ok && !payload.ok_key && !payload.actor_ok) return { valid: false, error: 'THRESHOLD требует ok/ok_key/actor_ok' };
        break;
    }
    return { valid: true };
  }

  _normalizePayload(handler, payload) {
    const p = { ...payload };
    switch (handler) {
      case 'plan':
        p.triads = p.triads || [p.triad].filter(Boolean);
        p.actor_ok = p.actor_ok || p.from;
        break;
      case 'flow':
        p.actor_ok = p.actor_ok || p.from;
        p.target_ok = p.target_ok || p.to;
        break;
      case 'mirror':
        p.ok_id = p.ok_id || p.ok || p.actor_ok;
        break;
      case 'threshold':
        p.ok_key = p.ok_key || p.ok || p.actor_ok;
        break;
    }
    return p;
  }

  getActions() {
    return INTENT_KEYS.map(k => ({ key: k, ...INTENT_REGISTRY[k] }));
  }
}

module.exports = IntentRouter;
