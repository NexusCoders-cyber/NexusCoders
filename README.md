# NexusCoders WhatsApp Bot
<div align="center">
  <img src="https://tiny.one/yp48vtzf" alt="Alt text for the image" style="border-radius: 10px; box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);" width="300">
</div>
A versatile WhatsApp bot built by the NexusCoders team. This bot is designed to be easily customizable and deployable on various platforms.

## Features

- 🚀 Easy setup and deployment
- 🔒 Secure authentication via QR code or pairing code
- 💾 Session management for persistent connections
- 📚 Modular command system for easy expansion
- 🚦 Rate limiting to prevent spam
- 💾 Persistent storage using SQLite
- 📊 Logging for tracking bot activities and errors

## Prerequisites

- Node.js (v14 or newer)
- npm (Node Package Manager)
- A smartphone with WhatsApp installed

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/NexusCoders/whatsapp-bot.git
   ```

2. Navigate to the project directory:
   ```
   cd whatsapp-bot
   ```

3. Install dependencies:
   ```
   npm install
   ```

## Configuration

1. Create a `.env` file in the root directory of the project.
2. Add the following environment variables:
   ```
   SESSION_ID=your-unique-session-id
   USE_REMOTE_AUTH=false
   ```
   Replace `your-unique-session-id` with a unique identifier for your bot session.

## Usage

1. Start the bot:
   ```
   npm start
   ```

2. Authenticate your WhatsApp account:

   Option 1: Scan QR Code
   - A QR code will be displayed in the console
   - Open WhatsApp on your phone
   - Go to Settings > Linked Devices
   - Tap on "Link a Device"
   - Point your phone camera at the QR code in the console

   Option 2: Use Pairing Code
   - If the console displays a pairing code instead of a QR code:
   - Open WhatsApp on your phone
   - Go to Settings > Linked Devices
   - Tap on "Link a Device"
   - Tap "Link with phone number"
   - Enter the 8-digit pairing code displayed in the console

3. Once authenticated, the bot is ready to use! Send `!help` in any chat to see available commands.

## Session Management

The bot uses session management to maintain persistent connections. If you're deploying the bot on a server or want to use remote authentication:

1. Set `USE_REMOTE_AUTH=true` in your `.env` file.
2. Implement a custom store for RemoteAuth (refer to whatsapp-web.js documentation for details).

## Available Commands

- `!help`: List all available commands
- `!ping`: Check if the bot is responsive

## Adding New Commands

1. Create a new file in the `commands` folder (e.g., `mycommand.js`).
2. Use the following template:

```javascript
const logger = require('../logger');

module.exports = {
    name: 'mycommand',
    description: 'Description of my command',
    async execute(client, message, args) {
        try {
            // Command logic here
            logger.info(`MyCommand executed by ${message.from}`);
        } catch (error) {
            logger.error(`Error in mycommand: ${error}`);
            throw error;
        }
    },
};
```

3. The command will be automatically loaded and available for use.

## Troubleshooting

If you encounter any issues:

1. Make sure you have the latest version of Node.js installed.
2. Try deleting the `.wwebjs_auth` folder in the project directory and restart the bot.
3. Ensure your WhatsApp app is up to date.
4. Check the console for any error messages.
5. If using RemoteAuth, ensure your store implementation is correct.

## Contributing

We welcome contributions from the community! Please feel free to submit pull requests or open issues on our GitHub repository.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Disclaimer

This bot is not affiliated with, authorized, maintained, sponsored or endorsed by WhatsApp or any of its affiliates or subsidiaries. Use at your own risk. Always make sure you comply with WhatsApp's terms of service when using this bot.

---

Made with ❤️ by NexusCoders
