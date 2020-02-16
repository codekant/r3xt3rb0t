const YouTube = require("simple-youtube-api");
const ytdl = require("ytdl-core");
const youtube = new YouTube(process.env.YTTOKEN);
const Discord = require("discord.js");
const { Util } = require("discord.js");
const moment = require("moment");
const { clean } = require("../util/Util");

exports.run = async (rex, message, args, Discord) => {
  const embed = new Discord.RichEmbed();
  const searchargs = message.content.split(" ");
  const searchString = searchargs.slice(1).join(" ");
  const serverQueue = rex.queue.get(message.guild.id);
  const url = searchargs[1] ? searchargs[1].replace(/<(.+)>/g, "$1") : "";

  if (!serverQueue)
    return message.channel.send(
      embed
        .setDescription("The Song Queue for this guild is currently empty!")
        .setColor("#ed0202")
    );
  if (message.guild.me.voiceChannel.id !== message.member.voiceChannel.id)
    return message.channel.send(
      "You are not in my voice channel, why should I even listen to you?"
    );
  const nsong = {
    id: serverQueue.songs[0].id,
    title: Util.escapeMarkdown(serverQueue.songs[0].title),
    url: `https://www.youtube.com/watch?v=${serverQueue.songs[0].id}`,
    channel: serverQueue.songs[0].channel.id,
    ct: serverQueue.songs[0].channel.title,
    tp: serverQueue.songs[0].publishedAt,
    duration: serverQueue.songs[0].duration,
    thumbnail: `https://i.ytimg.com/vi/${serverQueue.songs[0].id}/maxresdefault.jpg`
  };
  let hours = `${moment(nsong.duration.hours).format("HH")}`;
  let minutes = `${moment(nsong.duration.minutes).format("mm")}`;
  let seconds = `${moment(nsong.duration.seconds).format("ss")}`;
  if (!serverQueue.songs[1]) {
    let Embed = new Discord.RichEmbed()
      .setAuthor("Now Playing!", message.guild.iconURL)
      .setColor("BLURPLE")
      .addField(
        "Channel",
        `**[${serverQueue.songs[0].ct}](https://youtube.com/channel/${serverQueue.songs[0].channel})**`,
        true
      )
      .addField(
        "Duration",
        `\`${nsong.duration.hours}:${nsong.duration.minutes}:${nsong.duration.seconds}\``,
        true
      )
      .addField(
        "Published At",
        `${moment(serverQueue.songs[0].tp).format("dddd, MMMM do YYYY")}`,
        true
      )
      .setThumbnail(serverQueue.songs[0].thumbnail)
      .setDescription(
        `🎶 **[${serverQueue.songs[0].title}](${serverQueue.songs[0].url})**`
      )
      .setFooter(rex.user.tag, rex.user.avatarURL);
    return message.channel.send(Embed);
  } else {
    let Embed = new Discord.RichEmbed()
      .setAuthor("Now Playing!", message.guild.iconURL)
      .setColor("BLURPLE")
      .addField(
        "Channel",
        `**[${serverQueue.songs[0].ct}](https://youtube.com/channel/${serverQueue.songs[0].channel})**`,
        true
      )
      .addField(
        "Duration",
        `\`${nsong.duration.hours}:${nsong.duration.minutes}:${nsong.duration.seconds}\``,
        true
      )
      .addField(
        "Published At",
        `${moment(serverQueue.songs[0].tp).format("dddd, MMMM do YYYY")}`,
        true
      )
      .addField(
        "Next Song:",
        `**[(${clean(serverQueue.songs[1].title)}](${
          serverQueue.songs[1].url
        })**`,
        true
      )
      .setThumbnail(serverQueue.songs[0].thumbnail)
      .setDescription(
        `🎶 **[${clean(serverQueue.songs[0].title)}](${
          serverQueue.songs[0].url
        })**`
      )
      .setFooter(rex.user.tag, rex.user.avatarURL);
    return message.channel.send(Embed);
  }
};

exports.help = {
  name: "np",
  aliases: []
};
