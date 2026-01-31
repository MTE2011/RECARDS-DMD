const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'guide',
    description: 'How to play the game',
    execute(message) {
        const embed = new EmbedBuilder()
            .setTitle('📖 How to Play')
            .setDescription('1. **Collect**: Wait for a card spawn and type `.collect <ID>`.\n2. **XP**: Get XP from `.daily` or `.dismantle`.\n3. **Upgrade**: Use XP to `.upgrade <InstanceID>`.\n4. **Battle**: Challenge others with `.battle @user`.')
            .setColor('#FFD700');
        message.reply({ embeds: [embed] });
    }
};