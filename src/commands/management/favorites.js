const { EmbedBuilder } = require('discord.js');
const db = require('../../utils/database');
const { RARITIES } = require('../../utils/constants');

module.exports = {
    name: 'favorites',
    aliases: ['favs'],
    description: 'View your favorite cards',
    async execute(message, args, client) {
        const user = db.getUser(message.author.id);
        const favorites = user.inventory.filter(i => i.isFavorite);
        if (favorites.length === 0) return message.reply('You have no favorite cards.');

        const favList = favorites.map((item) => {
            const card = db.getCard(item.cardId);
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
