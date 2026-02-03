const fs = require('fs');
const path = require('path');

const dbPath = path.join(process.cwd(), 'database.json');

// Initialize database if it doesn't exist
if (!fs.existsSync(dbPath)) {
    const initialData = {
        cards: [],
        users: [],
        config: {}
    };
    fs.writeFileSync(dbPath, JSON.stringify(initialData, null, 4));
}

const readDB = () => {
    try {
        const data = fs.readFileSync(dbPath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading database:', error);
        return { cards: [], users: [], config: {} };
    }
};

const writeDB = (data) => {
    try {
        fs.writeFileSync(dbPath, JSON.stringify(data, null, 4));
        return true;
    } catch (error) {
        console.error('Error writing to database:', error);
        return false;
    }
};

module.exports = {
    // Card Operations
    getCards: () => readDB().cards,
    getCard: (id) => readDB().cards.find(c => c.id === id),
    addCard: (cardData) => {
        const db = readDB();
        if (db.cards.some(c => c.id === cardData.id)) return false;
        db.cards.push(cardData);
        return writeDB(db);
    },
    removeCard: (id) => {
        const db = readDB();
        db.cards = db.cards.filter(c => c.id !== id);
        return writeDB(db);
    },

    // User Operations
    getUser: (userId) => {
        const db = readDB();
        let user = db.users.find(u => u.userId === userId);
        if (!user) {
            user = { userId, inventory: [], lastClaim: null };
            db.users.push(user);
            writeDB(db);
        }
        return user;
    },
    updateUser: (userData) => {
        const db = readDB();
        const index = db.users.findIndex(u => u.userId === userData.userId);
        if (index !== -1) {
            db.users[index] = userData;
        } else {
            db.users.push(userData);
        }
        return writeDB(db);
    },
    getAllUsers: () => readDB().users,
    deleteUser: (userId) => {
        const db = readDB();
        db.users = db.users.filter(u => u.userId !== userId);
        return writeDB(db);
    }
};
