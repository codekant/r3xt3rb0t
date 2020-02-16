const Discord = require("discord.js");
var snekfetch = require("snekfetch");

exports.run = async (rex, message, args) => {
  var user = message.mentions.users.first();
  if (!user) user = message.author;
  var avatar = user.displayAvatarURL;
  var url = `https://dankmemer.services/api/hitler?avatar1=${avatar}`;

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
  name: "hitler",
  aliases: []
};
