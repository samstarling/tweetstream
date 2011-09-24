var express = require('express'); 
var app = express.createServer();
var io = require('socket.io').listen(app);

io.set('transports', ['xhr-polling']); io.set('polling duration', 10);

app.listen(process.env.PORT || 3000);

/*app.configure('development', function(){
  app.use(express.static(__dirname + '/public'));
});*/

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/public/index.html');
});

app.get('/style.css', function (req, res) {
  res.sendfile(__dirname + '/public/style.css');
});

var sys = require('sys');
var twitter = require('twitter');
var twit = new twitter({
  consumer_key: 'rVGHP96wJj5pJUI1BqFSOg',
  consumer_secret: 'It4so4h8UIkocgSbjoo2h2nYWy20vNM3KcHdXsxSo',
  access_token_key: '19527505-MMnDFFdORLJRYSgvKEFmNvwdWZsKCaZD5DGmNPYsR',
  access_token_secret: 'FEEczuM3ciakJPwLPl1vFJLiYJeC8V2w3FHwQxSC0E'
});

io.sockets.on('connection', function (socket) {
  twit.stream('user', {track:'BBC'}, function(stream) {
    stream.on('data', function (data) {
      socket.emit('tweet', data);
    });
  });
});