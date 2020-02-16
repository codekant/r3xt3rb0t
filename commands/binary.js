module.exports = {
  help: {
    name: "binary"
  },

  run: async (rex, message, args, Discord) => {
    let text = args.join(" ") ? args.join(" ") : "No text";
    return message.channel.send(binary(text));
  }
};

function binary(text) {
  return text
    .split("")
    .map(res => {
      var converted = res.charCodeAt(0).toString(2);
      return converted.padStart(8, "0");
    })
    .join(" ");
}
