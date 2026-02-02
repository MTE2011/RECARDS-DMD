const { User } = require('../../models/schemas');

module.exports = {
    name: 'rename',
    description: 'Give a custom nickname to a card',
    async execute(message, args, client) {
        const cardId = args[0];
        const nickname = args.slice(1).join(' ');

        if (!cardId || !nickname) return message.reply('Usage: `.rename <card_id> <nickname>`');

        const user = await User.findOne({ userId: message.author.id });
        if (!user) return message.reply('You don\'t have any cards.');

        const cardIndex = user.inventory.findIndex(i => i.cardId === cardId);
        if (cardIndex === -1) return message.reply('You don\'t own this card.');

        user.inventory[cardIndex].nickname = nickname;
        await user.save();

        message.reply(`Card \`${cardId}\` has been renamed to **${nickname}**!`);
    }
};
