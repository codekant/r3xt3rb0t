const Discord = require("discord.js");
const fetch = require("node-fetch");
const db = require("quick.db");

module.exports = async (rex, message) => {
  if (!message.guild) return;
  let swears = [
    "fuck",
    "bitch",
    "nigga",
    "nibba",
    "boobs",
    "tits",
    "porn",
    "pussy",
    "dick",
    "cunt",
    "cock",
    "fucker",
    "motherfucker",
    "gay"
  ];

  let checkr = await db.fetch("automod" + message.guild.id);
  if (checkr) {
    console.log(1);
    let arr = message.content.split("").toLowerCase();
    let ar = message.content.split(" ").toLowerCase();
    swears.toLowerCase().forEach(async i => {
      if (
        arr.includes(i) ||
        ar.includes(i) ||
        message.content.toLowerCase().includes(i)
      ) {
        if (message.deletable) await message.delete();
        return message.channel.send("No Swearing");
      }
    });
  }

  if (message.mentions.users.first()) {
    let check = await db.fetch(`AFKList_${message.mentions.users.first().id}`);
    if (check) {
      let embed = new Discord.RichEmbed()
        .setColor("BLURPLE")
        .setAuthor(`${check.tag} Is Currently AFK!`, check.avatar)
        .setDescription("**" + check.askMessage + "**");
      message.channel.send(embed).then(m => m.delete(6000));
    }
  }

  let commandr = message.content.split(" ")[0];
  let tag = await db.fetch(
    `guildTags_${rex.prefix}${commandr.toLowerCase()}_${message.guild.id}`
  );
  if (tag) {
    message.channel.send(tag.message);
  }

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
    lvlup: ":tada: {{user}}, You just advanced to level {{level}}! :tada:",
    welcomertype: "embed",
    leveling: "false",
    logging: "false"
  };
  const guildConf = rex.settings.ensure(message.guild.id, defaultSettings);
  //Bot isn't responding to commands, it just starts typing in the channel and stopshm

  rex.points = new Enmap({ name: "points" });
  if (message.author.bot || !message.guild) return;
  let leveling = rex.settings.get(message.guild.id, "leveling");
  if (leveling === "true") {
    if (message.guild) {
      const key = `${message.guild.id}-${message.author.id}`;
      rex.points.ensure(`${message.guild.id}-${message.author.id}`, {
        user: message.author.id,
        guild: message.guild.id,
        points: 0,
        level: 0
      });

      rex.points.inc(key, "points");
      const level = Math.floor(0.1 * Math.sqrt(rex.points.get(key, "points")));
      if (rex.points.get(key, "level") < level) {
        let levelup = rex.settings.get(message.guild.id, "lvlup");
        levelup.replace("{{user}}", message.author);
        levelup.replace("{{level}}", level);
        message.channel.send(levelup);
        rex.points.set(key, level, "level");
      }
    }
  }

  let msg = message;
  let prefix = guildConf.prefix;
  if (!message.content.startsWith(prefix)) return;
  const args = message.content.split(/\s+/g);
  const command = args
    .shift()
    .slice(prefix.length)
    .toLowerCase();

  const cmd =
    rex.commands.get(command) || rex.commands.get(rex.aliases.get(command));
  rex.prefix = prefix;
  if (!cmd) return;

  cmd.run(rex, message, args, Discord);
};
