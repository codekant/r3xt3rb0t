exports.run = async (rex, message, args, Discord) => {
  const embed = new Discord.RichEmbed();
  let lmao = args.join("%20") || "Provide%20Text%20Boii";
  let loltur = Math.floor(Math.random() * 30) + 1;
  message.channel.send(
    embed
      .setTitle("New Minecraft Achievement!")
      .setImage(
        `https://minecraftskinstealer.com/achievement/${loltur}/New%20Achievement!/${lmao}`
      ) //wut cool
      .setColor("BLURPLE")
  );
};

exports.help = {
  name: "minecraft",
  aliases: ["achievement"]
};

//error RIPregards
