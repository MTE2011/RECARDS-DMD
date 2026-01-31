const db = require('../utils/database');

module.exports = {
    name: 'stats',
    description: 'View your collection stats',
    async execute(message) {
        const inventory = await db.getInventory(message.author.id);
        const favs = inventory.cards.filter(c => c.favorite).length;
        message.reply(`📈 **Stats:**\nTotal Cards: ${inventory.cards.length}\nFavorites: ${favs}\nBattles: 0`);
    }
};