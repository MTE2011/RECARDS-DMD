const { EmbedBuilder } = require('discord.js');
const { User, Card } = require('../../models/schemas');

module.exports = {
    name: 'collection',
    description: 'View your collection progress',
    async execute(message, args, client) {
        const user = await User.findOne({ userId: message.author.id });
        const totalCards = await Card.countDocuments();
        
        if (totalCards === 0) return message.reply('No cards exist in the system yet.');

        const userCardIds = user ? [...new Set(user.inventory.map(i => i.cardId))] : [];
        const ownedCount = userCardIds.length;
        const percentage = ((ownedCount / totalCards) * 100).toFixed(2);

        const embed = new EmbedBuilder()
            .setTitle(`${message.author.username}'s Collection Progress`)
            .setDescription(`You have collected **${ownedCount}** out of **${totalCards}** unique cards.`)
            .addFields({ name: 'Completion', value: `**${percentage}%**` })
            .setColor(0x00AE86);

        message.channel.send({ embeds: [embed] });
    }
};
