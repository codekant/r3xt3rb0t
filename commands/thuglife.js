const { createCanvas, loadImage } = require("canvas");
const request = require("node-superfetch");
const path = require("path");
const { greyscale } = require("../util/Canvas");

exports.run = async (rex, message, args, Discord) => {
  try {
    const user = message.mentions.users.first() || message.author;
    const image = user.displayAvatarURL;
    const base = await loadImage(
      "https://cdn.glitch.com/d7867da4-4982-4d6c-832c-039243cef228%2Fthug-life.png?v=1566544066874"
    );
    const { body } = await request.get(image);
    const data = await loadImage(body);
    const canvas = createCanvas(data.width, data.height);
    const ctx = canvas.getContext("2d");
    ctx.drawImage(data, 0, 0);
    greyscale(ctx, 0, 0, data.width, data.height);
    const ratio = base.width / base.height;
    const width = data.width / 2;
    const height = Math.round(width / ratio);
    ctx.drawImage(
      base,
      data.width / 2 - width / 2,
      data.height - height,
      width,
      height
    );
    const attachment = canvas.toBuffer();
    if (Buffer.byteLength(attachment) > 8e6)
      return message.reply("Resulting image was above 8 MB.");
    return message.channel.send({
      files: [{ attachment, name: "thug-life.png" }]
    });
  } catch (err) {
    return message.reply(
      `Oh no, an error occurred: \`${err.message}\`. Try again later!`
    );
  }
};

exports.help = {
  name: "thuglife",
  aliases: ["thug", "tl"]
};
