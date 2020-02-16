const Discord = require("discord.js");
var snekfetch = require("snekfetch");

exports.run = async (rex, message, args, Discord) => {
  var user = message.mentions.users.first() || message.author;
  var avatar = user.displayAvatarURL;
  var url = `https://dankmemer.services/api/satan?avatar1=${avatar}`;

  snekfetch
    .get(url, {
      headers: {
        Authorization: process.env.DANKMEMER
      }
    })
    .then(async res => {
      const attachment = new Discord.Attachment(res.body, "satan.png");
      message.channel.send(attachment);
    });
};

module.exports.help = {
  name: "satan",
  aliases: ["stn"]
};
