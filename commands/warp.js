module.exports = {
  help: {
    name: "warp"
  },

  run: async (rex, message, args, Discord) => {
    let avatar = message.mentions.users.first() || message.author;
    const request = require("snekfetch");
    let url = `https://dankmemer.services/api/warp?avatar1=${avatar.displayAvatarURL}`;
    request
      .get(url, {
        headers: {
          Authorization: process.env.DANKMEMER
        }
      })
      .then(arr => {
        message.channel.send({
          files: [{ attachment: arr.body, name: "warp.png" }]
        });
      });
  }
};
