const db = require('../utils/database');

module.exports = {
    name: 'claim',
    description: 'Claim a spawned card',
    async execute(message, args, client) {
        const spawn = client.spawnSystem.getSpawn(message.guild.id);

        if (!spawn || !spawn.card) {
            return message.reply('There is no card to claim right now!');
        }

        const card = spawn.card;
        const inventory = await db.getInventory(message.author.id);

        // Add card to inventory
        inventory.cards.push({
            instanceId: Date.now().toString(),
            cardId: card.id,
            level: 1,
            favorite: false,
            acquiredAt: new Date().toISOString()
        });

        await db.saveInventory(inventory);
        await client.spawnSystem.clearSpawn(message.guild.id);

        message.reply(`🎉 **${message.author.username}** claimed **${card.name}** (${card.rarity})!`);
    }
};
