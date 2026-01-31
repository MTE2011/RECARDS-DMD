const db = require('../utils/database');

module.exports = {
    name: 'daily',
    description: 'Claim your daily XP',
    async execute(message) {
        const user = await db.getUser(message.author.id);
        const now = Date.now();
        const cooldown = 24 * 60 * 60 * 1000;

        if (user.dailyLastClaimed && (now - new Date(user.dailyLastClaimed).getTime() < cooldown)) {
            const remaining = cooldown - (now - new Date(user.dailyLastClaimed).getTime());
            const hours = Math.floor(remaining / (60 * 60 * 1000));
            return message.reply(`⏳ You already claimed your daily! Come back in ${hours} hours.`);
        }

        user.xp += 500;
        user.dailyLastClaimed = new Date().toISOString();
        await db.saveUser(user);

        message.reply('🎁 You claimed your daily **500 XP**! Use it to `.upgrade` your cards.');
    }
};