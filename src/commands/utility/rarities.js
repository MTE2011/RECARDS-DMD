const { EmbedBuilder } = require('discord.js');
const { RARITIES } = require('../../utils/constants');

module.exports = {
    name: 'rarities',
    description: 'Rarity explanation and spawn chances',
    async execute(message, args, client) {
        const rarityList = Object.entries(RARITIES)
            .map(([rarity, data]) => `${data.emoji} **${rarity}:** ${data.chance}% chance`)
            .join('\n');

        const embed = new EmbedBuilder()
            .setTitle('Card Rarities & Spawn Chances')
            .setDescription(rarityList)
            .setColor(0x00AE86)
            .setFooter({ text: 'Cards spawn every 5 or 10 minutes.' });

        message.channel.send({ embeds: [embed] });
    }
};
