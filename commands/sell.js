const db = require('../utils/database');

module.exports = {
    name: 'sell',
    description: 'Sell a card for currency',
    async execute(message, args, client) {
        const instanceId = args[0];
        if (!instanceId) return message.reply('Please provide the card ID to sell! (Use `.cards` to find the ID)');

        const inventory = await db.getInventory(message.author.id);
        const cardIndex = inventory.cards.findIndex(c => c.instanceId === instanceId);

        if (cardIndex === -1) {
            return message.reply("You don't own a card with that ID!");
        }

        const invCard = inventory.cards[cardIndex];
        const allCards = await db.getCards();
        const cardData = allCards.find(c => c.id === invCard.cardId);

        if (!cardData) return message.reply('Error: Card data not found.');

        // Calculate sell price based on rarity
        let price = 100; // Common
        if (cardData.rarity.includes('Rare')) price = 500;
        if (cardData.rarity.includes('Epic')) price = 2000;
        if (cardData.rarity.includes('Legendary')) price = 10000;
        if (cardData.rarity.includes('Mythic')) price = 50000;

        // Bonus for level
        price += (invCard.level - 1) * 500;

        // Update external economy
        const success = await db.updateBalance(message.author.id, price);
        if (!success) {
            return message.reply('Error: Could not connect to the external economy. Make sure you have a profile!');
        }

        // Remove card from inventory
        inventory.cards.splice(cardIndex, 1);
        await db.saveInventory(inventory);

        message.reply(`💰 You sold **${cardData.name}** for **${price}** coins!`);
    }
};
