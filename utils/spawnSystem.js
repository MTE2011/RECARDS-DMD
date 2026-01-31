const { EmbedBuilder } = require('discord.js');
const fs = require('fs-extra');
const path = require('path');
const db = require('./database');

class SpawnSystem {
    constructor(client) {
        this.client = client;
        this.spawnsPath = path.join(__dirname, '..', 'data', 'spawns.json');
        this.activeSpawns = new Map();
        this.spawnChannels = (process.env.SPAWN_CHANNELS || '').split(',');
    }

    async init() {
        if (await fs.pathExists(this.spawnsPath)) {
            const data = await fs.readJson(this.spawnsPath);
            for (const guildId in data) {
                this.activeSpawns.set(guildId, data[guildId]);
            }
        }
        
        // Start spawn loop
        setInterval(() => this.checkSpawns(), 30000); // Check every 30 seconds
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
        
        // Find a valid spawn channel from the config
        let channel = null;
        for (const channelId of this.spawnChannels) {
            const targetChannel = guild.channels.cache.get(channelId.trim());
            if (targetChannel && targetChannel.type === 0 && targetChannel.permissionsFor(this.client.user).has('SendMessages')) {
                channel = targetChannel;
                break;
            }
        }

        // Fallback to any channel if none of the specified ones are found
        if (!channel) {
            channel = guild.channels.cache.find(c => c.type === 0 && c.permissionsFor(this.client.user).has('SendMessages'));
        }
        
        if (!channel) return;

        const embed = new EmbedBuilder()
            .setTitle('🎴 A wild card appeared!')
            .setDescription(`Type \`.collect ${card.id}\` to grab it for free!\n\n**${card.name}**\nRarity: ${card.rarity}`)
            .setImage(card.image)
            .setColor('#00FF00');

        const message = await channel.send({ embeds: [embed] });

        const min = parseInt(process.env.CARD_SPAWN_MIN) || 300;
        const max = parseInt(process.env.CARD_SPAWN_MAX) || 600;
        const nextSpawnTime = Date.now() + (Math.floor(Math.random() * (max - min + 1)) + min) * 1000;

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
