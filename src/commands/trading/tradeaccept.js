const { User } = require('../../models/schemas');

module.exports = {
    name: 'tradeaccept',
    description: 'Accept a pending trade',
    async execute(message, args, client) {
        const trade = client.trades ? client.trades.get(message.author.id) : null;

        if (!trade || trade.expiresAt < Date.now()) {
            return message.reply('You have no pending trade requests.');
        }

        const proposer = await User.findOne({ userId: trade.proposerId });
        const target = await User.findOne({ userId: message.author.id });

        const proposerCardIndex = proposer.inventory.findIndex(i => i.cardId === trade.proposerCardId);
        const targetCardIndex = target.inventory.findIndex(i => i.cardId === trade.targetCardId);

        if (proposerCardIndex === -1 || targetCardIndex === -1) {
            client.trades.delete(message.author.id);
            return message.reply('One of the cards is no longer in the inventory. Trade cancelled.');
        }

        // Perform the swap
        const proposerCard = proposer.inventory.splice(proposerCardIndex, 1)[0];
        const targetCard = target.inventory.splice(targetCardIndex, 1)[0];

        proposer.inventory.push({ ...targetCard, obtainedAt: new Date() });
        target.inventory.push({ ...proposerCard, obtainedAt: new Date() });

        await proposer.save();
        await target.save();

        client.trades.delete(message.author.id);

        message.reply(`Trade successful! You swapped \`${trade.targetCardId}\` for \`${trade.proposerCardId}\` with <@${trade.proposerId}>.`);
    }
};
