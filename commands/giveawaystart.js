const Discord = require("discord.js");
const giveaways = require("discord-giveaways");
const ms = require("ms");

exports.run = async (rex, message, args, Discord) => {
  if (!message.member.hasPermission("MANAGE_GUILD"))
    return message.channel.send(
      ":x: You don't have `MANAGE_GUILD` permission to use this command."
    );
  if (!args[0] || !args[1] || !args.slice(1).join(" "))
    return message.reply(
      "Correct usage: `r$giveaway [time] [winner] [Awesome prize]`."
    );

  giveaways
    .start(message.channel, {
      time: ms(args[0]),
      prize: args.slice(2).join(" "),
      winnersCount: parseInt(args[1]),
      messages: {
        giveaway: "🎉🎉 **GIVEAWAY** 🎉🎉\n\n",
        giveawayEnded: "🎉🎉 **GIVEAWAY ENDED** 🎉🎉\n\n",
        timeRemaining: "Time Left: **{duration}**!",
        inviteToParticipate: 'React with "🎉" to participate!',
        winMessage: "🎉🎉Congratulations {winners}, You won **{prize}**!🎉🎉",
        embedFooter: "Giveaways",
        noWinner: "Nobody reacted, winners couldn't be determined!",
        winners: "winner(s)",
        endedAt: "Ended at",
        units: {
          seconds: "seconds",
          minutes: "minutes",
          hours: "hours",
          days: "days"
        }
      }
    })
    .then(gData => {
      console.log(gData);
    });
  message.delete();
};

module.exports.help = {
  name: "giveawaystart",
  aliases: ["giveaway", "startgiveaway", "gstart"]
};
