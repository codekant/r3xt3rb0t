const giveaways = require("discord-giveaways");
const Discord = require("discord.js");
const info = require("../package.json");
module.exports = rex => {
  const text = ` 

-------------------------------
${rex.user.tag} is now Ready!  
===============================
Servers = ${rex.guilds.size}   
Latency = ${rex.ping}          
Commands = ${rex.commands.size}
Users = ${rex.users.size}
Channels = ${rex.channels.size}
Version = v${info.version}
-------------------------------
`; //How can the bot be connected to a voice channel when its offline? //- let _-me tell you on discord come there ok
  console.log(text);
  rex.user.setStatus("online");
  rex.user.setActivity(
    `r$help || ${rex.guilds.size} Guilds || v${info.version}`,
    { type: "LISTENING" }
  );
  giveaways.launch(rex, {
    updateCountdownEvery: 60000,
    botsCanWin: false,
    embedColor: "#7289DA",
    reaction: "🎉",
    storage: __dirname + "/giveaways.json"
  });
  
}; //
