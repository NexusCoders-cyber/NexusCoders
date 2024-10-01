const logger = require('../logger');

module.exports = {
  name: 'uptime',
  description: 'Show bot uptime',
  async execute(client, message, args) {
    try {
      const startTime = client.startTime;
      const currentTime = new Date();
      const uptime = currentTime - startTime;

      const seconds = Math.floor(uptime / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);

const username = message.from split('@'[0];

      const uptimeText = `
Bot Uptime:𝐇𝐞𝐥𝐥𝐨 ${username} 𝐛𝐨𝐭 𝐡𝐚𝐬 𝐛𝐞𝐞𝐧 𝐮𝐩 𝐟𝐨𝐫
🔵 ${days} 𝐝𝐚𝐲𝐬\n♦️ ${hours % 24} 𝐡𝐨𝐮𝐫𝐬\n🕛 ${minutes % 60} 𝐦𝐢𝐧𝐮𝐭𝐞𝐬\n☪️ ${seconds % 60} 𝐬𝐞𝐜𝐨𝐧𝐝𝐬\n\n©️𝗰𝗿𝗲𝗮𝘁𝗲𝗱 𝗯𝘆 𝗡𝗲𝘅𝘂𝘀𝗖𝗼𝗱𝗲𝗿𝘀
`;

      await message.reply(uptimeText);

      logger.info(`Uptime command executed by ${message.from}`);
    } catch (error) {
      logger.error(`Error in uptime command: ${error}`);
      throw error;
    }
  },
};