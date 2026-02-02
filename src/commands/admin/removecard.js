const { Card } = require('../../models/schemas');
const { PermissionsBitField } = require('discord.js');

module.exports = {
    name: 'removecard',
    description: 'Remove a card from the system',
    async execute(message, args, client) {
        if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator) && message.author.id !== client.config.ownerId) {
            return message.reply('You do not have permission to use this command.');
        }

        const id = args[0];
        if (!id) return message.reply('Please provide the card ID to remove.');

        const result = await Card.deleteOne({ id });
        if (result.deletedCount === 0) return message.reply('Card not found.');

        message.reply(`Card \`${id}\` has been removed from the system.`);
    }
};
