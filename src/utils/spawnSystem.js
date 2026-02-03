const { EmbedBuilder } = require('discord.js');
const db = require('./database');
const { RARITIES } = require('./constants');

module.exports = (client) => {
    client.activeSpawns = new Map();

    const spawnCard = async (channelId) => {
        try {
            const channel = client.channels.cache.get(channelId);
            if (!channel || client.activeSpawns.has(channelId)) return;

            const rand = Math.random() * 100;
            let cumulative = 0;
            let selectedRarity = 'Common';
            for (const [rarity, data] of Object.entries(RARITIES)) {
                cumulative += data.chance;
                if (rand <= cumulative) {
                    selectedRarity = rarity;
                    break;
                }
            }

            const allCards = db.getCards();
            const cards = allCards.filter(c => c.rarity === selectedRarity);
            if (cards.length === 0) return;
            
            const card = cards[Math.floor(Math.random() * cards.length)];

            const embed = new EmbedBuilder()
                .setTitle('A Wild Card Appeared!')
                .setDescription('Type `.claim` to catch it!')
                .setImage(card.imageUrl)
                .setColor(RARITIES[selectedRarity].color)
                .setFooter({ text: 'Card will despawn in 60 seconds' });

            const spawnMessage = await channel.send({ embeds: [embed] });

            client.activeSpawns.set(channelId, {
                card: card,
                messageId: spawnMessage.id,
                expiresAt: Date.now() + 60000
            });

            setTimeout(async () => {
                if (client.activeSpawns.has(channelId) && client.activeSpawns.get(channelId).messageId === spawnMessage.id) {
                    client.activeSpawns.delete(channelId);
                    try {
                        await spawnMessage.edit({ content: 'The card has despawned...', embeds: [] });
                    } catch (e) {}
                }
            }, 60000);
        } catch (error) {
            console.error('Error in spawnCard:', error);
        }
    };

    const scheduleNextSpawn = () => {
        const interval = [5, 10][Math.floor(Math.random() * 2)] * 60 * 1000;
        setTimeout(() => {
            if (client.config.spawnChannels.length > 0) {
                client.config.spawnChannels.forEach(id => spawnCard(id));
            }
            scheduleNextSpawn();
        }, interval);
    };

    scheduleNextSpawn();
    client.spawnCard = spawnCard;
};
