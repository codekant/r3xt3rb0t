const db = require('quick.db');

exports.run = async (rex, message, args, Discord) => {
    const embed = new Discord.RichEmbed();
  
    let channel = message.mentions.channels.first()
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(":x: You don't have permission to use this command.");
if (!message.guild.me.hasPermission('MANAGE_SERVER')) return message.channel.send(":x: I am missing `MANAGE_MESSAGES` permission."); 
    if (!channel) return message.channel.send(embed
                                              .setDescription(":x: Please mention a channel.")
                                             .setTitle('Lmao Error')
                                             .setColor('#ed0202'));
  
    db.set(`cbchannel_${message.guild.id}`, channel.id)
    
    return message.channel.send(embed
                                .setDescription("Chatbot channel set to **<#"+db.fetch(`cbchannel_${message.guild.id}`)+">**.")
                               .setTitle('ChatChannel Set!')
                               .setColor('BLURPLE'));
  
}

exports.help = {
  name: 'chatbot',
  aliases:['chatchannel']

}