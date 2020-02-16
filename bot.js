const http = require("http");
const express = require("express");
var phin = require("phin");
var config = require("./config.json");
var webhookurl = config.webhookurl;
var bodyParser = require("body-parser");
const Discord = require("discord.js");
const embed = new Discord.RichEmbed();
const rex = new Discord.Client({
  disableEveryone: true,
  fetchAllMembers: true
});
require("./util/music")(rex);
rex.queue = new Map();
const Util = require("discord.js");
const giveaways = require("discord-giveaways");
const app = express();
const moment = require("moment");
require("moment-duration-format");
const Enmap = require("enmap");
const ms = require("parse-ms");
const fetch = require("node-fetch");
const DBL = require("dblapi.js");
const dbl = new DBL(process.env.DBL, rex);
rex.snipe = new Map();
const server = http.createServer(app);
const hook = new DBL(process.env.DBL, {
  webhookAuth: "teamr3xt3r",
  webhookServer: server
});
/*app.get("/", (request, response) => {
  response.send('./views/index')
  console.log(Date.now() + " Ping Received");
});*/
const path = require("path");
const router = require("express").Router();
app.listen(process.env.PORT);
const db = require("quick.db");
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
  lvlup: ":tada: {{user}}, You just advanced to level **{{level}}**! :tada:",
  welcomertype: "embed",
  leveling: "false",
  logging: "false"
};

rex.on("message", msg => {
  let message = msg;

  if (!message.guild || message.author.bot) return;
  let db = require("quick.db");

  let cb = db.fetch(`cbchannel_${message.guild.id}`);
  let chn = rex.channels.get(cb);
  if (!chn) return;
  if (message.channel.id === chn.id) {
    var input = encodeURI(message.content);
    message.channel.startTyping();
    fetch(
      "http://api.brainshop.ai/get?bid=8896&key=bgDJnTZSukgwqWx6&uid=r3xt3r&msg=" +
        input
    ) // private api
      .then(res => res.json())
      .then(json => {
        var output = json.cnt;
        const em = new Discord.RichEmbed()
          .setAuthor(message.author.tag, message.author.displayAvatarURL)
          .setDescription(output)
          .setColor(message.member.displayHexColor);
        chn.send(em);
      });
    return message.channel.stopTyping();
  }
});

setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);
const session = require("express-session");

app.set("view engine", "ejs");
app.use(express.static("static"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    secret: "48738924783748273742398747238",
    resave: false,
    saveUninitialized: false,
    expires: 604800000
  })
);

require("./router")(app);
app.get("/ping", (request, response) => {
  response.send({ ping: `${rex.ping}ms` });
});

app.get("/stats", (request, response) => {
  const duration = moment
    .duration(rex.uptime)
    .format("H [Hours], m [Minutes] & s [Seconds]");
  let createdAt = ms(Date.now() - rex.user.createdAt);
  response.send({
    uptime: `${duration}`,
    ping: `${Math.round(rex.ping)}ms`,
    memory:
      (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2) +
      " mb / 512 mb",
    commandsize: rex.commands.size,
    voice: rex.voice.connections.size,
    username: rex.user.tag,
    id: rex.user.id,
    guilds: rex.guilds.size,
    users: rex.users.size,
    channels: rex.channels.size,
    created: `${createdAt.days} Days, ${createdAt.hours} Hours, ${createdAt.minutes} Minutes & ${createdAt.seconds} Seconds`,
    commands: `${rex.commands.map(m => m.help.name).join("<br>")}`
  });
});

app.get("/pong", (request, response) => {
  response.send({ pong: `${rex.ping}ms` });
});

app.get("/invite", (request, response) => {
  response.redirect(
    `https://discordapp.com/oauth2/authorize?client_id=${rex.user.id}&scope=bot&permissions=1408625887`
  );
});

app.get("/discord", (request, response) => {
  response.redirect(`https://discord.gg/HTR77wH`);
});

