module.exports = {
  help: {
    name: "hex"
  },

  run: async (rex, message, args, Discord) => {
    let text = args.join(" ") ? args.join(" ") : "Provide some text";
    message.channel.send(Buffer.from(text).toString("hex"));
  }
};
