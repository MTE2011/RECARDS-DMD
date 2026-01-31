const { EmbedBuilder } = require('discord.js');
const db = require('../utils/database');

module.exports = {
    name: 'notifications',
    description: 'Toggle spawn notifications',
    async execute(message, args, client) {
        // Standalone implementation for notifications
        message.reply('This is the **notifications** command! (Implementation coming soon in full standalone mode)');
    }
};
