const { EmbedBuilder } = require('discord.js');
const db = require('../utils/database');

module.exports = {
    name: 'list',
    description: 'List a card on the market',
    async execute(message, args, client) {
        // Standalone implementation for list
        message.reply('This is the **list** command! (Implementation coming soon in full standalone mode)');
    }
};
