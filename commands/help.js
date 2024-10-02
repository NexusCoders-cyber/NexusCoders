const fs = require('fs');
const path = require('path');
const logger = require('../logger');

module.exports = {
  name: 'help',
  description: 'List all available commands or get specific command info',
  async execute(client, message, args) {
    try {
      const currentTime = new Date().toLocaleTimeString();
      const username = message.from.split('@')[0];
      const commandFiles = fs.readdirSync(__dirname).filter(file => file.endsWith('.js'));

      if (!args.length) {
        let helpText = '';

        helpText += `
Hello ${username} ${currentTime}
❄ Creator : NexusCoders
❄ User : ${username}
❄ Status : free
❄ Mode : Public
❄ Bot Name : Nexus MD
❄ Prefix : !

*COMMANDS*
┏━━━━━━━━━━━`;

        for (const file of commandFiles) {
          const command = require(path.join(__dirname, file));
          helpText += `❏!${command.name}: ${command.description}\n`;
        }

        helpText += `
┗━━━━━━━━━━
 𝗰𝗿𝗲𝗮𝘁𝗲𝗱 𝗯𝘆 𝗡𝗲𝘅𝘂𝘀𝗖𝗼𝗱𝗲𝗿𝘀`;

        await message.reply(helpText);
      } else {
        const commandName = args[0].toLowerCase();
        const command = client.commands.get(commandName);

        if (!command) {
          return message.reply(`Command "${commandName}" not found.`);
        }

        const helpText = `
Command: !${command.name}\n
Description: ${command.description}\n
`;

        await message.reply(helpText);
      }

      logger.info(`Help command executed by ${username}`);
    } catch (error) {
      logger.error(`Error in help command: ${error}`);
      throw error;
    }
  },
};
