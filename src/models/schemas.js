const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    rarity: { type: String, required: true, enum: ['Common', 'Rare', 'Epic', 'Legendary', 'Mythic'] },
    imageUrl: { type: String, required: true },
    description: { type: String, required: true }
});

const userSchema = new mongoose.Schema({
    userId: { type: String, required: true, unique: true },
    inventory: [{
        cardId: String,
        nickname: String,
        isFavorite: { type: Boolean, default: false },
        obtainedAt: { type: Date, default: Date.now }
    }],
    lastClaim: { type: Date, default: null }
});

const configSchema = new mongoose.Schema({
    key: { type: String, required: true, unique: true },
    value: mongoose.Schema.Types.Mixed
});

module.exports = {
    Card: mongoose.model('Card', cardSchema),
    User: mongoose.model('User', userSchema),
    Config: mongoose.model('Config', configSchema)
};
