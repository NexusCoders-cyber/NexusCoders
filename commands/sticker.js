const logger = require('../logger');
const fs = require('fs');
const sticker = require('sticker-maker');

module.exports = {
  name: 'sticker',
  description: 'Create a sticker from an image',
  async execute(client, message, args) {
    try {
      
      if (!message.attachments.size) {
        return message.reply('Please attach an image');
      }

      
      const image = message.attachments.first().attachment;

      
      const stickerBuffer = await sticker(image, {
        pack: 'Your Sticker Pack',
        author: 'frank kaumba nexus',
      });

     
      fs.writeFileSync('sticker.webp', stickerBuffer);

   
      message.reply({
        files: ['sticker.webp'],
      });

      logger.info(`Sticker command executed by ${message.author.username}`);
    } catch (error) {
      logger.error(`Error in sticker command: ${error}`);
      throw error;
    }
  },
};



