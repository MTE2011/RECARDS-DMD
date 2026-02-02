const { EmbedBuilder } = require('discord.js');
const { User } = require('../../models/schemas');
const { RARITIES } = require('../../utils/constants');

module.exports = {
    name: 'claim',
    description: 'Claim the spawned card',
    async execute(message, args, client) {
        const spawn = client.activeSpawns.get(message.channel.id);
        if (!spawn) return message.reply('There is no active card to claim in this channel!');

        client.activeSpawns.delete(message.channel.id);

        let user = await User.findOne({ userId: message.author.id });
        if (!user) {
            user = new User({ userId: message.author.id, inventory: [] });
        }

        user.inventory.push({
            cardId: spawn.card.id,
            obtainedAt: new Date()
        });

        await user.save();

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
