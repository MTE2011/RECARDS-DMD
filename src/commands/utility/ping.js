module.exports = {
    name: 'ping',
    description: 'Bot latency',
    async execute(message, args, client) {
        const msg = await message.reply('Pinging...');
        const latency = msg.createdTimestamp - message.createdTimestamp;
        const apiLatency = Math.round(client.ws.ping);
        msg.edit(`Pong! Latency: \`${latency}ms\` | API Latency: \`${apiLatency}ms\``);
    }
};
