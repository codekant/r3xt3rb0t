const Discord = require("discord.js");

module.exports.run = async (rex, message, args, Discord) => {
  const Enmap = require("enmap");
  rex.points = new Enmap({ name: "points" });
  const user = message.mentions.users.first() || message.author;
  const key = `${message.guild.id}-${user.id}`;

  const embed = new Discord.RichEmbed();
  embed.setAuthor("Level Ranking", message.guild.iconURL);
  embed.setColor("BLURPLE");
  embed.setThumbnail(user.displayAvatarURL);
  embed.addField("User", user.tag, true);
  embed.addField("User Level", rex.points.get(key, "level"), true);
  embed.addField("Total XP", rex.points.get(key, "points"), true);
  embed.setFooter(
    `Requested by: ${message.author.tag}`,
    message.author.displayAvatarURL
  );
  embed.setTimestamp();

  return message.channel.send(embed);
};

module.exports.help = {
  name: "level",
  aliases: ["lvl", "rank"]
};
