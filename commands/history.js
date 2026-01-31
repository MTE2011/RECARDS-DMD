const { EmbedBuilder } = require('discord.js');
const db = require('../utils/database');

module.exports = {
    name: 'history',
    description: 'View your collection history',
    async execute(message, args, client) {
        // Standalone implementation for history
        message.reply('This is the **history** command! (Implementation coming soon in full standalone mode)');
    }
};
