const { EmbedBuilder } = require('discord.js');
const db = require('../utils/database');

module.exports = {
    name: 'rarities',
    description: 'View all card rarities',
    async execute(message, args, client) {
        // Standalone implementation for rarities
        message.reply('This is the **rarities** command! (Implementation coming soon in full standalone mode)');
    }
};
