const { Client } = require("discord.js");

class rex extends Client {
  constructor(token) {
    if (!token) return;
  }

  connect() {
    rex.login(process.env.TOKEN);
  }
}
