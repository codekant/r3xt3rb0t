const Discord = require("discord.js");
var snekfetch = require("snekfetch");

exports.run = async (rex, message, args) => {
  var user = message.mentions.users.first() || message.author;
  var avatar = user.displayAvatarURL;
  var url = `https://dankmemer.services/api/roblox?avatar1=${avatar}`;

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
  name: "roblox",
  aliases: ["robloxav"]
};
