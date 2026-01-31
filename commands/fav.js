const db = require('../utils/database');

module.exports = {
    name: 'fav',
    description: 'Favorite/Unfavorite a card',
    async execute(message, args) {
        const id = args[0];
        if (!id) return message.reply('❌ Provide a card Instance ID!');

        const inventory = await db.getInventory(message.author.id);
        const card = inventory.cards.find(c => c.instanceId === id);
        if (!card) return message.reply('❌ Card not found in your collection!');

        card.favorite = !card.favorite;
        await db.saveInventory(inventory);
        message.reply(card.favorite ? '❤️ Card added to favorites!' : '💔 Card removed from favorites!');
    }
};