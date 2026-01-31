const db = require('../utils/database');

module.exports = {
    name: 'givecard',
    description: 'Give a card to a user (Admin)',
    async execute(message, args) {
        if (message.author.id !== process.env.OWNER_ID) return message.reply('❌ Admin only!');
        const target = message.mentions.users.first();
        const cardId = args[1];
        if (!target || !cardId) return message.reply('Usage: .givecard @user <cardId>');

        const inventory = await db.getInventory(target.id);
        inventory.cards.push({
            instanceId: Math.random().toString(36).substr(2, 9).toUpperCase(),
            cardId: cardId,
            level: 1,
            favorite: false,
            acquiredAt: new Date().toISOString()
        });
        await db.saveInventory(inventory);
        message.reply(`✅ Gave card ${cardId} to ${target.username}!`);
    }
};