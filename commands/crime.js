const { EmbedBuilder } = require('discord.js');
const db = require('../utils/database');

module.exports = {
    name: 'crime',
    description: 'Commit a crime for coins',
    async execute(message, args, client) {
        // Standalone implementation for crime
        message.reply('This is the **crime** command! (Implementation coming soon in full standalone mode)');
    }
};
