const { EmbedBuilder } = require('discord.js');
const db = require('../utils/database');

module.exports = {
    name: 'gleave',
    description: 'Leave your current guild',
    async execute(message, args, client) {
        // Standalone implementation for gleave
        message.reply('This is the **gleave** command! (Implementation coming soon in full standalone mode)');
    }
};
