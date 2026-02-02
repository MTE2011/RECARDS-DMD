const { User } = require('../../models/schemas');
const { PermissionsBitField } = require('discord.js');

module.exports = {
    name: 'resetinventory',
    description: 'Reset a user\'s inventory',
    async execute(message, args, client) {
        if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator) && message.author.id !== client.config.ownerId) {
            return message.reply('You do not have permission to use this command.');
        }

        const target = message.mentions.users.first();
        if (!target) return message.reply('Please mention a user to reset.');

        const result = await User.deleteOne({ userId: target.id });
        if (result.deletedCount === 0) return message.reply('User has no inventory to reset.');

        message.reply(`Inventory for ${target.username} has been completely reset.`);
    }
};
