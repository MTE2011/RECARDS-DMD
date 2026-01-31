const { EmbedBuilder } = require('discord.js');
const db = require('../utils/database');

module.exports = {
    name: 'card',
    description: 'View detailed info of a card',
    async execute(message, args) {
        const instanceId = args[0];
        if (!instanceId) return message.reply('❌ Provide a card Instance ID! (Check `.cards`)');

        const inventory = await db.getInventory(message.author.id);
        const invCard = inventory.cards.find(c => c.instanceId === instanceId);
        if (!invCard) return message.reply('❌ You do not own a card with that ID!');

        const allCards = await db.getCards();
        const cardData = allCards.find(c => c.id === invCard.cardId);
        if (!cardData) return message.reply('❌ Card data missing from database.');

        const embed = new EmbedBuilder()
            .setTitle(cardData.name)
            .setDescription(cardData.description || 'No description.')
            .addFields(
                { name: 'Rarity', value: cardData.rarity, inline: true },
                { name: 'Level', value: invCard.level.toString(), inline: true },
                { name: 'Power', value: (cardData.power + (invCard.level * 5)).toString(), inline: true }
            )
            .setImage(cardData.image)
            .setColor('#00FF00')
            .setFooter({ text: `ID: ${invCard.instanceId} | Acquired: ${new Date(invCard.acquiredAt).toLocaleDateString()}` });

        message.reply({ embeds: [embed] });
    }
};