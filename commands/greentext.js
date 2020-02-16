module.exports = {
  help: {
    name: "greentext",
    aliases: ["codeblock"]
  },

  run: async (rex, message, args, Discord) => {
    let text = args.join(" ");
    if (!text) text = "You have to provide an message";
    message.channel.sendCode("css", text); // css makes greentext
  }
};
