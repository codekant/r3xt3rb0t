const discord = require("discord.js");
const superagent = require("superagent");

exports.run = (rex, message, args) => {
  let user = message.mentions.users.first();
  if (!user) return message.channel.send(":x: Please mention a user.");
  let txt = args.join(" ").slice(22) || "Provide text";

  superagent
    .get("https://nekobot.xyz/api/imagegen")
    .query({
      type: "phcomment",
      username: `${user.username}`,
      image: `${user.displayAvatarURL}`,
      text: `${txt}`
    })
    .end((err, response) => {
      message.channel.send({ file: response.body.message });
    });
};

module.exports.help = {
  name: "phub",
  aliases: ["phcomment", "phubcomment"]
};
