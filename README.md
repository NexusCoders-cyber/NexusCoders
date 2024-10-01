# NexusCoders WhatsApp Bot

![NexusCoders Logo](path/to/your/logo.png)

A versatile WhatsApp bot built by the NexusCoders team. This bot is designed to be easily customizable and deployable on various platforms.

## Features

- 🚀 Easy setup and deployment
- 🔒 Secure authentication via QR code or pairing code
- 📚 Modular command system for easy expansion
- 🚦 Rate limiting to prevent spam
- 💾 Persistent storage using SQLite
- 📊 Logging for tracking bot activities and errors
- 🧪 Unit testing for reliable functionality

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

4. Set up the configuration:
   - Rename `config.example.js` to `config.js`
   - Adjust the settings in `config.js` as needed

## Usage

1. Start the bot:
   ```
   npm start
   ```

2. Authenticate your WhatsApp account:
   - A QR code will be displayed in the console
   - Open WhatsApp on your phone
   - Go to Settings > WhatsApp Web/Desktop
   - Click "Link a device"
   - Scan the QR code displayed in the console

3. Once authenticated, the bot is ready to use! Send `!help` in any chat to see available commands.

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

## Running Tests

To run the test suite:

```
npm test
```

## Deployment

### Heroku

1. Install the Heroku CLI and log in.
2. In your project directory, run:
   ```
   heroku create
   git push heroku main
   heroku ps:scale worker=1
   ```

### Other Platforms

(Add deployment instructions for other platforms as needed)

## Contributing

We welcome contributions from the community! Please feel free to submit pull requests or open issues on our GitHub repository.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Disclaimer

This bot is not affiliated with, authorized, maintained, sponsored or endorsed by WhatsApp or any of its affiliates or subsidiaries. Use at your own risk. Always make sure you comply with WhatsApp's terms of service when using this bot.

---

Made with ❤️ by NexusCoders
