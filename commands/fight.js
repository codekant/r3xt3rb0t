const Battle = require("../structures/battle/Battle");
const { randomRange, verify } = require("../util/Util");
//onst Discord = require('discord.js');

exports.run = async (rex, message, args, Discord) => {
  let bot = rex;
  bot.games = new Discord.Collection();
  let opponent = message.mentions.users.first();
  let msg = message;
  if (opponent.id === msg.author.id)
    return msg.reply("You may not battle yourself.");
  if (opponent.bot) return;
  if (!opponent)
    return message.channel.send(
      "You know...You actually have to mention the member you want to fight!!"
    );
  if (opponent.presence.status === "offline")
    return message.channel.send("You can't fight offline members...");
  const current = bot.games.get(msg.channel.id);
  if (current)
    return msg.reply(
      `Please wait until the current game of \`${current.name}\` is finished.`
    );
  bot.games.set(msg.channel.id, {
    name: this.name,
    data: new Battle(msg.author, opponent)
  });
  const battle = bot.games.get(msg.channel.id).data;
  try {
    if (!opponent.bot) {
      await msg.channel.send(`${opponent}, do you accept this challenge?`);
      const verification = await verify(msg.channel, opponent);
      if (!verification) {
        bot.games.delete(msg.channel.id);
        return message.channel.send("Looks like they declined...");
      }
    }
    while (!battle.winner) {
      const choice = await battle.attacker.chooseAction(message);
      if (choice === "attack") {
        const damage = randomRange(
          battle.defender.guard ? 5 : 20,
          battle.defender.guard ? 20 : 50
        );
        let embed = new Discord.RichEmbed()
          .setColor("BLURPLE")
          .setDescription(`${battle.attacker} deals **${damage}** damage!`);
        await message.channel.send(embed);
        battle.defender.dealDamage(damage);
        battle.reset();
      } else if (choice === "defend") {
        let embed = new Discord.RichEmbed()
          .setColor("BLURPLE")
          .setDescription(`${battle.attacker} Defends!!`);
        await message.channel.send(embed);
        battle.attacker.changeGuard();
        battle.reset(false);
      } else if (choice === "special") {
        const miss = Math.floor(Math.random() * 3);
        if (miss) {
          let embed = new Discord.RichEmbed()
            .setColor("BLURPLE")
            .setDescription(`${battle.attacker}'s Special Attack Missed!`);
          await message.channel.send(embed);
        } else {
          const damage = randomRange(
            battle.defender.guard ? 50 : 100,
            battle.defender.guard ? 100 : 150
          );
          let embed = new Discord.RichEmbed()
            .setColor("BLURPLE")
            .setDescription(`${battle.attacker} deals **${damage}** Damage!`);
          await message.channel.send(embed);
          battle.defender.dealDamage(damage);
        }
        battle.attacker.useMP(50);
        battle.reset();
      } else if (choice === "cure") {
        const amount = Math.round(battle.attacker.mp / 2);
        let embed = new Discord.RichEmbed()
          .setColor("BLURPLE")
          .setDescription(`${battle.attacker} heals **${amount}** HP!`);
        await message.channel.send(embed);
        battle.attacker.heal(amount);
        battle.attacker.useMP(battle.attacker.mp);
        battle.reset();
      } else if (choice === "final") {
        let embed = new Discord.RichEmbed()
          .setColor("BLURPLE")
          .setDescription(
            `${battle.attacker} Uses their final move, dealing **60** damage!`
          );
        await message.channel.send(embed);
        battle.defender.dealDamage(60);
        battle.attacker.useMP(100);
        battle.attacker.usedFinal = true;
        battle.reset();
      } else if (choice === "run") {
        await message.channel.send(`${battle.attacker} Coward Runs away...!`);
        battle.attacker.forfeit();
      } else if (choice === "failed:time") {
        await message.channel.send(`Time's up, ${battle.attacker}!`);
        bot.games.delete(message.channel.id);
        const winner = battle;
        return message.channel.send(
          `The Match is over! congrats <@${winner.id}>!`
        );
      } else {
        await message.channel.send("I do not understand what you want to do.");
      }
    }
    const { winner } = battle;
    bot.games.delete(message.channel.id);
    return;
    const embed = new Discord.RichEmbed();
    message.channel.send(
      embed
        .setDescription(`The match is over! Congrats, <@${winner.id}>!`)
        .setColor("BLURPLE")
    );
  } catch (err) {
    bot.games.delete(message.channel.id);
    throw err;
  }
};

exports.help = {
  name: "fight",
  aliases: ["battle"]
};
