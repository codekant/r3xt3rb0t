const Discord = require("discord.js");

module.exports.run = async (rex, message, args, Discord) => {
  const Enmap = require("enmap");
  rex.points = new Enmap({ name: "points" });

  const filtered = rex.points.filter(p => p.guild === message.guild.id).array();

  const sorted = filtered.sort((a, b) => b.points - a.points);

  const lb = sorted.splice(0, 10);

  const embed = new Discord.RichEmbed()
    .setAuthor(
      `Top 10 Leaderboard Of ${message.guild.name}`,
      message.guild.iconURL
    )
    .setFooter(rex.user.username, rex.user.displayAvatarURL)
    .setTimestamp()
    .setFooter(`Requested By ${message.author.tag}`)
    .setColor("BLURPLE");

  for (const data of lb) {
    embed.addField(
      rex.users.get(data.user).tag,
      `Level - ${data.level} | Total XP - ${data.points}`
    );
  }
  return message.channel.send({ embed });
};

module.exports.help = {
  name: "leaderboard",
  aliases: ["lb", "lead"]
};
