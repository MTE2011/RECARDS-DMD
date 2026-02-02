const { PermissionsBitField } = require('discord.js');

module.exports = {
    name: 'setspawn',
    description: 'Set the current channel as a spawn channel',
    async execute(message, args, client) {
        if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator) && message.author.id !== client.config.ownerId) {
            return message.reply('You do not have permission to use this command.');
        }

        const channelId = message.channel.id;
        if (!client.config.spawnChannels.includes(channelId)) {
            client.config.spawnChannels.push(channelId);
            message.reply(`Channel <#${channelId}> has been added to spawn channels.`);
        } else {
            message.reply('This channel is already a spawn channel.');
        }
    }
};
