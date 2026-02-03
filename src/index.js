require('dotenv').config();
const { Client, GatewayIntentBits, Collection, Events } = require('discord.js');
const fs = require('fs');
const path = require('path');
const db = require('./utils/database');

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

console.log('--- Bot Starting (JSON DB Mode) ---');
console.log(`Prefix: ${client.config.prefix}`);

// Load Commands
const commandsPath = path.join(__dirname, 'commands');
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

// Event: Ready
client.once(Events.ClientReady, c => {
    console.log(`--- Bot is Online! ---`);
    console.log(`Logged in as ${c.user.tag}`);
    require('./utils/spawnSystem')(client);
});

// Event: Message Create
client.on(Events.MessageCreate, async message => {
    if (message.author.bot || !message.content.startsWith(client.config.prefix)) return;

    // Channel restriction check
    if (client.config.allowedChannels.length > 0 && !client.config.allowedChannels.includes(message.channel.id)) return;

    const args = message.content.slice(client.config.prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
    if (!command) return;

    try {
        await command.execute(message, args, client);
    } catch (error) {
        console.error(`Error executing ${commandName}:`, error);
        message.reply('There was an error executing that command.').catch(() => {});
    }
});

process.on('unhandledRejection', error => console.error('Unhandled promise rejection:', error));

client.login(process.env.DISCORD_TOKEN);
