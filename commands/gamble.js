const { EmbedBuilder } = require('discord.js');
const db = require('../utils/database');

module.exports = {
    name: 'gamble',
    description: 'Gamble your coins',
    async execute(message, args, client) {
        // Standalone implementation for gamble
        message.reply('This is the **gamble** command! (Implementation coming soon in full standalone mode)');
    }
};
