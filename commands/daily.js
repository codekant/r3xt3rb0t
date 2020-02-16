const db = require("quick.db");
const ms = require("parse-ms");

exports.run = async (rex, message, args, Discord) => {
  let timeout = 86400000;
  let amount = Math.floor(Math.random() * 250) + 500;

  let dailyt = await db.fetch(`daily_${message.author.id}`);

  if (dailyt !== null && timeout - (Date.now() - dailyt) > 0) {
    let time = ms(timeout - (Date.now() - dailyt));

    message.channel.send(
      `I am not Bill Gates! Please come back after  **${time.hours}h ${time.minutes}m ${time.seconds}s**.`
    );
  } else {
    let embed = new Discord.RichEmbed()
      .setAuthor(`Daily Coins`, message.author.displayAvatarURL)
      .setColor(message.member.displayHexColor)
      .setDescription(
        `${message.author}, you earned <:coin2:637507020882444308>**${amount}** as a daily coins.`
      )
      .addField(
        `Please Read`,
        `Please [Vote Here](https://top.gg/bot/${rex.user.id}) to support me.`
      );

    message.channel.send(embed);
    db.add(`rexcoins_${message.author.id}`, amount);
    db.set(`daily_${message.author.id}`, Date.now());
  }
};

module.exports.help = {
  name: "daily",
  aliases: []
};
