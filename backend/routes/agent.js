const { Router } = require('express');
const { PDA } = require('../../PDA/index');

const pda = new PDA();

module.exports = Router()
  .post('/api/agent/preview', async (req, res) => {
    try {
      const { action, payload } = req.body;
      if (!action) return res.status(400).json({ error: 'action required' });
      const result = await pda.run(action, payload || {});
      res.status(result.valid === false || (result.preview && result.preview.blocked) ? 422 : 200).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  })

  .post('/api/agent/execute', async (req, res) => {
    try {
      const { action, payload } = req.body;
      if (!action) return res.status(400).json({ error: 'action required' });
      const result = await pda.confirm(action, payload || {});
      res.status(result.valid === false || result.success === false ? 422 : 200).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  })

  .get('/api/agent/status', (req, res) => {
    res.json(pda.getStatus());
  })

  .get('/api/agent/capabilities', (req, res) => {
    res.json(pda.getCapabilities());
  });
