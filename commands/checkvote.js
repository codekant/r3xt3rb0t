const DBL = require("dblapi.js");

module.exports.run = async (rex, message, args, Discord) => {
  
  const dbl = new DBL(process.env.DBL, rex)
  
  let user = message.mentions.users.first() || rex.users.get(args[0]) || message.author
  dbl.hasVoted(user.id).then(voted => {
    if (voted) {
      const embed = new Discord.RichEmbed();
      embed.setAuthor(`Vote Check`, user.displayAvatarURL)
      embed.setColor('BLURPLE')
      embed.setDescription(`<:greentick:624962152502919169> ${user} has voted me on **[TOP.GG](https://top.gg/bot/${rex.user.id}/vote)**.`)
      return message.channel.send(embed)
    } else {
      const embed = new Discord.RichEmbed();
      embed.setAuthor(`Vote Check`, user.displayAvatarURL)
      embed.setColor('BLURPLE')
      embed.setDescription(`<:redtick:624962249924280320> ${user} has not voted me. They can vote me here 👉 **[TOP.GG](https://top.gg/bot/${rex.user.id}/vote)**.\n\n**(NOTE: IF YOU HAVE VOTED, PLEASE CHECK AGAIN AFTER FEW MINUTES.)**`)
      return message.channel.send(embed)
    }
  })

}

module.exports.help = {
  name: 'checkvote', 
  aliases: ['cv']
}