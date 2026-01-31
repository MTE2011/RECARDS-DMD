const { EmbedBuilder } = require('discord.js');
const db = require('../utils/database');

module.exports = {
    name: 'quest',
    description: 'View your current quests',
    async execute(message, args, client) {
        // Standalone implementation for quest
        message.reply('This is the **quest** command! (Implementation coming soon in full standalone mode)');
    }
};
