const logger = require('../logger');

module.exports = {
    name: 'ping',
    description: 'Replies with Pong!',
    async execute(client, message, args) {
        try {
            await message.reply('Pong!');
            logger.info(`Ping command executed by ${message.from}`);
        } catch (error) {
            logger.error(`Error in ping command: ${error}`);
            throw error;
        }
    },
};
