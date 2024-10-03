const logger = require('../logger');

module.exports = {
  name: 'eval',
  description: 'Evaluate JavaScript code',
  async execute(client, message, args) {
    try {
      const code = args.join(' ');
      if (!code) {
        return message.reply('Please provide code to evaluate');
      }
      
     
      const result = eval(code);
      
      
      logger.info(`Evaluated code by ${message.from}: ${code}`);
      message.reply(`Result: \`\`\`js\n${result}\n\`\`\``);
    } catch (error) {
      logger.error(`Error in eval command: ${error}`);
      message.reply(`Error: \`\`\`js\n${error}\n\`\`\``);
      throw error;
    }
  },
};

//nexusdev




