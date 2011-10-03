var express = require('express'); 
var app = express.createServer();
var io = require('socket.io').listen(app);

io.set('transports', ['xhr-polling']); io.set('polling duration', 10);

app.register('.html', require('jade'));
app.set("view options", { layout: false });
app.listen(process.env.PORT || 3000);

app.get('/', function (req, res) {
  script_url = 'http://localhost';
  if(process.env.PORT) {
      script_url = 'http://tweetstream.herokuapp.com';
  }
  res.render(__dirname + '/public/index.html', {script_url: script_url});
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
  twit.stream('user', {track:'radio'}, function(stream) {
    stream.on('data', function (data) {
      sys.puts(data.text);
      socket.emit('tweet', data);
    });
  });
});