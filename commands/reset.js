module.exports = {
  run: async (rex, message, args, Discord) => {
    const embed = new Discord.RichEmbed();
    const db = require("quick.db");
    if (!message.member.hasPermission(["MANAGE_GUILD", "ADMINISTRATOR"]))
      return message.channel.send(
        ":x: Oi kidda, you don't have the permissions."
      );
    rex.settings.delete(message.guild.id);
    message.channel.send(
      embed
        .setTitle(`Settings Reset!`)
        .setDescription(`Settings of this guild has been reset successfully!`)
        .setColor("BLURPLE")
    );
  },

  help: {
    name: "resetprefix",
    aliases: []
  }
};
