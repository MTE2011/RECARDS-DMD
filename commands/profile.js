const { EmbedBuilder } = require('discord.js');
const db = require('../utils/database');

module.exports = {
    name: 'profile',
    description: 'View your card master profile',
    async execute(message) {
        const user = await db.getUser(message.author.id);
        const inventory = await db.getInventory(message.author.id);
        
        const embed = new EmbedBuilder()
            .setTitle(`👤 ${message.author.username}'s Profile`)
            .setThumbnail(message.author.displayAvatarURL())
            .addFields(
                { name: 'Level', value: user.level.toString(), inline: true },
                { name: 'XP', value: `${user.xp}/1000`, inline: true },
                { name: 'Cards Owned', value: inventory.cards.length.toString(), inline: true }
            )
            .setColor('#FFD700');

        message.reply({ embeds: [embed] });
    }
};