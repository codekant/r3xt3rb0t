module.exports = {
  help: {
    name: "emoji"
  },

  run: async (rex, message, args, Discord) => {
    if (!args[0])
      return message.channel.send(
        "Correct Usage: " + rex.prefix + "emoji-info <emoji>"
      );
    let i = /[0-9]{17,19}/.exec(args[0]);
    console.log(i);
    let emoji =
      message.guild.emojis.find(r => r.id === i) ||
      message.guild.emojis.find(r => r.name.toLowerCase() === args[0]);
    if (emoji === null) return message.channel.send("Couldn't find emoji");
    let embed = new Discord.RichEmbed()
      .setAuthor(`Emoji Info`, message.author.displayAvatarURL)
      .setThumbnail(emoji.url)
      .setTitle("Emoji Info")
      .setColor("BLURPLE")
      .addField("Emoji Name", emoji.name, true)
      .addField("ID", emoji.id, true)
      .addField("URL", `[Click Here](${emoji.url})`, true)
      .addField("Is Animated?", emoji.animated, true)
      .addField("Created At", emoji.createdAt, true)
      .setTimestamp();
    message.channel.send(embed);
  }
};
