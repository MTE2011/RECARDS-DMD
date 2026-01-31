const { EmbedBuilder } = require('discord.js');
const db = require('../utils/database');

module.exports = {
    name: 'market',
    description: 'View the player market',
    async execute(message, args, client) {
        // Standalone implementation for market
        message.reply('This is the **market** command! (Implementation coming soon in full standalone mode)');
    }
};
