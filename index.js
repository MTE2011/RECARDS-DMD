const { Client, GatewayIntentBits, EmbedBuilder, Collection } = require('discord.js');
const fs = require('fs-extra');
const path = require('path');
require('dotenv').config();
const db = require('./utils/database');
const { updateCardDatabase } = require('./utils/cardApi');
const SpawnSystem = require('./utils/spawnSystem');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.commands = new Collection();
const prefix = process.env.PREFIX || '.';

// Load Commands
const loadCommands = async () => {
    const commandsPath = path.join(__dirname, 'commands');
    if (!(await fs.pathExists(commandsPath))) await fs.ensureDir(commandsPath);
    
    const commandFiles = (await fs.readdir(commandsPath)).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const command = require(`./commands/${file}`);
        client.commands.set(command.name, command);
    }
    console.log(`Loaded ${client.commands.size} commands.`);
};

client.once('ready', async () => {
    console.log(`Logged in as ${client.user.tag}!`);
    await loadCommands();
    
    // Initialize card database
    await updateCardDatabase();
    
    // Initialize spawn system
    client.spawnSystem = new SpawnSystem(client);
    await client.spawnSystem.init();
    console.log('Spawn system initialized.');
});

client.on('messageCreate', async message => {
    if (message.author.bot || !message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName);
    if (!command) return;

    try {
        await command.execute(message, args, client);
    } catch (error) {
        console.error('Error executing ' + commandName + ':', error);
        // Only reply if the command hasn't already sent a message
        if (!message.replied && !message.deferred) {
            message.reply('❌ There was an error executing that command!');
        }
    }
});

client.login(process.env.BOT_TOKEN);