app.post("/hook", function(req, res) {
  if (req.headers.authorization !== config.auth)
    return res.send({ code: "invalid auth" });
  let user_id = req.body.user;
  let bot = req.body.bot;
  if (req.body.type === "test") {
    phin({
      url: webhookurl,
      method: "POST",
      data: {
        content: `<@${user_id}> test-voted <@${bot}>.`
      }
    });
  } else {
    phin({
      url: webhookurl,
      method: "POST",
      data: {
        content: `<@${user_id}>, Thank you for voting voting <@${bot}>. You can vote again after 12h here:\n<https://top.gg/bot/${rex.user.id}/vote>`
      }
    });
  }
  res.send({ code: "success" });
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    type: "error",
    message: err.message
  });
});

// dbl servercount
dbl.on("posted", () => {
  console.log("Server count posted!");
});

dbl.on("error", e => {
  console.log(`Oops! ${e}`);
});

hook.webhook.on("ready", whook => {
  console.log(`[[[[[[[[ Webhook running with path ${whook.path} ]]]]]]]]`);
});

hook.webhook.on("vote", vote => {
  let webHook = new Discord.WebhookClient(
    "635089230971928586",
    "7ySPr6pcKMNllynKuD7301TJ5h9fe2i8gjhxzop1YmtqQjdDtwpkleYxlnRwQ5hIrw5u"
  );
  webHook.send(
    `<@${vote.user}>, Thank you for voting voting <@${rex.user.id}>. You can vote again after 12h here:\n<https://top.gg/bot/${rex.user.id}/vote>`
  );
});

// events
const fs = require("fs");
fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    rex.on(eventName, event.bind(null, rex));
    delete require.cache[require.resolve(`./events/${file}`)];
  });
});

//Command Handlers
const { promisify } = require("util");
const readdir = promisify(require("fs").readdir);

rex.commands = new Enmap();
rex.aliases = new Enmap();
fs.readdir("./commands/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    let props = require(`./commands/${file}`);
    let commandName = file.split(".")[0];
    console.log(`Attempting to load command ${commandName}`);
    rex.commands.set(props.help.name, props);
  });
});



rex.on("messageDelete", async message => {
  if (message.author.bot) return;
  let construct = {
    user: message.author.tag,
    avatar: message.author.displayAvatarURL,
    content: message.content
  };
  rex.snipe.set(message.channel.id, construct);
  //await db.set(`channelSnipes_${message.channel.id}`, construct);
  // await db.set(`channelEditSnipes_${message.channel.id}`, construct);

  let channel = rex.settings.get(message.guild.id, "logging");
  let logchannel = db.fetch(`logchannel_${message.guild.id}`);
  if (channel === "true") {
    let Channel = rex.channels.get(channel);
    let embed = new Discord.RichEmbed()
      .setTitle(message.author.tag + " Deleted Their Message")
      .setAuthor(message.author.tag, message.author.displayAvatarURL)
      .addField("Message", message.content)
      .setColor("RANDOM");
    logchannel.send(embed);
  }
});

rex.on("messageUpdate", async (OldMessage, newMessage) => {
  // if (message.author.bot) return;
  let message = newMessage;
  if (message.author.bot) return;

  let channel = rex.settings.get(message.guild.id, "logging");
  let logchannel = db.fetch(`logchannel_${message.guild.id}`);
  if (channel === "true") {
    //let Channel = rex.channels.get(channel);
    let embed = new Discord.RichEmbed()
      .setTitle(OldMessage.author.tag + " Edited Their Message")
      .setAuthor(OldMessage.author.tag, OldMessage.author.displayAvatarURL)
      .addField("Previous Content", OldMessage.content)
      .addField("New Content", newMessage.content)
      .setColor("RANDOM");
    logchannel.send(embed);
  }
});

