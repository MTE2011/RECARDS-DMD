const { EmbedBuilder } = require('discord.js');
const db = require('../utils/database');

module.exports = {
    name: 'gdemote',
    description: 'Demote a guild member',
    async execute(message, args, client) {
        // Standalone implementation for gdemote
        message.reply('This is the **gdemote** command! (Implementation coming soon in full standalone mode)');
    }
};
