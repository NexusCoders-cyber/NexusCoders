const fs = require('fs');
const path = require('path');
const logger = require('../logger');

module.exports = {
  name: 'help',
  description: 'List all available commands or get specific command info',
  async execute(client, message, args) {
    const currentTime = new Date().toLocaleTimeString();
    const username = message.from.split('@')[0];
    const commandFiles = fs.readdirSync(__dirname).filter(file => file.endsWith('.js'));

    if (!args.length) {
      let helpText = `Hello ${username} ${currentTime}
❄ Creator : NexusCoders
❄ User : ${username}
❄ Status : free
❄ Mode : Public
❄ Bot Name : Nexus MD
❄ Prefix : !

*COMMANDS*
┏━━━━━━━━━━━\n`;

      for (const file of commandFiles) {
        const command = require(path.join(__dirname, file));
        helpText += `❏!${command.name}: ${command.description}\n`;
      }

      helpText += `┗━━━━━━━━━━
𝗰𝗿𝗲𝗮𝘁𝗲𝗱 𝗯𝘆 𝗡𝗲𝘅𝘂𝘀𝗖𝗼𝗱𝗲𝗿𝘀`;

      await client.sendMessage(message.from, helpText);
    } else {
      const commandName = args[0].toLowerCase();
      const command = commandFiles.find(file => file.toLowerCase() === `${commandName}.js`);

      if (!command) {
        await client.sendMessage(message.from, `Command "${commandName}" not found.`);
        return;
      }

      const commandModule = require(path.join(__dirname, command));
      const helpText = `Command: !${commandModule.name}
Description: ${commandModule.description}`;

      await client.sendMessage(message.from, helpText);
    }

    logger.info(`Help command executed by ${username}`);
  },
};
