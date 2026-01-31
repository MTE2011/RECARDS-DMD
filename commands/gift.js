const { EmbedBuilder } = require('discord.js');
const db = require('../utils/database');

module.exports = {
    name: 'gift',
    description: 'Gift coins to another user',
    async execute(message, args, client) {
        // Standalone implementation for gift
        message.reply('This is the **gift** command! (Implementation coming soon in full standalone mode)');
    }
};
