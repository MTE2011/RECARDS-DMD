module.exports = {
    name: 'cooldowns',
    description: 'Show claim cooldown',
    async execute(message, args, client) {
        // Since there are no specific claim cooldowns mentioned besides the spawn timing,
        // we'll just inform the user that they can claim any active card.
        message.reply('There are no personal cooldowns for claiming. You can claim any card that spawns in the channel if you are the first one to type `.claim`!');
    }
};
