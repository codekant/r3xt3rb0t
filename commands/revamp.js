module.exports = {
  help: {
    name: "revamp",
    aliases: []
  },

  run: async (rex, message, args, Discord) => {
    if (
      !message.member.hasPermission([
        "MANAGE_GUILD",
        "ADMINISTRATOR",
        "MANAGE_CHANNELS"
      ])
    )
      return;
    if (
      !message.guild.me.hasPermission([
        "MANAGE_GUILD",
        "ADMINISTRATOR",
        "MANAGE_CHANNELS"
      ])
    )
      return message.channel.send("Make Sure I have Enough Permissions...");
    if (!args[0]) {
      message.guild.channels.forEach(r => {
        r.overwritePermission(message.guild.defaultRole, {
          READ_MESSAGES: false
        });
        //Don't put the message.channel.send thingy inside here k?
      });
      let embed = new Discord.RichEmbed()
        .setTitle("Revamped!")
        .setColor("BLURPLE")
        .setDescription(
          "**<:greentick:624962152502919169> I Have Hidden All The Channels In This Guild, You May Do Your Revamp...If You Want To Undo It, Do **" +
            `**${rex.prefix}revamp disable**`
        );
      return message.channel.send(embed);
    } else if (args[0].toLowercase() === "disable") {
      message.guild.channels.forEach(r => {
        r.overwritePermission(message.guild.defaultRole, {
          READ_MESSAGE: null
        });
        //Don't put the message.channel.send thingy inside here k?
      });
      let embed = new Discord.RichEmbed()
        .setTitle("Revamp")
        .setColor("BLURPLE")
        .setDescription(
          "** <:greentick:624962152502919169> I Have Successfully made All The Channels visible In This Guild"
        );
      return message.channel.send(embed);
    }
  }
};
