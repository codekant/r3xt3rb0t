const Discord = require("discord.js");
var snekfetch = require("snekfetch");

exports.run = async (rex, message, args, Discord) => {
  var user = message.author;
  var avatar = user.displayAvatarURL;
  let text = args.join(" ") || "Provide text duh!";
  var url = `https://dankmemer.services/api/quote?avatar1=${avatar}&username1=${user.username}&text=${text}`;

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
  name: "discordsay",
  aliases: ["discord", "quote"]
};
