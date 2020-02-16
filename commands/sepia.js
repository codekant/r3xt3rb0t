module.exports = {
  help: {
    name: "sepia",
    aliases: []
  },

  run: async (rex, message, args, Discord) => {
    const request = require("node-superfetch");
    const { sepia } = require("../util/Canvas");
    const { createCanvas, loadImage } = require("canvas");
    let user = message.mentions.users.first() || message.author;
    let image = user.displayAvatarURL;
    try {
      const { body } = await request.get(image);
      const data = await loadImage(body);
      const canvas = createCanvas(data.width, data.height);
      const ctx = canvas.getContext("2d");
      ctx.drawImage(data, 0, 0);
      sepia(ctx, 0, 0, data.width, data.height);
      let attch = canvas.toBuffer();
      return message.channel.send({
        files: [{ attachment: attch, name: "sepia.png" }]
      });
    } catch (e) {}
  }
};
