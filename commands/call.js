module.exports = {
  help: {
    name: "call"
  },
  run: async (rex, message, args, Discord) => {
    if (!args[0]) return message.channel.send("Please provide a user to call!");
    let user =
      message.mentions.users.first() ||
      rex.users.get(args[0]) ||
      rex.users.find(r => r.tag.toLowerCase() === args[0].toLowerCase());
    if (!user) return message.channel.send("Please provide a user to call!");
    const db = require(`quick.db`);
    let check = await db.fetch(
      `usercallBlocks_${user.id}-${message.author.id}`
    );
    if (check !== null) {
      return message.channel.send(
        "Sorry!, The User has blocked you from calling them.."
      );
    }

    let startCollecting;

    try {
      let msg = await user.send(
        `${message.author.tag} Is Calling You!\nReply 'Yes' To Accept, Reply 'No' To Decline`
      );

      let filter = m => m.content.toLowerCase().startsWith("yes" || "no");
      msg.channel
        .awaitMessages(filter, {
          max: 1,
          time: 30000,
          errors: ["time"]
        })
        .then(() => {
          startCollecting = true;
          msg.channel
            .send("I have started the call!\nDo r$end to end it")
            .then(m => message.channel.send(m.content));
        });
      if (startCollecting === true) {
        let userCollector = new Discord.MessageCollector(
          msg.channel,
          m => m.id === user.id
        );
        let authorCollector = new Discord.MessageCollector(
          message.channel,
          m => m.channel.id === message.channel.id
        );

        userCollector.on("collect", async msg => {
          if (msg.author.bot) return;
          if (msg.content.toLowerCase() === rex.prefix + "end") {
            userCollector.stop("kek");
            authorCollector.stop("idk");
            user.send(`Successfully Ended The Call`);
            return message.channel.send("Looks like they hung up");
          }
          message.channel.send(`**${user.tag}: ${msg.content}**`);
        });

        authorCollector.on("collect", async msg => {
          if (msg.author.bot) return;
          if (msg.content.toLowerCase() === rex.prefix + "end") {
            userCollector.stop("finished");
            authorCollector.stop("finished");
            user.send("Looks like they ended the call");
            return message.channel.send("Successfully Ended The Call");
          }
          user.send(`**${message.author.tag}: ${msg.content}**`);
        });
      }
    } catch (e) {
      return message.channel.send(
        "Looks like their dms are closed " + e.message
      );
    }
  }
};
