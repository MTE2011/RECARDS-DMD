const axios = require('axios');
const db = require('./database');

const RARITY_MAP = {
    // Pokemon
    'Common': '⭐ Common',
    'Uncommon': '⭐ Common',
    'Rare': '💎 Rare',
    'Rare Holo': '💎 Rare',
    'Ultra Rare': '🔥 Epic',
    'V': '🔥 Epic',
    'VMAX': '🔥 Epic',
    'Secret Rare': '👑 Legendary',
    'Rainbow Rare': '👑 Legendary',
    'Amazing Rare': '🌀 Mythic',
    
    // Yugioh
    'Short Print': '⭐ Common',
    'Super Rare': '💎 Rare',
    'Ultra Rare': '🔥 Epic',
    'Ultimate Rare': '👑 Legendary',
    'Ghost Rare': '🌀 Mythic',
    'Starlight Rare': '🌀 Mythic'
};

const getRarity = (apiRarity) => {
    return RARITY_MAP[apiRarity] || '⭐ Common';
};

const getPower = (rarity) => {
    if (rarity.includes('Mythic')) return Math.floor(Math.random() * 21) + 80; // 80-100
    if (rarity.includes('Legendary')) return Math.floor(Math.random() * 21) + 60; // 60-80
    if (rarity.includes('Epic')) return Math.floor(Math.random() * 21) + 40; // 40-60
    if (rarity.includes('Rare')) return Math.floor(Math.random() * 21) + 20; // 20-40
    return Math.floor(Math.random() * 21); // 0-20
};

const fetchPokemonCards = async () => {
    try {
        const response = await axios.get('https://api.pokemontcg.io/v2/cards?pageSize=100');
        return response.data.data.map(card => ({
            id: `pkmn-${card.id}`,
            name: card.name,
            image: card.images.large,
            type: card.supertype,
            rarity: getRarity(card.rarity),
            description: card.flavorText || 'No description available.',
            source: 'Pokemon',
            power: getPower(getRarity(card.rarity))
        }));
    } catch (error) {
        console.error('Error fetching Pokemon cards:', error);
        return [];
    }
};

const fetchYugiohCards = async () => {
    try {
        const response = await axios.get('https://db.ygoprodeck.com/api/v7/cardinfo.php');
        // Get a slice of 100 cards for variety
        return response.data.data.slice(0, 100).map(card => ({
            id: `ygo-${card.id}`,
            name: card.name,
            image: card.card_images[0].image_url,
            type: card.type,
            rarity: getRarity(card.card_sets?.[0]?.set_rarity),
            description: card.desc || 'No description available.',
            source: 'Yugioh',
            power: getPower(getRarity(card.card_sets?.[0]?.set_rarity))
        }));
    } catch (error) {
        console.error('Error fetching Yugioh cards:', error);
        return [];
    }
};

const updateCardDatabase = async () => {
    const pkmn = await fetchPokemonCards();
    const ygo = await fetchYugiohCards();
    const allCards = [...pkmn, ...ygo];
    if (allCards.length > 0) {
        await db.saveCards(allCards);
        console.log(`Updated card database with ${allCards.length} cards.`);
    }
};

module.exports = { updateCardDatabase };
