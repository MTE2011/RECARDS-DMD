const { EmbedBuilder } = require('discord.js');
const db = require('../utils/database');

module.exports = {
    name: 'reload',
    description: 'Reload a command (Owner)',
    async execute(message, args, client) {
        // Standalone implementation for reload
        message.reply('This is the **reload** command! (Implementation coming soon in full standalone mode)');
    }
};
