const db = require('../utils/database');

module.exports = {
    name: 'collect',
    description: 'Collect a spawned card',
    async execute(message, args, client) {
        const cardIdInput = args[0];
        if (!cardIdInput) return message.reply('❌ Please provide the card ID to collect! Example: `.collect pkmn-1`');

        const spawn = client.spawnSystem.getSpawn(message.guild.id);
        if (!spawn || !spawn.card) return message.reply('❌ There is no card to collect right now!        // Support both full ID and partial ID if needed, but strict check is safer
        if (spawn.card.id.toLowerCase() !== cardIdInput.toLowerCase()) {
            return message.reply(`❌ That's not the right ID! The card here is \`\${spawn.card.id}\`.`);
        }

        try {
            const inventory = await db.getInventory(message.author.id);
            const newInstance = {
                instanceId: Date.now().toString().slice(-8) + Math.random().toString(36).substr(2, 4).toUpperCase(),
                cardId: spawn.card.id,
                level: 1,
                favorite: false,
                acquiredAt: new Date().toISOString()
            };

            inventory.cards.push(newInstance);
            await db.saveInventory(inventory);
            await client.spawnSystem.clearSpawn(message.guild.id);

            message.reply(`🎉 **\${message.author.username}** collected **\${spawn.card.name}** (\${spawn.card.rarity})!`);
        } catch (error) {
            console.error('Collect Error:', error);
            message.reply('❌ There was an error saving your card. Please try again!');
        }
    }
};