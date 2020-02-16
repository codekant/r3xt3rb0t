exports.run = async (rex, message, args, Discord) => {
  const embed = new Discord.RichEmbed();
  const member =
    message.mentions.members.first() ||
    message.guild.members.get(args[0]) ||
    message.member;

  message.channel.send(
    embed
      .setAuthor(
        `Avatar of ${member.user.username}`,
        member.user.displayAvatarURL
      )
      .setImage(member.user.displayAvatarURL)
      .setFooter(
        `Requested by ${message.author.tag}`,
        message.author.displayAvatarURL
      )
      .setColor("BLURPLE")
  );
};

exports.help = {
  name: "avatar",
  aliases: ["icon"]
};
