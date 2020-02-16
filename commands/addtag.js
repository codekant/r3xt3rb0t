const db = require("quick.db");
let id = "1234567890".split("");

exports.run = async (rex, message, args, Discord) => {
  const embed = new Discord.RichEmbed();
  let i = randomNum(16);
  i = 6 + i;
  if (!message.member.hasPermission(["MANAGE_GUILD", "ADMINISTRATOR"])) return;
  if (!args[0] || !args[1])
    return message.channel.send(
      embed
        .setDescription(
          "Correct Usage: `" + rex.prefix + "addtag <tag name> <content>`"
        )
        .setColor("#ed0202")
    );
  let construct = {
    name: rex.prefix + args[0].toLowerCase(),
    id: i,
    message: args.slice(1).join(" ")
  };

  await db.set(
    `guildTags_${rex.prefix}${args[0].toLowerCase()}_${message.guild.id}`,
    construct
  );
  await db.set(`guildTagsID_${i}_${message.guild.id}`, construct);
  message.channel.send(
    embed
      .setDescription(
        `<:greentick:624962152502919169> Added tag ${args[0]} with id ${i}`
      )
      .setColor("#0bd644")
  );
};

exports.help = {
  name: "addtag",
  aliases: []
};

function randomNum(len) {
  const result = [];
  for (let x = 0; x < len; x++)
    result.push(id[Math.floor(Math.random() * id.length)]);
  return result.join("");
}
