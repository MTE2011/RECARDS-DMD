const { EmbedBuilder } = require('discord.js');
const db = require('../utils/database');

module.exports = {
    name: 'uptime',
    description: 'Check bot uptime',
    async execute(message, args, client) {
        // Standalone implementation for uptime
        message.reply('This is the **uptime** command! (Implementation coming soon in full standalone mode)');
    }
};
