const Discord = require("discord.js");

exports.run = (rex, message, args, Discord) => {
  let user = message.mentions.users.first() || message.author;

  if (
    user.presence.game !== null &&
    user.presence.game.type == "2" &&
    user.presence.game.name === "Spotify" &&
    user.presence.game.assets !== null
  ) {
    let Title = user.presence.game.details;
    let Author = user.presence.game.state;
    let Album = user.presence.game.assets.largeText;
    let Link = `https://open.spotify.com/track/${user.presence.game.syncID}`;
    let Image = `https://i.scdn.co/image/${user.presence.game.assets.largeImage.slice(
      8
    )}`;

    const embed = new Discord.RichEmbed()
      .setAuthor(
        "Spotify Status",
        "https://pbs.twimg.com/profile_images/558556141605511168/2JDJX8SQ.png"
      )
      .setColor("#1DB954")
      .setThumbnail(Image)
      .addField("User", `**[${user.tag}](https://spotify.com/)**`)
      .addField("Song Name", `**[${Title}](${Link})**`)
      .addField("Song Album", `**[${Album}](${Link})**`)
      .addField("Song By", `**[${Author}](${Link})**`)
      .addField(
        "Listen on Spotify",
        `**[${Title} - ${Album} - ${Author}](${Link})**`
      )
      .setFooter(
        `Requested By: ${message.author.tag}`,
        message.author.displayAvatarURL
      )
      .setTimestamp();
    return message.channel.send(embed);
  } else {
    const em = new Discord.RichEmbed();
    return message.channel.send(
      em
        .setDescription("**User isn't listening to spotify Right Now!**")
        .setAuthor(
          "Spotify Not Found (404)",
          "https://pbs.twimg.com/profile_images/558556141605511168/2JDJX8SQ.png"
        )
        .setColor("#1DB954")
    );
  }
};

module.exports.help = {
  name: "spotify",
  aliases: ["spotifystatus"]
};
