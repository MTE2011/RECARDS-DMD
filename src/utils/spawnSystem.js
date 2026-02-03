const { EmbedBuilder } = require('discord.js');
const { Card } = require('../models/schemas');
const { RARITIES } = require('./constants');

module.exports = (client) => {
    client.activeSpawns = new Map(); // channelId -> cardData

    const spawnCard = async (channelId) => {
        try {
            const channel = client.channels.cache.get(channelId);
            if (!channel) {
                console.log(`Spawn failed: Channel ${channelId} not found in cache.`);
                return;
            }

            // If a card is already active, don't spawn another
            if (client.activeSpawns.has(channelId)) {
                console.log(`Spawn skipped: A card is already active in ${channelId}`);
                return;
            }

            // Determine rarity
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

            // Get random card of that rarity
            const cards = await Card.find({ rarity: selectedRarity });
            if (cards.length === 0) {
                console.log(`Spawn failed: No cards found for rarity ${selectedRarity}`);
                return;
            }
            const card = cards[Math.floor(Math.random() * cards.length)];

            const embed = new EmbedBuilder()
                .setTitle('A Wild Card Appeared!')
                .setDescription('Type `.claim` to catch it!')
                .setImage(card.imageUrl)
                .setColor(RARITIES[selectedRarity].color)
                .setFooter({ text: 'Card will despawn in 60 seconds' });

            const spawnMessage = await channel.send({ embeds: [embed] });
            console.log(`Card spawned: ${card.name} (${selectedRarity}) in ${channelId}`);

            client.activeSpawns.set(channelId, {
                card: card,
                messageId: spawnMessage.id,
                expiresAt: Date.now() + 60000
            });

            // Despawn after 60 seconds
            setTimeout(async () => {
                if (client.activeSpawns.has(channelId) && client.activeSpawns.get(channelId).messageId === spawnMessage.id) {
                    client.activeSpawns.delete(channelId);
                    try {
                        await spawnMessage.edit({ content: 'The card has despawned...', embeds: [] });
                        console.log(`Card despawned in ${channelId}`);
                    } catch (e) {}
                }
            }, 60000);
        } catch (error) {
            console.error('Error in spawnCard:', error);
        }
    };

    const scheduleNextSpawn = () => {
        const interval = [5, 10][Math.floor(Math.random() * 2)] * 60 * 1000;
        console.log(`Next spawn scheduled in ${interval / 60000} minutes.`);
        setTimeout(() => {
            if (client.config.spawnChannels.length > 0) {
                client.config.spawnChannels.forEach(channelId => {
                    spawnCard(channelId);
                });
            } else {
                console.log('No spawn channels configured in .env');
            }
            scheduleNextSpawn();
        }, interval);
    };

    scheduleNextSpawn();
    
    // Attach spawnCard to client for forceSpawn command
    client.spawnCard = spawnCard;
};
