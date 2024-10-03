const logger = require('../logger');

module.exports = {
  name: 'ping',
  description: 'Check bot latency',
  async execute(client, message, args) {
    try {
      
      const startTime = Date.now();
      message.reply('Pong!');
      const endTime = Date.now();
      const latency = endTime - startTime;
      
      logger.info(`Ping command executed by ${message.author.username}`);
      logger.info(`Latency: ${latency}ms`);
    } catch (error) {
      logger.error(`Error in ping command: ${error}`);
      throw error;
    }
  },
};

