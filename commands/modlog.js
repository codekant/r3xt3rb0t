module.exports = {
  help: {
    name: "modlog",
    aliases: ["logs", "setmodlogs"]
  },

  run: async (rex, message, args, Discord) => {
    const enmap = require("enmap");

    if (!message.member.hasPermission(["ADMINISTRATOR", "MANAGE_GUILD"]))
      return undefined;
    //An array of permissions
    let channel =
      message.mentions.channels.first() ||
      message.guild.channels.find(r => r.id === args[0]) ||
      message.guild.channels.find(r => r.name.toLowerCase() === args[0]);
    if (!channel)
      return message.channel.send(
        "**Correct Usage: " + rex.prefix + "modlog <desired channel>**"
      );
    rex.settings.set(message.guild.id, "logging", channel.id);
    message.channel.send(
      new Discord.RichEmbed()
        .setDescription(
          `<a:verified:605807244445089844> **Successfully Set Modlogs To <#${channel.id}>**`
        )
        .setColor("BLURPLE")
    );
  }
};
