const { EmbedBuilder } = require('discord.js');
const db = require('../utils/database');

module.exports = {
    name: 'cards',
    description: 'View your card collection',
    async execute(message, args) {
        const inventory = await db.getInventory(message.author.id);
        if (!inventory.cards || inventory.cards.length === 0) {
            return message.reply("📭 Your collection is empty! Wait for a card to spawn and use `.collect`. ");
        }

        const allCards = await db.getCards();
        const embed = new EmbedBuilder()
            .setTitle(`🎴 ${message.author.username}'s Collection`)
            .setColor('#0099ff')
            .setFooter({ text: `Total Cards: ${inventory.cards.length}` });

        const list = inventory.cards.slice(0, 10).map((invCard, index) => {
            const cardData = allCards.find(c => c.id === invCard.cardId);
            const name = cardData ? cardData.name : 'Unknown Card';
            const rarity = cardData ? cardData.rarity : '⭐';
            return `**${index + 1}.** ${rarity} ${name} (ID: \`${invCard.instanceId}\`)`;
        }).join('\n');

        embed.setDescription(list + (inventory.cards.length > 10 ? `\n*...and ${inventory.cards.length - 10} more cards.*` : ''));
        message.reply({ embeds: [embed] });
    }
};