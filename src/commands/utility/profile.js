const { EmbedBuilder } = require('discord.js');
const db = require('../../utils/database');
const { RARITIES } = require('../../utils/constants');

module.exports = {
    name: 'profile',
    description: 'Card showcase profile',
    async execute(message, args, client) {
        const user = db.getUser(message.author.id);
        if (!user || user.inventory.length === 0) return message.reply('You have no cards.');

        const favorite = user.inventory.find(i => i.isFavorite) || user.inventory[user.inventory.length - 1];
        const card = db.getCard(favorite.cardId);

        if (!card) return message.reply('Error: Showcase card not found.');

        const embed = new EmbedBuilder()
            .setTitle(`${message.author.username}'s Profile`)
            .addFields(
                { name: 'Total Cards', value: `${user.inventory.length}`, inline: true },
                { name: 'Showcase Card', value: favorite.nickname || card.name, inline: true },
                { name: 'Rarity', value: `${RARITIES[card.rarity].emoji} ${card.rarity}`, inline: true }
            )
            .setImage(card.imageUrl)
            .setColor(RARITIES[card.rarity].color);

        message.channel.send({ embeds: [embed] });
    }
};
