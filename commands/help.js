const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'help',
    description: 'Show all card-focused commands',
    async execute(message, args, client) {
        const prefix = process.env.PREFIX || '.';
        const category = args[0]?.toLowerCase();

        const categories = {
            collection: {
                title: '🎴 Collection & Info',
                cmds: ['cards', 'card', 'collect', 'fav', 'search', 'rarities', 'dex', 'stats']
            },
            social: {
                title: '🤝 Social & Trading',
                cmds: ['trade', 'battle', 'profile', 'top']
            },
            actions: {
                title: '🔥 Card Actions',
                cmds: ['upgrade', 'dismantle']
            },
            utility: {
                title: '⚙️ Utility & Fun',
                cmds: ['ping', 'help', 'guide', 'daily']
            },
            admin: {
                title: '🛡️ Admin & Owner',
                cmds: ['forcespawn', 'givecard']
            }
        };

        if (!category || !categories[category]) {
            const embed = new EmbedBuilder()
                .setTitle('🎴 Cards Bot - Help Menu')
                .setDescription(`Use \`${prefix}help <category>\` to see commands.\nCategories: \`collection\`, \`social\`, \`actions\`, \`utility\`, \`admin\``)
                .setColor('#00FF00')
                .setFooter({ text: `Total: ${client.commands.size} Card-Focused Commands` });

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
