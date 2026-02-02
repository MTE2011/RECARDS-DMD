const { PermissionsBitField } = require('discord.js');

module.exports = {
    name: 'forcespawn',
    description: 'Force a card spawn in the current channel',
    async execute(message, args, client) {
        if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator) && message.author.id !== client.config.ownerId) {
            return message.reply('You do not have permission to use this command.');
        }

        await client.spawnCard(message.channel.id);
        message.reply('Forcing a card spawn...');
    }
};
