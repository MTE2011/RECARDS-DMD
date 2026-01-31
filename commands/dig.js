const { EmbedBuilder } = require('discord.js');
const db = require('../utils/database');

module.exports = {
    name: 'dig',
    description: 'Dig for treasures',
    async execute(message, args, client) {
        // Standalone implementation for dig
        message.reply('This is the **dig** command! (Implementation coming soon in full standalone mode)');
    }
};
