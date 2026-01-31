const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'guide',
    description: 'A detailed guide on how to play the card game',
    async execute(message, args, client) {
        const prefix = process.env.PREFIX || '.';
        
        const embed = new EmbedBuilder()
            .setTitle('📖 The Ultimate Card Master Guide')
            .setDescription('Welcome to the world of card collecting! Here is everything you need to know to become a Master.')
            .addFields(
                { 
                    name: '1️⃣ Collecting Cards', 
                    value: `Cards spawn randomly in designated channels every 5-10 minutes. When a card appears, look for its **ID** and type \`${prefix}collect <ID>\` as fast as you can! The first person to type it gets the card for free.` 
                },
                { 
                    name: '2️⃣ Managing Your Collection', 
                    value: `Check your cards with \`${prefix}cards\`. You can see detailed stats and a large image of any card using \`${prefix}card <instanceID>\`. Use \`${prefix}fav <instanceID>\` to keep track of your best ones!` 
                },
                { 
                    name: '3️⃣ Earning Coins', 
                    value: `You'll need coins to upgrade cards and buy items. Earn them by:\n• Claiming your \`${prefix}daily\`\n• Using \`${prefix}work\` or \`${prefix}crime\`\n• Playing games like \`${prefix}slots\`, \`${prefix}coinflip\`, or \`${prefix}dice\`.` 
                },
                { 
                    name: '4️⃣ Battles & Power', 
                    value: `Every card has a **Power** level. You can increase this by using \`${prefix}upgrade <instanceID>\`. Challenge others with \`${prefix}battle @user\`—the winner gets coins and XP!` 
                },
                { 
                    name: '5️⃣ Trading & Market', 
                    value: `Missing a rare card? Use \`${prefix}trade @user <instanceID>\` to swap with friends, or check the \`${prefix}market\` to see what other players are selling.` 
                },
                { 
                    name: '6️⃣ Guilds & Quests', 
                    value: `Join a guild with \`${prefix}gjoin\` to team up with others. Complete \`${prefix}quest\` and \`${prefix}dailyquest\` to earn massive rewards and level up your profile!` 
                }
            )
            .setColor('#FFD700')
            .setFooter({ text: 'Need more help? Ask an admin or visit our support server!' });

        message.reply({ embeds: [embed] });
    }
};
