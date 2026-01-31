const { EmbedBuilder } = require('discord.js');
const db = require('../utils/database');

module.exports = {
    name: 'stats',
    description: 'View your game statistics',
    async execute(message, args, client) {
        // Standalone implementation for stats
        message.reply('This is the **stats** command! (Implementation coming soon in full standalone mode)');
    }
};
