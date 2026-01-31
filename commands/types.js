const { EmbedBuilder } = require('discord.js');
const db = require('../utils/database');

module.exports = {
    name: 'types',
    description: 'View all card types',
    async execute(message, args, client) {
        // Standalone implementation for types
        message.reply('This is the **types** command! (Implementation coming soon in full standalone mode)');
    }
};
