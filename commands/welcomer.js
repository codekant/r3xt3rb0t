const db = require("quick.db");

module.exports.run = async (rex, message, args, Discord) => {
  if (!message.member.hasPermission(["MANAGE_GUILD", "ADMINISTRATOR"]))
    return message.channel.send(
      ":x: Oi kidda, you don't have the permissions."
    );
  let c = message.mentions.channels.first();
  if (!c) return message.reply("Mention a channel DUH!");

  db.set(`welcomer_${message.guild.id}`, c.id);
  return message.channel.send(
    `Welcomer channel set to <#${db.fetch(`welcomer_${message.guild.id}`)}>.`
  );
};

module.exports.help = {
  name: "welcomer"
};
