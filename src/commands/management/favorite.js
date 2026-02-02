const { User } = require('../../models/schemas');

module.exports = {
    name: 'favorite',
    aliases: ['fav'],
    description: 'Favorite a card in your inventory',
    async execute(message, args, client) {
        if (!args[0]) return message.reply('Please provide the card ID to favorite.');

        const user = await User.findOne({ userId: message.author.id });
        if (!user) return message.reply('You don\'t have any cards.');

        const cardIndex = user.inventory.findIndex(i => i.cardId === args[0]);
        if (cardIndex === -1) return message.reply('You don\'t own this card.');

        user.inventory[cardIndex].isFavorite = true;
        await user.save();

        message.reply(`Card \`${args[0]}\` has been added to your favorites!`);
    }
};
