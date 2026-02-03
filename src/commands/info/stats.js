const { EmbedBuilder } = require('discord.js');
const db = require('../../utils/database');
const { RARITIES } = require('../../utils/constants');

module.exports = {
    name: 'stats',
    description: 'View your card statistics',
    async execute(message, args, client) {
        const user = db.getUser(message.author.id);
        if (!user || user.inventory.length === 0) return message.reply('You have no cards.');

        const rarityCounts = {};
        Object.keys(RARITIES).forEach(r => rarityCounts[r] = 0);
        
        user.inventory.forEach(item => {
            const card = db.getCard(item.cardId);
            if (card) rarityCounts[card.rarity]++;
        });

        const statsList = Object.entries(rarityCounts)
            .map(([rarity, count]) => `${RARITIES[rarity].emoji} **${rarity}:** ${count}`)
            .join('\n');

        const embed = new EmbedBuilder()
            .setTitle(`${message.author.username}'s Stats`)
            .addFields(
                { name: 'Total Cards Owned', value: `${user.inventory.length}`, inline: false },
                { name: 'Rarity Breakdown', value: statsList, inline: false }
            )
            .setColor(0x00AE86);

        message.channel.send({ embeds: [embed] });
    }
};
