const logger = require('../logger');
const { MessageMedia } = require('whatsapp-web.js');

module.exports = {
    name: 'menu',
    description: 'Display the NexusCoders WhatsApp Bot menu',
    async execute(client, message, args) {
        try {
            const image = await MessageMedia.fromUrl('https://tiny.one/yp48vtzf');
            
            const menuText = `🚀 *NexusCoders WhatsApp Bot Menu* 🚀

Welcome to the NexusCoders WhatsApp Bot! Here are the available commands:

📋 *General Commands*:
!ping - Check if the bot is responsive
!echo [message] - Bot repeats your message
!help - Display this menu

🛠️ *Utility Commands*:
!weather [city] - Get current weather information
!translate [lang] [text] - Translate text to specified language
!calculate [expression] - Solve mathematical expressions

🎮 *Fun Commands*:
!joke - Get a random joke
!quote - Get an inspirational quote
!trivia - Start a trivia game

💻 *Coding Commands*:
!gitinfo [username] - Get GitHub user information
!codesnippet [language] - Get a random code snippet

⚙️ *Bot Info*:
!about - Learn more about NexusCoders
!stats - View bot usage statistics

For more information on each command, type !help [command name].

Happy coding with NexusCoders! 🎉`;

            await message.reply(image, message.from, { caption: menuText });
            logger.info(`Menu command executed by ${message.from}`);
        } catch (error) {
            logger.error(`Error in menu command: ${error}`);
            await message.reply('An error occurred while displaying the menu. Please try again later.');
            throw error;
        }
    },
};
