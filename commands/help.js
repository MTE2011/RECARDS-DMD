const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'help',
    description: 'Show all commands categorized by type',
    async execute(message, args, client) {
        const prefix = process.env.PREFIX || '.';
        const category = args[0]?.toLowerCase();

        const categories = {
            cards: {
                title: '🎴 Card Commands',
                cmds: ['cards', 'card', 'collect', 'inventory', 'fav', 'search', 'rarities', 'types', 'sets', 'topcards', 'recent', 'history']
            },
            economy: {
                title: '💰 Economy & Games',
                cmds: ['profile', 'daily', 'bal', 'leaderboard', 'work', 'crime', 'rob', 'fish', 'hunt', 'dig', 'gamble', 'slots', 'coinflip', 'rps', 'dice', 'shop', 'buy', 'gift', 'market', 'list', 'delist']
            },
            social: {
                title: '🤝 Social & Guilds',
                cmds: ['trade', 'battle', 'guild', 'gcreate', 'ginvite', 'gjoin', 'gleave', 'gkick', 'gpromote', 'gdemote', 'gdeposit', 'gwithdraw', 'gshop', 'gupgrade']
            },
            progression: {
                title: '📈 Progression & Quests',
                cmds: ['stats', 'achievements', 'badges', 'titles', 'settitle', 'setbio', 'setcolor', 'backgrounds', 'setbg', 'quest', 'dailyquest', 'weeklyquest', 'event', 'season', 'pass', 'upgrade', 'fuse', 'dismantle', 'craft']
            },
            utility: {
                title: '⚙️ Utility & Admin',
                cmds: ['ping', 'uptime', 'info', 'invite', 'support', 'vote', 'settings', 'notifications', 'prefix', 'setspawn', 'forcespawn', 'givecard', 'clear', 'kick', 'ban', 'unban', 'warn', 'warnings', 'clearwarns']
            }
        };

        if (!category || !categories[category]) {
            const embed = new EmbedBuilder()
                .setTitle('🎴 Cards Bot - Main Menu')
                .setDescription(`Use \`${prefix}help <category>\` to see commands in a specific category.\nUse \`${prefix}guide\` for a detailed tutorial on how to play!`)
                .addFields(
                    { name: '🎴 Cards', value: `\`${prefix}help cards\``, inline: true },
                    { name: '💰 Economy', value: `\`${prefix}help economy\``, inline: true },
                    { name: '🤝 Social', value: `\`${prefix}help social\``, inline: true },
                    { name: '📈 Progression', value: `\`${prefix}help progression\``, inline: true },
                    { name: '⚙️ Utility', value: `\`${prefix}help utility\``, inline: true }
                )
                .setColor('#00FF00')
                .setFooter({ text: `Total Commands: ${client.commands.size}` });

            return message.reply({ embeds: [embed] });
        }

        const cat = categories[category];
        const embed = new EmbedBuilder()
            .setTitle(cat.title)
            .setDescription(cat.cmds.map(c => `\`${prefix}${c}\``).join(', '))
            .setColor('#0099ff')
            .setFooter({ text: `Type ${prefix}guide to learn how to use these!` });

        message.reply({ embeds: [embed] });
    }
};
