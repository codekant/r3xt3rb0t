exports.run = async (rex, message, args, Discord) => {
  const mapping = {
    " ": "  ",
    "0": ":zero:",
    "1": ":one:",
    "2": ":two:",
    "3": ":three:",
    "4": ":four:",
    "5": ":five:",
    "6": ":six:",
    "7": ":seven:",
    "8": ":eight:",
    "9": ":nine:",
    "!": ":exclamation:",
    "?": ":question:",
    "#": ":hash:",
    "*": ":asterisk:",
    "+": ":heavy_plus_sign:",
    "-": ":heavy_minus_sign:",
    "$": ":heavy_dollar_sign:",
    ">": ":arrow_forward:",
    "<": ":arrow_backward:"
        };

        'abcdefghijklmnopqrstuvwxyz'.split('').forEach(c => {
            mapping[c] = mapping[c.toUpperCase()] = ` :regional_indicator_${c}:`;
        })

        if (args.length < 1) {
            message.channel.send("Provide some to text to emojify");
        }

        message.channel.send(
            args.join(' ')
            .split('')
            .map(c => mapping[c] || c)
            .join('')
        );
}

exports.help = {
  name: 'emojify',
  aliases: []
}