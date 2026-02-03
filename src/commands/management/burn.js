const db = require('../../utils/database');

module.exports = {
    name: 'burn',
    description: 'Permanently remove a card (NO rewards)',
    async execute(message, args, client) {
        if (!args[0]) return message.reply('Please provide the card ID to burn.');

        const user = db.getUser(message.author.id);
        const cardIndex = user.inventory.findIndex(i => i.cardId === args[0]);
        if (cardIndex === -1) return message.reply('You don\'t own this card.');

        user.inventory.splice(cardIndex, 1);
        db.updateUser(user);

        message.reply(`Card \`${args[0]}\` has been permanently burned. No rewards were given.`);
    }
};
