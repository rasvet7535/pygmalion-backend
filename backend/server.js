require('dotenv').config();

const express = require('express');
const cors = require('cors');
const cron = require('node-cron');
const pool = require('./db');
const Metronome = require('./core/metronome');
const logger = require('./core/logger');
const { BurnService } = require('./services');
const { PDA } = require('../PDA/index');

const pdaInstance = new PDA();

const app = express();
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

// Version Handshake Middleware
app.use((req, res, next) => {
  const status = pdaInstance.getStatus();
  res.set('X-Pygmalion-Backend-Version', status.version);
  res.set('X-Pygmalion-Canon-Version', status.canon);
  next();
});

// API Routes
app.use(require('./routes/acts'));
app.use(require('./routes/mirror'));
app.use(require('./routes/field'));
app.use(require('./routes/annotations'));
app.use(require('./routes/ok'));
app.use(require('./routes/health'));
app.use(require('./routes/canon'));
app.use(require('./routes/replay'));
app.use(require('./routes/observer'));
app.use(require('./routes/agent'));
app.use(require('./routes/observability'));

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  logger.info({ event: 'server_start', port: PORT });
});

// Midnight burn cron (00:45 MSK = UTC+3)
cron.schedule('45 0 * * *', async () => {
  try {
    const result = await BurnService.execute();
    logger.info({ event: 'burn_success', timestamp: result.timestamp, burned: result.burned_count });
  } catch (err) {
    logger.error({ event: 'burn_error', error: err.message });
  }
}, { timezone: "Europe/Moscow" });
