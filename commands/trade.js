const db = require('../utils/database');

module.exports = {
    name: 'trade',
    description: 'Gift a card to another user',
    async execute(message, args) {
        const target = message.mentions.users.first();
        const instanceId = args[1];
        if (!target || !instanceId) return message.reply('❌ Usage: `.trade @user <instanceId>`');

        const senderInv = await db.getInventory(message.author.id);
        const cardIdx = senderInv.cards.findIndex(c => c.instanceId === instanceId);
        if (cardIdx === -1) return message.reply('❌ You do not own that card!');

        const receiverInv = await db.getInventory(target.id);
        const [card] = senderInv.cards.splice(cardIdx, 1);
        receiverInv.cards.push(card);

        await db.saveInventory(senderInv);
        await db.saveInventory(receiverInv);

        message.reply(`🤝 Successfully traded card to **${target.username}**!`);
    }
};