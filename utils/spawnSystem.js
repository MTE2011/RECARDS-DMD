const { EmbedBuilder } = require('discord.js');
const fs = require('fs-extra');
const path = require('path');
const db = require('./database');

class SpawnSystem {
    constructor(client) {
        this.client = client;
        this.spawnsPath = path.join(__dirname, '..', 'data', 'spawns.json');
        this.activeSpawns = new Map();
    }

    async init() {
        if (await fs.pathExists(this.spawnsPath)) {
            const data = await fs.readJson(this.spawnsPath);
            for (const guildId in data) {
                this.activeSpawns.set(guildId, data[guildId]);
            }
        }
        
        // Start spawn loop
        setInterval(() => this.checkSpawns(), 60000); // Check every minute
    }

    async checkSpawns() {
        const guilds = this.client.guilds.cache;
        for (const [guildId, guild] of guilds) {
            const spawnData = this.activeSpawns.get(guildId) || { lastSpawn: 0, nextSpawn: 0 };
            const now = Date.now();

            if (now >= spawnData.nextSpawn) {
                await this.spawnCard(guild);
            }
        }
    }

    async spawnCard(guild) {
        const cards = await db.getCards();
        if (cards.length === 0) return;

        const card = cards[Math.floor(Math.random() * cards.length)];
        const channel = guild.channels.cache.find(c => c.type === 0 && c.permissionsFor(this.client.user).has('SendMessages'));
        
        if (!channel) return;

        const embed = new EmbedBuilder()
            .setTitle('🎴 A wild card appeared!')
            .setDescription(`Type \`.claim\` to grab it!\n\n**${card.name}**\nRarity: ${card.rarity}`)
            .setImage(card.image)
            .setColor('#FFD700');

        const message = await channel.send({ embeds: [embed] });

        const nextSpawnTime = Date.now() + (Math.floor(Math.random() * (process.env.CARD_SPAWN_MAX - process.env.CARD_SPAWN_MIN + 1)) + parseInt(process.env.CARD_SPAWN_MIN)) * 1000;

        const spawnData = {
            card,
            messageId: message.id,
            channelId: channel.id,
            nextSpawn: nextSpawnTime
        };

        this.activeSpawns.set(guild.id, spawnData);
        await this.saveSpawns();
    }

    async saveSpawns() {
        const data = Object.fromEntries(this.activeSpawns);
        await fs.writeJson(this.spawnsPath, data, { spaces: 2 });
    }

    getSpawn(guildId) {
        return this.activeSpawns.get(guildId);
    }

    async clearSpawn(guildId) {
        const spawn = this.activeSpawns.get(guildId);
        if (spawn) {
            spawn.card = null;
            await this.saveSpawns();
        }
    }
}

module.exports = SpawnSystem;
