const logger = require('../logger');

module.exports = {
  name: 'echo',
  description: 'Repeats your message',
  async execute(client, message, args) {
    try {
      const input = args.join(" ");
      if (!input) return message.reply("Please type something to echo.");

      await message.reply(input);
      logger.info(`Echo command executed by ${message.from} with input: ${input}`);
    } catch (error) {
      logger.error(`Error in echo command: ${error}`);
      throw error;
    }
  },
};