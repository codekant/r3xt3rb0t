const Discord = require("discord.js");
const hastebin = require("hastebin-gen");

module.exports.run = async (rex, message, args, Discord) => {
  let discrim = args.join(" ") || message.author.discriminator;

  const users = rex.users
    .filter(user => user.discriminator === discrim)
    .map(user => user.tag);

  hastebin(users.join("\n"), { extension: "txt" })
    .then(haste => {
      let embed = new Discord.RichEmbed()
        .setAuthor("Discrimintor Finder")
        .setDescription(`**[Click Here...](${haste})**`)
        .setTimestamp(Date.now())
        .setColor("BLURPLE")
        .setFooter("Generated..");
      return message.channel.send(embed);
    })
    .catch(error => {
      let embed = new Discord.RichEmbed()
        .setAuthor("Discriminator Finder")
        .setDescription(
          `:x: I can't find users with the discriminator **${discrim}**.`
        )
        .setTimestamp(Date.now())
        .setFooter("Failed..")
        .setColor("#ed0202");
      return message.channel.send(embed);
    });
};

module.exports.help = {
  name: "discrim",
  aliases: ["discriminator"]
};
