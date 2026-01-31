const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'help',
    description: 'List all commands',
    execute(message, args, client) {
        const embed = new EmbedBuilder()
            .setTitle('📜 Command List')
            .setDescription(client.commands.map(c => `\`${c.name}\``).join(', '))
            .setColor('#00FF00')
            .setFooter({ text: 'Type .guide for a tutorial!' });
        message.reply({ embeds: [embed] });
    }
};