const fetch = require("node-fetch");

module.exports.run = async (rex, message, args, Discord) => {
  let pokemon = args.join(" ");
  if (!pokemon)
    return message.channel.send(":x: Please provide a pokemon name.");

  await fetch(`https://theweirdapi.glitch.me/api/pokemon?name=${pokemon}`)
    .then(res => res.json())
    .then(pokeinfo => {
      if (!pokeinfo.name) return message.channel.send(":x: Not found!");
      else {
        const em = new Discord.RichEmbed()
          .setAuthor(
            `Pokedex`,
            "https://www.netclipart.com/pp/m/71-716602_freeuse-download-pokemon-ball-png-images-pokemon-ball.png"
          )
          .setColor("BLURPLE")
          .setThumbnail(pokeinfo.image)
          .addField(`Name`, pokeinfo.name)
          .addField(`ID`, pokeinfo.id)
          .addField(`Base Experience`, pokeinfo.base_experience)
          .addField(`Height`, pokeinfo.height)
          .addField(`Weight`, pokeinfo.weight)
          .addField(`Type`, pokeinfo.type)
          .addField(
            `Moves`,
            pokeinfo.moves.join(", ").substring(0, 1021) + "..."
          )
          .setFooter(`The Weird API | R3XT3R`, rex.user.displayAvatarURL)
          .setTimestamp();
        return message.channel.send(em);
      }
    });
};

module.exports.help = {
  name: "pokemon",
  aliases: ["pokedex"]
};
