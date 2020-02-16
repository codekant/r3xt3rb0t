module.exports = {
  help: {
    name: "snipe",
    aliases: []
  },

  run: async (rex, message, args, Discord) => {
    const db = require("quick.db");
    let channel = message.mentions.channels.first() || message.channel;
    let check = rex.snipe.get(channel.id);
    if (!check) return message.channel.send(`There's Nothing To Snipe!`);
    let embed = new Discord.RichEmbed()
      .setAuthor(`${check.user}`, check.avatar)
      .setColor("BLURPLE")
      .setDescription(`${check.content}`)
      .setTimestamp();
    message.channel.send(embed);
    rex.snipe.delete(channel.id);
  }
};
