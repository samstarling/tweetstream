var socket = io.connect('#{script_url}?q=tweet');
var ready = true;
var re = /(^|\s)((https?:\/\/)?[\w-]+(\.[\w-]+)+\.?(:\d+)?(\/\S*)?)/gi;
var max_keep = 20;
var startup = true;
var tweets = new Array();
var display_for_ms = 6000;
var total = 0;
      
if (typeof String.prototype.startsWith != 'function') {
  String.prototype.startsWith = function (str){
    return this.indexOf(str) == 0;
  };
}

function isUrl(s) {
  return re.test(s);
}


function populateTweet(data) {
  var spans = '<span>' + data.split.join('</span> <span>') + '</span><br/><span class="screen_name">@' + data.user.screen_name + '</span>';
  $('#tweet').html("");
  $(spans).hide().appendTo('#tweet').each(function(i) {
    if($(this).text().startsWith("@") && !$(this).hasClass('screen_name')) {
      t = $(this).text().replace(/(@[\w]+)/, '<span class="username">$1</span>')
      $(this).html(t);
    } else if($(this).text().startsWith("#")) {
      t = $(this).text().replace(/(#\w+)/, '<span class="hashtag">$1</span>')
      $(this).html(t);
    } else if(isUrl($(this).text())) {
      t = $(this).text().replace(re, '<span class="link">$1</span>')
      $(this).html(t);
    }
    $(this).delay(10 * i).fadeIn(100);
  });
}

function clearAndPopulateNextTweet(data) {
  //alert('cpnt' + data);
  
  if($("#tweet span").length == 0) {
    populateTweet(data);
  } else {
    $($("#tweet span").get().reverse()).each(function(i) { 
      $(this).delay(10 * i).fadeOut(150, function() { 
        $(this).remove();
        console.log($("#tweet span").length == 0)
        if($("#tweet span").length == 0) {
          setTimeout(function() {
            populateTweet(data);
          }, 250);
        }
      });
    });
    
  }
}

function showNextTweet() {
  var data = tweets.shift();
  $("#number").html(tweets.length);
  if(data) {
    $('#tweet').fadeIn(100, function() {
      clearAndPopulateNextTweet(data);
    });
  }
}

socket.on('tweet', function (data) {
  $("#total_number").html(total++);
  if(data.text) {
    tweets.push(data);
    if(tweets.length > max_keep) {
      var evicted = tweets.splice(max_keep - 1, 1)[0];
      $("#evicted_tweet").text(evicted.text);
    }
    if(startup) {
      showNextTweet();
      setInterval('showNextTweet()', display_for_ms);
      startup = false;
    }
    $("#number").html(tweets.length);
  }
});
