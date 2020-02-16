module.exports.run = async (rex, message, args, Discord) => {
  try {
    let embed = new Discord.RichEmbed();
    let notAnimated = [];
    let animated = [];

    message.guild.emojis.forEach(async emoji => {
      if (emoji.animated) animated.push(emoji.toString());
      else notAnimated.push(emoji.toString());
    });

    if (!animated[0]) animated = ["```ini\n [ None ]```"];
    if (!notAnimated[0]) notAnimated = ["```ini\n [ None ]```"];

    message.channel.send(
      embed
        .setTitle("Emojis of " + message.guild.name)
        .setDescription(
          `**Animated Emotes [${animated.length}]:**\n${animated.join(
            " "
          )}\n\n**Static Emotes [${notAnimated.length}]:**\n ${notAnimated.join(
            " "
          )}`
        )
        .setColor("BLURPLE")
        .setThumbnail(message.guild.iconURL)
    );
  } catch (err) {
    message.channel.send("Their was an error!\n" + err).catch();
  }
};

exports.help = {
  name: "emojis",
  aliases: "emotes"
};
