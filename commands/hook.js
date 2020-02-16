const memer = require("discordmeme.js");
const Discord = require("discord.js");
const db = require("quick.db");

module.exports.run = async (rex, message, args, Discord) => {
  let text = args.join(" ") || "I am Not Provided a Message R.I.P";
  if (!message.guild.me.hasPermission("MANAGE_WEBHOOKS"))
    return message.channel.send("Make Sure I have Enough Permissions");
  message.channel
    .createWebhook(message.author.username, message.author.displayAvatarURL)
    .then(async hook => {
      let webHook = new Discord.WebhookClient(hook.id, hook.token);
      webHook.send(text).then(() => {
        hook.delete("Message Has Been Send!");
      });
    })
    .catch(e => console.log(e.message));
  // u r gonna make it webhook based???, yeah it'll be coolyeah
  message.delete();
};

module.exports.help = {
  name: "hook",
  aliases: ["hookme"]
};
