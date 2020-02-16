const db = require("quick.db");
const ms = require("parse-ms");

exports.run = async (rex, message, args, Discord) => {
  let timeout = 60000;
  let amount = Math.floor(Math.random() * 10) + 70;

  let begt = await db.fetch(`beg_${message.author.id}`);

  if (begt !== null && timeout - (Date.now() - begt) > 0) {
    let time = ms(timeout - (Date.now() - begt));

    message.channel.send(
      `Begon Thot! Please come back after  **${time.minutes}m ${time.seconds}s**.`
    );
  } else {
    var givers = [
      "PewDiePie",
      "Jake",
      "Salman",
      "Purse",
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
      "iara",
      "ZyroBots",
      "Melmsie",
      "Nevule",
      "Jake Paul",
      "<evie.codes>",
      "Discord",
      "Your Mum",
      "Daddy",
      "Grandpa",
      "Uncle Zy",
      "R3XT3R",
      "Bro",
      "Sister",
      "XENO",
      "Kokktur",
      "Beggar",
      "Caitlyn",
      "Papa"
    ];
    let embed = new Discord.RichEmbed()
      .setAuthor(`Begon Thot`, message.author.displayAvatarURL)
      .setColor(message.member.displayHexColor)
      .setDescription(
        `${message.author}, **${
          givers[Math.floor(Math.random() * givers.length)]
        }** gave you <:rexcoin:638368847488876554>**${amount}**.`
      )
      .addField(
        `Please Read`,
        `Please [Vote Here](https://top.gg/bot/${rex.user.id}) to support me.`
      );

    message.channel.send(embed);
    db.add(`rexcoins_${message.author.id}`, amount);
    db.set(`beg_${message.author.id}`, Date.now());
  }
};

module.exports.help = {
  name: "beg",
  aliases: []
};
