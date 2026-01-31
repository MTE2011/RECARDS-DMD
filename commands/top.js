const db = require('../utils/database');

module.exports = {
    name: 'top',
    description: 'View top collectors',
    async execute(message) {
        message.reply('🏆 **Top Collectors:** (Feature syncing with database...)');
    }
};