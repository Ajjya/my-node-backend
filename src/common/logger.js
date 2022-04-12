const log4js = require('log4js');

log4js.configure({
    appenders: {
        out: {
            type: 'stdout',
            layout: {
                type: process.env.LOG_TYPE || 'basic',
                pattern: process.env.LOG_PATTERN || ''
            }
        }
    },
    categories: { default: { appenders: ['out'], level: process.env.LOG_LEVEL || 'info' } }
});

const logger = log4js.getLogger(process.env.SERVICE_NAME);

/*
 logger.trace('Entering cheese testing');
 logger.debug('Got cheese.');
 logger.info('Cheese is Gouda.');
 logger.warn('Cheese is quite smelly.');
 logger.error('Cheese is too ripe!');
 logger.fatal('Cheese was breeding ground for listeria.');
 */

module.exports = logger;
