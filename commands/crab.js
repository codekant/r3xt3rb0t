const Discord = require("discord.js");
var snekfetch = require("snekfetch");
const ms = require("parse-ms");
const db = require("quick.db");

exports.run = async (rex, message, args) => {
  // put 30s cooldown for this command
  /*  let cooldown = 30000
  let cd = await db.fetch(`coolDownlist_crab.js`);
  if(cd !== null && cooldown - (Date.now() - cd) > 0) {
    let time = ms(cooldown - (Date.now() - cd));
    return message.channel.send('Please wait for **' + time.seconds + 'seconds dude..');
  }
  await db.set(`coolDownList_crab.js`, Date.now());*/

  let text = args.join(" ") || "Provide text, seperated by commas.";
  var url = `https://dankmemer.services/api/crab?text=${text}`;
  message.channel
    .send("🦀🦀🦀 Please wait for 8 seconds... 🦀🦀🦀")
    .then(m => m.delete(2000));
  snekfetch
    .get(url, {
      headers: {
        Authorization: process.env.DANKMEMER
      }
    })
    .then(async res => {
      const attachment = new Discord.Attachment(res.body, "crabdance.mp4");
      message.channel.send(attachment);
    })
    .catch(error => {
      message.channel.send(
        ":x: Too many request! Please try again after 30 seconds."
      );
    });
};

module.exports.help = {
  name: "crab",
  aliases: ["crabdance"]
};
