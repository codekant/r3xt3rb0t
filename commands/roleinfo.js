"use strict";

module.exports = {
  help: {
    name: "role-info"
  },
  run: async (rex, message, args, Discord) => {
    let errormsg = "**Correct Usage: " + rex.prefix + "role-info <role>**";
    if (!args[0]) return message.channel.send(errormsg);

    try {
      let role =
        message.mentions.roles.first() ||
        message.guild.roles.find(r => r.id === args[0].toLowerCase()) ||
        message.guild.roles.find(
          r => r.name.toLowerCase() === args[0].toLowerCase()
        ) ||
        message.guild.roles.find(r =>
          r.name.toLowerCase().includes(args[0].toLowerCase())
        );
      if (!role) return message.channel.send(`Couldn't find role`);
      let embed = new Discord.RichEmbed()
        .setTitle("Role Info")
        .setColor(role.hexColor)
        .addField("Role Name", `**${role.name}**`, true)
        .addField("Role Color", role.hexColor, true)
        .addField("ID", role.id, true)
        .addField("Created At", role.createdAt, true);
      message.channel.send(embed);
    } catch (e) {
      message.channel.send(`Error!!! **${e.message}**`);
    }
  }
};
