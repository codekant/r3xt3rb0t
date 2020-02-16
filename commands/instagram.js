
const Discord = require("discord.js");


exports.run = async (client, message, args) => {
  if (!args) return message.channel.send(":x: Give a Username!");
  const instagram = require("user-instagram");
  const url = `https://www.instagram.com/${args.join("_")}`;
  instagram(url)
    .then(data => {
  if(!data.fullName) return message.channel.send(':x: Not Found!');
    
      console.log(`Full name is: ${data.fullName}`);
        
      const embed = new Discord.RichEmbed()
        .setTitle("Instagram User")
        .addField(
          "User Info",
          `Full Name: **[${data.fullName}](${
            data.profileLink
          })** \nUsername: **[${args.join("_")}](${
            data.profileLink
          })** \nVerified: **${data.isVerified}** \nPrivate Acoount: **${
            data.isPrivate
          }** \nAccount ID: **${data.id}**`
        )
        .addField(
          "Social",
          `Followers: **${data.subscriberCount}** \nFollowing: **${data.subscribtions}** \nPosts: **${data.postCount}**`
        )
        .addField("BioGraphy", `**${data.bio}**`)
        .setThumbnail(data.avatarHD)
        .setColor("#FFFFFF")
        .setFooter("Instagram User info", message.author.displayAvatarURL);

      message.channel.send(embed);
    })
    .catch(e => {
    console.log(e)
    message.channel.send(':x: Not Found!')
  });
    
  
};

exports.help = {
  name: "instagram",
  aliases: ["ig"]
};
