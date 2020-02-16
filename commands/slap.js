const Discord = require("discord.js");
var snekfetch = require("snekfetch");

exports.run = async (rex, message, args) => {
  var user = message.mentions.users.first();
  if (!user) return message.reply("Please specify a user.");
  var avatar = user.displayAvatarURL;
  var url = `https://dankmemer.services/api/slap?avatar1=${message.author.displayAvatarURL}&avatar2=${avatar}`;

  snekfetch
    .get(url, {
      headers: {
        Authorization: process.env.DANKMEMER
      }
    })
    .then(async res => {
      message.channel.send({
        file: res.body
      });
    });
};

module.exports.help = {
  name: "slap",
  aliases: ["batslap"]
};
