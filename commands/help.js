const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'help',
    description: 'Show all commands and how to play',
    async execute(message, args, client) {
        const embed = new EmbedBuilder()
            .setTitle('🎴 Cards Bot - Help Menu')
            .setDescription('Welcome to the Card Collecting Game! Here is how to play and all available commands.')
            .addFields(
                { name: '📖 How to Play', value: '1. Wait for a card to spawn in the channel.\n2. Type `.claim` to grab it (first person wins!).\n3. View your collection with `.cards`.\n4. Battle others with `.battle @user` to earn coins and XP!' },
                { name: '📌 Collection & Actions', value: '`.cards` - View your collection\n`.card <id>` - View detailed card info\n`.claim` - Claim a spawned card\n`.sell <id>` - Sell a card for coins\n`.upgrade <id>` - Level up a card' },
                { name: '⚔️ Games & Social', value: '`.battle @user` - Fight another player\n`.trade @user <id>` - Propose a trade\n`.fav <id>` - Favorite a card' },
                { name: '🛡️ Admin', value: '`.forcespawn` - Force a card spawn\n`.givecard @user <cardId>` - Give a card' }
            )
            .setColor('#00FF00')
            .setFooter({ text: 'Cards Bot x REZERO-MD Integration' });

        message.reply({ embeds: [embed] });
    }
};
