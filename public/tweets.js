var socket = io.connect('#{script_url}?q=abc');
var ready = true;
      
if (typeof String.prototype.startsWith != 'function') {
  String.prototype.startsWith = function (str){
    return this.indexOf(str) == 0;
  };
}

var regexp = /([-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*))?/gi;

function isUrl(s) {
  return regexp.test(s);
}
    
socket.on('tweet', function (data) {
  if(data.text && ready == true) {
    ready = false;
    $('#tweet').fadeOut(1000, function() {
      $(this).html("").fadeIn(500, function() {
        var spans = '<span>' + data.split.join('</span> <span>') + '</span><br/><span class="screen_name">@' + data.user.screen_name + '</span>';
        $(spans).hide().appendTo('#tweet').each(function(i) {
          if($(this).text().startsWith("@") && !$(this).hasClass('screen_name')) {
            t = $(this).text().replace(/(@[\w]+)/, '<span class="username">$1</span>')
            $(this).html(t)
          } else if($(this).text().startsWith("#")) {
            t = $(this).text().replace(/(#\w+)/, '<span class="hashtag">$1</span>')
            $(this).html(t)
          } else if(isUrl($(this).text())) {
            t = $(this).text().replace(regexp, '<span class="link">$1</span>')
            $(this).html(t)
          }
          $(this).delay(50 * i).fadeIn(800);
        });
        setTimeout(function() { ready = true; }, 10000);
      })
    });
  }
});
