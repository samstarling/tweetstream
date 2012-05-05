// Imports
var express = require('express');
var sys = require('sys');
var twitter = require('twitter');

var app = express.createServer();
app.register('.html', require('jade'));
app.set("view options", { layout: false });
app.listen(process.env.PORT || 3000);

app.get('/', function (req, res) {
  
  var query = "bbc";
  if(req.query["q"]) {
    query = req.query["q"];
  }
  
  script_url = 'http://localhost';
  if(process.env.PORT) {
    script_url = 'http://tweetstream.herokuapp.com';
  }
  
  res.render(__dirname + '/public/index.html', {
    script_url: script_url,
    query: query
  });
  
  var io = require('socket.io').listen(app);
  io.set('transports', ['xhr-polling']); io.set('polling duration', 10);
  
  io.sockets.on('connection', function (socket) { 
    console.log(socket);
    twit.stream('user', {track: query}, function(stream) {
      stream.on('data', function (data) {
        if(data.text) {
          data.split = data.text.split(" ")
          socket.emit('tweet', data);
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

var twit = new twitter({
  consumer_key: 'zyg4gPhvZSqLn25x37oUyA',
  consumer_secret: 'ymTIgmG5DhQzurEHsCD22pgdIFGWIysGT5SEwkuWCk',
  access_token_key: '571728756-ViiabtEcHk3A2nPWagGHlC1DDauKtruBmdWKZLPE',
  access_token_secret: '896I1bD2ahsHgnim3O5OOZG1uNUrFXwZb9VUzr4'
});

