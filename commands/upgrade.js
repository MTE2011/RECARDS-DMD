const db = require('../utils/database');

module.exports = {
    name: 'upgrade',
    description: 'Level up a card using XP',
    async execute(message, args) {
        const id = args[0];
        if (!id) return message.reply('❌ Provide a card Instance ID!');

        const user = await db.getUser(message.author.id);
        const inventory = await db.getInventory(message.author.id);
        const card = inventory.cards.find(c => c.instanceId === id);
        if (!card) return message.reply('❌ Card not found!');

        const cost = card.level * 100;
        if (user.xp < cost) return message.reply(`❌ You need ${cost} XP to upgrade this card! (You have ${user.xp} XP)`);

        user.xp -= cost;
        card.level++;
        await db.saveUser(user);
        await db.saveInventory(inventory);

        message.reply(`🔥 Success! Card upgraded to **Level ${card.level}**! Spent ${cost} XP.`);
    }
};