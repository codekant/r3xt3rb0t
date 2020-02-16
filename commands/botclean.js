module.exports.run = async (rex, message, args, Discord) => {
  // added botclean
  console.log(message);
  if (!message.member.hasPermission("MANAGE_MESSAGES"))
    return message.channel.send(
      ":x: You don't have permission to use this command."
    );
  if (!message.guild.me.hasPermission("MANAGE_MESSAGES"))
    return message.channel.send(
      ":x: I am missing `MANAGE_MESSAGES` permission."
    );

  let msg = message;
  const amount = 100;
  message.delete();

  await msg.channel.fetchMessages({ limit: amount }).then(messages => {
    const botMessages = messages.filter(msg => msg.author.bot);
    msg.channel.bulkDelete(botMessages);
  });
};

module.exports.help = {
  name: "bc",
  aliases: ["bc", "botpurge"]
};
