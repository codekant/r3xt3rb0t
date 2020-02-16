const db = require('quick.db')

exports.run = async (rex, message, args, Discord) => {
  
  let user = message.mentions.users.first() || rex.users.get(args[0]) || message.author
    let amount = db.fetch(`rexcoins_${user.id}`)
    if (amount === null) amount = "0";
    let embed = new Discord.RichEmbed()
    .setAuthor(`Balance`, user.displayAvatarURL)
    .setColor(message.member.displayHexColor)
    .addField(`User`, user, true)
    .addField(`Wallet`, ` **${amount}**<:rexcoin:638368847488876554>`, true)
    .addField(`Bank`, `**Coming soon!**`, true)
    .addField(`Please Read`, `Please [Vote Here](https://top.gg/bot/${rex.user.id}) to support me.`, true)
    
    message.channel.send(embed)
}

module.exports.help = {
  name: 'bal',
  aliases: []
}