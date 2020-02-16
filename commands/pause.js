const YouTube = require("simple-youtube-api");
const ytdl = require("ytdl-core");
const youtube = new YouTube(process.env.YTTOKEN);
const Discord = require("discord.js");

exports.run = async (rex, message, args, Discord) => {
  const embed = new Discord.RichEmbed();
  const searchargs = message.content.split(" ");
  const searchString = searchargs.slice(1).join(" ");
  const serverQueue = rex.queue.get(message.guild.id);
  const url = searchargs[1] ? searchargs[1].replace(/<(.+)>/g, "$1") : "";

  if (serverQueue && serverQueue.playing) {
    if (serverQueue.voiceChannel.id !== message.member.voiceChannel.id)
      return message.channel.send(
        "You are not in my voice channel, why should I even listen to you?"
      );
    serverQueue.playing = false;
    serverQueue.connection.dispatcher.pause();
    return message.react("⏸️");
  }
  return message.channel.send(
    embed
      .setDescription("There is nothing playing.")
      .setTitle("No Song Resumed!")
      .setColor("#ed0202")
  );
};

exports.help = {
  name: "pause",
  aliases: ["pa"]
};
