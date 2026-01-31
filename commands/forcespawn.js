module.exports = {
    name: 'forcespawn',
    description: 'Force a card to spawn immediately (Admin Only)',
    async execute(message, args, client) {
        const ownerId = process.env.OWNER_ID;
        const modIds = (process.env.MOD_IDS || '').split(',');

        if (message.author.id !== ownerId && !modIds.includes(message.author.id)) {
            return message.reply('❌ You do not have permission to use this command!');
        }

        await client.spawnSystem.spawnCard(message.guild);
        message.reply('✅ Forced a card spawn!');
    }
};
