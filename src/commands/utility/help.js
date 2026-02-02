const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'help',
    description: 'Auto-generated help menu',
    async execute(message, args, client) {
        const categories = {};
        
        client.commands.forEach(cmd => {
            // Simple way to categorize based on folder structure if we had it in memory, 
            // but here we'll just list all commands.
            const category = 'General'; // Default
            if (!categories[category]) categories[category] = [];
            categories[category].push(`\`${cmd.name}\``);
        });

        const embed = new EmbedBuilder()
            .setTitle('Bot Commands')
            .setDescription(`Prefix: \`${client.config.prefix}\``)
            .setColor(0x00AE86);

        for (const [category, cmds] of Object.entries(categories)) {
            embed.addFields({ name: category, value: cmds.join(', ') });
        }

        message.channel.send({ embeds: [embed] });
    }
};
