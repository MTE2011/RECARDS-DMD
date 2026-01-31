# 🎴 Discord Cards Bot

A feature-rich card collecting, trading, and battling Discord bot designed to integrate seamlessly with the **REZERO-MD** economy system. This bot does not handle user registration or core economy itself, relying entirely on the existing REZERO-MD user data for balances and profiles.

## 🚀 Features

The bot focuses on a full card game experience:

*   **External Economy Integration**: Reads and writes to the REZERO-MD user JSON files for all coin and XP transactions.
*   **Automated Card Fetching**: Cards are fetched from public APIs (currently **Pokémon TCG API** and **Yu-Gi-Oh! API**).
*   **Random Spawns**: Cards spawn randomly in active channels with configurable intervals and cooldowns.
*   **Collection Management**: View, sell, and upgrade owned cards.
*   **Battles**: Auto-calculated outcomes based on card power and rarity, with rewards paid out via the external economy.
*   **Trading**: Securely propose and accept card trades with other users.
*   **Admin Tools**: Commands for force-spawning, giving, and removing cards.

## 🛠️ Setup and Installation

### Prerequisites

1.  **Node.js** (v16.x or higher).
2.  A running instance of the **REZERO-MD** bot, or at least its data structure available.
3.  A Discord Bot Token and Client ID.

### Installation

1.  Clone this repository:
    \`\`\`bash
    git clone https://github.com/MTE2011/discord-cards-bot.git
    cd discord-cards-bot
    \`\`\`
2.  Install the required dependencies:
    \`\`\`bash
    npm install
    \`\`\`

### Configuration

Create a file named `.env` in the root directory of the project. You can use the provided `.env.example` as a template.

| Variable | Description | Example Value |
| :--- | :--- | :--- |
| \`BOT_TOKEN\` | Your Discord bot's token. | \`YOUR_BOT_TOKEN\` |
| \`CLIENT_ID\` | Your Discord bot's Client ID. | \`123456789012345678\` |
| \`PREFIX\` | The command prefix for the bot. | \`.\` |
| \`OWNER_ID\` | Your Discord User ID (for owner-only commands). | \`987654321098765432\` |
| \`MOD_IDS\` | Comma-separated list of User IDs for admin commands. | \`id1,id2,id3\` |
| \`EXTERNAL_DATA_PATH\` | **Crucial**: Path to the REZERO-MD \`data\` directory. | \`../REZERO-MD/data\` |
| \`CARD_SPAWN_MIN\` | Minimum time (in seconds) between card spawns. | \`600\` (10 minutes) |
| \`CARD_SPAWN_MAX\` | Maximum time (in seconds) between card spawns. | \`1800\` (30 minutes) |
| \`CLAIM_COOLDOWN\` | Cooldown for the \`.claim\` command (in seconds). | \`10\` |
| \`BATTLE_COOLDOWN\` | Cooldown for the \`.battle\` command (in seconds). | \`60\` |

### Running the Bot

\`\`\`bash
node index.js
\`\`\`

## 🔗 REZERO-MD Economy Integration

This bot achieves shared economy by directly accessing the JSON database files used by the REZERO-MD bot.

*   **User Data Location**: The bot reads and writes to the user-specific JSON files located at the path specified in \`EXTERNAL_DATA_PATH\`, typically \`{REZERO-MD_ROOT}/data/users/{userId}_{username}.json\`.
*   **Transactions**: All coin transactions (\`.sell\`, \`.battle\`, \`.upgrade\`) modify the \`economy.wallet\` field in the REZERO-MD user data.
*   **Prerequisite**: For a user to interact with the economy features of this bot, they must have a profile created by the REZERO-MD bot (e.g., by using a command like \`.profile\` in the other bot).

## 🎴 Card Rarity Mapping

The bot maps the various rarities from the external card APIs to a standardized set of five rarities, each with a corresponding emoji for visual flair.

| Bot Rarity | Emoji | API Rarity Examples | Base Power Range |
| :--- | :--- | :--- | :--- |
| **Common** | ⭐ | Common, Uncommon, Short Print | 0 - 20 |
| **Rare** | 💎 | Rare, Rare Holo, Super Rare | 20 - 40 |
| **Epic** | 🔥 | Ultra Rare, V, VMAX | 40 - 60 |
| **Legendary** | 👑 | Secret Rare, Rainbow Rare, Ultimate Rare | 60 - 80 |
| **Mythic** | 🌀 | Amazing Rare, Ghost Rare, Starlight Rare | 80 - 100 |

## 🎮 Commands

### Collection & Card Actions

| Command | Description |
| :--- | :--- |
| \`.cards\` | View all cards owned by the user. |
| \`.claim\` | Claim a card that has randomly spawned in the channel. |
| \`.sell <instanceId>\` | Sell a card for currency (uses external bot balance). |
| \`.upgrade <instanceId>\` | Upgrade a card's level, costing currency from the external bot. |

### Battles

| Command | Description |
| :--- | :--- |
| \`.battle @user\` | Fight another user using your strongest card. The winner receives coins and XP from the external bot economy. |

### Trading

| Command | Description |
| :--- | :--- |
| \`.trade @user <instanceId>\` | Propose a trade to another user. |
| \`.trade accept\` | Accept a pending trade proposal. |
| \`.trade decline\` | Decline a pending trade proposal. |

### Admin Commands

| Command | Description |
| :--- | :--- |
| \`.forcespawn\` | Force a card to spawn immediately in the current channel. |
| \`.givecard @user <cardId>\` | Give a specific card (by its API ID) to a user. |
| \`.removecard @user <instanceId>\` | Remove a specific card instance from a user's inventory. |
| \`.resetcards @user\` | Clear all cards of a user (Not yet implemented, requires further database logic). |

## 📝 Note on GitHub Repository

*The requested repository creation on GitHub under \`MTE2011/discord-cards-bot\` could not be completed due to a technical limitation with the GitHub CLI tool in this environment. The complete source code is provided below for immediate use and deployment.*
