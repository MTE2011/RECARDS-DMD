const { User } = require('../../models/schemas');

module.exports = {
    name: 'burn',
    description: 'Permanently remove a card (NO rewards)',
    async execute(message, args, client) {
        if (!args[0]) return message.reply('Please provide the card ID to burn.');

        const user = await User.findOne({ userId: message.author.id });
        if (!user) return message.reply('You don\'t have any cards.');

        const cardIndex = user.inventory.findIndex(i => i.cardId === args[0]);
        if (cardIndex === -1) return message.reply('You don\'t own this card.');

        user.inventory.splice(cardIndex, 1);
        await user.save();

        message.reply(`Card \`${args[0]}\` has been permanently burned. No rewards were given.`);
    }
};
