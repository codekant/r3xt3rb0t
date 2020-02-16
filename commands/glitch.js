const { createCanvas, loadImage } = require("canvas");
const request = require("node-superfetch");
const { distort } = require("../util/Canvas");
const Discord = require("discord.js");

module.exports = {
  help: {
    name: "glitch",
    aliases: []
  },

  run: async (rex, message, args, Discord) => {
    let user = message.mentions.users.first() || message.author;
    let image = user.displayAvatarURL;
    try {
      let { body } = await request.get(image);
      let data = await loadImage(body);
      const canvas = createCanvas(data.width, data.height);
      const ctx = canvas.getContext("2d");
      ctx.drawImage(data, 0, 0);
      distort(ctx, 20, 0, 0, data.width, data.height, 5);
      const attachment = canvas.toBuffer();
      return message.channel.send({
        files: [{ attachment: attachment, name: "glitch.png" }]
      });
    } catch (e) {
      throw e;
    }
  }
};
