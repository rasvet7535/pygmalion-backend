const Canon = require('../../backend/core/canon');
const Metronome = require('../../backend/core/metronome');
const PreviewEngine = require('../core/preview-engine');
const ExecutionGateway = require('../core/execution-gateway');

const previewEngine = new PreviewEngine(Canon, Metronome);
const executionGateway = new ExecutionGateway();

function validate(payload) {
  if (!payload.actor_ok) return { valid: false, error: 'FLOW требует actor_ok (from)' };
  if (!payload.target_ok) return { valid: false, error: 'FLOW требует target_ok (to)' };
  return { valid: true };
}

function preview(payload) {
  return previewEngine.compute({
    valid: true,
    action: 'flow',
    protocol: 'про.2',
    payload,
  });
}

async function execute(payload) {
  return executionGateway.execute({
    action: 'flow',
    payload,
  });
}

module.exports = { validate, preview, execute, route: 'flow' };
