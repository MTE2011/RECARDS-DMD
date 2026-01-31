const { EmbedBuilder } = require('discord.js');
const db = require('../utils/database');

module.exports = {
    name: 'info',
    description: 'View bot information',
    async execute(message, args, client) {
        // Standalone implementation for info
        message.reply('This is the **info** command! (Implementation coming soon in full standalone mode)');
    }
};
