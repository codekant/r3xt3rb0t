const db = require('quick.db')

module.exports = {
  help: {
    name: 'afk',
    aliases: []
  },
  
  run: async (rex, message, args, Discord) => {
    let afkMessage = args.join(' ');
    if(!afkMessage) afkMessage = "I'm Currently AFK!"
    let check = await db.fetch(`AFKList_${message.author.id}`);
    if(check === null) {
      let construct = {
        tag: message.author.tag,
        askMessage: afkMessage,
        avatar: message.author.displayAvatarURL
      }
      await db.set(`AFKList_${message.author.id}`, construct);
      let embed = new Discord.RichEmbed()
      .setAuthor('AFK System', message.author.displayAvatarURL)
      .setTitle('You Have Been Set AFK')
      .setColor('BLURPLE')
      .setDescription(`**AFK Message: \n${afkMessage}**`)
      .setTimestamp();
      message.channel.send(embed)
    } else {
      await db.delete(`AFKList_${message.author.id}`);
      let embed = new Discord.RichEmbed()
      .setAuthor('AFK System', message.author.displayAvatarURL)
      .setTitle('You Have Been Removed AFK')
      .setColor('BLURPLE')
      .setDescription(`**I Have Successfully Removed You AFK**`)
      .setTimestamp();
      message.channel.send(embed)
    }
  }
}