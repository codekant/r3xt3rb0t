const db = require("quick.db");

module.exports.run = async (rex, message, args, Discord) => {
  let money = db
    .all()
    .filter(data => data.ID.startsWith(`rexcoins`))
    .sort((a, b) => b.data - a.data);

  money.length = 10;
  var finalLb = "";
  var i = 0;
  let indexnum = 0;
  for (i in money) {
    finalLb += `**${++indexnum}) ${
      rex.users.get(money[i].ID.split("_")[1]).tag
    }** - **${money[i].data} **<:rexcoin:638368847488876554>\n`;
  }

  const embed = new Discord.RichEmbed()
    .setAuthor(`Leaderboard!`, message.guild.iconURL)
    .setColor(message.member.displayHexColor)
    .setDescription(finalLb)
    .setFooter(rex.user.tag, rex.user.displayAvatarURL)
    .setTimestamp();
  message.channel.send(embed);
};

module.exports.help = {
  name: "rich",
  aliases: []
};
