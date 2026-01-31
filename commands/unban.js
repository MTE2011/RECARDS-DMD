const { EmbedBuilder } = require('discord.js');
const db = require('../utils/database');

module.exports = {
    name: 'unban',
    description: 'Unban a user (Admin)',
    async execute(message, args, client) {
        // Standalone implementation for unban
        message.reply('This is the **unban** command! (Implementation coming soon in full standalone mode)');
    }
};
