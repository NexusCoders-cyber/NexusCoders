const logger = require('../logger');
const axios = require('axios');

module.exports = {
  name: 'nexus',
  description: 'Ask me anything',
  async execute(client, message, args) {
    try {
      
      const apiURL = 'you ai api endpoint l frank kaumba dont have it lol';

      // Combine message content and author
      const query = `${message.content} (asked by ${message.author.username})`;

      // Set API request headers and data
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer YOUR_API_KEY', // Replace with your API key
      };
      const data = {
        'query': query,
        'context': 'general-conversation',
      };

      // Send POST request to AI API
      const response = await axios.post(apiURL, data, { headers });

      // Log API response
      logger.info(`AI API response: ${response.data}`);

      // Send response back to user
      message.reply(response.data);
    } catch (error) {
      logger.error(`Error in askai command: ${error}`);
      message.reply('Error: Unable to contact AI API');
      throw error;
    }
  },
};


