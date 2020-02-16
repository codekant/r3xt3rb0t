const calculate = require("mathjs");
const { RichEmbed } = require("discord.js");

exports.run = async (rex, message, args, Discord) => {
  let equation = args.join(" ");
  if (message.content.includes("÷"))
    return message.channel.send("Please use `/` instead of `÷` for Division!");
  //f(isNaN(equation)) return message.channel.send('Please provide a valid equation');
  if (!equation) return message.channel.send(`Please provide an equation`);
  try {
    let resp = await calculate.eval(`${equation}`);
    let embed = new RichEmbed()
      .setTitle("Math Equation")
      .setColor("BLURPLE")
      .addField(`Question`, `\`\`\`js\n${args.join("")}\`\`\``)
      .addField(`Answer`, `\`\`\`js\n${resp}\`\`\``);
    message.channel.send(embed);
  } catch (e) {
    return message.channel.send(":x: Please provide an valid equation");
  }
};

exports.help = {
  name: "calculate",
  aliases: ["calc", "solve"]
};
