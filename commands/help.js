let Discord = require('discord.js');
module.exports.run = async (rex, message, args) => {
  let cmd = args[0]
  
  let HELP = new Discord.RichEmbed()
                        .setTitle("Help")
                        .setDescription(`We Have a Lot of Commands for ya'll To use. henceforth we cannot put everything in one message, so its put into categories. Choose One Below!`)
                        .addField("Commands" , `**- ${rex.prefix}help misc \n- ${rex.prefix}help music \n- ${rex.prefix}help fun \n- ${rex.prefix}help image \n- ${rex.prefix}help social \n- ${rex.prefix}help mod**`)
                        .setColor('BLURPLE');
  
  let MISC = new Discord.RichEmbed()
             .setTitle('Misc Commands')
  .setDescription("`afk` , `ping` , `stats` , `npm` , `serverinfo` , `whois` , `avatar` , `weather` , `toggle-automod` ,  `checkvote` , `backup` , `instagram` , `inrole` , `invite` , `emojify` , `emojis` , `enlarge` , `pepedab` , `clap` , `hook` , `clyde` , `checkvote` , `reverse` , `pokemon`")
  .setColor('BLURPLE')
  .setFooter(`Requested By ${message.author.tag}`);
  
  
  let MUSIC = new Discord.RichEmbed()
  .setTitle("Music Comands")
  .setDescription("`play` , `pause` , `resume` , `stop` , `loop` , `8d (Depriciated)` , `lyrics`")
  .setColor('BLURPLE')
  .setFooter(`Requested By ${message.author.tag}`);
  
  
  let MOD = new Discord.RichEmbed()
  .setTitle("Moderation / Setup Commands")
  .setDescription("`mention` , `modlog` , `setprefix` , `reset` , `revamp` , `chatbot` , `addtag` , `edittag` , `removetag` , `botclean`")
  .setColor('BLURPLE')
  .setFooter(`Requested By ${message.author.tag}`);
  
  
  
  
  
  let FUN = new Discord.RichEmbed()
  .setTitle("Fun Commands")
.setDescription("`bot-token` , `ship` , `cowsay` , `greentext` , `emoji` , `emojis` , `minesweeper` , `8ball` , `fight` , `rexphone` , `call` , `roast`")  
.setColor('BLURPLE')
.setFooter(`Requested By ${message.author.id}`);
  
  
  
  
  
  let IMGEN =  new Discord.RichEmbed()
  .setTitle("Image Commands")
  .setDescription("`vr` , `barcode` , `binary` , `blur` , `cancer` , `changemymind` , `circle` , `communism` , `crab` , `dab` , `dank` , `deepfry` , `delete` , `discordsay` , `door` , `enlarge` , `fakenews` , `frame` , `gay` , `glitch` , `hitler` , `html` , `invert` , `jail` , `meme` , `minecraft` , `phub` , `pokemon-img` , `qr` , `roblox` , `salty` , `satan` , `sepia` , `slap` , `spank` , `thuglife` , `trash` , `trigger` , `tweet` , `wanted` , `warp` , `wasted` , `youtubecomment`")
  .setColor('BLURPLE')
  .setFooter(`Requested By ${message.author.tag}`);
  
  
  
  
  let SOCIAL = new Discord.RichEmbed()
  .setTitle("Social Commands")
  .setDescription("`instagram` , `work` , `search` , `daily` , `bal` , `call` , `rexphone` , `giveaway` , `emojis` , `rich` , `level` , `leaderboard`")
  .setColor('BLURPLE')
  .setFooter(`Requested By ${message.author.tag}`);
  
  
   if (!cmd) {
    message.channel.send(HELP)
  } else if (cmd.toLowerCase() === 'misc') {
    message.channel.send(MISC)
  } else if (cmd.toLowerCase() === 'music') {
    message.channel.send(MUSIC)
  } else if (cmd.toLowerCase() === 'fun') {
    message.channel.send(FUN)
  } else if (cmd.toLowerCase() === 'mod') {
    message.channel.send(MOD)
  } else if (cmd.toLowerCase() === 'image') {
    message.channel.send(IMGEN)
  } else if (cmd.toLowerCase() === 'social') {
    message.channel.send(SOCIAL)
  };
  
  
};

module.exports.help = {
  name: 'help',
  aliases: ['cmds']
}