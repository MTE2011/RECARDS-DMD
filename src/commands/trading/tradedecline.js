module.exports = {
    name: 'tradedecline',
    description: 'Decline a pending trade',
    async execute(message, args, client) {
        if (!client.trades || !client.trades.has(message.author.id)) {
            return message.reply('You have no pending trade requests.');
        }

        client.trades.delete(message.author.id);
        message.reply('Trade request declined.');
    }
};
