const PATH = '../../backend/services';
const EmissionService = require(`${PATH}/emission-service`);
const TransferService = require(`${PATH}/transfer-service`);
const MirrorService = require(`${PATH}/mirror-service`);
const ReplayService = require(`${PATH}/replay-service`);
const ThresholdService = require(`${PATH}/threshold-service`);
const logger = require('../../backend/core/logger');

const REPLAY_GATE_MODE = process.env.REPLAY_GATE_MODE || 'WARNING';

async function checkReplayGate() {
  const hasDB = !!process.env.DATABASE_URL;
  const isDev = process.env.NODE_ENV === 'development';

  if (!hasDB) {
    if (isDev) {
      logger.warn({ event: 'replay_gate_disabled_dev', reason: 'DATABASE_URL not set, NODE_ENV=development' });
      return null;
    }
    logger.error({ event: 'replay_gate_boot_blocked', reason: 'DATABASE_URL required in production' });
    return { blocked: true, reason: 'REPLAY_GATE: DATABASE_URL required in production' };
  }

  try {
    return await ReplayService.checkStatus();
  } catch (err) {
    logger.warn({ event: 'replay_gate_check_failed', error: err.message });
    return null;
  }
}

class ExecutionGateway {
  async execute(intent) {
    if (!intent || !intent.action) {
      return { success: false, error: 'Некорректный intent: отсутствует action' };
    }

    const replayStatus = await checkReplayGate();
    if (replayStatus && replayStatus.blocked) {
      return { success: false, error: replayStatus.reason };
    }
    if (replayStatus && replayStatus.mismatches > 0) {
      const msg = `REPLAY GATE [${REPLAY_GATE_MODE}]: ${replayStatus.mismatches} mismatches detected`;
      if (REPLAY_GATE_MODE === 'ENFORCED') {
        logger.warn({ event: 'replay_gate_blocked', mismatches: replayStatus.mismatches, details: replayStatus.mismatch_details });
        return { success: false, error: 'REPLAY_LOCK: state mismatch', replay_status: replayStatus };
      }
      logger.warn({ event: 'replay_gate_warning', mismatches: replayStatus.mismatches, details: replayStatus.mismatch_details });
    }

    try {
      switch (intent.action) {
        case 'plan':
          return await EmissionService.execute(intent.payload);
        case 'flow':
          return await TransferService.execute(intent.payload);
        case 'mirror':
          return await MirrorService.execute(intent.payload);
        case 'replay':
          return await ReplayService.execute(intent.payload);
        case 'threshold':
          return await ThresholdService.execute(intent.payload);
        default:
          return { success: false, error: `Неизвестный action: ${intent.action}` };
      }
    } catch (err) {
      return { success: false, error: err.message };
    }
  }
}

module.exports = ExecutionGateway;