rex.on("channelCreate", async channel => {
  if (!channel.guild) return;
  let Channel = rex.settings.get(channel.guild.id, "logging");
  if (Channel === "true") {
    const logembed = new Discord.RichEmbed()
      .setAuthor("Channel Created", channel.guild.iconURL)
      .setThumbnail(channel.guild.iconURL)
      .addField(`Channel`, channel)
      .addField(`Name`, channel.name)
      .addField(`Mention`, "`" + `<#` + `${channel.id}` + `>` + "`")
      .addField(`Channel ID`, channel.id)
      .setColor("BLURPLE")
      .setFooter(client.user.username, client.user.displayAvatarURL)
      .setTimestamp();
    rex.channels.get(Channel).send(logembed);
  }
});

rex.on("roleCreate", async role => {
  if (!role.guild) return;
  let Channel = rex.settings.get(role.guild.id, "logging");
  if (Channel === "true") {
    const logembed = new Discord.RichEmbed()
      .setAuthor("Role Created", role.guild.iconURL)
      .setThumbnail(role.guild.iconURL)
      .addField(`Role`, role)
      .addField(`Name`, role.name)
      .addField(`Mention`, "`" + `<@&` + `${role.id}` + `>` + "`")
      .addField(`Role ID`, role.id)
      .addField(`Hex`, role.hex)
      .setColor("BLURPLE")
      .setFooter(client.user.username, client.user.displayAvatarURL)
      .setTimestamp();
    rex.channels.get(Channel).send(logembed);
  }
});

rex.on("roleDelete", async role => {
  if (!role.guild) return;
  let Channel = rex.settings.get(role.guild.id, "logging");
  if (Channel === "true") {
    const logembed = new Discord.RichEmbed()
      .setAuthor("Role Deleted", role.guild.iconURL)
      .setThumbnail(role.guild.iconURL)
      .addField(`Role`, role.name)
      .addField(`Role ID`, role.id)
      .setColor("BLURPLE")
      .setFooter(client.user.username, client.user.displayAvatarURL)
      .setTimestamp();
    rex.channels.get(Channel).send(logembed);
  }
});

rex.on("roleUpdate", async (oldRole, newRole) => {
  if (!oldRole.guild) return;
  let Channel = rex.settings.get(oldRole.guild.id, "logging");
  if (Channel === "true") {
    const logembed = new Discord.RichEmbed()
      .setAuthor("Role Updated", oldRole.guild.iconURL)
      .setThumbnail(oldRole.guild.iconURL)
      .addField(`Role`, oldRole)
      .addField(`Mention`, "`" + `<@&` + `${oldRole.id}` + `>` + "`")
      .addField(`Before`, oldRole.name)
      .addField(`After`, newRole.name)
      .addField(`Role ID`, oldRole.id)
      .addField(`Role Position[Before]`, oldRole.position)
      .addField(`Role Position[After]`, newRole.position)
      .addField(`Old Hex`, oldRole.hexColor)
      .addField(`New Hex`, newRole.hexColor)
      .setColor("BLURPLE")
      .setFooter(client.user.username, client.user.displayAvatarURL)
      .setTimestamp();
    rex.channels.get(Channel).send(logembed);
  }
});

rex.on("channelDelete", async channel => {
  if (!channel.guild) return;
  let Channel = rex.settings.get(channel.guild.id, "logging");
  if (Channel === "true") {
    const logembed = new Discord.RichEmbed()
      .setAuthor("Channel Deleted", channel.guild.iconURL)
      .setThumbnail(channel.guild.iconURL)
      .addField(`Name`, channel.name)
      .addField(`Channel ID`, channel.id)
      .setColor("BLURPLE")
      .setFooter(client.user.username, client.user.displayAvatarURL)
      .setTimestamp();
    rex.channels.get(Channel).send(logembed);
  }
});

