const { EmbedBuilder } = require('discord.js');
const db = require('../utils/database');

module.exports = {
    name: 'clear',
    description: 'Clear messages (Admin)',
    async execute(message, args, client) {
        // Standalone implementation for clear
        message.reply('This is the **clear** command! (Implementation coming soon in full standalone mode)');
    }
};
