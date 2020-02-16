exports.run = (rex, message, args) => {
  const Discord = require("discord.js");
  const embed = new Discord.RichEmbed();
  const txt = args.join(" ");
  function rexball() {
    var rand = [
      "Yes",
      "No",
      "Why are you even trying?",
      "What do you think? NO",
      "Maybe",
      "Never",
      "Yep, but why ask me???",
      "that's not happening",
      "Dare Not question me that again!",
      "maybe.",
      "propably yea.",
      "kak maybe yesh",
      "LuL what do you think thats an avbio"
    ];

    return rand[Math.floor(Math.random() * rand.length)];
  }
  message.channel.send(
    embed
      .setTitle(":8ball: Contacted 8Ball")
      .setThumbnail(
        "https://cdn.discordapp.com/attachments/624879891656998912/626761703203274795/8ball.jpg"
      )
      .addField("Question:", `**${txt}**`)
      .addField("8Ball Says:", `**${rexball()}**`)
      .setColor("BLURPLE")
      .setTimestamp(Date.now())
  );
};

exports.help = {
  name: "8ball",
  aliases: ["eightball"]
};
