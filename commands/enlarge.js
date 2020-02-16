const emojiReg = require("emoji-regex");
const emojiConv = require("emoji-name-map");
const { cleanAnilistHTML } = require("../util/Util");

exports.run = async (rex, message, args, Discord) => {
  if (!args[0])
    return message.channel.send(
      "Supply An Emoji!\nCorrect Usage: `<prefix>enlarge <emoji>`"
    );
  try {
    let emoji = Discord.Util.parseEmoji(message.content);
    if (emoji.id === null) {
      const emojiR = require("emoji-regex");
      let regx = emojiR();
      let match;
      while ((match = regx.exec(message.content))) {
        let emoji = match[0];
        message.channel.send({
          files: [{ attachment: emoji, name: "enlarge.png" }]
        });
      }
    }
    if (emoji.animated === true) {
      message.channel.send(
        new Discord.Attachment(
          `https://cdn.discordapp.com/emojis/${emoji.id}.gif`
        )
      );
    } else {
      message.channel.send(
        new Discord.Attachment(
          `https://cdn.discordapp.com/emojis/${emoji.id}.png`
        )
      ); //what u doing?? // what?, i fixed it
    }
    console.log(emoji);
  } catch (e) {
    return message.channel.send("Supply A Valid Emoji!! `" + e.stack + "`");
  }
};

exports.help = {
  name: "enlarge",
  aliases: ["emojiimage", "emojimage"]
};
