const { EmbedBuilder } = require('discord.js');
const db = require('../utils/database');

module.exports = {
    name: 'battle',
    description: 'Fight another user using your cards',
    async execute(message, args, client) {
        const opponent = message.mentions.users.first();
        if (!opponent) return message.reply('Please mention a user to battle!');
        if (opponent.id === message.author.id) return message.reply("You can't battle yourself!");
        if (opponent.bot) return message.reply("You can't battle bots!");

        const userInv = await db.getInventory(message.author.id);
        const oppInv = await db.getInventory(opponent.id);

        if (userInv.cards.length === 0) return message.reply("You don't have any cards to battle with!");
        if (oppInv.cards.length === 0) return message.reply(`${opponent.username} doesn't have any cards to battle with!`);

        const allCards = await db.getCards();

        // Pick strongest card for each
        const getStrongest = (inv) => {
            return inv.cards.map(c => {
                const data = allCards.find(d => d.id === c.cardId);
                return { ...c, ...data, totalPower: (data?.power || 0) + (c.level * 5) };
            }).sort((a, b) => b.totalPower - a.totalPower)[0];
        };

        const userCard = getStrongest(userInv);
        const oppCard = getStrongest(oppInv);

        const embed = new EmbedBuilder()
            .setTitle('⚔️ Card Battle!')
            .setDescription(`**${message.author.username}** vs **${opponent.username}**`)
            .addFields(
                { name: `${message.author.username}'s Card`, value: `${userCard.rarity} ${userCard.name}\nPower: ${userCard.totalPower}`, inline: true },
                { name: `${opponent.username}'s Card`, value: `${oppCard.rarity} ${oppCard.name}\nPower: ${oppCard.totalPower}`, inline: true }
            )
            .setColor('#ff0000');

        let winner, loser, reward = 500;
        if (userCard.totalPower > oppCard.totalPower) {
            winner = message.author;
            loser = opponent;
        } else if (oppCard.totalPower > userCard.totalPower) {
            winner = opponent;
            loser = message.author;
        } else {
            // Tie
            embed.addFields({ name: 'Result', value: "It's a tie! Both get 100 XP." });
            await db.addXP(message.author.id, 100);
            await db.addXP(opponent.id, 100);
            return message.reply({ embeds: [embed] });
        }

        embed.addFields({ name: 'Winner', value: `🏆 **${winner.username}** wins **${reward}** coins and 500 XP!` });
        
        await db.updateBalance(winner.id, reward);
        await db.addXP(winner.id, 500);
        await db.addXP(loser.id, 100);

        message.reply({ embeds: [embed] });
    }
};
