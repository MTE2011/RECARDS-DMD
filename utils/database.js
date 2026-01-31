const fs = require('fs-extra');
const path = require('path');
const axios = require('axios');
require('dotenv').config();

class Database {
    constructor() {
        this.baseDir = path.join(__dirname, '..', 'data');
        this.sharedKey = process.env.DATABASE_KEY || 'mudaubotsconnet';
        this.apiUrl = process.env.EXTERNAL_BOT_API_URL; // e.g., http://your-rezero-ip:3000
        
        this.paths = {
            cards: path.join(this.baseDir, 'cards.json'),
            inventories: path.join(this.baseDir, 'inventories.json'),
            spawns: path.join(this.baseDir, 'spawns.json')
        };

        this.ensureFiles();
    }

    async ensureFiles() {
        // Verify shared key
        if (process.env.DATABASE_KEY && process.env.DATABASE_KEY !== this.sharedKey) {
            console.error('CRITICAL: Database Key Mismatch! Access Denied.');
            process.exit(1);
        }

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

    // --- External Economy Integration (via Remote API) ---
    async getBalance(userId) {
        try {
            const response = await axios.get(`${this.apiUrl}/user/${userId}`, {
                headers: { 'x-api-key': this.sharedKey }
            });
            return response.data.economy.wallet;
        } catch (error) {
            console.error('Error fetching balance from API:', error.message);
            return 0;
        }
    }

    async updateBalance(userId, amount) {
        try {
            await axios.post(`${this.apiUrl}/user/${userId}/balance`, { amount }, {
                headers: { 'x-api-key': this.sharedKey }
            });
            return true;
        } catch (error) {
            console.error('Error updating balance via API:', error.message);
            return false;
        }
    }

    async addXP(userId, amount) {
        try {
            await axios.post(`${this.apiUrl}/user/${userId}/xp`, { amount }, {
                headers: { 'x-api-key': this.sharedKey }
            });
            return true;
        } catch (error) {
            console.error('Error adding XP via API:', error.message);
            return false;
        }
    }
}

module.exports = new Database();
