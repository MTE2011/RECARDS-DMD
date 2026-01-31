const { EmbedBuilder } = require('discord.js');
const db = require('../utils/database');

module.exports = {
    name: 'season',
    description: 'View current season info',
    async execute(message, args, client) {
        // Standalone implementation for season
        message.reply('This is the **season** command! (Implementation coming soon in full standalone mode)');
    }
};
