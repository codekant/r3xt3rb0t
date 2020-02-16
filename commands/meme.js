const weird = require("weirdapi.js");
const Discord = require("discord.js");

module.exports.run = async (rex, message, args, Discord) => {
  let meme = await weird.meme();
  let em = new Discord.RichEmbed()
    .setAuthor("Random Memes")
    .setImage(meme)
    .setFooter(message.author.tag, message.author.displayAvatarURL)
    .setColor("RANDOM");
  return message.channel.send(em);
};

module.exports.help = {
  name: "meme",
  aliases: ["memes"]
};
