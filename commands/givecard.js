const db = require('../utils/database');

module.exports = {
    name: 'givecard',
    description: 'Give a specific card to a user (Admin Only)',
    async execute(message, args, client) {
        const ownerId = process.env.OWNER_ID;
        if (message.author.id !== ownerId) {
            return message.reply('❌ Only the bot owner can use this command!');
        }

        const target = message.mentions.users.first();
        const cardId = args[1];

        if (!target || !cardId) {
            return message.reply('Usage: `.givecard @user <cardId>`');
        }

        const allCards = await db.getCards();
        const cardData = allCards.find(c => c.id === cardId);

        if (!cardData) {
            return message.reply(`❌ Card with ID \`${cardId}\` not found in database!`);
        }

        const inventory = await db.getInventory(target.id);
        inventory.cards.push({
            instanceId: Date.now().toString(),
            cardId: cardData.id,
            level: 1,
            favorite: false,
            acquiredAt: new Date().toISOString()
        });

        await db.saveInventory(inventory);
        message.reply(`✅ Successfully gave **${cardData.name}** to **${target.username}**!`);
    }
};
