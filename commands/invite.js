exports.run = async (rex, message, args, Discord) => {
  const embed = new Discord.RichEmbed();
  message.channel.send(
    embed
      .setTitle("Invite")
      .setDescription(
        `**[Invite Bot](https://r3xt3r.glitch.me/invite)** \n**[Support Server](https://discord.gg/CUy6qNs)**`
      )
      .setThumbnail(
        "https://cdn.discordapp.com/attachments/624877003493081099/625033199763849216/1020_Thinking_SpinningReverse.gif"
      )
      .setColor("BLURPLE")
  );
};

exports.help = {
  name: "invite",
  aliases: ["bot", "support"]
};

//error RIP
