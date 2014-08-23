$(document).ready(function() {

  var tweets = [];

  var socket = io();
  socket.on('tweet', function(data) {
    tweets.push(data.tweet);
    $(".stats__pending .data").text(tweets.length);
  });

  setInterval(function() {
    var tweet = tweets.shift();
    if(tweet != null) {
      $(".tweet__text").text(tweet.text);
      $(".tweet__user").text(tweet.user.screen_name);
      $(".tweet__time").text(tweet.created_at);
      $(".stats__pending .data").text(tweets.length);
    }
  }, 1000)
});
