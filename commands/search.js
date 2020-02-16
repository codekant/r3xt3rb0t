const db = require("quick.db");
const ms = require("parse-ms");

exports.run = async (rex, message, args, Discord) => {
  let timeout = 1200000;
  let amount = Math.floor(Math.random() * 10) + 70;

  let searcht = await db.fetch(`search_${message.author.id}`);

  if (searcht !== null && timeout - (Date.now() - searcht) > 0) {
    let time = ms(timeout - (Date.now() - searcht));

    message.channel.send(
      `Can you come back after  **${time.minutes}m ${time.seconds}s**?`
    );
  } else {
    var givers = [
      "PewDiePie",
      "Jake",
      "Salman",
      "Dank Memer",
      "MEE6",
      "Anion",
      "WASIF",
      "Zyrouge",
      "Saif",
      "Angryboi",
      "ZKaTeKI",
      "Mira",
      "Alex",
      "Oliy",
      "Memer",
      "Tonkku",
      "iara"
    ];
    let embed = new Discord.RichEmbed()
      .setAuthor(`Searching....`, message.author.displayAvatarURL)
      .setColor(message.member.displayHexColor)
      .setDescription(
        `${message.author}, You found 💵**${amount}** inside **${
          givers[Math.floor(Math.random() * givers.length)]
        }**'s purse'.`
      )
      .addField(
        `Please Read`,
        `Please [Vote Here](https://top.gg/bot/${rex.user.id}) to support me.`
      );

    message.channel.send(embed);
    db.add(`rexcoins_${message.author.id}`, amount);
    db.set(`search_${message.author.id}`, Date.now());
  }
};

module.exports.help = {
  name: "search",
  aliases: []
};
