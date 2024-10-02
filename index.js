require('dotenv').config();
const { Client, LocalAuth, RemoteAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const fs = require('fs');
const path = require('path');
const config = require('./config');
const logger = require('./logger');
const { getUser, updateUser } = require('./database');
const moment = require('moment-timezone');

const sessionId = process.env.SESSION_ID || 'default-session';

const client = new Client({
    authStrategy: process.env.USE_REMOTE_AUTH === 'true' 
        ? new RemoteAuth({
            store: {},
            clientId: sessionId,
        })
        : new LocalAuth({ clientId: sessionId }),
    puppeteer: {
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
});

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

const commands = new Map();
for (const file of commandFiles) {
    const command = require(path.join(commandsPath, file));
    commands.set(command.name, command);
}

client.on('qr', (qr) => {
    logger.info('QR Code received. Scan it with your WhatsApp app:');
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    logger.info('Client is ready');
});

client.on('message', async (message) => {
    if (message.body.startsWith(config.prefix)) {
        const args = message.body.slice(config.prefix.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();

        if (commands.has(commandName)) {
            try {
                const userId = message.from;
                const user = await getUser(userId) || { id: userId, commandCount: 0, lastCommandTime: 0 };
                const now = moment().tz(config.timeZone).valueOf();

                if (now - user.lastCommandTime < config.rateLimitWindow) {
                    if (user.commandCount >= config.rateLimitMax) {
                        logger.warn(`Rate limit exceeded for user ${userId}`);
                        message.reply('You are sending commands too quickly. Please wait a moment and try again.');
                        return;
                    }
                } else {
                    user.commandCount = 0;
                }

                user.commandCount++;
                user.lastCommand = commandName;
                user.lastCommandTime = now;

                await updateUser(user.id, user.lastCommand, user.commandCount, user.lastCommandTime);
                await commands.get(commandName).execute(client, message, args);
                logger.info(`Command ${commandName} executed by ${userId}`);
            } catch (error) {
                logger.error(`Error executing command ${commandName}: ${error}`);
                message.reply('There was an error executing that command.');
            }
        } else {
            message.reply('Unknown command. Type !menu to see available commands.');
        }
    }
});

client.initialize();

process.on('unhandledRejection', (reason, promise) => {
    logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (error) => {
    logger.error('Uncaught Exception:', error);
});

process.on('SIGINT', async () => {
    logger.info('Shutting down...');
    await client.destroy();
    process.exit(0);
});
