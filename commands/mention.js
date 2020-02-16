module.exports = {
  run: async (rex, message, args, Discord) => {
    if (!message.member.hasPermission("ADMINISTRATOR"))
      return message.channel.send(
        `:x: You need **ADMINISTRATOR** permission to use this command.`
      );

    if (!args.join(" "))
      return message.channel.send(
        ":x: Please provide rolename. Ex: [prefix]mention members"
      );

    let role =
      message.guild.roles.find(
        m => m.name.toLowerCase() === args.join(" ").toLowerCase()
      ) ||
      message.guild.roles.find(m =>
        m.name.toLowerCase().includes(args.join(" "))
      );
    if (!role) return message.channel.send("❌ I can't find that role.");

    if (
      message.guild.me.highestRole.comparePositionTo(role) <= 0 &&
      message.member.id !== message.guild.ownerID
    )
      return message.channel.send(
        ":x: I dont have permissions to manage that role!"
      );

    if (message.member.highestRole.comparePositionTo(role) <= 0)
      return message.channel.send(":x: You cant play with that role!");

    message.delete();
    if (!role.mentionable) {
      await role
        .setMentionable(true)
        .then(
          message.channel.send(
            `${message.author.tag} mentioned ${role.toString()}`
          )
        )
        .then(await role.setMentionable(false));
      return;
    }
    return message.channel.send(
      `${message.author.tag} mentioned ${role.toString()}`
    );
  },

  help: {
    name: "mention",
    aliases: ["roleping", "menrole"]
  }
};
