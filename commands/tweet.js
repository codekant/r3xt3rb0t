const discord = require("discord.js");
const superagent = require("superagent");

exports.run = (rex, message, args) => {
  let username = args.shift();
  let txt = args.join(" ") || "Provide text";

  superagent
    .get("https://nekobot.xyz/api/imagegen")
    .query({ type: "tweet", username: `${username}`, text: `${txt}` })
    .end((err, response) => {
      message.channel.send({ file: response.body.message });
    });
};

module.exports.help = {
  name: "tweet",
  aliases: []
};
