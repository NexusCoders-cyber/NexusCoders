const axios = require("axios");
const logger = require('../logger');
const fs = require('fs-extra');
const path = require('path');

module.exports = {
  name: 'ai',
  description: 'Generate AI response',
  async execute(client, message, args) {
    try {
      const input = args.join(" ");
      const response = await axios.get('https://helis-ai.vercel.app/kshitiz?input=${encodeURIComponent(input)}');
      const responseData = response.data;

      if (responseData.response.startsWith("https://")) {
        const responseLink = responseData.response;
        let fileExtension = "";

        if (responseLink.includes("googlevideo.com")) {
          fileExtension = ".music.mp3";
        } else if (responseLink.includes("pinimg.com")) {
          fileExtension = ".image.jpg";
        } else if (responseLink.includes("tiktokcdn-us.com")) {
          fileExtension = ".video.mp4";
        }

        if (fileExtension !== "") {
          const fileName = 'ai_${Date.now()}${fileExtension}';
          const filePath = path.join(__dirname, "cache", fileName);
          const fileResponse = await axios.get(responseLink, { responseType: 'stream' });
          const writer = fs.createWriteStream(filePath);
          fileResponse.data.pipe(writer);

          writer.on('finish', async () => {
            const fileStream = fs.createReadStream(filePath);
            await message.reply({ body: "", attachment: fileStream });
          });

          writer.on('error', (error) => {
            logger.error('Error downloading file: ${error}');
            message.reply("An error occurred while processing the file.");
          });
        } else {
          message.reply("Unsupported link.");
        }
      } else {
        message.reply(responseData.response);
      }

      logger.info('AI command executed by ${message.from} for "${input}"');
    } catch (error) {
      logger.error('Error in AI command: ${error}');
      message.reply("An error occurred while processing the request.");
      throw error;
    }
  },
};