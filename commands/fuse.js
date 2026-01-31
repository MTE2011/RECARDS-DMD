const { EmbedBuilder } = require('discord.js');
const db = require('../utils/database');

module.exports = {
    name: 'fuse',
    description: 'Fuse two cards together',
    async execute(message, args, client) {
        // Standalone implementation for fuse
        message.reply('This is the **fuse** command! (Implementation coming soon in full standalone mode)');
    }
};
