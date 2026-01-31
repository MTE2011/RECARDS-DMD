const { EmbedBuilder } = require('discord.js');
const db = require('../utils/database');

module.exports = {
    name: 'gshop',
    description: 'View the guild shop',
    async execute(message, args, client) {
        // Standalone implementation for gshop
        message.reply('This is the **gshop** command! (Implementation coming soon in full standalone mode)');
    }
};
