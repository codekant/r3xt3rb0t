const request = require("node-superfetch");

module.exports = {
  help: {
    name: "qrcode",
    aliases: ["qr", "qrgen"]
  },

  run: async (rex, message, args, Discord) => {
    let text = args.join(" ");
    if (!text)
      return message.channel.send(
        "Correct Usage: " + rex.prefix + "qrcode <text>"
      );
    try {
      const { body } = await request
        .get("https://api.qrserver.com/v1/create-qr-code/")
        .query({ data: text });
      message.channel.send({ files: [{ attachment: body, name: "qr.png" }] });
    } catch (e) {
      throw e;
    }
  }
};
