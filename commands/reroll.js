const Discord = require("discord.js");
const giveaways = require("discord-giveaways");
const ms = require("ms");

exports.run = async (rex, message, args, Discord) => {
  if (!message.member.hasPermission("MANAGE_GUILD"))
    return message.channel.send(
      ":x: You don't have `MANAGE_GUILD` permission to use this command."
    );
  if (!args[0]) return message.reply("Correct usage: `r$reroll [giveawayid]`.");
  let messageID = args[0];
  giveaways
    .reroll(messageID, {
      congrat:
        "🎉🎉 Congratulations **{winners}**, You are the new winner(s)! 🎉🎉",
      error: "Nobody reacted, winners couldn't be determined!"
    })
    .catch(err => {
      message.channel.send(
        ":x: No giveaway found for ``" + messageID + "``! Please try again."
      );
    });
  message.delete();
};

module.exports.help = {
  name: "reroll",
  aliases: ["greroll"]
};
