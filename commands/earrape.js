exports.run = async (rex, message, args, Discord) => {
  const wait = require("util").promisify(setTimeout);
  let msg = await message.channel.send("Ear Destruction in **3 Seconds**,  Pray For YUR Ears.");
  wait(3000);
  msg.delete().catch(console.error);
  const embed = new Discord.RichEmbed();
  const serverQueue = rex.queue.get(message.guild.id);
  serverQueue.connection.dispatcher.setVolumeLogarithmic(999999 / 100);
  if(!serverQueue) return message.channel.send(':x: Nothing Playing!')
  return message.channel.send(
    embed
      .setTitle("🔊 Earraping Now! 🔊")
      .setDescription(
        "Volume Set to 🔉`99999` and bassboost set to `max`🎃, Earrape mode on! Change Volume To stop! 🎚 PLEASE PUT ON HEADPHONES OR HEADSETS 🎧"
      )
      .setFooter("🎉 Party Time Boiiz..🎉")
      .setColor("BLURPLE")
  );
};

exports.help = {
  name: "earrape",
  aliases: ["er"]
};

//error RIP
