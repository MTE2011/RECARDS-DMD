const { EmbedBuilder } = require('discord.js');
const db = require('../../utils/database');

module.exports = {
    name: 'leaderboard',
    aliases: ['lb'],
    description: 'Top collectors (count only)',
    async execute(message, args, client) {
        const allUsers = db.getAllUsers();
        const topUsers = allUsers
            .map(u => ({ userId: u.userId, cardCount: u.inventory.length }))
            .sort((a, b) => b.cardCount - a.cardCount)
            .slice(0, 10);

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
