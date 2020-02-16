module.exports = {
  help: {
    name: "reverse",
    aliases: ["rev"]
  },

  run: async (rex, message, args) => {
    let text = args.join(" ")
      ? args.join(" ")
      : "You have to provide some text";
    message.channel.send(
      text
        .split("")
        .reverse()
        .join("")
    );
  }
};
