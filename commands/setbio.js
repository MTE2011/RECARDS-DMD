const { EmbedBuilder } = require('discord.js');
const db = require('../utils/database');

module.exports = {
    name: 'setbio',
    description: 'Set your profile bio',
    async execute(message, args, client) {
        // Standalone implementation for setbio
        message.reply('This is the **setbio** command! (Implementation coming soon in full standalone mode)');
    }
};
