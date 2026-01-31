const { EmbedBuilder } = require('discord.js');
const db = require('../utils/database');

module.exports = {
    name: 'shop',
    description: 'View the card shop',
    async execute(message, args, client) {
        // Standalone implementation for shop
        message.reply('This is the **shop** command! (Implementation coming soon in full standalone mode)');
    }
};
