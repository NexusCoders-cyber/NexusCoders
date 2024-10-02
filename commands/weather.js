const axios = require('axios');
const logger = require('../logger');

module.exports = {
  name: 'weather',
  description: 'Get the weather for a location',
  async execute(message, args) {
    try {
      const location = args.join(' ');
      if (!location) {
        await message.reply('Please provide a location (city, state, country)');
        return logger.info(`Weather command used without location by ${message.from}`);
      }

      const apiKey = 'a9b4c37c68380d91903251d40ffa89ec';
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

      const response = await axios.get(url);
      const { main, weather, name } = response.data;

      const weatherMessage = `
        **Current Weather in ${name}**
        Temperature: ${main.temp}°C
        Feels like: ${main.feels_like}°C
        Humidity: ${main.humidity}%
        Weather: ${weather[0].description}
      `;

      await message.reply(weatherMessage);
      logger.info(`Weather command used by ${message.from} for location: ${location}`);
    } catch (error) {
      await message.reply('Error fetching weather data. Please check the location');
      logger.error(`Error fetching weather data for ${location} by ${message.from}: ${error}`);
    }
  },
};