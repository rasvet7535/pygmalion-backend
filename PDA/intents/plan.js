const Canon = require('../../backend/core/canon');
const Metronome = require('../../backend/core/metronome');
const PreviewEngine = require('../core/preview-engine');
const ExecutionGateway = require('../core/execution-gateway');

const previewEngine = new PreviewEngine(Canon, Metronome);
const executionGateway = new ExecutionGateway();

function validate(payload) {
  if (!payload.actor_ok) return { valid: false, error: 'PLAN требует actor_ok' };
  if (!payload.triads || payload.triads.length === 0) return { valid: false, error: 'PLAN требует triads (T1-T5)' };
  const v = Canon.emissionPolicy.validateTriadSelection(payload.triads);
  if (!v.valid) return { valid: false, error: v.error };
  return { valid: true, totalUE: v.totalUE };
}

function preview(payload) {
  return previewEngine.compute({
    valid: true,
    action: 'plan',
    protocol: 'про.1',
    payload,
  });
}

async function execute(payload) {
  return executionGateway.execute({
    action: 'plan',
    payload,
  });
}

module.exports = { validate, preview, execute, route: 'plan' };
