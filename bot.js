console.log("Starting program");

var client = require('coffea')({
    host: 'irc.quakenet.org',
    port: 6667, // default value: 6667
    ssl: false, // set to true if you want to use ssl
    ssl_allow_invalid: false, // set to true if the server has a custom ssl certificate
    prefix: '!', // used to parse commands and emit on('command') events, default: !
    channels: ['#bottitesti'], // autojoin channels, default: []
    nick: 'mr_robot', // default value: 'coffea' with random number
    username: 'mr_robot', // default value: username = nick
    realname: 'Mr. Robot', // default value: realname = nick
    throttling: 250 // default value: 250ms, 1 message every 250ms, disable by setting to false
});

client.on('motd', function(err, event) {
    client.join(['#bottitesti'], event.network);
});

client.on('message', function(event) {
    console.log('[' + event.channel.getName() + '] ' + event.user.getNick() + ': ' + event.message);
    //[#foo] nick: message
    event.reply(event.message); // I'm a parrot
});

client.on('command', function(event) {
    if (event.cmd === 'ping') { // respond to `!ping SOMETHING` with `SOMETHING`, or `pong`, if SOMETHING is not specified
        event.reply(event.args.length > 0 ? event.args.join(' ') : 'pong');
    }
});

client.on('error', function(err, event) {
    console.log(event.name, err.stack);
});

console.log("Ending progam");
