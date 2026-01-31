const { EmbedBuilder } = require('discord.js');
const db = require('../utils/database');

module.exports = {
    name: 'work',
    description: 'Work to earn coins',
    async execute(message, args, client) {
        // Standalone implementation for work
        message.reply('This is the **work** command! (Implementation coming soon in full standalone mode)');
    }
};
