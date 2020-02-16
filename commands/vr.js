const Discord = require("discord.js");
var snekfetch = require("snekfetch");

exports.run = async (rex, message, args) => {
  let text = args.join(" ") || "Provide text duh!";
  var url = `https://dankmemer.services/api/vr?&text=${text}`;

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
  name: "vr",
  aliases: []
};
