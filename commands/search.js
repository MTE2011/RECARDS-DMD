const { EmbedBuilder } = require('discord.js');
const db = require('../utils/database');

module.exports = {
    name: 'search',
    description: 'Search for a card in the database',
    async execute(message, args) {
        const query = args.join(' ').toLowerCase();
        if (!query) return message.reply('❌ Enter a card name to search!');

        const allCards = await db.getCards();
        const results = allCards.filter(c => c.name.toLowerCase().includes(query)).slice(0, 10);

        if (results.length === 0) return message.reply('❌ No cards found matching that name.');

        const embed = new EmbedBuilder()
            .setTitle('🔍 Search Results')
            .setDescription(results.map(r => `**${r.name}** (ID: \`${r.id}\`)`).join('\n'))
            .setColor('#00FFFF');

        message.reply({ embeds: [embed] });
    }
};