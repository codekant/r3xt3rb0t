const https = require("https");

exports.run = async (rex, message, args, Discord) => {
  const input = args.join(" ");
  if (!input) return message.reply("Input pls");

  const apiId = "40694682-95fa-44bc-9d3c-5135d7cc3c9d";
  const apiKey = "a0a6ec04-8c7f-4cf9-89e3-258bca9bec5f";

  const data = JSON.stringify({
    html: input
  });

  const options = {
    hostname: "hcti.io",
    port: 443,
    path: "/v1/image",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Basic " + new Buffer(apiId + ":" + apiKey).toString("base64")
    }
  };
  const req = https.request(options, res => {
    console.log(`statusCode: ${res.statusCode}`);

    res.on("data", d => {
      const image = JSON.parse(d);
      const em = new Discord.RichEmbed()
        .setAuthor("HTML Render:")
        .setImage(image["url"])
        .setColor("#36393F");
      message.channel.send(em);
    });
  });

  req.on("error", error => {
    console.error(error);
    return message.channel.send(error.message);
  });

  req.write(data);
  req.end();
};

module.exports.help = {
  name: "html",
  aliases: ["htm"]
};
