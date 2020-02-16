const Discord = require("discord.js");
var snekfetch = require("snekfetch");

exports.run = async (rex, message, args) => {
  var user = message.mentions.users.first();
  if (!user) {
    var avatar = message.author.displayAvatarURL;
    let text = args.join(" ") || "Provide text duh!";
    var url = `https://dankmemer.services/api/youtube?avatar1=${avatar}&username1=${message.author.username}&text=${text}`;

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
  }
  var avatar = user.displayAvatarURL;
  let text = args.join(" ").slice(22) || "Provide text duh!";
  var url = `https://dankmemer.services/api/youtube?avatar1=${avatar}&username1=${user.username}&text=${text}`;

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
  name: "youtubecomment",
  aliases: ["ytcomment", "youtube"]
};
