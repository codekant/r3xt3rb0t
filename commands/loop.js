const YouTube = require("simple-youtube-api");
const ytdl = require("ytdl-core");
const youtube = new YouTube(process.env.YTTOKEN);
const Discord = require("discord.js");
const embed = new Discord.RichEmbed();

exports.run = async (client, message, args) => {
  const earchString = args.join(" ");

  const url = args[0] ? args[0].replace(/<(.+)>/g, "$1") : "";
  const serverQueue = client.queue.get(message.guild.id);
  if (!message.member.voiceChannel)
    return message.channel.send("You are not in a voice channel?");
  if (!serverQueue) return message.channel.send("I am not playing anything?");
  serverQueue.loop = !serverQueue.loop;
  client.queue.set(message.guild.id, serverQueue);
  if (serverQueue.loop)
    return message.channel.send(
      embed.setDescription("🔂 Now Looping the **Queue**").setColor("BLURPLE")
    );
  return message.channel.send(
    embed.setDescription("▶ **Not Looping Anymore**").setColor("BLURPLE")
  );
};

exports.help = {
  name: "loop",
  aliases: ["repeat"]
};
