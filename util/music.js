const { Util } = require("discord.js");
const ytdl = require("ytdl-core");
const moment = require("moment"); 
const Discord = require("discord.js");
module.exports = rex => {
  rex.handleVideo = async (video, message, voiceChannel, playlist = false) => {
    const serverQueue = rex.queue.get(message.guild.id);
    console.log(video);
    const song = {
      id: video.id,
      title: Util.escapeMarkdown(video.title),
      url: `https://www.youtube.com/watch?v=${video.id}`,
      channel: video.channel.id,
      ct: video.channel.title,
      tp: video.publishedAt,
      duration: video.duration,
      thumbnail: `https://img.youtube.com/vi/${video.id}/hqdefault.jpg`
    };
    if (!serverQueue) {
      const queueConstruct = {
        textChannel: message.channel,
        voiceChannel: voiceChannel,
        connection: null,
        songs: [],
        volume: 100,
        playing: true,
        loop: false
      };
      rex.queue.set(message.guild.id, queueConstruct);

      queueConstruct.songs.push(song);

      try {
        var connection = await voiceChannel.join();
        queueConstruct.connection = connection;
        rex.play(message.guild, queueConstruct.songs[0]);
      } catch (error) {
        console.error(`I could not join the voice channel: ${error}`);
        rex.queue.delete(message.guild.id);
        return message.channel.send(
          `I could not join the voice channel: ${error}`
        );
      }
    } else {
      serverQueue.songs.push(song);
      console.log(serverQueue.songs);
      if (playlist) return undefined;
      else {
        const embed = new Discord.RichEmbed()
          .setAuthor(`Song Queued!`, message.guild.iconURL)
          .addField(`Title`, `**[${song.title}](${song.url})** \n`)
          .addField(
            `Uploaded By`,
            `**[${song.ct}](https://youtube.com/channel/${song.channel})**`,
            true
          )
          .addField(
            `Duration`,
            `${song.duration.hours}h, ${song.duration.minutes}m, ${song.duration.seconds}s`,
            true
          )
          .setThumbnail(song.thumbnail)
          .setColor("BLURPLE") // blurple bot so only blurple
          .setFooter(
            `Requested by: ${message.author.tag}`,
            message.author.displayAvatarURL
          )
          .setTimestamp()
          .addField(
            "Published At",
            `${moment(song.tp).format("dddd, MMMM do YYYY")}`,
            true
          );
        return message.channel.send(embed);
      }
    }
    return undefined;
  };

  rex.play = (guild, song) => {
    const serverQueue = rex.queue.get(guild.id);

    if (!song) {
      rex.queue.delete(guild.id);
      serverQueue.voiceChannel.leave();
      return;
    }
    console.log(serverQueue.songs);

    let dispatcher = serverQueue.connection
      .playStream(
        ytdl(song.url, {
          filter: "audioonly"
        }),
        {
          highWaterMark: 1024 * 1024 * 10,
          bitrate: 320000,
          volume: serverQueue.volume / 100
        }
      )
      .on("end", reason => {
        if (reason === "Stream is not generating quickly enough.")
          console.log("Song ended.");
        else console.log(reason);
        if (serverQueue.loop === true)
          serverQueue.songs.push(serverQueue.songs.shift());
        else serverQueue.songs.shift();
        rex.play(guild, serverQueue.songs[0]);
      })
      .on("error", error => console.error(error));
    dispatcher.setVolumeLogarithmic(serverQueue.volume / 100);

    const embed = new Discord.RichEmbed()
      .setAuthor(`Now Playing`, guild.iconURL)
      .addField(`Title`, `**[${song.title}](${song.url})** \n`)
      .addField(
        `Uploaded By`,
        `**[${song.ct}](https://youtube.com/channel/${song.channel})**`,
        true
      )
      .addField(
        `Duration`,
        `${song.duration.hours}h, ${song.duration.minutes}m, ${song.duration.seconds}s`,
        true
      )
      .setThumbnail(song.thumbnail)
      .setColor("BLURPLE")
      .setTimestamp()
      .addField(
        "Published At",
        `${moment(song.tp).format("dddd, MMMM do YYYY")}`,
        true
      );
    serverQueue.textChannel.send(embed);
  };
};
