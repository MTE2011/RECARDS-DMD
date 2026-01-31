module.exports = {
    name: 'rarities',
    description: 'View all card rarities',
    execute(message) {
        message.reply('✨ **Card Rarities:**\n⭐ Common\n💎 Rare\n🔥 Epic\n👑 Legendary\n🌀 Mythic');
    }
};