const jimp = require("jimp");

module.exports.run = async (rex, message, args, Discord) => {
  let user =
    message.mentions.users.first() || rex.users.get(args[0]) || message.author;

  let img = user.displayAvatarURL;
  message.channel.send("Please Wait....").then(m => {
    m.delete(2000);
  });
  let image = await jimp.read(img);
  image.blur(10);
  image.write("blur.png");
  message.channel.send({ files: ["blur.png"] });
};

module.exports.help = {
  name: "blur",
  aliases: []
};
