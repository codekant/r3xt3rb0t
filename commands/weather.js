const weirdapi = require("weirdapi.js");

module.exports.run = async (rex, message, args, Discord) => {
  var city = args.join(" ");
  if (!city) return message.channel.send(":x: Please provide a city!");

  let result = await weirdapi.weather(city);

  if (!result.location) return message.channel.send(":x: Not found!");
  const em = new Discord.RichEmbed()
    .setAuthor(
      `Weather`,
      "https://d279m997dpfwgl.cloudfront.net/wp/2017/12/weather_album-art-1000x1000.jpg"
    )
    .addField(`City`, result.location)
    .addField(`Timezone`, result.timezone)
    .addField(`Degree Type`, result.type)
    .addField(`Temperature`, result.temperature)
    .addField(`Winds`, result.winds)
    .addField(`Humidity`, result.humidity)
    .addField(`Status`, result.status)
    .setColor("BLURPLE")
    .setThumbnail(result.sprite)
    .setFooter(`The Weird API | R3XT3R`, rex.user.displayAvatarURL)
    .setTimestamp();
  return message.channel.send(em);
};

module.exports.help = {
  name: "weather",
  aliases: []
};
