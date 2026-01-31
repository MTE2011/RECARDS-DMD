const db = require('../utils/database');

module.exports = {
    name: 'upgrade',
    description: 'Upgrade a card, costing currency',
    async execute(message, args, client) {
        const instanceId = args[0];
        if (!instanceId) return message.reply('Please provide the card ID to upgrade!');

        const inventory = await db.getInventory(message.author.id);
        const card = inventory.cards.find(c => c.instanceId === instanceId);

        if (!card) return message.reply("You don't own a card with that ID!");

        const upgradeCost = card.level * 1000;
        const balance = await db.getBalance(message.author.id);

        if (balance < upgradeCost) {
            return message.reply(`❌ You need **${upgradeCost}** coins to upgrade this card! Your balance: **${balance}**`);
        }

        const allCards = await db.getCards();
        const cardData = allCards.find(c => c.id === card.cardId);

        await db.updateBalance(message.author.id, -upgradeCost);
        card.level += 1;
        await db.saveInventory(inventory);

        message.reply(`🔥 Successfully upgraded **${cardData.name}** to Level **${card.level}**! (Cost: ${upgradeCost} coins)`);
    }
};
