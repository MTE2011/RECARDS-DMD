const { EmbedBuilder } = require('discord.js');
const db = require('../utils/database');

module.exports = {
    name: 'cards',
    description: 'View all cards owned by the user',
    async execute(message, args, client) {
        const inventory = await db.getInventory(message.author.id);
        const allCards = await db.getCards();

        if (inventory.cards.length === 0) {
            return message.reply("You don't own any cards yet! Wait for a spawn or trade with someone.");
        }

        const embed = new EmbedBuilder()
            .setTitle(`🎴 ${message.author.username}'s Collection`)
            .setColor('#0099ff');

        let description = '';
        inventory.cards.slice(0, 10).forEach((invCard, index) => {
            const cardData = allCards.find(c => c.id === invCard.cardId);
            if (cardData) {
                description += `**${index + 1}.** ${cardData.rarity} ${cardData.name} (ID: \`${invCard.instanceId}\`)\n`;
            }
        });

        if (inventory.cards.length > 10) {
            description += `\n*...and ${inventory.cards.length - 10} more cards.*`;
        }

        embed.setDescription(description || 'No cards found.');
        embed.setFooter({ text: `Total Cards: ${inventory.cards.length}` });

        message.reply({ embeds: [embed] });
    }
};
