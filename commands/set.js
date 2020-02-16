module.exports = {
  run: async (rex, message, args, Discord) => {
    const Enmap = require("enmap");
    rex.settings = new Enmap({
      name: "settings",
      fetchAll: false,
      autoFetch: true,
      cloneLevel: "deep"
    });

    const defaultSettings = {
      prefix: "r$",
      welcomemsg: "Hello {{user}}, Welcome to the {{server}}!",
      leavemsg: "Goodbye {{user}}! We will miss you.",
      lvlup:
        ":tada: {{user}}, You just advanced to level **{{level}}**! :tada:",
      welcomertype: "embed",
      leveling: "false",
      logging: "false"
    };
    const guildConf = rex.settings.ensure(message.guild.id, defaultSettings);
    const embed = new Discord.RichEmbed();
    const [prop, ...value] = args;

    if (!message.member.hasPermission(["MANAGE_GUILD", "ADMINISTRATOR"]))
      return message.channel.send(
        ":x: Oi kidda, you don't have the permissions."
      );
    if (!rex.settings.has(message.guild.id, prop)) {
      return message.reply("This key is not in the configuration.");
    }
    if (!args[0])
      return message.channel.send(
        embed
          .setDescription(`Correct Usage: [prefix]set <item> <desired value>`)
          .setColor("#ed0202")
      );
    rex.settings.set(message.guild.id, value.join(" "), prop);
    message.channel.send(
      embed
        .setTitle(`Setting Configuration Success!`)
        .setDescription(
          `<:greentick:624962152502919169> Successfully Set This Guild's ${prop} To **\`${value.join(
            " "
          )}\`**`
        )
        .setColor("BLURPLE")
    );
  },

  help: {
    name: "set",
    aliases: []
  }
};
