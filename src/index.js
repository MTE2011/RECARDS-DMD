require('dotenv').config();
const { Client, GatewayIntentBits, Collection, EmbedBuilder } = require('discord.js');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ]
});

client.commands = new Collection();
client.config = {
    prefix: process.env.PREFIX || '.',
    ownerId: process.env.OWNER_ID,
    spawnChannels: process.env.SPAWN_CHANNELS ? process.env.SPAWN_CHANNELS.split(',') : [],
    allowedChannels: process.env.ALLOWED_CHANNELS ? process.env.ALLOWED_CHANNELS.split(',') : [],
};

// Load Commands
const commandsPath = path.join(__dirname, 'commands');
if (!fs.existsSync(commandsPath)) fs.mkdirSync(commandsPath, { recursive: true });

const commandFolders = fs.readdirSync(commandsPath);
for (const folder of commandFolders) {
    const folderPath = path.join(commandsPath, folder);
    if (fs.lstatSync(folderPath).isDirectory()) {
        const commandFiles = fs.readdirSync(folderPath).filter(file => file.endsWith('.js'));
        for (const file of commandFiles) {
            const command = require(path.join(folderPath, file));
            client.commands.set(command.name, command);
        }
    }
}

// Database Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/decards')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// Event: Ready
client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
    require('./utils/spawnSystem')(client);
});

// Event: Message Create
client.on('messageCreate', async message => {
    if (message.author.bot || !message.content.startsWith(client.config.prefix)) return;

    // Channel restriction
    if (client.config.allowedChannels.length > 0 && !client.config.allowedChannels.includes(message.channel.id)) return;

    const args = message.content.slice(client.config.prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName);
    if (!command) return;

    try {
        await command.execute(message, args, client);
    } catch (error) {
        console.error(error);
        message.reply('There was an error executing that command.');
    }
});

client.login(process.env.DISCORD_TOKEN);
