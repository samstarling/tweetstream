$(document).ready(function() {

  var tweets = [];

  var socket = io();
  socket.on('tweet', function(data) {
    tweets.push(data.tweet);
    $(".stats__pending .data").text(tweets.length);
  });

  function parseTweet(text) {
    return text
      .replace(/(@\w+)/g, "<span class='username'>\$1</span>")
      .replace(/(#\w+)/g, "<span class='hashtag'>\$1</span>")
      .replace(/\b((?:https?:\/\/|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))/i, "<span class='url'>\$1</span>");
  }

  setInterval(function() {
    var tweet = tweets.shift();
    if(tweet != null) {
      $(".tweet__text").html(parseTweet(tweet.text));
      $(".tweet__user").text("@" + tweet.user.screen_name);
      $(".tweet__time abbr").attr('title', tweet.created_at);
      $(".timeago").timeago();
      $(".stats__pending .data").text(tweets.length);
    }
  }, 6000)
});
