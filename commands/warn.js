const { EmbedBuilder } = require('discord.js');
const db = require('../utils/database');

module.exports = {
    name: 'warn',
    description: 'Warn a user (Admin)',
    async execute(message, args, client) {
        // Standalone implementation for warn
        message.reply('This is the **warn** command! (Implementation coming soon in full standalone mode)');
    }
};
