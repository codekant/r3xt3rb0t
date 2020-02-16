const snek = require("snekfetch");
const moment = require("moment");
require("moment-duration-format");

exports.run = async (rex, message, args, Discord) => {
  if (args.length === 0) return message.reply("You must supply a search term.");
  const query = args.join(" ");
  try {
    const { body } = await snek.get(
      `https://registry.npmjs.com/${query.toLowerCase()}`
    );
    const version = body.versions[body["dist-tags"].latest];
    let deps = version.dependencies ? Object.keys(version.dependencies) : null;
    let maintainers = body.maintainers.map(user => user.name);
    let github = version.repository.url;
    let gitshort = github.slice(23, -4);

    if (maintainers.length > 10) {
      const len = maintainers.length - 10;
      maintainers = maintainers.slice(0, 10);
      maintainers.push(`...${len} more.`);
    }

    if (deps && deps.length > 10) {
      const len = deps.length - 10;
      deps = deps.slice(0, 10);
      deps.push(`...${len} more.`);
    }

    function customTemplate() {
      return this.duration.asSeconds() >= 86400
        ? "w [weeks], d [days]"
        : "h [hours], m [minutes] & s [seconds]";
    }

    let updated = moment
      .duration(
        Date.now() - new Date(body.time[body["dist-tags"].latest]).getTime()
      )
      .format(customTemplate, {
        trim: false
      });

    const embed = new Discord.RichEmbed()
      .setColor("RANDOM")
      .setAuthor(`Package Info - NPMJS.COM`, message.author.displayAvatarURL)
      .setTitle(`Package Name`)
      .setDescription(
        `**[${body.name}](https://npmjs.com/package/${body.name})**`
      )
      .setThumbnail("https://i.imgur.com/8DKwbhj.png")
      .setImage(`https://nodei.co/npm/${body.name}.png`)
      .addField(`Description`, `${version.description || "No description."}`)
      .addField("Last Modified", `${updated} ago`)
      .addField("Version", `${body["dist-tags"].latest}`)
      .addField("License", `${body.license}`)
      .addField("Maintainer(s)", maintainers.join(", "))
      .addField(
        "Dependencies",
        `${deps && deps.length ? deps.join(", ") : "None"}`
      )
      .addField(
        "NPMJS Package",
        `**[Link](https://www.npmjs.com/package/${body.name.toLowerCase()})**`
      )
      .addField(
        "Github Repository",
        `**[Link](https://www.github.com/${gitshort})**`
      )
      .setFooter(rex.user.username, rex.user.displayAvatarURL)
      .setTimestamp();
    message.channel.send({ embed });
  } catch (error) {
    if (error.status == 404)
      return message.channel.send("**:x: Package doesn't exists.**");
  }
};

exports.help = {
  name: "npm",
  aliases: ["nodepkg"]
};

//error RIP
