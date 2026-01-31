const { EmbedBuilder } = require('discord.js');
const db = require('../utils/database');

module.exports = {
    name: 'buy',
    description: 'Buy a card from the shop',
    async execute(message, args, client) {
        // Standalone implementation for buy
        message.reply('This is the **buy** command! (Implementation coming soon in full standalone mode)');
    }
};