rex.on("voiceStateUpdate", async (oldMember, newMember) => {
  if (!oldMember.guild) return;
  let Channel = rex.settings.get(oldMember.guild.id, "logging");
  if (Channel === "true") {
    let newUserChannel = newMember.voiceChannel;
    let oldUserChannel = oldMember.voiceChannel;

    if (oldUserChannel === undefined && newUserChannel !== undefined) {
      let embed = new Discord.RichEmbed()
        .setAuthor("User Joined A Voice Channel", oldMember.guild.iconURL)
        .addField("User", oldMember)
        .setColor("BLURPLE")
        .addField("Channel", newUserChannel || "None")
        .setThumbnail(oldMember.user.displayAvatarURL)
        .setFooter(client.user.username, client.user.displayAvatarURL)
        .setTimestamp();
      rex.channels.get(Channel).send(embed);
    } else if (newUserChannel === undefined) {
      let embed1 = new Discord.RichEmbed()
        .setAuthor("User Left A Voice Channel", oldMember.guild.iconURL)
        .addField("User", oldMember)
        .setColor("BLURPLE")
        .addField("Channel", oldUserChannel || "None")
        .setThumbnail(oldMember.user.displayAvatarURL)
        .setFooter(client.user.username, client.user.displayAvatarURL)
        .setTimestamp();
      rex.channels.get(Channel).send(embed1);
    }
    if (newUserChannel === undefined) return;
    if (oldUserChannel === undefined) return;
    let embed = new Discord.RichEmbed()
      .setAuthor("Voice State Updated", oldMember.guild.iconURL)
      .addField("User", oldMember)
      .setColor("BLURPLE")
      .addField("Old Channel", oldUserChannel)
      .addField("New Channel", newUserChannel)
      .setThumbnail(oldMember.user.displayAvatarURL)
      .setFooter(client.user.username, client.user.displayAvatarURL)
      .setTimestamp();
    rex.channels.get(Channel).send(embed);
  }
});

let client = rex;

client.on("guildCreate", async guild => {
  const info = "8.3.1";
  try {
    //const info = require('../config.json');
    rex.user.setActivity(`r$help || ${rex.guilds.size} Guilds || v${info}`);
    client.channels
      .get("625646029651443722")
      .setName(`Guild Stats : ${client.guilds.size}`);
  } catch (e) {
    console.log(e);
  }
  let logs = client.channels.get("625636334593376266");
  // let channel = client.channels.get(guild.systemChannelID || channelID).createInvite().then(i => {
  let joinEmbed = new Discord.RichEmbed()
    .setTitle("Server Joined")
    .setThumbnail(guild.iconURL)
    .setColor("GREEN")
    .addField(`Server Count`, client.guilds.size)
    .addField(`Server Name`, guild.name)
    .addField(`Server ID`, guild.id)
    // .addField(`Link`, `https://discord.gg/${i.code}` || `Missing permissions for invite.`)
    .addField(`Server Members`, guild.members.size)
    .addField(
      `Server Owner`,
      guild.owner.user.tag + " | " + guild.owner.user.id
    )
    .setFooter(client.user.username, client.user.displayAvatarURL)
    .setTimestamp();
  logs.send(joinEmbed);
  // rex.user.setActivity(`r$help || ${rex.guilds.size} Guilds || v${info.version}`)
  //  })
});

client.on("guildDelete", async guild => {
  try {
    const info = "8.3.1";
    rex.user.setActivity(`r$help || ${rex.guilds.size} Guilds || v${info}`);
    client.channels
      .get("625646029651443722")
      .setName(`Guild Stats : ${rex.guilds.size}`);
  } catch (e) {
    console.log(e);
  }
  let logs = client.channels.get("625636334593376266");

  let leaveEmbed = new Discord.RichEmbed()
    .setTitle("Server Left")
    .setThumbnail(guild.iconURL)
    .setColor("RED")
    .addField(`Server Count`, client.guilds.size)
    .addField(`Server Name`, guild.name)
    .addField(`Server ID`, guild.id)
    .addField(`Server Members`, guild.members.size)
    .addField(
      `Server Owner`,
      guild.owner.user.tag + " | " + guild.owner.user.id
    )
    .setFooter(client.user.username, client.user.displayAvatarURL)
    .setTimestamp();
  logs.send(leaveEmbed);
  client.settings.delete(guild.id);
});

function Days(date) {
  let now = new Date();
  let diff = now.getTime() - date.getTime();
  let days = Math.floor(diff / 86400000);
  return days + (days == 1 ? " day" : " days") + " ago";
}

