console.log("Starting bot");
var title = require('url-to-title');
var c = require('irc-colors');
var Forecast = require('forecast');
var NodeGeocoder = require('node-geocoder');
var fetchVideoInfo = require('youtube-info');
var getYouTubeID = require('get-youtube-id');
var secToMin = require('sec-to-min');

var client = require('coffea')({
    host: 'irc.quakenet.org',
    port: 6667, // default value: 6667
    ssl: false, // set to true if you want to use ssl
    ssl_allow_invalid: false, // set to true if the server has a custom ssl cer$
    prefix: '!', // used to parse commands and emit on('command') events, defau$
    channels: ['#bottitesti'], // autojoin channels, default: []
    nick: 'mr_robot', // default value: 'coffea' with random number
    username: 'mr_robot', // default value: username = nick
    realname: 'Mr. Robot', // default value: realname = nick
    throttling: 250 // default value: 250ms, 1 message every 250ms, disable by $
});

//wip
var forecast = new Forecast({
    service: 'darksky',
    key: 'your-api-key',
    units: 'celcius',
    cache: true, // Cache API requests 
    ttl: { // How long to cache requests. Uses syntax from moment.js: http://momentjs.com/docs/#/durations/creating/ 
        minutes: 30,
        seconds: 0
    }
});

//wip
var geocoder = NodeGeocoder(options);
var options = {
    provider: 'google',

    // Optional depending on the providers 
    httpAdapter: 'https', // Default 
    apiKey: 'YOUR_API_KEY', // for Mapquest, OpenCage, Google Premier 
    formatter: null // 'gpx', 'string', ... 
};

//title/youtube WORKING
client.on('message', function(err, event) {
    //Regexp for URL detection
    var regExUrlCheck = new RegExp(/\b((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))/i);
    var regExYoutube = new RegExp(/^(https?\:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$/i);
    var checkForURL = regExUrlCheck.test(event.message);
    var checkForYoutubeURL = regExYoutube.test(event.message);
    var messageBold = c.bold;

    function logChannelToConsole() {
        console.log('[' + event.channel.getName() + '] ' + event.user.getNick() + ': ' + event.message);
    }

    if (checkForURL === true) { //registered message contains URL
        var returnURLfromString = regExUrlCheck.exec(event.message);
        var parsedURL = returnURLfromString[1].toString();

        if (checkForYoutubeURL === true) {
            var youtubeId = getYouTubeID(parsedURL);

            fetchVideoInfo(youtubeId, function(err, videoInfo) {
                if (!err) {
                    //console.log(videoInfo);
                    var yTitle = videoInfo.title;
                    var yUploader = videoInfo.owner;
                    var yDate = videoInfo.datePublished;
                    var yDuration = secToMin(videoInfo.duration);
                    var yViews = videoInfo.views;

                    event.reply(c.bold("Title: " + yTitle + " // Uploader: " + yUploader + " // Date: " + yDate + " // Duration: " + yDuration + " // Views: " + yViews));
                    console.log("YOUTUBE LINK: Title: " + yTitle + " // Uploader: " + yUploader + " // Date: " + yDate + " // Duration: " + yDuration + " // Views: " + yViews);
                }
            });
        }
        else {
            title(parsedURL, function(err, title) { //url-to-title gets passedURL as an argument
                if (!err) {
                    event.reply(messageBold(title.trim())); //bold, trim removes extra white spaces from returned title
                    console.log(parsedURL + " " + title.trim());
                }
            });
        }
    }
    else {
        logChannelToConsole();
    }
});

//WEATHER WIP
//TODO
client.on('command', function(err, event) {
    // var lat;
    // var long;
    // var city = event.cmd;

    switch (event.cmd) {
        case 'weather':
            // code
            console.log(event.channel.name, event.user.nick, event.message);
            // console.log(event.cmd);

            break;

        default:
            // code
            console.log("NOT A COMMAND")
    }

});

client.on('error', function(err, event) {
    console.log(event.name, err.stack);
});
