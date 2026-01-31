const { EmbedBuilder } = require('discord.js');
const db = require('../utils/database');

module.exports = {
    name: 'daily',
    description: 'Claim your daily reward',
    async execute(message, args, client) {
        // Standalone implementation for daily
        message.reply('This is the **daily** command! (Implementation coming soon in full standalone mode)');
    }
};
