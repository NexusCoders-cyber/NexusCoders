const logger = require('../logger');
const axios = require('axios');

module.exports = {
  name: 'pinterest',
  description: 'Search for Pinterest images',
  async execute(client, message, args) {
    try {
      
      const apiKey = 'you api if u have it';
      const apiSecret = 'YOUR_API_SECRET';
      const endpoint = 'endpoint api l frank kaumba dont have it lol';

      
      const query = args.join(' ');

      
      const headers = {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      };
      const params = {
        'query': query,
        'orientation': 'ALL',
        'size': 'MEDIUM',
      };

      
      const response = await axios.get(endpoint, { headers, params });

     
      logger.info(`Pinterest API response: ${response.status}`);

    
      const images = response.data.items;
      images.forEach((image) => {
        message.reply({ files: [image.image_url] });
      });

      logger.info(`Pinterest command executed by ${message.author.username}`);
    } catch (error) {
      logger.error(`Error in pinterest command: ${error}`);
      message.reply('Error: Unable to fetch Pinterest images');
      throw error;
    }
  },
};
