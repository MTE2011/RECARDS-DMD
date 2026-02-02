const { EmbedBuilder } = require('discord.js');
const { User, Card } = require('../../models/schemas');
const { RARITIES } = require('../../utils/constants');

module.exports = {
    name: 'stats',
    description: 'View your card statistics',
    async execute(message, args, client) {
        const user = await User.findOne({ userId: message.author.id });
        if (!user || user.inventory.length === 0) return message.reply('You have no cards.');

        const cardIds = user.inventory.map(i => i.cardId);
        const cards = await Card.find({ id: { $in: cardIds } });
        
        const rarityCounts = {};
        Object.keys(RARITIES).forEach(r => rarityCounts[r] = 0);
        
        cards.forEach(card => {
            rarityCounts[card.rarity]++;
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
