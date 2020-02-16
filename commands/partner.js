module.exports = {
  help: {
    name: "partner"
  },
  run: async (rex, message, args, Discord) => {
    if (!message.member.hasPermission("MANAGE_GUILD")) return;
    rex.partner = [];
    message.channel.createInvite().then(async i => {
      const db = require("quick.db");
      const ms = require("parse-ms");
      const cooldown = 8.64e7;

      let check = await db.fetch(`partnerShipEnabled_${message.guild.id}`);

      if (args[0] && args[0].toLowerCase() === "info") {
        let embed = new Discord.RichEmbed()
          .setTitle("Partner Ship")
          .setColor("BLURPLE")
          .setDescription(
            "**__How does it work?__\n\nWhen You use this command, the bot(me) adds the server to the queue.Then a random server is selected from that queue and send to a random channel in the bots list\n\n__How Do i enable it?__\n\nDo <prefix>partner enable\n\n__What are the disadvantages?__\n\nThe bot will send a random invite link to a random channel(Might be in this server also), but the advantage is it'll send one link per 24 hours, we don't want to create an nuisance for you!**"
          );
        return message.channel.send(embed);
      }

      if (check === null) {
        return message.channel.send(
          "**Looks **Partner Ship** Isn't enabled on this server\nDo `" +
            rex.prefix +
            "partner enable` to enable it, but please do `" +
            rex.prefix +
            "partner info` to know the disadvantages**"
        );
      }

      rex.partner.push(message.guild.id);

      let guild = rex.partner[Math.floor(Math.random() * rex.partner.length)];
      if (guild === message.guild.id) return;

      let cd = await db.fetch(`partnerCoolDown_${guild}`);

      if (cd !== null && cooldown - (Date.now() - cd) > 0) return;

      let checkr = await db.fetch(`partnerShipEnabled_${guild}`);
      if (checkr === null) return;

      let channel = rex.guilds.get(guild).channels.random();
      channel.send("hey!!!, Check out this cool server " + i);

      await db.set(`partnerCoolDown_${guild}`, Date.now());

      //channel.send(args.join(' '));
    });
  }
};
