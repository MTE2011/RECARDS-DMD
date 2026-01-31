const { EmbedBuilder } = require('discord.js');
const db = require('../utils/database');

module.exports = {
    name: 'recent',
    description: 'View recently collected cards',
    async execute(message, args, client) {
        // Standalone implementation for recent
        message.reply('This is the **recent** command! (Implementation coming soon in full standalone mode)');
    }
};
