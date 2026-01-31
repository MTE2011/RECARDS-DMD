const { EmbedBuilder } = require('discord.js');
const db = require('../utils/database');

module.exports = {
    name: 'event',
    description: 'View current event info',
    async execute(message, args, client) {
        // Standalone implementation for event
        message.reply('This is the **event** command! (Implementation coming soon in full standalone mode)');
    }
};
