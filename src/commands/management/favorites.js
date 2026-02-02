const { EmbedBuilder } = require('discord.js');
const { User, Card } = require('../../models/schemas');
const { RARITIES } = require('../../utils/constants');

module.exports = {
    name: 'favorites',
    aliases: ['favs'],
    description: 'View your favorite cards',
    async execute(message, args, client) {
        const user = await User.findOne({ userId: message.author.id });
        if (!user || user.inventory.length === 0) return message.reply('You have no cards.');

        const favorites = user.inventory.filter(i => i.isFavorite);
        if (favorites.length === 0) return message.reply('You have no favorite cards.');

        const cardIds = favorites.map(i => i.cardId);
        const cards = await Card.find({ id: { $in: cardIds } });
        const cardMap = new Map(cards.map(c => [c.id, c]));

        const favList = favorites.map((item) => {
            const card = cardMap.get(item.cardId);
            if (!card) return `\`${item.cardId}\` Unknown Card`;
            const name = item.nickname || card.name;
            return `\`${card.id}\` ${RARITIES[card.rarity].emoji} **${name}** (${card.rarity})`;
        }).join('\n');

        const embed = new EmbedBuilder()
            .setTitle(`${message.author.username}'s Favorites`)
            .setDescription(favList)
            .setColor(0xFFD700);

        message.channel.send({ embeds: [embed] });
    }
};
