const { EmbedBuilder } = require('discord.js');
const db = require('../utils/database');

module.exports = {
    name: 'ping',
    description: 'Check bot latency',
    async execute(message, args, client) {
        // Standalone implementation for ping
        message.reply('This is the **ping** command! (Implementation coming soon in full standalone mode)');
    }
};
