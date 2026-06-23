const crypto = require('crypto');
const IntentRouter = require('./core/intent-router');
const PreviewEngine = require('./core/preview-engine');
const ExecutionGateway = require('./core/execution-gateway');
const CanonVersionHandshake = require('./core/version-handshake');

const Canon = require('../backend/core/canon');
const Metronome = require('../backend/core/metronome');

const handshake = new CanonVersionHandshake();
const handshakeResult = handshake.checkCompatibility();
if (!handshakeResult.success) {
  process.exit(1);
}

const intentRouter = new IntentRouter();
const previewEngine = new PreviewEngine(Canon, Metronome);
const executionGateway = new ExecutionGateway();

function generatePreviewId() {
  return 'pv_' + Date.now().toString(36) + '_' + crypto.randomUUID().slice(0, 8);
}

class PDA {
  constructor() {
    this.Canon = Canon;
    this.Metronome = Metronome;
    this._lastPreviewId = null;
  }

  resolve(action, payload = {}) {
    const intent = intentRouter.resolve(action, payload);
    if (!intent.valid) return intent;
    return intent;
  }

  preview(intent) {
    const result = previewEngine.compute(intent);
    this._lastPreviewId = generatePreviewId();
    return { preview_id: this._lastPreviewId, ...result };
  }

  async execute(intent, previewId) {
    if (previewId && previewId !== this._lastPreviewId) {
      return { success: false, error: 'preview_id mismatch: execute with stale preview' };
    }
    const preview = this.preview(intent);
    if (preview.blocked) return { success: false, preview };
    return executionGateway.execute(intent);
  }

  async run(action, payload = {}) {
    const intent = this.resolve(action, payload);
    if (!intent.valid) return intent;
    const preview = this.preview(intent);
    return { intent, preview };
  }

  async confirm(action, payload = {}) {
    const intent = this.resolve(action, payload);
    if (!intent.valid) return intent;
    const preview = this.preview(intent);
    if (preview.blocked) return { success: false, preview };
    const result = await executionGateway.execute(intent);
    return { intent, preview, result, preview_id: this._lastPreviewId };
  }

  getStatus() {
    const hasDB = !!process.env.DATABASE_URL;
    const isDev = process.env.NODE_ENV === 'development';
    const replayGateEnabled = hasDB || isDev;
    const replayGateMode = process.env.REPLAY_GATE_MODE || 'WARNING';

    return {
      version: require('./package.json').version,
      canon: this.Canon.CANON_VERSION,
      emission_policy: this.Canon.emissionPolicy.EMISSION_POLICY.version,
      phase: this.Metronome.getCurrentPhase(),
      time: this.Metronome.getCurrentTimeISO(),
      emission_allowed: this.Metronome.isEmissionAllowed(),
      transfer_allowed: this.Metronome.isTransferAllowed(),
      replay_gate: {
        mode: replayGateMode,
        enabled: replayGateEnabled,
        database: hasDB,
      },
    };
  }

  getCapabilities() {
    return {
      pda_version: require('./package.json').version,
      canon_version: this.Canon.CANON_VERSION,
      emission_policy_version: this.Canon.emissionPolicy.EMISSION_POLICY.version,
      compatibility: handshake.getCompatibilityConfig().compatibility,
      intents: [
        { key: 'PLAN', route: 'plan', protocol: 'про.1', description: 'Эмиссия У.Е. через выбор триад' },
        { key: 'FLOW', route: 'flow', protocol: 'про.2', description: 'Передача У.Е. между О.К.' },
        { key: 'MIRROR', route: 'mirror', protocol: 'про.3', description: 'Чтение присутствия (read-only)' },
        { key: 'REPLAY', route: 'replay', protocol: null, description: 'Верификация состояния' },
        { key: 'THRESHOLD', route: 'threshold', protocol: 'про.14', description: 'Регистрация О.К. через порог' }
      ],
      protocols: this.Canon.protocols.getAllProtocols ? this.Canon.protocols.getAllProtocols() : [],
      phase: this.Metronome.getCurrentPhase(),
      emission_allowed: this.Metronome.isEmissionAllowed(),
      transfer_allowed: this.Metronome.isTransferAllowed(),
      boot_mode: 'compatible'
    };
  }
}

module.exports = { PDA, intentRouter, previewEngine, executionGateway, CanonVersionHandshake: handshake };
