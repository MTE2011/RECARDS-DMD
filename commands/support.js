const { EmbedBuilder } = require('discord.js');
const db = require('../utils/database');

module.exports = {
    name: 'support',
    description: 'Get support server link',
    async execute(message, args, client) {
        // Standalone implementation for support
        message.reply('This is the **support** command! (Implementation coming soon in full standalone mode)');
    }
};
