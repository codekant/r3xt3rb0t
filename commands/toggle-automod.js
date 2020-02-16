module.exports = {
  help: {
    name: "automod"
  },
  run: async (rex, message, args, Discord) => {
    if (!message.member.hasPermission(["MANAGE_GUILD", "ADMINISTRATOR"]))
      return;
    const db = require("quick.db");
    let check = await db.fetch(`automod_${message.guild.id}`);
    if (check === null) {
      await db.set(`automod_${message.guild.id}`, true);
      return message.channel.send(
        "**Successfully Toggled Automod for This Guild**"
      );
    } else {
      await db.delete(`autmod_${message.guild.id}`);
      return message.channel.send(
        "**Successfully Disabled Automod for This Guild**"
      );
    }
  }
};
