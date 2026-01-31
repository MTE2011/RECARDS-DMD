const db = require('../utils/database');

module.exports = {
    name: 'fav',
    description: 'Mark a card as favorite',
    async execute(message, args, client) {
        const instanceId = args[0];
        if (!instanceId) return message.reply('Please provide the card ID to favorite!');

        const inventory = await db.getInventory(message.author.id);
        const card = inventory.cards.find(c => c.instanceId === instanceId);

        if (!card) return message.reply("You don't own a card with that ID!");

        card.favorite = !card.favorite;
        await db.saveInventory(inventory);

        message.reply(`✅ **${card.favorite ? 'Favorited' : 'Unfavorited'}** the card!`);
    }
};
