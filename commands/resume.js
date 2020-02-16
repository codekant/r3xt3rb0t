const YouTube = require("simple-youtube-api");
const ytdl = require("ytdl-core");
const youtube = new YouTube(process.env.YTTOKEN);
const Discord = require("discord.js");

exports.run = async (rex, message, args, Discord) => {
  let embed = new Discord.RichEmbed();
  if (!message.member.voiceChannel)
    return message.channel.send(":x: You are not in a voice channel?");
  const searchargs = message.content.split(" ");
  const searchString = searchargs.slice(1).join(" ");
  const serverQueue = rex.queue.get(message.guild.id);
  const url = searchargs[1] ? searchargs[1].replace(/<(.+)>/g, "$1") : "";
  if (serverQueue.voiceChannel.id !== message.member.voiceChannel.id)
    return message.channel.send(
      "You are not in my voice channel, why should I even listen to you?"
    );

  if (serverQueue && !serverQueue.playing) {
    serverQueue.playing = true;
    serverQueue.connection.dispatcher.resume();
    return message.react("➡️");
  }
  return message.channel.send(
    embed
      .setDescription("Music is not Paused Currently...")
      .setColor("#ed0202")
      .setTitle("No paused song!")
  );
};

exports.help = {
  name: "resume",
  aliases: ["re"]
};
