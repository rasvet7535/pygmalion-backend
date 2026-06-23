const ExecutionGateway = require('../core/execution-gateway');

function validate() {
  return { valid: true };
}

function preview() {
  return { blocked: false, type: 'replay', info: 'Верификация: acts_log → ue_units', read_only: true };
}

async function execute() {
  return executionGateway.execute({
    action: 'replay',
    payload: {},
  });
}

const executionGateway = new ExecutionGateway();

module.exports = { validate, preview, execute, route: 'replay' };
