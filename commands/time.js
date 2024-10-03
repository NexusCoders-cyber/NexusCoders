const logger = require('../logger');

module.exports = {
  name: 'time',
  description: 'Display current time',
  async execute(client, message, args) {
    try {
      
      const currentTime = new Date();
      
      
      const formattedTime = currentTime.toLocaleTimeString();
      
     
      message.reply(`Current time: ${formattedTime}`);
      
      logger.info(`Time command executed by ${message.author.username}`);
    } catch (error) {
      logger.error(`Error in time command: ${error}`);
      throw error;
    }
  },
};
//nexusdev