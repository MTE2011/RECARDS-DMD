const db = require('../../utils/database');
const { PermissionsBitField } = require('discord.js');

module.exports = {
    name: 'addcard',
    description: 'Add a new card to the system',
    async execute(message, args, client) {
        if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator) && message.author.id !== client.config.ownerId) {
            return message.reply('You do not have permission to use this command.');
        }

        const content = args.join(' ');
        const parts = content.split('|');
        const mainParts = parts[0].trim().split(' ');
        
        const id = mainParts[0];
        const rarity = mainParts[1];
        const imageUrl = mainParts[2];
        const name = mainParts.slice(3).join(' ');
        const description = parts[1] ? parts[1].trim() : 'No description provided.';

        if (!id || !rarity || !imageUrl || !name) {
            return message.reply('Usage: `.addcard <id> <rarity> <imageUrl> <name> | <description>`');
        }

        const validRarities = ['Common', 'Rare', 'Epic', 'Legendary', 'Mythic'];
        if (!validRarities.includes(rarity)) {
            return message.reply(`Invalid rarity. Choose from: ${validRarities.join(', ')}`);
        }

        const success = db.addCard({ id, name, rarity, imageUrl, description });
        if (success) {
            message.reply(`Card **${name}** (ID: ${id}) has been added!`);
        } else {
            message.reply(`Error: Card with ID ${id} already exists.`);
        }
    }
};
