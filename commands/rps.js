const { EmbedBuilder } = require('discord.js');
const db = require('../utils/database');

module.exports = {
    name: 'rps',
    description: 'Play Rock Paper Scissors',
    async execute(message, args, client) {
        // Standalone implementation for rps
        message.reply('This is the **rps** command! (Implementation coming soon in full standalone mode)');
    }
};
