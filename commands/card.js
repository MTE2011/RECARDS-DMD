const { EmbedBuilder } = require('discord.js');
const db = require('../utils/database');

module.exports = {
    name: 'card',
    description: 'View detailed info of a card',
    async execute(message, args) {
        const idInput = args[0];
        if (!idInput) return message.reply('❌ Provide a card ID or Instance ID!');

        const inventory = await db.getInventory(message.author.id);
        const allCards = await db.getCards();
        
        const input = idInput.toLowerCase().trim();

        // 1. Try to find by Instance ID (the unique code in .cards)
        let invCard = inventory.cards.find(c => c.instanceId.toLowerCase() === input);
        
        // 2. If not found, try to find by Card ID (the ID from the spawn message)
        if (!invCard) {
            invCard = inventory.cards.find(c => c.cardId.toLowerCase() === input);
        }

        if (!invCard) {
            return message.reply('❌ Card not found in your collection! Check `.cards` for your IDs.');
        }

        const cardData = allCards.find(d => d.id.toLowerCase() === invCard.cardId.toLowerCase());
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
            .setFooter({ text: `Instance ID: ${invCard.instanceId} | Card ID: ${invCard.cardId}` });

        return message.reply({ embeds: [embed] });
    }
};