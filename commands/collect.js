const db = require('../utils/database');

module.exports = {
    name: 'collect',
    description: 'Collect a spawned card for free',
    async execute(message, args, client) {
        const cardIdInput = args[0];
        if (!cardIdInput) return message.reply('Please provide the card ID to collect! Example: `.collect pkmn-swsh1-1`');

        const spawn = client.spawnSystem.getSpawn(message.guild.id);

        if (!spawn || !spawn.card) {
            return message.reply('There is no card to collect right now!');
        }

        if (spawn.card.id !== cardIdInput) {
            return message.reply(`That's not the right card ID! The card here is \`${spawn.card.id}\`.`);
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

        message.reply(`🎉 **${message.author.username}** collected **${card.name}** (${card.rarity}) for free!`);
    }
};
