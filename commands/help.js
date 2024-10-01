const fs = require('fs');
const path = require('path');
const logger = require('../logger');

module.exports = {
    name: 'help',
    description: 'List all available commands',
    async execute(client, message, args) {
        try {
            const commandFiles = fs.readdirSync(__dirname).filter(file => file.endsWith('.js'));
            
            let helpText = 'Available commands:\n\n';
            
            for (const file of commandFiles) {
                const command = require(path.join(__dirname, file));
                helpText += `!${command.name}: ${command.description}\n`;
            }
            
            await message.reply(helpText);
            logger.info(`Help command executed by ${message.from}`);
        } catch (error) {
            logger.error(`Error in help command: ${error}`);
            throw error;
        }
    },
};
