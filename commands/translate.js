const axios = require('axios');
const logger = require('../logger');

module.exports = {
  name: 'trans',
  description: 'Translate text to desired language',
  async execute(client, message, args) {
    try {
      const langCodeTrans = args[1] ? args[1] : 'en';
      const content = args[0] ? args[0] : message.quotedMsg ? message.quotedMsg.body : '';

      if (!content) return message.reply('Please provide text to translate');

      const { text, lang } = await translate(content.trim(), langCodeTrans.trim());
      const translationInfo = `Translated from ${lang} to ${langCodeTrans}\n\n`;

      message.reply(translationInfo + text);
      logger.info(`Translation command used by ${message.from}`);
    } catch (error) {
      logger.error(`Error in translate command: ${error}`);
      message.reply('Error translating text. Please try again.');
    }
  },
};

async function translate(text, langCode) {
  const res = await axios.get(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${langCode}&dt=t&q=${encodeURIComponent(text)}`);
  return { text: res.data[0].map(item => item[0]).join(''), lang: res.data[2] };
}