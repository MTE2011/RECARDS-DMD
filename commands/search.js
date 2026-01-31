const { EmbedBuilder } = require("discord.js");
const db = require("../utils/database");

module.exports = {
  name: "search",
  description: "Search for a card in the database or your inventory",
  async execute(message, args) {
    const query = args.join(" ").toLowerCase().trim();
    if (!query) return message.reply("❌ Enter a card name or ID to search!");

    const allCards = await db.getCards();
    const inventory = await db.getInventory(message.author.id);

    // 1. Check if it's an Instance ID in user's inventory
    const invCard = inventory.cards.find((c) => c.instanceId.toLowerCase() === query);
    if (invCard) {
      const data = allCards.find((d) => d.id === invCard.cardId);
      const embed = new EmbedBuilder()
        .setTitle(`🔍 Found in your collection: ${data ? data.name : "Unknown"}`)
        .setDescription(
          `This is an **Instance ID** for a card you own.\nUse \`.card ${invCard.instanceId}\` to see full details.`
        )
        .setColor("#00FF00");
      return message.reply({ embeds: [embed] });
    }

    // 2. Search the general database
    const results = allCards
      .filter(
        (c) =>
          c.name.toLowerCase().includes(query) || c.id.toLowerCase() === query
      )
      .slice(0, 10);

    if (results.length === 0) {
      return message.reply(
        "❌ No cards found matching that name or ID in the database or your inventory."
      );
    }

    const embed = new EmbedBuilder()
      .setTitle("🔍 Database Search Results")
      .setDescription(
        results.map((r) => `**${r.name}** (ID: \`${r.id}\`)`).join("\n")
      )
      .setColor("#00FFFF")
      .setFooter({ text: "To collect these, wait for them to spawn!" });

    return message.reply({ embeds: [embed] });
  },
};
