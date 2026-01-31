const { EmbedBuilder } = require('discord.js');
const db = require('../utils/database');

module.exports = {
    name: 'gwithdraw',
    description: 'Withdraw coins from guild bank',
    async execute(message, args, client) {
        // Standalone implementation for gwithdraw
        message.reply('This is the **gwithdraw** command! (Implementation coming soon in full standalone mode)');
    }
};
