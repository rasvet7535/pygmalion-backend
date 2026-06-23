const Canon = require('../../backend/core/canon');
const PreviewEngine = require('../core/preview-engine');
const ExecutionGateway = require('../core/execution-gateway');

const Metronome = require('../../backend/core/metronome');
const previewEngine = new PreviewEngine(Canon, Metronome);
const executionGateway = new ExecutionGateway();

function validate(payload) {
  if (!payload.ok_key) return { valid: false, error: 'THRESHOLD требует ok_key' };
  if (!Canon.isValidOK(payload.ok_key)) return { valid: false, error: `Некорректный О.К.: "${payload.ok_key}"` };
  if (Canon.isSystemReserve(payload.ok_key)) return { valid: false, error: `О.К. "${payload.ok_key}" в системном резерве` };
  return { valid: true };
}

function preview(payload) {
  return previewEngine.compute({
    valid: true,
    action: 'threshold',
    protocol: 'про.14',
    payload,
  });
}

async function execute(payload) {
  return executionGateway.execute({
    action: 'threshold',
    payload,
  });
}

module.exports = { validate, preview, execute, route: 'threshold' };