// welcomer/leaver

client.on("guildMemberAdd", async member => {
  let wc = db.fetch(`welcomer_${member.guild.id}`);
  let channel = wc;
  if (!channel) return;
  let i = rex.settings.get(member.guild.id, "welcomertype");
  let w = rex.settings.get(member.guild.id, "welcomemsg");
  let wm = w
    .replace("{{user}}", member.user.tag)
    .replace("{{server}}", member.guild.name);
  let bot;
  if (member.bot) {
    bot = "Bot Account";
  } else {
    bot = "User Account";
  }
  if (i === "embed") {
    const embed = new Discord.Richembed()
      .setAuthor("Member Joined!", member.guild.iconURL)
      .setThumbnail(member.user.displayAvatarURL)
      .addField("User", `${member.user} | ${member.user.tag}`, true)
      .addField("ID", `${member.user.id}`, true)
      .addFeild("Account Type", bot, true)
      .addField(
        "Created",
        `${member.user.createdAt.toUTCString().substr(0, 16)} (${Days(
          member.user.createdAt
        )})`,
        true
      )
      .addField("Welcome Message", wm)
      .setColor("BLURPLE")
      .setFooter(rex.user.tag, rex.user.displayAvatarURL);

    channel.send(embed);
  } else if (i === "image") {
  } else return;
});

client.on("guildMemberRemove", async member => {
  let lc = db.fetch(`leaver_${member.guild.id}`);
  let channel = lc;
  if (!channel) return;
  let i = rex.settings.get(member.guild.id, "welcomertype");
  let w = rex.settings.get(member.guild.id, "leavemsg");
  let wm = w.replace("{{user}}", member.user.tag);
  let bot;
  if (member.bot) {
    bot = "Bot Account";
  } else {
    bot = "User Account";
  }
  if (i === "embed") {
    const embed = new Discord.Richembed()
      .setAuthor("Member Left!", member.guild.iconURL)
      .setThumbnail(member.user.displayAvatarURL)
      .addField("User", `${member.user} | ${member.user.tag}`, true)
      .addField("ID", `${member.user.id}`, true)
      .addFeild("Account Type", bot, true)
      .addField(
        "Created",
        `${member.user.createdAt.toUTCString().substr(0, 16)} (${Days(
          member.user.createdAt
        )})`,
        true
      )
      .addField("Goodbye Message", wm)
      .setColor("BLURPLE")
      .setFooter(rex.user.tag, rex.user.displayAvatarURL);

    channel.send(embed);
  } else if (i === "image") {
  } else return;
});

// raw
client.on("raw", packet => {
  if (!["MESSAGE_REACTION_ADD", "MESSAGE_REACTION_REMOVE"].includes(packet.t))
    return;
  const channel = client.channels.get(packet.d.channel_id);
  if (channel.messages.has(packet.d.message_id)) return;

  channel.fetchMessage(packet.d.message_id).then(message => {
    const emoji = packet.d.emoji.id
      ? `${packet.d.emoji.name}:${packet.d.emoji.id}`
      : packet.d.emoji.name;
    const reaction = message.reactions.get(emoji);
    if (reaction)
      reaction.users.set(packet.d.user_id, client.users.get(packet.d.user_id));
    if (packet.t === "MESSAGE_REACTION_ADD") {
      client.emit(
        "messageReactionAdd",
        reaction,
        client.users.get(packet.d.user_id)
      );
    }
    if (packet.t === "MESSAGE_REACTION_REMOVE") {
      client.emit(
        "messageReactionRemove",
        reaction,
        client.users.get(packet.d.user_id)
      );
    }
  });
});

