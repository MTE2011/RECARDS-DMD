const { EmbedBuilder } = require('discord.js');
const db = require('../utils/database');

module.exports = {
    name: 'coinflip',
    description: 'Flip a coin for coins',
    async execute(message, args, client) {
        // Standalone implementation for coinflip
        message.reply('This is the **coinflip** command! (Implementation coming soon in full standalone mode)');
    }
};
