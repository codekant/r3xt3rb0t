module.exports = {
  help: {
    name: 'bot-token'
  },
  run: async (rex, message, args, Discord) => {
    function token() {
      const result = [];
      let keys = `ABCDEFG.HIJKLMNO.PQRSTUV.WXYZabcdefghijklmnopqrstuwyxz`.split('');
      for (let i = 0;i < rex.token.length;i++) {
        result.push(keys[Math.floor(Math.random() * keys.length)]);
      }
      return result.join('').slice(1)
    }
    message.channel.send('```css\nN' + token() + '\n' + '```')
  }
}