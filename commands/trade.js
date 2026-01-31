const db = require('../utils/database');

const activeTrades = new Map();

module.exports = {
    name: 'trade',
    description: 'Propose or accept a trade',
    async execute(message, args, client) {
        const subCommand = args[0];

        if (subCommand === 'accept') {
            const trade = activeTrades.get(message.author.id);
            if (!trade) return message.reply('You have no pending trades!');

            const senderInv = await db.getInventory(trade.senderId);
            const receiverInv = await db.getInventory(message.author.id);

            const cardIndex = senderInv.cards.findIndex(c => c.instanceId === trade.cardId);
            if (cardIndex === -1) {
                activeTrades.delete(message.author.id);
                return message.reply('The trade is no longer valid (sender no longer has the card).');
            }

            const [card] = senderInv.cards.splice(cardIndex, 1);
            receiverInv.cards.push(card);

            await db.saveInventory(senderInv);
            await db.saveInventory(receiverInv);

            activeTrades.delete(message.author.id);
            return message.reply(`✅ Trade accepted! You received the card from <@${trade.senderId}>.`);
        }

        if (subCommand === 'decline') {
            if (activeTrades.has(message.author.id)) {
                activeTrades.delete(message.author.id);
                return message.reply('Trade declined.');
            }
            return message.reply('You have no pending trades!');
        }

        // Propose trade
        const target = message.mentions.users.first();
        const cardId = args[1];

        if (!target || !cardId) {
            return message.reply('Usage: `.trade @user <cardId>`');
        }

        const senderInv = await db.getInventory(message.author.id);
        const card = senderInv.cards.find(c => c.instanceId === cardId);

        if (!card) return message.reply("You don't own that card!");

        activeTrades.set(target.id, {
            senderId: message.author.id,
            cardId: cardId
        });

        message.reply(`🤝 <@${target.id}>, **${message.author.username}** wants to trade a card with you! Type \`.trade accept\` or \`.trade decline\`.`);
    }
};
