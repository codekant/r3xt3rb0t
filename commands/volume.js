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

  if (!message.member.voiceChannel)
    return message.channel.send("You are not in a voice channel!");
  if (!serverQueue) return message.channel.send("There is nothing playing.");
  if (serverQueue.voiceChannel.id !== message.member.voiceChannel.id)
    return message.channel.send(
      "You are not in my voice channel, why should I even listen to you?"
    );
  if (!searchargs[1])
    return message.channel.send(
      embed
        .setTitle("Current Volume")
        .setDescription(`The current volume is: **${serverQueue.volume}**`)
        .setColor("#fcba03")
    ); //  //Ffffff:kek :Blurple pls, who is dis? zkatekio kok come to discord ok
  serverQueue.connection.dispatcher.setVolumeLogarithmic(searchargs[1] / 100);
  return message.channel.send(
    embed
      .setTitle("Volume Changed!")
      .setDescription(`I set the volume to: **${searchargs[1]}**`)
      .setColor("BLURPLE")
  );
};

exports.help = {
  name: "volume",
  aliases: ["vol"]
};
