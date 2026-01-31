const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'help',
    description: 'Show all 50 card-focused commands',
    async execute(message, args, client) {
        const prefix = process.env.PREFIX || '.';
        const category = args[0]?.toLowerCase();

        const categories = {
            collection: {
                title: '🎴 Collection & Info',
                cmds: ['cards', 'card', 'collect', 'inventory', 'fav', 'search', 'rarities', 'types', 'recent', 'favorites', 'count', 'dex']
            },
            social: {
                title: '🤝 Social & Trading',
                cmds: ['trade', 'accept', 'decline', 'giftcard', 'battle', 'profile', 'leaderboard', 'stats']
            },
            actions: {
                title: '🔥 Card Actions',
                cmds: ['upgrade', 'fuse', 'dismantle', 'rename', 'lock', 'unlock', 'burn', 'protect', 'unprotect', 'showcase']
            },
            utility: {
                title: '⚙️ Utility & Fun',
                cmds: ['ping', 'uptime', 'info', 'invite', 'support', 'help', 'guide', 'daily', 'work', 'top']
            },
            admin: {
                title: '🛡️ Admin & Owner',
                cmds: ['forcespawn', 'givecard', 'setspawn', 'clear', 'kick', 'ban', 'unban', 'warn', 'reload', 'shutdown']
            }
        };

        if (!category || !categories[category]) {
            const embed = new EmbedBuilder()
                .setTitle('🎴 Cards Bot - Help Menu')
                .setDescription(`Use \`${prefix}help <category>\` to see commands.\nCategories: \`collection\`, \`social\`, \`actions\`, \`utility\`, \`admin\``)
                .setColor('#00FF00')
                .setFooter({ text: 'Total: 50 Card-Focused Commands' });

            return message.reply({ embeds: [embed] });
        }

        const cat = categories[category];
        const embed = new EmbedBuilder()
            .setTitle(cat.title)
            .setDescription(cat.cmds.map(c => `\`${prefix}${c}\``).join(', '))
            .setColor('#0099ff');

        message.reply({ embeds: [embed] });
    }
};
