require('dotenv').config();
const { Client, GatewayIntentBits, Collection, EmbedBuilder, Events } = require('discord.js');
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

console.log('--- Bot Starting ---');
console.log(`Prefix: ${client.config.prefix}`);
console.log(`Spawn Channels: ${client.config.spawnChannels.join(', ') || 'None set'}`);
console.log(`Allowed Channels: ${client.config.allowedChannels.join(', ') || 'All'}`);

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
            console.log(`Loaded command: ${command.name}`);
        }
    }
}

// Database Connection with better error handling
const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/decards';
mongoose.connect(mongoUri)
    .then(() => console.log('Successfully connected to MongoDB'))
    .catch(err => {
        console.error('CRITICAL: MongoDB connection error!');
        console.error('Make sure your MONGO_URI in .env is correct.');
        console.error('Error details:', err.message);
    });

// Event: Ready (Updated to use Events.ClientReady for v14/v15 compatibility)
client.once(Events.ClientReady, c => {
    console.log(`--- Bot is Online! ---`);
    console.log(`Logged in as ${c.user.tag}`);
    require('./utils/spawnSystem')(client);
});

// Event: Message Create
client.on(Events.MessageCreate, async message => {
    // Ignore bots
    if (message.author.bot) return;

    // Check if message starts with prefix
    if (!message.content.startsWith(client.config.prefix)) return;

    console.log(`Command received: ${message.content} from ${message.author.tag} in channel ${message.channel.id}`);

    // Channel restriction check
    if (client.config.allowedChannels.length > 0 && !client.config.allowedChannels.includes(message.channel.id)) {
        console.log(`Command ignored: Channel ${message.channel.id} is not in ALLOWED_CHANNELS`);
        return;
    }

    const args = message.content.slice(client.config.prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
    
    if (!command) {
        console.log(`Command not found: ${commandName}`);
        return;
    }

    try {
        await command.execute(message, args, client);
        console.log(`Successfully executed: ${commandName}`);
    } catch (error) {
        console.error(`Error executing ${commandName}:`, error);
        message.reply('There was an error executing that command. Check the console for details.').catch(() => {});
    }
});

// Handle unhandled rejections
process.on('unhandledRejection', error => {
    console.error('Unhandled promise rejection:', error);
});

client.login(process.env.DISCORD_TOKEN);
