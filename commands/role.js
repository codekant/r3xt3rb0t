exports.run = async (rex, message, args, Discord) => {
  //if(!message.guild.me.hasPermission(['MANAGE_ROLES', 'ADMINISTRATOR'])) return message.channel.send('I don\'t have enough Permissions');
  let user =
    message.mentions.members.first() ||
    message.guild.members.get(args[0]) ||
    message.guild.members.find(
      r => r.name.toLowerCase() === args[0].toLowerCase()
    );
  if (!args[0] || args[1])
    return message.channel.send(
      "Correct Usage: " + rex.prefix + "role <user> <role>"
    );
  let role =
    message.mentions.role.first() ||
    message.guild.roles.get(args[1]) ||
    message.guild.roles.find(
      r => r.name.tOlowerCase === args[1].toLowerCase()
    ) ||
    message.guild.roles.find(r => r.name.toLowerCase().includes(args[1]));
  if (!role)
    return message.channel.send(
      "Correct Usage: " + rex.prefix + "role <user> <role>"
    );
  if (role === null) return message.channel.send("Couldn't find role");
  if (args[0].toLowerCase() === "all") {
    message.guild.members.forEach(async member => {
      await member.addRole(role);
      //Don't add the message thingy here
    });
    message.channel.send(
      "Added Role " +
        role.name +
        " to " +
        message.guild.memberCount +
        " members"
    );
  }
  if (!user) return message.channel.send("You need to mention a user!");
  if (user.roles.has(r => r.id === role.id)) {
    await user.removeRole(role);
    message.channel.send(
      "** Successfully Removed " + role.name + " to " + user.user.displayName
    );
  } else {
    await user.addRole(role);
    message.channel.send(
      "** Successfully Added " + role.name + " to " + user.user.displayName
    );
  }
};

module.exports.help = {
  name: "role",
  aliases: []
};
