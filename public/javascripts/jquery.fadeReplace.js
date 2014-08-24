(function($) {
  $.fn.fadeReplace = function(text, formatter) {
    console.log(formatter);
    if($(this).children("span").length == 0) {
      $(this).html(textToSpans($(this).text(), formatter));
    }
    replaceWords(this, textToSpans(text, formatter), 200, 20);
  };

  function replaceWords(element, words, speed, delay) {
    $($(element).children("span").get().reverse()).each(function(i) {
      $(this).delay(delay * i).fadeOut(speed, function() {
        $(this).remove();
        if($(element).children("span").length == 0) {
          setTimeout(function() { fadeInWords(element, words, speed, delay); }, delay);
        }
      });
    });
  }

  function fadeInWords(element, words, speed, delay) {
    $(words.join("")).hide().appendTo(element).each(function(i) {
      $(this).delay(delay * i).fadeIn(speed);
    });
  }

  function textToSpans(text, formatter) {
    var words = text.split(" ");
    return $.map(words, function(val, i) {
      return "<span>" + formatter(val) + "&nbsp;</span>";
    });
  }
})(jQuery);
