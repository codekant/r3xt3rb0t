const Discord = require("discord.js");
const Canvas = require("canvas");

module.exports.run = async (rex, message, args, Discord) => {
  let user = message.mentions.users.first() || message.author;

  const canvas = Canvas.createCanvas(244, 253);
  const ctx = canvas.getContext("2d");

  const background = await Canvas.loadImage(
    "https://cdn.glitch.com/33fa09a9-db1a-43a0-8743-7e71b43ac2c3%2Fframe.png?v=1568963240515"
  );
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

  ctx.strokeRect(0, 0, canvas.width, canvas.height);

  const avatar = await Canvas.loadImage(user.displayAvatarURL);
  ctx.drawImage(avatar, 25, 25, 200, 200);

  const attachment = new Discord.Attachment(canvas.toBuffer(), "frame.png");
  message.channel.send(attachment);
};

module.exports.help = {
  name: "frame",
  aliases: ["frameit"]
};
