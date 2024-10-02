const moment = require('moment-timezone');
const logger = require('../logger');

module.exports = {
  name: 'info',
  description: 'Sends information about bot',
  async execute(client, message, args) {
    try {
      const name = "Nexus MD";
      const authorName = "NexusCoders";
      const now = moment();
      const date = now.format('MMMM Do YYYY');
      const time = now.format('h:mm:ss A');
      const uptime = process.uptime();
      const seconds = Math.floor(uptime % 60);
      const minutes = Math.floor((uptime / 60) % 60);
      const hours = Math.floor((uptime / (60 * 60)) % 24);
      const days = Math.floor(uptime / (60 * 60 * 24));
      const uptimeString = `${days} days ${hours} hours ${minutes} minutes ${seconds} seconds`;
      const additionalText = "Nexus MD ";

      const response = ` Bot Information: 
      Bot Prefix: !
      Name: ${name}
      Owners: ${authorName}
      Date: ${date}
      Time: ${time}
      Uptime: ${uptimeString}
      ${additionalText}`;

      await message.reply(response);

      logger.info(`Adinfo command executed by ${message.from}`);
    } catch (error) {
      logger.error(`Error in adinfo command: ${error}`);
      message.reply("An error occurred while processing the request.");
      throw error;
    }
  },
};
