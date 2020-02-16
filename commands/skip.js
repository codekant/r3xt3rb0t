const YouTube = require("simple-youtube-api");
const ytdl = require("ytdl-core");
const youtube = new YouTube(process.env.YTTOKEN);
const Discord = require("discord.js");

exports.run = async (rex, message, args) => {
  const embed = new Discord.RichEmbed();
  const searchargs = message.content.split(" ");
  const searchString = searchargs.slice(1).join(" ");
  const serverQueue = rex.queue.get(message.guild.id);
  if (!message.member.voiceChannel)
    return message.channel.send(
      ":x: You are not in a voice channel! Join a Voice channel to use this command!"
    );
  if (!serverQueue)
    return message.channel.send(
      embed
        .setDescription("There is nothing playing that I could skip for you.")
        .setColor("#ed0202")
    );
  if (serverQueue.voiceChannel.id !== message.member.voiceChannel.id)
    return message.channel.send(
      "You are not in my voice channel, why should I even listen to you?"
    );
  serverQueue.connection.dispatcher.end("Skip command has been used!");
  return undefined;
};

exports.help = {
  name: "skip",
  aliases: ["sk", "s"]
};
