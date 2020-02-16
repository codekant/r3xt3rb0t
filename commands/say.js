module.exports = {
  run: async (rex, message, args, Discord) => {
    const msg = args
      .join(" ")
      .replace("@everyone", "@\u200beveryone")
      .replace("@here", "@\u200bhere");
    if (!msg) msg = "Ya have to provide an message";
    message.channel.send(msg);
  },

  help: {
    name: "say",
    aliases: ["copy", "repeat"]
  }
};
