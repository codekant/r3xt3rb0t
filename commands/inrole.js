const Discord = require("discord.js");

module.exports.run = async (rex, message, args, Discord) => {
  let role = args.join(" ");
  let mem = message.guild.members
    .filter(member => {
      return member.roles.find("name", role);
    })
    .map(member => {
      return member.user.tag;
    });

  let rembed = new Discord.RichEmbed()
    .setAuthor("Members In A Role", message.author.avatarURL)
    .setColor("BLURPLE")
    .addField(`Role`, `${role}`)
    .addField(`Members`, `\`\`\`${mem.join(", ").substring(0, 1024)}\`\`\``)
    .setFooter(`${rex.user.username}`, rex.user.avatarURL)
    .setTimestamp();

  return message.channel.send(rembed);
};

module.exports.help = {
  name: "inrole",
  aliases: ["meminrole"]
};
