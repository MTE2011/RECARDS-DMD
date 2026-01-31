const { EmbedBuilder } = require('discord.js');
const db = require('../utils/database');

module.exports = {
    name: 'ban',
    description: 'Ban a user (Admin)',
    async execute(message, args, client) {
        // Standalone implementation for ban
        message.reply('This is the **ban** command! (Implementation coming soon in full standalone mode)');
    }
};
