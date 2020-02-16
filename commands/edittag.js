module.exports = {
  help: {
    name: "edit-tag",
    aliases: ["edit-tag"]
  },

  run: async (rex, message, args, Discord) => {
    const embed = new Discord.RichEmbed();
    const db = require("quick.db"); //Okay! // lol k lemme do something else enjoy!
    if (!message.member.hasPermission(["MANAGE_GUILD", "ADMINISTRATOR"]))
      return; //ok nice
    if (!args[0] || !args[1])
      return message.channel.send(
        "Correct Usage: " + rex.prefix + "edittag <tag name> <tag new content>"
      );
    let check = await db.fetch(
      `guildTags_${rex.prefix}${args[0].toLowerCase()}_${message.guild.id}`
    );
    let idCheck = await db.fetch(`guildTagsID_${args[0]}_${message.guild.id}`);

    try {
      if (check) {
        let construct = {
          name: rex.prefix + args[0].toLowerCase(),
          id: check.id,
          message: args.join(" ").slice(1)
        };
        await db.set(
          `guildTags_${rex.prefix}${args[0].toLowerCase()}_${message.guild.id}`,
          construct
        );
        message.channel.send(
          embed
            .setDescription(
              `<:greentick:624962152502919169> Edited tag ${check.name.slice(
                rex.prefix.length
              )}`
            )
            .setColor("#0bd644")
        );
      } else if (idCheck) {
        let construct = {
          name: idCheck.name,
          id: idCheck.id,
          message: args.join(" ").slice(1)
        };
        await db.set(`guildTagsID_${args[0]}_${message.guild.id}`, construct);
        await db.set(
          `guildTags_${rex.prefix}${idCheck.name}_${message.guild.id}`,
          construct
        );
        message.channel.send(
          embed
            .setDescription(
              `<:greentick:624962152502919169> Edited tag ${idCheck.name.slice(
                rex.prefix.length
              )}`
            )
            .setColor("#0bd644")
        );
      }
    } catch (e) {
      message.channel.send(e.message);
    }
  }
};
