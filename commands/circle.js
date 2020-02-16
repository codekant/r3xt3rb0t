const jimp = require("jimp");

module.exports.run = async (rex, message, args, Discord) => {
  let user =
    message.mentions.users.first() || rex.users.get(args[0]) || message.author;

  let img = user.displayAvatarURL;
  message.channel.send("Please Wait....").then(m => {
    m.delete(1000);
  });
  let image = await jimp.read(img);
  let mask = await jimp.read(
    "https://cloud.githubusercontent.com/assets/414918/11165709/051d10b0-8b0f-11e5-864a-20ef0bada8d6.png"
  );
  image.mask(mask, image.height, image.width).write("circle.png");
  message.channel.send({ files: ["circle.png"] });
};

module.exports.help = {
  name: "circle",
  aliases: []
};
