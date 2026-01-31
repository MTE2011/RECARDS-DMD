const db = require('../utils/database');

module.exports = {
    name: 'dex',
    description: 'View your collection progress',
    async execute(message) {
        const inventory = await db.getInventory(message.author.id);
        const allCards = await db.getCards();
        const uniqueOwned = new Set(inventory.cards.map(c => c.cardId)).size;
        const percent = ((uniqueOwned / allCards.length) * 100).toFixed(1);

        message.reply(`📊 **Collection Progress:** ${uniqueOwned}/${allCards.length} unique cards (${percent}%)`);
    }
};