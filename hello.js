var app = require('http').createServer(handler)
  , io = require('socket.io').listen(app)
  , fs = require('fs')

app.listen(80);

function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}

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

