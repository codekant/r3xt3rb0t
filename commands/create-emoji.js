const emojiRegex = require("emoji-regex");

module.exports = {
  run: async (rex, message, args, Discord) => {
    const embed = new Discord.RichEmbed();
    let Keyperms = ["MANAGE_GUILD", "ADMINISTRATOR", "MANAGE_EMOJIS"];
    if (!message.member.hasPermission(Keyperms)) return;
    if (!message.guild.me.hasPermission(Keyperms))
      return message.channel.send("Make Sure I have Enough Permissions...");
    if (!args[0] || !args[1])
      return message.channel.send(
        embed
          .setDescription(
            "Correct Usage:** `" +
              rex.prefix +
              "createemoji <emoji> <emoji name>`** Or **`" +
              rex.prefix +
              "createemoji animated <emoji> <emoji name>`** to Create Animated Emoji."
          )
          .setTitle("Error while Creating Emoji!")
          .setColor("#ed0202")
      );
    if (!args[2]) {
      let i = /[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]/.exec(
        args[0]
      );
      message.guild
        .createEmoji(
          "https://cdn.discordapp.com/emojis/" + i + ".png",
          `${args[1]}`
        )
        .then(emoji =>
          message.channel.send(
            embed
              .setTitle("New Emoji Created!")
              .setDescription(
                `Successfully created the emoji <:${emoji.name}:${emoji.id}>`
              )
              .setColor("#02ed0e")
          )
        );
    } else {
      if (args[0].toLowerCase() === "animated") {
        if (!args[2])
          return message.channel.send(
            embed
              .setColor("Error While Creating Emoji!")
              .setDescription("Provide a name for this emoji!")
              .setColor("#ed0202")
          );
        let i = /[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]/.exec(
          args[0]
        );
        message.guild
          .createEmoji(
            "https://cdn.discordapp.com/emojis/" + i + ".gif",
            `${args[2]}`
          )
          .then(emoji =>
            message.channel
              .send(
                embed.setDescription(
                  `Successfully created the emoji <a:${emoji.name}:${emoji.id}>`
                )
              )
              .setTitle("Created New Emoji!")
              .setColor("#02ed0e")
          );
      }
    }
  },

  help: {
    name: "createemoji",
    aliases: ["createemote", "create-emoji", "create-emote", "ce"]
  }
};
