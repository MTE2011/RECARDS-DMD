const { EmbedBuilder } = require('discord.js');
const db = require('../utils/database');

module.exports = {
    name: 'battle',
    description: 'Battle another user',
    async execute(message, args) {
        const opponent = message.mentions.users.first();
        if (!opponent || opponent.bot) return message.reply('❌ Mention a valid user to battle!');
        if (opponent.id === message.author.id) return message.reply('❌ You cannot battle yourself!');

        const userInv = await db.getInventory(message.author.id);
        const oppInv = await db.getInventory(opponent.id);

        if (!userInv.cards.length || !oppInv.cards.length) return message.reply('❌ Both players must have at least one card!');

        const allCards = await db.getCards();
        const getPower = (inv) => {
            const card = inv.cards[Math.floor(Math.random() * inv.cards.length)];
            const data = allCards.find(d => d.id === card.cardId);
            return { name: data.name, power: data.power + (card.level * 5) };
        };

        const p1 = getPower(userInv);
        const p2 = getPower(oppInv);

        const embed = new EmbedBuilder()
            .setTitle('⚔️ Card Battle!')
            .addFields(
                { name: message.author.username, value: `Card: ${p1.name}\nPower: ${p1.power}`, inline: true },
                { name: 'VS', value: '\u200b', inline: true },
                { name: opponent.username, value: `Card: ${p2.name}\nPower: ${p2.power}`, inline: true }
            )
            .setColor('#FF0000');

        if (p1.power > p2.power) {
            embed.setDescription(`🏆 **${message.author.username}** wins!`);
        } else if (p2.power > p1.power) {
            embed.setDescription(`🏆 **${opponent.username}** wins!`);
        } else {
            embed.setDescription("🤝 It's a draw!");
        }

        message.reply({ embeds: [embed] });
    }
};