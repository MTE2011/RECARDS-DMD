const { EmbedBuilder } = require('discord.js');
const db = require('../utils/database');

module.exports = {
    name: 'dice',
    description: 'Roll a dice for coins',
    async execute(message, args, client) {
        // Standalone implementation for dice
        message.reply('This is the **dice** command! (Implementation coming soon in full standalone mode)');
    }
};
