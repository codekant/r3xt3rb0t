"use-strict";

module.exports = {
  help: {
    name: "softban"
  },
  run: async (rex, message, args, Discord) => {
    if (message.member.hasPermission("BAN_MEMBERS") === false) return;
    if (!args[0])
      return message.channel.send(
        "**Invalid Parameters!\nCorrect Usage: " +
          rex.prefix +
          "softban <id | tag | mention> <reason>**"
      );
    let user =
      message.mentions.members.first() ||
      message.guild.members.get(args[0]) ||
      message.guild.members.find(r => r.tag.toLowerCase() === args[0]);
    if (!user)
      return message.channel.send(
        "**Invalid Parameters!\nCorrect Usage: " +
          rex.prefix +
          "softban <id | tag | mention> <reason>**"
      );
    let reason = args.slice(1).join(" ");
    if (!reason) reason = "No reason given";
    if (!message.guild.me.hasPermissions("BAN_MEMBERS"))
      return message.channel.send("I Do Not Have Enough Permissions");
    message.guild.ban(user, { days: 7, reason: reason });
  }
};
