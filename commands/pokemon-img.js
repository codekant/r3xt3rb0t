module.exports = {
  help: {
    name: "pokemon-img"
  },
  run: async (rex, message, args, Discord) => {
    if (!args[0])
      return message.channel.send(
        "**Correct Usage: <prefix>pokemon <pokemon>**"
      );
    const fetch = require("node-fetch");
    try {
      await fetch(
        `https://weird-api.glitch.me/pokemon?pokemon=${args.join(" ")}`
      )
        .then(res => res.json())
        .then(ar => ar.Data)
        .then(pokemon => {
          if (!pokemon.name) return message.channel.send(":x: Not found!");
          message.channel.send({
            files: [{ attachment: pokemon.image, name: `${pokemon.name}.png` }]
          });
        });
    } catch (e) {
      return message.channel.send(":x: Not found!"); // kek
    }
  }
};
