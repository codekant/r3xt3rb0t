const os = require("os");

exports.run = async (rex, message, args, Discord) => {
  const ms = require("parse-ms");
  const createdDate = ms(Date.now() - rex.user.createdAt);
  let totalSeconds = rex.uptime / 1000;

  let days = Math.floor(totalSeconds / 86400);

  let hours = Math.floor(totalSeconds / 3600);

  totalSeconds %= 3600;

  let minutes = Math.floor(totalSeconds / 60);

  let seconds = Math.floor(totalSeconds % 60);

  let uptime = `${days}d(s), ${hours}hr(s), ${minutes}min(s), ${seconds}sec(s)`;

  let createdAt = ms(Date.now() - rex.user.createdAt); //see top its already there // ik //ok!

  const ping = Date.now() - message.createdTimestamp;
  const ids = {
    XENO: "480933736276426763",
    ZKATEKI: "544922024301297691",
    SAIF: "568356933967544330",
    ZYROUGE: "521007613475946496"
  };

  let embed = new Discord.RichEmbed()
    .setColor("BLURPLE")
    .setTitle(`Bot Stats`)
    .setThumbnail(rex.user.displayAvatarURL)
    .setDescription(
      `\`\`\`Built with ♥️ by ${rex.users.get(ids.ZKATEKI).tag}, ${
        rex.users.get(ids.SAIF).tag
      }, ${rex.users.get(ids.ZYROUGE).tag}, ${
        rex.users.get(ids.XENO).tag
      }. \nBuit Using Discord.js!\`\`\``
    )
    .addField(
      "Bot Status",
      "```autohotkey\n" +
        `Guilds: ${rex.guilds.size}\nChannels: ${rex.channels.size}\nVoice Connections: ${rex.voice.connections.size}\nUsers: ${rex.users.size}` +
        "```"
    )
    .addField(
      "Bot CPU",
      "```autohotkey\n" +
        `Heap Used: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(
          2
        )}MB \nRAM Usage: ${Math.floor(
          ((process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2) * 100) /
            512
        )}%` +
        "```"
    )
    .addField(
      "Bot Info",
      "```autohotkey\n" +
        `Bot Ping: ${ping}ms \nAPI Ping: ${Math.floor(
          rex.ping
        )}ms \nBot Created: ${createdAt.days}days, ${
          createdAt.hours
        }hrs Ago. \nBot Uptime: ${uptime}` +
        "```"
    )
    .setFooter(rex.user.username)
    .setTimestamp(Date.now());
  //?

  message.channel.send(embed);
};

module.exports.help = {
  name: "stats",
  aliases: ["botinfo", "bi"]
};
