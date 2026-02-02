const { EmbedBuilder } = require('discord.js');
const { User } = require('../../models/schemas');

module.exports = {
    name: 'leaderboard',
    aliases: ['lb'],
    description: 'Top collectors (count only)',
    async execute(message, args, client) {
        const topUsers = await User.aggregate([
            { $project: { userId: 1, cardCount: { $size: "$inventory" } } },
            { $sort: { cardCount: -1 } },
            { $limit: 10 }
        ]);

        if (topUsers.length === 0) return message.reply('No collectors found.');

        const lbList = topUsers.map((u, i) => {
            return `**${i + 1}.** <@${u.userId}> — ${u.cardCount} cards`;
        }).join('\n');

        const embed = new EmbedBuilder()
            .setTitle('Top Collectors Leaderboard')
            .setDescription(lbList)
            .setColor(0xFFD700);

        message.channel.send({ embeds: [embed] });
    }
};
