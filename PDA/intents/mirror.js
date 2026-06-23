const ExecutionGateway = require('../core/execution-gateway');

function validate(payload) {
  if (!payload.ok_id) return { valid: false, error: 'MIRROR требует ok_id' };
  return { valid: true };
}

function preview() {
  return { blocked: false, type: 'mirror', read_only: true, info: 'READ-ONLY: данные присутствия' };
}

async function execute(payload) {
  return executionGateway.execute({
    action: 'mirror',
    payload,
  });
}

const executionGateway = new ExecutionGateway();

module.exports = { validate, preview, execute, route: 'mirror' };
