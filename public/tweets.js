var socket = io.connect('#{script_url}?q=tweet');
var ready = true;
var regexp = /([-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*))?/gi;
var max_keep = 100;
var startup = true;
var tweets = new Array();
var display_for_ms = 3000;
      
if (typeof String.prototype.startsWith != 'function') {
  String.prototype.startsWith = function (str){
    return this.indexOf(str) == 0;
  };
}

function isUrl(s) {
  return regexp.test(s);
}

function showNextTweet() {
  var data = tweets.splice(0, 1)[0];
  $("#number").html(tweets.length);
  if(data) {
    $('#tweet').fadeOut(100, function() {
      $(this).html("").fadeIn(500, function() {
        var spans = '<span>' + data.split.join('</span> <span>') + '</span><br/><span class="screen_name">@' + data.user.screen_name + '</span>';
        $(spans).hide().appendTo('#tweet').each(function(i) {
          if($(this).text().startsWith("@") && !$(this).hasClass('screen_name')) {
            t = $(this).text().replace(/(@[\w]+)/, '<span class="username">$1</span>')
            $(this).html(t);
          } else if($(this).text().startsWith("#")) {
            t = $(this).text().replace(/(#\w+)/, '<span class="hashtag">$1</span>')
            $(this).html(t);
          } else if(isUrl($(this).text())) {
            t = $(this).text().replace(regexp, '<span class="link">$1</span>')
            $(this).html(t);
          }
          $(this).delay(20 * i).fadeIn(100);
        });
      })
    });
  }
}

socket.on('tweet', function (data) {
  if(data.text) {
    tweets.push(data);
    if(tweets.length >= max_keep) {
      tweets.splice(max_keep - 1, 1);
    }
    if(startup) {
      showNextTweet();
      setInterval('showNextTweet()', display_for_ms);
      startup = false;
    }
    $("#number").html(tweets.length);
  }
});
