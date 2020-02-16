exports.run = async (rex, message, args, Discord) => {
  let client = rex;
  const ids = {
    XENO: "480933736276426763",
    ZKATEKI: "544922024301297691",
    SAIF: "577955222194880522",
    ZYROUGE: "521007613475946496"
  };
  if (
    message.author.id !== ids.XENO &&
    message.author.id !== ids.ZYROUGE &&
    message.author.id !== ids.SAIF &&
    message.author.id !== ids.ZKATEKI
  )
    return;
  //fixed eval problem
  else {
    const evalargs = message.content.split(" ").slice(1);
    try {
      const code = evalargs.join(" ");
      let evaled = eval(code);
      const eargs = args.join(" ");

      if (typeof evaled !== "string") evaled = require("util").inspect(evaled);

      const embed = new Discord.RichEmbed()
        .setTitle("Output 📤")
        .setDescription(` \`\`\`${clean(evaled)}\`\`\` `, { code: "xl" })
        .addField("Input 📥", ` \`\`\`${eargs}\`\`\` `)
        .setColor(message.guild.me.displayHexColor);
      message.channel.send(embed);
    } catch (err) {
      const eargs = args.join(" ");
      const errorembed = new Discord.RichEmbed()
        .setColor(message.guild.me.displayHexColor)
        .setTitle("Error 🗳️")
        .addField("Output 📤", ` \`\`\`xl\n${clean(err)}\n\`\`\``)
        .addField("Input 📥", ` \`\`\`${eargs}\`\`\` `);
      message.channel.send(errorembed);
    }
  }
};

exports.help = {
  name: "eval",
  aliases: ["ev"]
};

function clean(text) {
  if (typeof text === "string")
    return text
      .replace(/`/g, "`" + String.fromCharCode(8203))
      .replace(/@/g, "@" + String.fromCharCode(8203));
  else return text;
}
