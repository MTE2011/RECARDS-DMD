const { EmbedBuilder } = require('discord.js');
const { User, Card } = require('../../models/schemas');
const { RARITIES } = require('../../utils/constants');

module.exports = {
    name: 'inventory',
    aliases: ['inv'],
    description: 'View your cards or another user\'s inventory',
    async execute(message, args, client) {
        const target = message.mentions.users.first() || message.author;
        const user = await User.findOne({ userId: target.id });

        if (!user || user.inventory.length === 0) {
            return message.reply(`${target.username} has no cards in their inventory.`);
        }

        // Get all card details
        const cardIds = user.inventory.map(i => i.cardId);
        const cards = await Card.find({ id: { $in: cardIds } });
        const cardMap = new Map(cards.map(c => [c.id, c]));

        const inventoryList = user.inventory.map((item, index) => {
            const card = cardMap.get(item.cardId);
            if (!card) return `${index + 1}. Unknown Card (${item.cardId})`;
            const name = item.nickname || card.name;
            const fav = item.isFavorite ? '⭐ ' : '';
            return `\`${card.id}\` ${fav}${RARITIES[card.rarity].emoji} **${name}** (${card.rarity})`;
        }).join('\n');

        const embed = new EmbedBuilder()
            .setTitle(`${target.username}'s Inventory`)
            .setDescription(inventoryList.length > 2048 ? inventoryList.substring(0, 2045) + '...' : inventoryList)
            .setColor(0x00AE86)
            .setFooter({ text: `Total Cards: ${user.inventory.length}` });

        message.channel.send({ embeds: [embed] });
    }
};
