const fs = require('fs');
const path = require('path');
const defaultCards = require('./defaultCards');

const dbPath = path.join(process.cwd(), 'database.json');

// Initialize database if it doesn't exist or is empty
const initializeDB = () => {
    let data;
    if (!fs.existsSync(dbPath)) {
        data = {
            cards: defaultCards,
            users: [],
            config: {}
        };
        fs.writeFileSync(dbPath, JSON.stringify(data, null, 4));
        console.log('Database initialized with default cards.');
    } else {
        try {
            const fileContent = fs.readFileSync(dbPath, 'utf8');
            data = JSON.parse(fileContent);
            if (!data.cards || data.cards.length === 0) {
                data.cards = defaultCards;
                fs.writeFileSync(dbPath, JSON.stringify(data, null, 4));
                console.log('Empty database populated with default cards.');
            }
        } catch (error) {
            console.error('Error during database initialization:', error);
        }
    }
};

initializeDB();

const readDB = () => {
    try {
        const data = fs.readFileSync(dbPath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading database:', error);
        return { cards: defaultCards, users: [], config: {} };
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
