const fs = require('fs-extra');
const path = require('path');
require('dotenv').config();

class Database {
    constructor() {
        this.baseDir = path.join(__dirname, '..', 'data');
        this.paths = {
            cards: path.join(this.baseDir, 'cards.json'),
            inventories: path.join(this.baseDir, 'inventories.json'),
            spawns: path.join(this.baseDir, 'spawns.json'),
            users: path.join(this.baseDir, 'users.json')
        };

        this.ensureFiles();
    }

    async ensureFiles() {
        await fs.ensureDir(this.baseDir);
        for (const key in this.paths) {
            if (!(await fs.pathExists(this.paths[key]))) {
                await fs.writeJson(this.paths[key], key === 'spawns' ? {} : []);
            }
        }
    }

    // --- Card Data ---
    async getCards() {
        return await fs.readJson(this.paths.cards);
    }

    async saveCards(cards) {
        await fs.writeJson(this.paths.cards, cards, { spaces: 2 });
    }

    // --- User Profiles & Economy ---
    async getUser(userId) {
        const users = await fs.readJson(this.paths.users);
        let user = users.find(u => u.id === userId);
        if (!user) {
            user = {
                id: userId,
                balance: 1000,
                xp: 0,
                level: 1,
                dailyLastClaimed: null,
                registeredAt: new Date().toISOString()
            };
            users.push(user);
            await fs.writeJson(this.paths.users, users, { spaces: 2 });
        }
        return user;
    }

    async saveUser(userData) {
        const users = await fs.readJson(this.paths.users);
        const index = users.findIndex(u => u.id === userData.id);
        if (index !== -1) {
            users[index] = userData;
        } else {
            users.push(userData);
        }
        await fs.writeJson(this.paths.users, users, { spaces: 2 });
    }

    // --- User Inventories ---
    async getInventory(userId) {
        const inventories = await fs.readJson(this.paths.inventories);
        let userInv = inventories.find(inv => inv.userId === userId);
        if (!userInv) {
            userInv = { userId, cards: [] };
            inventories.push(userInv);
            await fs.writeJson(this.paths.inventories, inventories, { spaces: 2 });
        }
        return userInv;
    }

    async saveInventory(userInv) {
        const inventories = await fs.readJson(this.paths.inventories);
        const index = inventories.findIndex(inv => inv.userId === userInv.userId);
        if (index !== -1) {
            inventories[index] = userInv;
        } else {
            inventories.push(userInv);
        }
        await fs.writeJson(this.paths.inventories, inventories, { spaces: 2 });
    }
}

module.exports = new Database();
