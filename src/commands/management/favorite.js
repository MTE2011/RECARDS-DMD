const db = require('../../utils/database');

module.exports = {
    name: 'favorite',
    aliases: ['fav'],
    description: 'Favorite a card in your inventory',
    async execute(message, args, client) {
        if (!args[0]) return message.reply('Please provide the card ID to favorite.');

        const user = db.getUser(message.author.id);
        const cardIndex = user.inventory.findIndex(i => i.cardId === args[0]);
        if (cardIndex === -1) return message.reply('You don\'t own this card.');

        user.inventory[cardIndex].isFavorite = true;
        db.updateUser(user);

        message.reply(`Card \`${args[0]}\` has been added to your favorites!`);
    }
};
