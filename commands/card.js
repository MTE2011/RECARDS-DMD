const { EmbedBuilder } = require('discord.js');
const db = require('../utils/database');

module.exports = {
    name: 'card',
    description: 'View detailed info about a specific card',
    async execute(message, args, client) {
        const instanceId = args[0];
        if (!instanceId) return message.reply('Please provide the card ID! (Use `.cards` to find it)');

        const inventory = await db.getInventory(message.author.id);
        const invCard = inventory.cards.find(c => c.instanceId === instanceId);

        if (!invCard) return message.reply("You don't own a card with that ID!");

        const allCards = await db.getCards();
        const cardData = allCards.find(c => c.id === invCard.cardId);

        if (!cardData) return message.reply('Error: Card data not found.');

        const totalPower = cardData.power + (invCard.level * 5);

        const embed = new EmbedBuilder()
            .setTitle(cardData.name)
            .setDescription(cardData.description)
            .addFields(
                { name: 'Rarity', value: cardData.rarity, inline: true },
                { name: 'Type', value: cardData.type, inline: true },
                { name: 'Level', value: invCard.level.toString(), inline: true },
                { name: 'Power', value: totalPower.toString(), inline: true },
                { name: 'Source', value: cardData.source, inline: true },
                { name: 'Favorite', value: invCard.favorite ? '❤️ Yes' : 'No', inline: true }
            )
            .setImage(cardData.image)
            .setColor('#0099ff')
            .setFooter({ text: `Instance ID: ${invCard.instanceId}` });

        message.reply({ embeds: [embed] });
    }
};
