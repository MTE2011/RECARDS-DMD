const db = require('../utils/database');

module.exports = {
    name: 'dismantle',
    description: 'Destroy a card for XP',
    async execute(message, args) {
        const id = args[0];
        if (!id) return message.reply('❌ Provide a card Instance ID!');

        const inventory = await db.getInventory(message.author.id);
        const cardIdx = inventory.cards.findIndex(c => c.instanceId === id);
        if (cardIdx === -1) return message.reply('❌ Card not found!');

        const user = await db.getUser(message.author.id);
        inventory.cards.splice(cardIdx, 1);
        user.xp += 50;

        await db.saveInventory(inventory);
        await db.saveUser(user);

        message.reply('♻️ Card dismantled! You gained **50 XP**.');
    }
};