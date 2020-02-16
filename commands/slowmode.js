module.exports = {
  help: {
    name: "slowmode",
    aliases: ["sm", "ratelimit"]
  },

  run: async (rex, message, args, Discord) => {
    // handler is changed by Zyrouge, Yeah it is bugged
    const ms = require("ms");
    let channel = message.mentions.channels.first() || message.channel;
    if (!message.member.hasPermission("KICK_MEMBERS"))
      return channel.send(
        "You need **KICK_MEMBERS*** Permission To Use This Command!"
      );
    if (!message.guild.me.hasPermission("MANAGE_CHANNELS"))
      return message.channel.send("I don't have enough Permissions...");
    if (!args[0])
      return message.channel.send(
        ":x: Incorrect Usage\nCorrect Usage: " +
          rex.prefix +
          "slowmode enable [time] or " +
          rex.prefix +
          "slowmode disable"
      ); //oki?//ok
    //Case sensitive, kek
    if (args[0].toLowerCase() === "enable") {
      if (!args[1])
        return message.channel.send(
          ":x: Incorrect Usage\nCorrect Usage: " +
            rex.prefix +
            "slowmode enable [time] or " +
            rex.prefix +
            "slowmode disable"
        );
      let data = ms(args[1]);
      let time = data / 1000;
      //return console.log(time);
      if (time > 21600)
        return message.channel.send(
          "You can't add slowmode for more than 6 hours!"
        );
      channel.setRateLimitPerUser(time);
      return message.channel.send(
        "**Successfully Set Slowmode to " +
          `${args[0]}` +
          "s in " +
          channel +
          ".**"
      );
    } else if (args[0].toLowerCase() === "disable") {
      channel.setRateLimitPerUser(0);
      return message.channel.send(
        "**Successfully disabled slowmode in **" + channel
      );
    } // fix something to make it beautiful, ima update music thinga
  } //I'll try to make my own cmd, cool
};
