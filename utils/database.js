const fs = require('fs-extra');
const path = require('path');
require('dotenv').config();

class Database {
    constructor() {
        this.baseDir = path.join(__dirname, '..', 'data');
        this.externalDataPath = process.env.EXTERNAL_DATA_PATH || path.join(__dirname, '..', '..', 'REZERO-MD', 'data');
        
        this.paths = {
            cards: path.join(this.baseDir, 'cards.json'),
            inventories: path.join(this.baseDir, 'inventories.json'),
            spawns: path.join(this.baseDir, 'spawns.json')
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

    // --- External Economy Integration ---
    async getExternalUser(userId) {
        const usersDir = path.join(this.externalDataPath, 'users');
        if (!(await fs.pathExists(usersDir))) return null;

        const files = await fs.readdir(usersDir);
        const userFile = files.find(f => f.startsWith(userId + '_'));
        if (!userFile) return null;

        return await fs.readJson(path.join(usersDir, userFile));
    }

    async saveExternalUser(userId, userData) {
        const usersDir = path.join(this.externalDataPath, 'users');
        const files = await fs.readdir(usersDir);
        const userFile = files.find(f => f.startsWith(userId + '_'));
        if (!userFile) return;

        await fs.writeJson(path.join(usersDir, userFile), userData, { spaces: 2 });
    }

    async getBalance(userId) {
        const user = await this.getExternalUser(userId);
        return user ? user.economy.wallet : 0;
    }

    async updateBalance(userId, amount) {
        const user = await this.getExternalUser(userId);
        if (user) {
            user.economy.wallet += amount;
            await this.saveExternalUser(userId, user);
            return true;
        }
        return false;
    }

    async addXP(userId, amount) {
        const user = await this.getExternalUser(userId);
        if (user) {
            // Assuming REZERO-MD has an XP field, if not we can add it or skip
            if (!user.economy.xp) user.economy.xp = 0;
            user.economy.xp += amount;
            await this.saveExternalUser(userId, user);
            return true;
        }
        return false;
    }
}

module.exports = new Database();
