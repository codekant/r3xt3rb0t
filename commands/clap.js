module.exports = {
  help: {
    name: "clap",
    aliases: ["clapify"]
  },

  run: async (rex, message, args, Discord) => {
    let text = args.join(" ");
    if (!text) text = "You have to provide a message";
    let split = text.split(" ");
    let clap = split.join(" 👏 ");
    message.channel.send(clap);
  }
};
