const { EmbedBuilder } = require('discord.js');
const db = require('../../utils/database');
const { RARITIES } = require('../../utils/constants');

module.exports = {
    name: 'claim',
    description: 'Claim the spawned card',
    async execute(message, args, client) {
        const spawn = client.activeSpawns.get(message.channel.id);
        if (!spawn) return message.reply('There is no active card to claim in this channel!');

        client.activeSpawns.delete(message.channel.id);

        const user = db.getUser(message.author.id);
        user.inventory.push({
            cardId: spawn.card.id,
            obtainedAt: new Date()
        });

        db.updateUser(user);

        const embed = new EmbedBuilder()
            .setTitle('Card Claimed!')
            .setDescription(`Congratulations ${message.author}! You claimed **${spawn.card.name}**!`)
            .addFields(
                { name: 'Rarity', value: `${RARITIES[spawn.card.rarity].emoji} ${spawn.card.rarity}`, inline: true },
                { name: 'ID', value: spawn.card.id, inline: true }
            )
            .setImage(spawn.card.imageUrl)
            .setColor(RARITIES[spawn.card.rarity].color);

        message.channel.send({ embeds: [embed] });
    }
};
