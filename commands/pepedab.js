module.exports = {
  help: {
    name: "pepedab",
    aliases: ["pepify", "pepe", "party"]
  },

  run: async (rex, message, args, Discord) => {
    let text = args.join(" ");
    if (!text) text = "You have to provide a message";
    let split = text.split(" ");
    let frog = split.join(" <a:pepedab:626057685074313226> "); // kek why / oki /got itwtf is  lmao
    message.channel.send(frog);
  }
};
