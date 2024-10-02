const logger = require('../logger');
const { MessageMedia } = require('whatsapp-web.js');

module.exports = {
    name: 'menu',
    description: 'Display the NexusCoders WhatsApp Bot menu',
    async execute(client, message, args) {
        try {
            const image = await MessageMedia.fromUrl('https://tiny.one/yp48vtzf');
            
            const menuText = `╭───────────╍⏣
│❑ 𝑵𝒆𝒙𝒖𝒔𝑪𝒐𝒅𝒆𝒓𝒔 𝑾𝒉𝒂𝒕𝒔𝑨𝒑𝒑 𝑩𝒐𝒕 𝑴𝒆𝒏𝒖 🚀
│❑ 𝑾𝒆𝒍𝒄𝒐𝒎𝒆 𝒕𝒐 𝒕𝒉𝒆 𝑵𝒆𝒙𝒖𝒔𝑪𝒐𝒅𝒆𝒓𝒔 
│𝑾𝒉𝒂𝒕𝒔𝑨𝒑𝒑 𝑩𝒐𝒕!
│❑ 𝑯𝒆𝒓𝒆 𝒂𝒓𝒆 𝒕𝒉𝒆 𝒂𝒗𝒂𝒊𝒍𝒂𝒃𝒍𝒆 𝒄𝒐𝒎𝒎𝒂𝒏𝒅𝒔:
├───────────╍⏣
├〘 📋 𝗚𝗲𝗻𝗲𝗿𝗮𝗹 - 𝗖𝗼𝗺𝗺𝗮𝗻𝗱𝘀 〙
│!𝚙𝚒𝚗𝚐 - 𝙲𝚑𝚎𝚌𝚔 𝚒𝚏 𝚝𝚑𝚎 𝚋𝚘𝚝 𝚒𝚜 𝚛𝚎𝚜𝚙𝚘𝚗𝚜𝚒𝚟𝚎
│!𝚎𝚌𝚑𝚘 [𝚖𝚎𝚜𝚜𝚊𝚐𝚎] - 𝙱𝚘𝚝 𝚛𝚎𝚙𝚎𝚊𝚝𝚜 𝚢𝚘𝚞𝚛 𝚖𝚎𝚜𝚜𝚊𝚐𝚎
│!𝚑𝚎𝚕𝚙 - 𝙳𝚒𝚜𝚙𝚕𝚊𝚢 𝚝𝚑𝚒𝚜 𝚖𝚎𝚗𝚞
├───────────╍⏣
├〘 🛠️ 𝗨𝘁𝗶𝗹𝗶𝘁𝘆 - 𝗖𝗼𝗺𝗺𝗮𝗻𝗱𝘀 〙
│!𝚠𝚎𝚊𝚝𝚑𝚎𝚛 [𝚌𝚒𝚝𝚢] - 𝙶𝚎𝚝 𝚌𝚞𝚛𝚛𝚎𝚗𝚝 𝚠𝚎𝚊𝚝𝚑𝚎𝚛 𝚒𝚗𝚏𝚘𝚛𝚖𝚊𝚝𝚒𝚘𝚗
│!𝚝𝚛𝚊𝚗𝚜𝚕𝚊𝚝𝚎 [𝚕𝚊𝚗𝚐] [𝚝𝚎𝚡𝚝] - 𝚃𝚛𝚊𝚗𝚜𝚕𝚊𝚝𝚎 𝚝𝚎𝚡𝚝 𝚝𝚘 𝚜𝚙𝚎𝚌𝚒𝚏𝚒𝚎𝚍 𝚕𝚊𝚗𝚐𝚞𝚊𝚐𝚎
│!𝚌𝚊𝚕𝚌𝚞𝚕𝚊𝚝𝚎 [𝚎𝚡𝚙𝚛𝚎𝚜𝚜𝚒𝚘𝚗] - 𝚂𝚘𝚕𝚟𝚎 𝚖𝚊𝚝𝚑𝚎𝚖𝚊𝚝𝚒𝚌𝚊𝚕 𝚎𝚡𝚙𝚛𝚎𝚜𝚜𝚒𝚘𝚗𝚜
├───────────╍⏣
├〘 🎮 𝗙𝘂𝗻 - 𝗖𝗼𝗺𝗺𝗮𝗻𝗱𝘀 〙
│!𝚓𝚘𝚔𝚎 - 𝙶𝚎𝚝 𝚊 𝚛𝚊𝚗𝚍𝚘𝚖 𝚓𝚘𝚔𝚎
│!𝚚𝚞𝚘𝚝𝚎 - 𝙶𝚎𝚝 𝚊𝚗 𝚒𝚗𝚜𝚙𝚒𝚛𝚊𝚝𝚒𝚘𝚗𝚊𝚕 𝚚𝚞𝚘𝚝𝚎
│!𝚝𝚛𝚒𝚟𝚒𝚊 - 𝚂𝚝𝚊𝚛𝚝 𝚊 𝚝𝚛𝚒𝚟𝚒𝚊 𝚐𝚊𝚖𝚎
├───────────╍⏣
├〘 💻 𝗖𝗼𝗺𝗺𝗮𝗻𝗱 - 𝗖𝗼𝗺𝗺𝗮𝗻𝗱𝘀 〙
│!𝚐𝚒𝚝𝚒𝚗𝚏𝚘 [𝚞𝚜𝚎𝚛𝚗𝚊𝚖𝚎] - 𝙶𝚎𝚝 𝙶𝚒𝚝𝙷𝚞𝚋 𝚞𝚜𝚎𝚛 𝚒𝚗𝚏𝚘𝚛𝚖𝚊𝚝𝚒𝚘𝚗
│!𝚌𝚘𝚍𝚎𝚜𝚗𝚒𝚙𝚙𝚎𝚝 [𝚕𝚊𝚗𝚐𝚞𝚊𝚐𝚎] - 𝙶𝚎𝚝 𝚊 𝚛𝚊𝚗𝚍𝚘𝚖 𝚌𝚘𝚍𝚎 𝚜𝚗𝚒𝚙𝚙𝚎𝚝
├───────────╍⏣
├〘 ⚙️ 𝗕𝗼𝘁 - 𝗜𝗻𝗳𝗼 〙
│!𝚊𝚋𝚘𝚞𝚝 - 𝙻𝚎𝚊𝚛𝚗 𝚖𝚘𝚛𝚎 𝚊𝚋𝚘𝚞𝚝 𝙽𝚎𝚡𝚞𝚜𝙲𝚘𝚍𝚎𝚛𝚜
│!𝚜𝚝𝚊𝚝𝚜 - 𝚅𝚒𝚎𝚠 𝚋𝚘𝚝 𝚞𝚜𝚊𝚐𝚎 𝚜𝚝𝚊𝚝𝚒𝚜𝚝𝚒𝚌𝚜
├───────────╍⏣
│» 𝔽𝕠𝕣 𝕞𝕠𝕣𝕖 𝕚𝕟𝕗𝕠𝕣𝕞𝕒𝕥𝕚𝕠𝕟 𝕠𝕟 𝕖𝕒𝕔𝕙 𝕔𝕠𝕞𝕞𝕒𝕟𝕕,
│» 𝕥𝕪𝕡𝕖 !𝕙𝕖𝕝𝕡 [𝕔𝕠𝕞𝕞𝕒𝕟𝕕 𝕟𝕒𝕞𝕖].
│
│» ℍ𝕒𝕡𝕡𝕪 𝕔𝕠𝕕𝕚𝕟𝕘 𝕨𝕚𝕥𝕙 
│ℕ𝕖𝕩𝕦𝕤ℂ𝕠𝕕𝕖𝕣𝕤! 🎉
╰───────────╍⏣`;

            await client.sendMessage(message.from, image, { caption: menuText });
            logger.info(`Menu command executed by ${message.from}`);
        } catch (error) {
            logger.error(`Error in menu command: ${error}`);
            await client.sendMessage(message.from, 'An error occurred while displaying the menu. Please try again later.');
        }
    },
};
