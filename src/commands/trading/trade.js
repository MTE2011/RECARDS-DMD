const { EmbedBuilder } = require('discord.js');
const { User, Card } = require('../../models/schemas');

module.exports = {
    name: 'trade',
    description: 'Propose a trade with another user',
    async execute(message, args, client) {
        const target = message.mentions.users.first();
        const yourCardId = args[1];
        const theirCardId = args[2];

        if (!target || !yourCardId || !theirCardId) {
            return message.reply('Usage: `.trade @user <your_card_id> <their_card_id>`');
        }

        if (target.id === message.author.id) return message.reply('You cannot trade with yourself.');

        const user = await User.findOne({ userId: message.author.id });
        const targetUser = await User.findOne({ userId: target.id });

        if (!user || !user.inventory.some(i => i.cardId === yourCardId)) {
            return message.reply(`You don't own card \`${yourCardId}\`.`);
        }

        if (!targetUser || !targetUser.inventory.some(i => i.cardId === theirCardId)) {
            return message.reply(`${target.username} doesn't own card \`${theirCardId}\`.`);
        }

        // Initialize trades map if not exists
        if (!client.trades) client.trades = new Map();

        client.trades.set(target.id, {
            proposerId: message.author.id,
            proposerCardId: yourCardId,
            targetCardId: theirCardId,
            expiresAt: Date.now() + 300000 // 5 minutes
        });

        const embed = new EmbedBuilder()
            .setTitle('Trade Proposal')
            .setDescription(`${message.author} wants to trade with ${target}!\n\n**Offering:** \`${yourCardId}\`\n**Requesting:** \`${theirCardId}\`\n\nType \`.tradeaccept\` to accept or \`.tradedecline\` to decline.`)
            .setColor(0xFFFF00)
            .setFooter({ text: 'Expires in 5 minutes' });

        message.channel.send({ content: `${target}`, embeds: [embed] });
    }
};
