const db = require('../../utils/database');

module.exports = {
    name: 'unfavorite',
    aliases: ['unfav'],
    description: 'Unfavorite a card in your inventory',
    async execute(message, args, client) {
        if (!args[0]) return message.reply('Please provide the card ID to unfavorite.');

        const user = db.getUser(message.author.id);
        const cardIndex = user.inventory.findIndex(i => i.cardId === args[0]);
        if (cardIndex === -1) return message.reply('You don\'t own this card.');

        user.inventory[cardIndex].isFavorite = false;
        db.updateUser(user);

        message.reply(`Card \`${args[0]}\` has been removed from your favorites.`);
    }
};
