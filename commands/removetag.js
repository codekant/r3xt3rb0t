exports.run = async (rex, message, args, Discord) => {
  if (!message.member.hasPermission(["MANAGE_GUILD", "ADMINISTRATOR"])) return;
  const db = require("quick.db");
  const embed = new Discord.RichEmbed();
  if (!args[0])
    return message.channel.send(
      "Correct usage: " + rex.prefix + "removetag <tag name or id>"
    );
  let check = await db.fetch(
    `guildTags_${rex.prefix}${args[0].toLowerCase()}_${message.guild.id}`
  );
  let idCheck = await db.fetch(`guildTagsID_${args[0]}_${message.guild.id}`);
  if (check) {
    await db.delete(
      `guildTags_${rex.prefix}${args[0].toLowerCase()}_${message.guild.id}`
    );
    message.channel.send(
      embed
        .setDescription(
          `<:greentick:624962152502919169> Deleted Tag ${check.name.slice(
            rex.prefix.length
          )}`
        )
        .setColor("#0bd644")
    );
  } else if (idCheck) {
    await db.delete(
      `guildTags_${rex.prefix}${args[0].toLowerCase()}_${message.guild.id}`
    );
    await db.delete(`guildTagsID_${args[0]}_${message.guild.id}`);
    message.channel.send(
      embed
        .setDescription(
          `<:greentick:624962152502919169> Deleted Tag ${idCheck.name.slice(
            rex.prefix.length
          )}`
        )
        .setColor("#0bd644")
    );
  } else
    message.channel.send(
      embed
        .setDescription(`<:redtick:624962249924280320> Tag Doesn't exist`)
        .setColor("#ff0318")
    );
};

exports.help = {
  name: "removetag",
  aliases: ["rtag", "deletetag", "deltag"]
};
