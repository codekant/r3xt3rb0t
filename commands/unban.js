exports.run = async (rex, message, args, Discord) => {
  if (!message.member.hasPermission("BAN_MEMBERS")) return;
  if (!args[0]) return message.channel.send("Cmon bruh provide an ID");
  //if(! message.guild.me.hasPermission('BAN_MEMBERS')) return message.channel.send('I don\'t have enough permissions')
  let bannedMember = await rex.fetchUser(args[0]);
  if (!bannedMember) return message.channel.send("Please provide a ID");
  let reason = args[1];
  if (!reason) reason = "No reason provided";
  if (!message.guild.me.hasPermission("BAN_MEMBERS"))
    return message.channel.send("I dont have enough permissions");

  try {
    message.guild.unban(bannedMember, { reason: reason });
    message.channel.send(
      `<a:verified:605807244445089844> **Successfully unbanned ${bannedMember.tag}**`
    );
  } catch (e) {
    console.log(e.message);
  }
};

exports.help = {
  name: "unban",
  ailases: ["undoban"]
};
