const { EmbedBuilder } = require('discord.js');
const db = require('../utils/database');

module.exports = {
    name: 'rob',
    description: 'Try to rob another user',
    async execute(message, args, client) {
        // Standalone implementation for rob
        message.reply('This is the **rob** command! (Implementation coming soon in full standalone mode)');
    }
};
