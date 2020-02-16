module.exports = {
  help: {
    name: "ship"
  },

  run: async (rex, message, args, Discord) => {
    const superagent = require("superagent");
    let user = message.mentions.users.first() || rex.users.get(args[0]);
    if (!user) {
      user = message.guild.members
        .filter(m => m.id !== message.author.id)
        .random();
    }
    const love = Math.random() * 100;
    const loveMeter = Math.floor(love / 10);
    let bar =
      `[▄](https://r3xt3r.glitch.me)`.repeat(loveMeter) +
      `[▄](https://r3xt3r.glitch.me)`.repeat(10 - loveMeter);
    let embed = new Discord.RichEmbed()
      .setColor("BLURPLE")
      //.setImage(response.body.message)
      .setDescription(
        `**${message.author} ❤ ${user}\n The percentage is ${Math.floor(
          love
        )}%\n\n${bar}**`
      );
    message.channel.send(embed);
  }
};