// starboard
client.on("messageReactionAdd", async (reaction, user) => {
  const message = reaction.message;
  if (reaction.emoji.name !== "⭐") return;
  if (user.bot) return;
  if (message.author.bot) return;
  if (message.author.id === user.id) return; //message.channel.send(`${user}, you cannot star your own messages.`);
  if (message.author.bot) return;
  let channel = db.fetch(`starboard_${message.guild.id}`);
  if (channel === null) return;
  const starChannel = client.channels.get(channel);
  const fetchedMessages = await starChannel.fetchMessages({ limit: 100 });
  const stars = fetchedMessages.find(
    m =>
      m.embeds[0].footer.text.startsWith("⭐") &&
      m.embeds[0].footer.text.endsWith(message.id)
  );
  if (stars) {
    const star = /^\⭐\s([0-9]{1,3})\s\|\s([0-9]{17,20})/.exec(
      stars.embeds[0].footer.text
    );
    const foundStar = stars.embeds[0];
    const image =
      message.attachments.size > 0
        ? await (reaction, message.attachments.array()[0].url)
        : "";
    const embed = new Discord.RichEmbed()
      .setColor(foundStar.color)
      .setDescription(`${foundStar.description}`)
      .setAuthor(message.author.tag, message.author.displayAvatarURL)
      .setTimestamp()
      .setFooter(`⭐ ${parseInt(star[1]) + 1} | ${message.id}`)
      .setImage(image);
    const starMsg = await starChannel.fetchMessage(stars.id);
    await starMsg.edit({ embed });
  }
  if (!stars) {
    const image =
      message.attachments.size > 0
        ? await (reaction, message.attachments.array()[0].url)
        : "";
    if (image === "" && message.cleanContent.length < 1) return; // message.channel.send(`${user}, you cannot star an empty message.`);
    const embed = new Discord.RichEmbed()
      .setColor(message.member.displayHexColor)
      .setDescription(
        `**[Jump To Message](${message.url})**\n\n${message.cleanContent}`
      ) // only here!
      .setAuthor(message.author.tag, message.author.displayAvatarURL)
      .setTimestamp(new Date())
      .setFooter(`⭐ 1 | ${message.id}`)
      .setImage(image);
    await starChannel.send({ embed });
  }
});

client.on("messageReactionRemove", async (reaction, user) => {
  const message = reaction.message;
  if (user.bot) return;
  if (message.author.bot) return;
  if (message.author.id === user.id) return;
  if (reaction.emoji.name !== "⭐") return;
  let channel = db.fetch(`starboard_${message.guild.id}`);
  if (channel === null) return;
  const starChannel = client.channels.get(channel);
  const fetchedMessages = await starChannel.fetchMessages({ limit: 100 });
  const stars = fetchedMessages.find(
    m =>
      m.embeds[0].footer.text.startsWith("⭐") &&
      m.embeds[0].footer.text.endsWith(reaction.message.id)
  );
  if (stars) {
    const star = /^\⭐\s([0-9]{1,3})\s\|\s([0-9]{17,20})/.exec(
      stars.embeds[0].footer.text
    );
    const foundStar = stars.embeds[0];
    const image =
      message.attachments.size > 0
        ? await (reaction, message.attachments.array()[0].url)
        : "";
    const embed = new Discord.RichEmbed()
      .setColor(foundStar.color)
      .setDescription(`${foundStar.description}`)
      .setAuthor(message.author.tag, message.author.displayAvatarURL)
      .setTimestamp()
      .setFooter(`⭐ ${parseInt(star[1]) - 1} | ${message.id}`)
      .setImage(image);
    const starMsg = await starChannel.fetchMessage(stars.id);
    await starMsg.edit({ embed });
    if (parseInt(star[1]) - 1 == 0) return starMsg.delete(1000);
  }
});

rex.on("guildCreate", async () => {
  rex.channels
    .get("625646029651443722")
    .setName(`Guild Stats : ${rex.guilds.size}`);
  rex.user.setActivity(`r$help || ${rex.guilds.size} Guilds || v8.3.1`, {
    type: "PLAYING"
  });
});

rex.on("guildDelete", async () => {
  rex.channels
    .get("625646029651443722")
    .setName(`Guild Stats : ${rex.guilds.size}`);
  rex.user.setActivity(`r$help || ${rex.guilds.size} Guilds || v8.3.1`, {
    type: "PLAYING"
  });
});

rex.login(process.env.TOKEN);

