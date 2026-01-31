# 🎴 Standalone Discord Cards Bot (RECARDS-DMD)

A massive, standalone card collecting game for Discord. This bot is completely independent and features its own economy, profile system, and over 80 commands!

## 🚀 Features

*   **Standalone Economy**: No external bot required. Features its own balance, XP, and leveling system.
*   **Free Collection**: Cards spawn randomly in specific channels. Use \`.collect <cardId>\` to grab them for free!
*   **80+ Commands**: A huge variety of commands for games, social interaction, card management, and administration.
*   **Specific Spawn Channels**: Configure exactly where cards should appear.
*   **Automated Card Fetching**: Pulls from Pokémon TCG and Yu-Gi-Oh! APIs.
*   **Trading & Battles**: Exchange cards with others or fight to earn rewards.

## 🛠️ Setup

1.  **Clone & Install**:
    \`\`\`bash
    git clone https://github.com/MTE2011/RECARDS-DMD.git
    cd RECARDS-DMD
    npm install
    \`\`\`

2.  **Configure \`.env\`**:
    | Variable | Description |
    | :--- | :--- |
    | \`BOT_TOKEN\` | Your Discord bot token |
    | \`PREFIX\` | Command prefix (e.g., \`.\`) |
    | \`SPAWN_CHANNELS\` | Comma-separated list of channel IDs for spawns |
    | \`OWNER_ID\` | Your Discord User ID |

3.  **Run**:
    \`\`\`bash
    node index.js
    \`\`\`

## 🎮 How to Play

1.  **Start**: Type \`.help\` to see all commands.
2.  **Collect**: Watch the designated spawn channels. When a card appears, type \`.collect <cardId>\` quickly!
3.  **Inventory**: Check your cards with \`.cards\` or \`.inventory\`.
4.  **Social**: Trade with friends using \`.trade @user <id>\` or battle them with \`.battle @user\`.
5.  **Economy**: Earn coins through \`.daily\`, \`.work\`, or games like \`.coinflip\` and \`.slots\`.

## 🛡️ Admin Commands

*   \`.forcespawn\`: Manually trigger a card spawn.
*   \`.givecard @user <cardId>\`: Give a specific card to a user.
*   \`.setspawn <channelIds>\`: Update spawn channels on the fly.

Enjoy the ultimate card collecting experience!
