# DECARDS-DMD: Discord Card Collecting Bot

A pure card-collecting system for Discord using `discord.js v14`. This bot focuses entirely on collecting, viewing, and trading cards without any gambling or economy elements.

## Features
- **Automatic Spawning:** Cards spawn randomly every 5 or 10 minutes in designated channels.
- **Rarity System:** 5 rarities (Common, Rare, Epic, Legendary, Mythic) with specific spawn chances.
- **Inventory Management:** View, favorite, rename, or burn cards.
- **Trading System:** Securely trade cards with other users.
- **No Economy:** No currency, no betting, no luck-based games.

## Commands
### Collection
- `.claim` - Claim the spawned card
- `.inventory [@user]` - View your cards or another user's inventory
- `.card <id>` - View detailed card info
- `.collection` - View your collection progress %

### Management
- `.favorite <card_id>` - Mark a card as favorite
- `.unfavorite <card_id>` - Remove a card from favorites
- `.favorites` - View your favorite cards
- `.burn <card_id>` - Permanently remove a card
- `.rename <card_id> <nickname>` - Give a custom nickname to a card

### Trading
- `.trade @user <your_card_id> <their_card_id>` - Propose a trade
- `.tradeaccept` - Accept a pending trade
- `.tradedecline` - Decline a pending trade

### Info / Stats
- `.stats` - View your card statistics
- `.leaderboard` - Top collectors leaderboard
- `.rarities` - Rarity explanation and chances
- `.cooldowns` - Show claim cooldown info
- `.help` - Show this help menu
- `.ping` - Check bot latency
- `.profile` - View your card showcase profile

### Admin
- `.forcespawn` - Force a card spawn in the current channel
- `.addcard <id> <rarity> <imageUrl> <name> | <description>` - Add a new card
- `.removecard <id>` - Remove a card from the system
- `.setspawn` - Set the current channel as a spawn channel
- `.resetinventory @user` - Reset a user's inventory

## Configuration
Create a `.env` file in the root directory with the following:
```env
DISCORD_TOKEN=your_bot_token
PREFIX=.
OWNER_ID=your_discord_id
SPAWN_CHANNELS=channel_id_1,channel_id_2
ALLOWED_CHANNELS=channel_id_1,channel_id_2,channel_id_3
MONGO_URI=mongodb://localhost:27017/decards
```

## Installation
1. Clone the repository
2. Run `npm install`
3. Configure the `.env` file
4. Run `npm start`
