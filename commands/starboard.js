const db = require("quick.db");
const Discord = require("discord.js");

exports.run = async (client, message, args) => {
  if (!args[0]) {
    const embed = new Discord.RichEmbed()
      .setAuthor("STARBOARD", message.guild.iconURL)
      .addField(
        "enable",
        "Enable Starboard. Usage: `[prefix]starboard enable #channel`."
      )
      .addField(
        "disable",
        "Disable Starboard. Usage: `[prefix]starboard disable`."
      )
      .setColor("RANDOM");
    return message.channel.send(embed);
  }
  if (args[0] === "enable") {
    if (!message.member.hasPermission("MANAGE_GUILD"))
      return message.channel.send(
        ":x: You need `MANAGE_GUILD` permissions to use this command."
      );
    let channel1 = message.mentions.channels.first();
    if (!channel1)
      return message.channel.send(
        ":x: Invalid parameters! Usage:" +
          `[prefix]starboard enable #channel` +
          "."
      );

    db.set(`starboard_${message.guild.id}`, channel1.id);
    let cnl = await db.fetch(`starboard_${message.guild.id}`);
    return message.channel.send("Starboard channel set to **<#" + cnl + ">**.");
  }
  if (args[0] === "disable") {
    if (!message.member.hasPermission("MANAGE_GUILD"))
      return message.channel.send(
        ":x: You need `MANAGE_GUILD` permissions to use this command."
      );
    db.delete(`starboard_${message.guild.id}`);
    return message.channel.send(
      "Starboard channel has been disabled for this server."
    );
  }
};
module.exports.help = {
  name: "starboard"
};
