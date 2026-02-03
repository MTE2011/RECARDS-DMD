const { EmbedBuilder } = require('discord.js');
const db = require('../../utils/database');
const { RARITIES } = require('../../utils/constants');

module.exports = {
    name: 'card',
    description: 'View card info',
    async execute(message, args, client) {
        if (!args[0]) return message.reply('Please provide a card ID.');

        const card = db.getCard(args[0]);
        if (!card) return message.reply('Card not found.');

        const embed = new EmbedBuilder()
            .setTitle(card.name)
            .setDescription(card.description)
            .addFields(
                { name: 'Rarity', value: `${RARITIES[card.rarity].emoji} ${card.rarity}`, inline: true },
                { name: 'ID', value: card.id, inline: true }
            )
            .setImage(card.imageUrl)
            .setColor(RARITIES[card.rarity].color);

        message.channel.send({ embeds: [embed] });
    }
};
