module.exports = {
    name: 'forcespawn',
    description: 'Force a card spawn (Admin)',
    async execute(message, args, client) {
        if (message.author.id !== process.env.OWNER_ID) return message.reply('❌ Admin only!');
        await client.spawnSystem.spawnCard(message.guild);
        message.reply('⚡ Spawn forced!');
    }
};