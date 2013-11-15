var express = require('express');
var sys = require('sys');
var twitter = require('twitter');
var logging = require('node-logging');
var path = require("path");
var http = require("http");
var jade = require("jade");

logging.setLevel('error');

var express = require("express");
var app = express();
app.set('view engine', 'jade');
app.set("view options", { layout: false });
var server = http.createServer(app);
server.listen(process.env.PORT || 3000);

var io = require('socket.io').listen(server);
io.set('transports', ['xhr-polling']); io.set('polling duration', 10);

app.get('/', function (req, res) {
  script_url = 'http://localhost';
  if(process.env.PORT) {
    script_url = 'http://tweetstream.herokuapp.com';
  }
  
  res.render('index', {
    script_url: script_url
  });
  
  io.sockets.on('connection', function (socket) { 
    twit.stream('user', { track: "BBC" }, function(stream) {
      stream.on('data', function (data) {
        if(data.text) {
          if(!data.text.startsWith("RT")) {
            data.split = data.text.split(" ")
            socket.volatile.emit('tweet', data);
          }
        }
      });
    });
  });
});

app.get('/style.css', function (req, res) {
  res.sendfile(__dirname + '/public/style.css');
});

app.get('/tweets.js', function (req, res) {
  res.sendfile(__dirname + '/public/tweets.js');
});

app.get('/timeago.js', function (req, res) {
  res.sendfile(__dirname + '/public/timeago.js');
});

var twit = new twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});
