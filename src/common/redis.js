const RedisConnect = require('common/lib/RedisConnect');

module.exports = new RedisConnect({
  url: process.env.REDIS_URL
});
