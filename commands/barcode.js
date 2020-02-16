const memer = require("discordmeme.js");

module.exports = {
  help: {
    name: "barcode",
    aliases: ["bargen", "barcodegen"]
  },

  run: async (rex, message, args, Discord) => {
    let text = args.join("");
    if (!text) return message.channel.send(":x:  Text please!");

    let k = await memer.barcodegen(text);

    const embed = new Discord.RichEmbed()
      .setAuthor("BAR-CODE GEN!")
      .setImage(k)
      .setColor("#36393F");
    message.channel.send(embed);
  }
};
