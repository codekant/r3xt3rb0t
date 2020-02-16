const Discord = require("discord.js");
const Canvas = require("canvas");
const request = require("node-superfetch");
const { greyscale } = require("../util/Canvas");

module.exports.run = async (rex, message, args, Discord) => {
  let user = message.mentions.users.first() || message.author;

  const canvas = Canvas.createCanvas(244, 253);
  const ctx = canvas.getContext("2d");

  const background = await Canvas.loadImage(
    "https://vignette.wikia.nocookie.net/personalitydatabank/images/e/e7/Rip.png/revision/latest?cb=20181001212319"
  );
  let data = background;
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
  const avatar = await Canvas.loadImage(user.displayAvatarURL);
  ctx.drawImage(avatar, 63, 110, 90, 90);
  greyscale(ctx, 0, 0, data.width, data.height);
  const attachment = new Discord.Attachment(canvas.toBuffer(), "rip.png");
  message.channel.send(attachment);
};

module.exports.help = {
  name: "rip",
  aliases: ["kill"]
};
