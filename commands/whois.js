const Discord = require("discord.js");

module.exports.run = async (rex, message, args, Discord) => {
  function Days(date) {
    let now = new Date();
    let diff = now.getTime() - date.getTime();
    let days = Math.floor(diff / 86400000);
    return days + (days == 1 ? " day" : " days") + " ago";
  }

  const status = {
    "online": "Online <:Active:625592618440589312>",
    "idle": "Idle <:Busy:625593221069668353>",
    "dnd": " Do Not Disturb <:DnD:625592868479696916>",
    "offline": "Offline <:Offline:626434835543621642>",
    "streaming": "Streaming <:stream:642036410387529763>"
  };

  const member =
    message.mentions.members.first() ||
    message.guild.members.get(args[0]) ||
    message.member;

  let bot;
  if (member.user.bot === true) {
    bot = "Bot Account";
  } else {
    bot = "User Account";
  }

  let embed = new Discord.RichEmbed()
    .setAuthor(`User Info`, message.author.displayAvatarURL)
    .setThumbnail(member.user.displayAvatarURL)
    .addField("Mention", `${member.user}`)
    .setColor("BLURPLE")
    .addField("Username", `**${member.user.username}**`)
    .addField("Discriminator", `**#${member.user.discriminator}**`)
    .addField("ID", `**${member.user.id}**`)
    .addField(
      "Nickname",
      `${
        member.nickname !== null
          ? `**${member.nickname}**`
          : "**No Nickname Given**"
      }`
    )
    .addField("Account Type", `**${bot}**`)
    .addField("Status", `**${status[member.user.presence.status]}**`)
    .addField(
      "Game Activity",
      `${
        member.user.presence.game
          ? ` **${member.user.presence.game.name.toString()}**`
          : "**Nothing Playing!**"
      }`
    )
    .addField(
      "Roles",
      `**${member.roles
        .filter(r => r.id !== message.guild.id)
        .map(roles => `${roles}`)
        .join(" | ")
        .substring(0, 1024) || "No Roles"}**`
    )
    .addField(
      "Created At",
      `**${member.user.createdAt.toUTCString().substr(0, 16)} (${Days(
        member.user.createdAt
      )})**`
    )
    .setFooter(rex.user.tag, rex.user.displayAvatarURL)
    .setTimestamp();

  message.channel.send(embed);
};

module.exports.help = {
  name: "whois",
  aliases: ["ui", "userinfo", "wi"]
};
