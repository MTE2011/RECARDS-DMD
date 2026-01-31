const db = require('../utils/database');

module.exports = {
    name: 'collect',
    description: 'Collect a spawned card',
    async execute(message, args, client) {
        const cardIdInput = args[0];
        if (!cardIdInput) return message.reply('❌ Please provide the card ID to collect! Example: `.collect ygo-12345678`');

        const spawn = client.spawnSystem.getSpawn(message.guild.id);
        if (!spawn || !spawn.card) return message.reply('❌ There is no card to collect right now!');
        
        // Normalize IDs for comparison
        const inputId = cardIdInput.toLowerCase().trim();
        const spawnId = spawn.card.id.toLowerCase().trim();

        if (inputId !== spawnId) {
            return message.reply(`❌ That's not the right ID! The card here is \`${spawn.card.id}\`.`);
        }

        try {
            const inventory = await db.getInventory(message.author.id);
            const newInstance = {
                instanceId: Math.random().toString(36).substr(2, 9).toUpperCase(),
                cardId: spawn.card.id,
                level: 1,
                favorite: false,
                acquiredAt: new Date().toISOString()
            };

            inventory.cards.push(newInstance);
            await db.saveInventory(inventory);
            await client.spawnSystem.clearSpawn(message.guild.id);

            // Single message response
            return message.reply(`🎉 **${message.author.username}** collected **${spawn.card.name}** (${spawn.card.rarity})!`);
        } catch (error) {
            console.error('Collect Error:', error);
            return message.reply('❌ Error saving card. Please try again.');
        }
    }
};