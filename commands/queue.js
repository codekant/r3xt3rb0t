const YouTube = require("simple-youtube-api");
const ytdl = require("ytdl-core");
const youtube = new YouTube(process.env.YTTOKEN);
const Discord = require("discord.js");
const loop = {
  true: "Looping Queue",
  false: "Not Looping"
};

exports.run = async (rex, message, args, Discord) => {
  const embed = new Discord.RichEmbed();
  const searchargs = message.content.split(" ");
  const searchString = searchargs.slice(1).join(" ");
  const serverQueue = rex.queue.get(message.guild.id);
  const url = searchargs[1] ? searchargs[1].replace(/<(.+)>/g, "$1") : "";
  let looping;
  let index = "0";
  if (!serverQueue)
    return message.channel.send(":x: There is nothing in the queue.");

  if (serverQueue.voiceChannel.id !== message.member.voiceChannel.id)
    return message.channel.send(
      "You are not in my voice channel, why should I even listen to you?"
    );

  if (!serverQueue.songs[1]) {
    if (serverQueue.loop === true) {
      looping = "Looping current song";
    } else {
      looping = "Not looping";
    }
    let Embed = new Discord.RichEmbed()
      .setAuthor(
        "Music Stats for " + message.guild.name,
        message.author.avatarURL
      )
      .setColor("BLURPLE")
      .setThumbnail(message.guild.iconURL)
      .addField(
        "Current Song:",
        `**- [${serverQueue.songs[0].title}](${serverQueue.songs[0].url})**`
      )
      .addField(
        `Queue [${serverQueue.songs.length}]`,
        serverQueue.songs
          .map(song => `**${++index})** **[${song.title}](${song.url})**`)
          .join("\n")
      ) // listen, it will show i m l ok ... as you ping currentsay boss
      .addField(
        "Settings",
        `Volume : **${serverQueue.volume}** \nLooping : **${looping}**`
      ) //?? bruh, here bot is looping current song, no it should show Looping or not looping not true or false see line : 5.
      .setFooter(`${rex.user.username}`, rex.user.avatarURL)
      .setTimestamp();
    message.channel.send(Embed);
    console.log(serverQueue.songs.size);
  } else {
    if (serverQueue.loop === true) {
      looping = "Looping queue";
    } else {
      looping = "Not looping";
    }
    let Embed = new Discord.RichEmbed()
      .setAuthor(
        "Music Queue for " + message.guild.name,
        message.author.avatarURL
      )
      .setColor("BLURPLE")
      .setThumbnail(message.guild.iconURL)
      .addField(
        "Now Playing:",
        `**- [${serverQueue.songs[0].title}](${serverQueue.songs[0].url})**`
      )
      .addField(
        "Up Next:",
        `**- [${serverQueue.songs[1].title}](${serverQueue.songs[1].url})**`
      )
      .addField(
        `Queue:`,
        serverQueue.songs
          .map(song => `**${++index})** **[${song.title}](${song.url})**`)
          .join("\n")
      )
      .addField(
        "Settings",
        `Volume : **${serverQueue.volume}** \nLooping : **${looping}**`
      ) // here bot is looping queue
      .setFooter(`${rex.user.username}`, rex.user.avatarURL)
      .setTimestamp();
    message.channel.send(Embed);
  }
};

exports.help = {
  name: "queue",
  aliases: ["qu", "q"]
};
