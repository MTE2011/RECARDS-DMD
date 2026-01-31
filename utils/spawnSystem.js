const { EmbedBuilder } = require('discord.js');
const fs = require('fs-extra');
const path = require('path');
const db = require('./database');

class SpawnSystem {
    constructor(client) {
        this.client = client;
        this.spawnsPath = path.join(__dirname, '..', 'data', 'spawns.json');
        this.activeSpawns = new Map();
        this.spawnChannels = (process.env.SPAWN_CHANNELS || '').split(',').map(id => id.trim());
    }

    async init() {
        await fs.ensureDir(path.dirname(this.spawnsPath));
        if (await fs.pathExists(this.spawnsPath)) {
            try {
                const data = await fs.readJson(this.spawnsPath);
                for (const guildId in data) {
                    this.activeSpawns.set(guildId, data[guildId]);
                }
            } catch (e) {
                console.error('Error loading spawns:', e);
            }
        }
        
        // Check for spawns every 30 seconds
        setInterval(() => this.checkSpawns(), 30000);
    }

    async checkSpawns() {
        for (const [guildId, guild] of this.client.guilds.cache) {
            const spawnData = this.activeSpawns.get(guildId) || { nextSpawn: 0 };
            if (Date.now() >= spawnData.nextSpawn) {
                await this.spawnCard(guild);
            }
        }
    }

    async spawnCard(guild) {
        const cards = await db.getCards();
        if (!cards || cards.length === 0) return;

        const card = cards[Math.floor(Math.random() * cards.length)];
        
        let channel = null;
        for (const channelId of this.spawnChannels) {
            const targetChannel = guild.channels.cache.get(channelId);
            if (targetChannel && targetChannel.isTextBased()) {
                channel = targetChannel;
                break;
            }
        }

        if (!channel) {
            channel = guild.channels.cache.find(c => c.isTextBased() && c.permissionsFor(this.client.user).has('SendMessages'));
        }
        
        if (!channel) return;

        const embed = new EmbedBuilder()
            .setTitle('🎴 A wild card appeared!')
            .setDescription(`Type \`.collect ${card.id}\` to grab it for free!\n\n**${card.name}**\nRarity: ${card.rarity}`)
            .setImage(card.image)
            .setColor('#00FF00');

        try {
            const message = await channel.send({ embeds: [embed] });
            const min = parseInt(process.env.CARD_SPAWN_MIN) || 300;
            const max = parseInt(process.env.CARD_SPAWN_MAX) || 600;
            const nextSpawnTime = Date.now() + (Math.floor(Math.random() * (max - min + 1)) + min) * 1000;

            const spawnData = {
                card: card,
                messageId: message.id,
                channelId: channel.id,
                nextSpawn: nextSpawnTime
            };

            this.activeSpawns.set(guild.id, spawnData);
            await this.saveSpawns();
        } catch (e) {
            console.error('Spawn Error:', e);
        }
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
            spawn.card = null; // Keep nextSpawn time but clear the card
            await this.saveSpawns();
        }
    }
}

module.exports = SpawnSystem;
