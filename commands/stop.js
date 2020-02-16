const YouTube = require("simple-youtube-api");
const ytdl = require("ytdl-core");
const youtube = new YouTube(process.env.YTTOKEN);

exports.run = async (rex, message, args, Discord) => {
  // const searchargs = message.content.split(' ');
  //const searchString = searchargs.slice(1).join(' ');
  const serverQueue = rex.queue.get(message.guild.id);
  // const url = searchargs[1] ? searchargs[1].replace(/<(.+)>/g, '$1') : '';

  if (!message.member.voiceChannel)
    return message.channel.send("You are not in a voice channel!");
  if (!serverQueue)
    return message.channel.send(
      "There is nothing playing that I could stop for you."
    );
  if (serverQueue.voiceChannel.id !== message.member.voiceChannel.id)
    return message.channel.send(
      "You are not in my voice channel, why should I even listen to you?"
    );
  serverQueue.songs = [];
  serverQueue.connection.dispatcher.end("Stop command has been used!");
  return undefined;
};

exports.help = {
  name: "stop",
  aliases: ["st", "dc", "leave"]
};
