const redis = require('redis');

class RedisConnect {
  constructor(params){
    this.params = params;
    this.connection = null;
  }

  async connect(){
    this.connection = redis.createClient(this.params);

    this.connection.on('error', (err) => console.log('Redis Client Error', err));

    return await this.connection.connect();
  }

  async cmd(){
    console.log(arguments);
    await this.connection.sendCommand(arguments);
  }

  async close() {
    return await this.connection.quit();
  }
}

module.exports = RedisConnect;