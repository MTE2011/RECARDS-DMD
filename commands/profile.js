const { EmbedBuilder } = require('discord.js');
const db = require('../utils/database');

module.exports = {
    name: 'profile',
    description: 'View your profile and balance',
    async execute(message, args, client) {
        // Standalone implementation for profile
        message.reply('This is the **profile** command! (Implementation coming soon in full standalone mode)');
    }
};
