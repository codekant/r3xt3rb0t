const db = require("quick.db");
const ms = require("parse-ms");

exports.run = async (rex, message, args, Discord) => {
  let timeout = 2.7e6;
  let amount = Math.floor(Math.random() * 50) + 200;

  let workt = await db.fetch(`work_${message.author.id}`);
  var jobs = [
    "Pornstar",
    "Dishwasher",
    "Memer",
    "Shit eater",
    "YouTuber",
    "Developer",
    "Musician",
    "Professional sleeper",
    "Teacher",
    "Scientist",
    "Baby maker",
    "Twitch Streamer",
    "Twitch Pornstar",
    "StickAnimator",
    "Strict Math Teacher",
    "Tik Toker",
    "C.E.O",
    "Drug Dealer",
    "Discord Dev",
    "Programmer",
    "Servant",
    "Pervert",
    "Prostitute",
    "Cook",
    "Manager",
    "Dell Manager",
    "WholeSalesMan",
    "Murederer",
    "Theif"
  ];
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
    "iara",
    "ZKaTeKI",
    "Ryan.js"
  ];
  var users = Math.floor(Math.random() * givers.length);
  var job = Math.floor(Math.random() * jobs.length);
  if (workt !== null && timeout - (Date.now() - workt) > 0) {
    let time = ms(timeout - (Date.now() - workt));

    message.channel.send(
      `:x: You think I'm rich? Kidda come back after **${time.minutes}m ${time.seconds}s** to get daily coins again.`
    );
  } else {
    let embed = new Discord.RichEmbed()
      .setAuthor(`Work`, message.author.displayAvatarURL)
      .setColor(message.member.displayHexColor)
      .setDescription(
        `You worked as a **${jobs[job]}** for **${givers[users]}** and earned <:rexcoin:638368847488876554>**${amount}**!`
      );

    let ran = Math.floor(Math.random() * 100);

    if (ran < 50 && ran >= 40) {
      embed.addField(
        `Read please`,
        `You can [Vote Here](https://top.gg/bot/${rex.user.id}) to support me!`
      );
    }
    message.channel.send(embed);
    db.add(`rexcoins_${message.author.id}`, amount);
    db.set(`work_${message.author.id}`, Date.now());
  }
};

module.exports.help = {
  name: "work",
  aliases: []
};
