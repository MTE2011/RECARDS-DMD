const { EmbedBuilder } = require('discord.js');
const db = require('../utils/database');

module.exports = {
    name: 'craft',
    description: 'Craft a new card',
    async execute(message, args, client) {
        // Standalone implementation for craft
        message.reply('This is the **craft** command! (Implementation coming soon in full standalone mode)');
    }
};
