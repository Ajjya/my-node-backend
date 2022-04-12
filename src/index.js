require('dotenv').config();
const express = require('express');
const cors = require('cors');
const http = require('http');

const db = require('db/models');

const logger = require('common/logger');
logger.info(`start server PID: ${process.pid}`);

const app = express();
const server = http.Server(app);

app.disable('x-powered-by');
app.enable('trust proxy');

const ALLOW_ORIGIN = process.env.ALLOW_ORIGIN ? process.env.ALLOW_ORIGIN.split(/\s*,\s*/) : [];

if (process.env.NODE_ENV === 'development') {
  app.use((req, res, next) => {
    console.log('REQ:', req.method, req.url, req.headers);
    next();
  });
}

app.use(cors({
  origin: (origin, callback) => {
    const allow = ALLOW_ORIGIN.indexOf(origin) >= 0;
    callback(null, allow);
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: false
}));

app.use(express.json({ type: 'application/json', limit: '1mb' }));

async function main() {
  try {
    logger.info('[DB] connecting...');
    await db.sequelize.authenticate();
    logger.info('[DB] connected');
  } catch (e) {
    logger.error('[DB] unable to connect');
    logger.debug(e);
    setTimeout(() => { process.exit(); }, 5000); return;
  }

  server.listen(process.env.PORT || 3000, process.env.LISTEN || '127.0.0.1', () => {
    if (process.send) process.send('ready');
    logger.info('server listen: ', process.env.LISTEN + ':' + process.env.PORT);
  });

}


main();
