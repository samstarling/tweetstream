(function($) {
  $.fn.fadeReplace = function(text, formatter, callback) {
    if($(this).children("span").length == 0) {
      $(this).html(textToSpans($(this).text(), formatter));
    }
    replaceWords(this, textToSpans(text, formatter), 200, 20, callback);
  };

  function replaceWords(element, words, speed, delay, callback) {
    $($(element).children("span").get().reverse()).each(function(i) {
      $(this).delay(delay * i).fadeOut(speed, function() {
        $(this).remove();
        if($(element).children("span").length == 0) {
          setTimeout(function() { fadeInWords(element, words, speed, delay, callback); }, delay);
        }
      });
    });
  }

  function fadeInWords(element, words, speed, delay, callback) {
    callback();
    $(words.join("")).hide().appendTo(element).each(function(i) {
      $(this).delay(delay * i).fadeIn(speed, function() {
        if((i + 1) == $(element).children("span").length) {

        }
      });
    });
  }

  function textToSpans(text, formatter) {
    var words = text.split(" ");
    return $.map(words, function(val, i) {
      return "<span>" + formatter(val) + "&nbsp;</span>";
    });
  }
})(jQuery);
