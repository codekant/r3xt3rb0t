const Discord = require("discord.js");

module.exports.run = async (rex, message, args, Discord) => {
  function checkDays(date) {
    let now = new Date();
    let diff = now.getTime() - date.getTime();
    let days = Math.floor(diff / 86400000);
    return days + (days == 1 ? " day" : " days") + " ago";
  }
  let verifLevels = [
    "None",
    "Low",
    "Medium",
    "(╯°□°）╯︵  ┻━┻",
    "┻━┻ミヽ(ಠ益ಠ)ノ彡┻━┻"
  ];
  let region = {
    brazil: ":flag_br: Brazil",
    europe: ":flag_eu: Central Europe",
    singapore: ":flag_sg: Singapore",
    "us-central": ":flag_us: U.S. Central",
    sydney: ":flag_au: Sydney",
    "us-east": ":flag_us: U.S. East",
    "us-south": ":flag_us: U.S. South",
    "us-west": ":flag_us: U.S. West",
    "eu-west": ":flag_eu: Western Europe",
    "vip-us-east": ":flag_us: VIP U.S. East",
    london: ":flag_gb: London",
    amsterdam: ":flag_nl: Amsterdam",
    hongkong: ":flag_hk: Hong Kong",
    russia: ":flag_ru: Russia",
    southafrica: ":flag_za:  South Africa",
    india: ":flag_in: India"
  };
  let owner = message.guild.owner;
  if (owner === undefined) owner = "@invalid-user";
  const embed = new Discord.RichEmbed()
    .setTitle(message.guild.name + "'s Info'")
    .setThumbnail(message.guild.iconURL)
    .addField(
      "User Count",
      `Owner : ${owner} \n Total Users : **${
        message.guild.members.size
      }** \n Bot Users : **${
        message.guild.members.filter(member => member.user.bot).size
      }** \n  Human Users : **${
        message.guild.members.filter(member => !member.user.bot).size
      }**`
    )
    .addField(
      "Users Status",
      `Online : <:Active:625592618440589312> **${
        message.guild.members.filter(mem => mem.presence.status === "online")
          .size
      }** \n Idle : <:Busy:625593221069668353> **${
        message.guild.members.filter(mem => mem.presence.status === "idle").size
      }** \n  Dnd : <:DnD:625592868479696916> **${
        message.guild.members.filter(mem => mem.presence.status === "dnd").size
      }** \n   Offline : <:Offline:626434835543621642> **${
        message.guild.members.filter(mem => mem.presence.status === "offline")
          .size
      }**`
    )
    .addField(
      "Server Info",
      `Name : **${message.guild.name}** \n Verification : **${
        verifLevels[message.guild.verificationLevel]
      }** \n  Channels : **${message.guild.channels.size}** \n   Roles : **${
        message.guild.roles.size
      }** \n    Region : **${region[message.guild.region]}**`
    )
    .addField(
      "Server Features",
      `**${message.guild.features.map(m => m).join(",\n") ||
        "No features available."}**`
    )
    .addField(
      "Server Created",
      `**${message.channel.guild.createdAt
        .toUTCString()
        .substr(0, 16)} (${checkDays(message.channel.guild.createdAt)})**`
    )
    .setTimestamp()
    .setFooter(
      "Requested by: " + message.author.tag,
      message.author.displayAvatarURL
    )
    .setColor("BLURPLE");

  message.channel.send({ embed });
};

module.exports.help = {
  name: "serverinfo",
  aliases: ["si", "guildinfo", "gi"]
};
