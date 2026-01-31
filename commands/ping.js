module.exports = {
    name: 'ping',
    description: 'Check bot latency',
    execute(message, args, client) {
        message.reply(`🏓 Pong! Latency: ${client.ws.ping}ms`);
    }
};