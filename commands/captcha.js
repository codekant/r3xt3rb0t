const pool = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*-=+_.></|".split(
  ""
);
const { createCanvas, registerFont } = require("canvas");
//registerFont('../assets/Captcha.ttf', { family: 'captcha'});
const path = require("path");
//registerFont(path.join(__dirname, '..', 'bin', 'captch.ttf'), { family: 'captcha'})

module.exports = {
  run: async (rex, message, args, Discord) => {
    rex.game = new Map();
    const embed = new Discord.RichEmbed();
    const canvas = createCanvas(125, 32);
    let ctx = canvas.getContext("2d");
    let text = randomText(5);
    //ctx.registerFont(font);
    ctx.fillStyle = "#406da2";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.strokeStyle = "#ffff0d";
    ctx.font = "26px Sans-serif";
    ctx.rotate(-0.05);
    ctx.strokeText(text, 15, 26);
    await message.channel
      .send(
        "**```You have 20 seconds to verify yourself, What does this captcha say? Type it down below.```**",
        { files: [{ attachment: canvas.toBuffer(), name: "captcha.png" }] }
      ) //hmm...
      .then(() => {
        message.channel
          .awaitMessages(m => m.content === text, {
            // oki, I will make a web //handler of captcha, another bots can use it by node-fetch? okay
            max: 1, //yes okay
            time: 20000,
            errors: ["time"]
          })
          .then(collected => {
            //if(msgs.first().content !== text) return message.channel.send(`Nope that wasn't the answer, the correct answer is ${text}`);
            message.channel.send(
              embed
                .setTitle("Captcha Done!")
                .setDescription(`Nice Job, you got it right 😉`)
                .setColor("BLURPLE")
            ); //cringy af wink
          })
          .catch(() => {
            message.channel.send(
              embed
                .setTitle("Wrong Answer!")
                .setDescription(
                  `oof!!!💢...Nope that wasn't the answer, the text is **${text}** 😡`
                )
                .setColor("#ed0202")
            );
          });
      });
  },

  help: {
    name: "captcha",
    aliases: []
  }
};

function randomText(len) {
  const result = [];
  for (let i = 0; i < len; i++)
    result.push(pool[Math.floor(Math.random() * pool.length)]);
  return result.join("");
}
