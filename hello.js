var app = require('express').createServer()
  , io = require('socket.io').listen(app);

app.listen(31019);

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

io.sockets.on('connection', function (socket) {
  var sys = require('sys'),
      twitter = require('twitter');
  var twit = new twitter({
      consumer_key: 'rVGHP96wJj5pJUI1BqFSOg',
      consumer_secret: 'It4so4h8UIkocgSbjoo2h2nYWy20vNM3KcHdXsxSo',
      access_token_key: '19527505-MMnDFFdORLJRYSgvKEFmNvwdWZsKCaZD5DGmNPYsR',
      access_token_secret: 'FEEczuM3ciakJPwLPl1vFJLiYJeC8V2w3FHwQxSC0E'
  });
  twit.stream('user', {track:'London'}, function(stream) {
      stream.on('data', function (data) {
          //sys.puts(data.text);
          socket.emit('tweet', data);
      });
  });
});

