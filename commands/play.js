const YouTube = require("simple-youtube-api");
const ytdl = require("ytdl-core");
const youtube = new YouTube(process.env.YTTOKEN);
const queue = new Map();
const Discord = require("discord.js"); // oki here's discord
const { clean } = require("../util/Util");

exports.run = async (rex, message, args, Discord) => {
  const searchargs = message.content.split(" "); //but still these codes work in xtal I have an idea for loop failed?
  const searchString = searchargs.slice(1).join(" "); // what about args.join(" ") here? we have different handler for commands, lets try?
  const serverQueue = rex.queue.get(message.guild.id);
  const url = searchargs[1] ? searchargs[1].replace(/<(.+)>/g, "$1") : "";

  const voiceChannel = message.member.voiceChannel;
  if (!voiceChannel)
    return message.channel.send(
      "I'm sorry but you need to be in a voice channel to play music!"
    );
  const permissions = voiceChannel.permissionsFor(message.client.user);
  if (!permissions.has(["CONNECT", "SPEAK"])) {
    let embed = new Discord.RichEmbed()
      .setDescription("I don't have enough permissions")
      .setColor("#ed0202");
    return message.channel.send(embed);
  } //zyrouge died 2004 - 2019...
  //wtf all.. nice //thats an array of perms
  if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
    const playlist = await youtube.getPlaylist(url);
    const videos = await playlist.getVideos();
    for (const video of Object.values(videos)) {
      const video2 = await youtube.getVideoByID(video.id); // eslint-disable-line no-await-in-loop
      await rex.handleVideo(video2, message, voiceChannel, true); // eslint-disable-line no-await-in-loop
    }
    return message.channel.send(
      new Discord.RichEmbed()
        .setDescription(
          `✅ Playlist: **[${playlist.title}](${playlist.url})** has been added to the queue!`
        )
        .setColor("BLURPLE")
    );
  } else {
    try {
      var video = await youtube.getVideo(url);
    } catch (error) {
      try {
        var videos = await youtube.searchVideos(searchString, 10);
        let index = 0;
        message.channel.send(
          new Discord.RichEmbed()
            .setAuthor(
              "Song Selection",
              "https://cdn.discordapp.com/emojis/627738060347539457.png"
            )
            .setDescription(
              `${videos
                .map(
                  video2 =>
                    `**${++index} -** [${clean(video2.title)}](${video2.url})`
                )
                .join("\n")}`
            )
            .setFooter("Please Provide a number from 1 to 10 to play in the VC")
            .setColor("BLURPLE")
        );
        // eslint-disable-next-line max-depth
        try {
          var response = await message.channel.awaitMessages(
            message2 => message2.content > 0 && message2.content < 11,
            {
              maxMatches: 1,
              time: 15000,
              errors: ["time"]
            }
          );
        } catch (err) {
          let embed = new Discord.RichEmbed()
            .setDescription(
              "You did not Choose a number within your 10 seconds time! Maybe you did But Wrong method..."
            )
            .setTitle("Search Timed Out!")
            .setColor("#ed0202");
          console.error(err);
          return message.channel.send(embed);
        }
        const videoIndex = parseInt(response.first().content);
        var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
      } catch (err) {
        console.error(err);
        return message.channel.send(
          new Discord.RichEmbed()
            .setTitle("No Results found")
            .setDescription(
              "🔎 We Searched wide but could not find anything valuable!, please try something else..."
            )
            .setColor("#ed0202")
        );
      }
    }
    return rex.handleVideo(video, message, voiceChannel);
  }
};

exports.help = {
  name: "play",
  aliases: ["pl"]
};
