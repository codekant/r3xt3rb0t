exports.run = (rex, message, args, Discord) => {
  if (
    !message.author.id === "521007613475946496" ||
    "594852041050816522" ||
    "568356933967544330" ||
    "544922024301297691"
  )
    if (!args[0])
      return message.reply("Must provide a command name to reload.");
  const commandName = args[0];
  // Check if the command exists and is valid
  if (!rex.commands.has(commandName)) {
    return message.reply("That command does not exist");
  }
  // the path is relative to the *current folder*, so just ./filename.js
  delete require.cache[require.resolve(`./${commandName}.js`)];
  // We also need to delete and reload the command from the client.commands Enmap
  rex.commands.delete(commandName);
  const props = require(`./${commandName}.js`);
  rex.commands.set(commandName, props);
  message.channel.send(`**${commandName}.js** Command has been reloaded`);
};

exports.help = {
  name: "reload",
  aliases: ["rl", "r"]
};
