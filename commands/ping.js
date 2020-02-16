exports.run = async (rex, message, args, Discord) => {
  const embed = new Discord.RichEmbed();
  message.channel.send(`Pinging...`).then(msg => {
    msg.edit(
      embed
        .setTitle("Pong!")
        .setDescription(
          `**Bot Latency:** \`${Math.floor(
            msg.createdTimestamp - message.createdTimestamp
          )}ms\` \n**API Latency:** \`${Math.floor(rex.ping)}ms\``
        )
        .setColor("BLURPLE")
    );
  });
};

exports.help = {
  name: "ping",
  aliases: ["pong"]
};

//error RIP
