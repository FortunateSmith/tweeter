let defaultCharsLeft = 140;

$(document).ready(function () {
  $("form")
    .hide()
    .show(1000)
    .find("textarea")
    //count happens when key is released
    .keyup(function () {
      // this refers to <textarea>
      const charInTextarea = $(this).val().length;
      const charsLeft = defaultCharsLeft - charInTextarea;
      if (charsLeft < 0) {
        // if negative number of characters left
        ["-", charsLeft].join("");
        $(this).next().find("output").text(charsLeft).css("color", "red");
      } else {
        // if 0 or more characters left
        $(this)
          // next resolves to the sibling element in HTML
          .next()
          .find("output")
          .text(charsLeft)
          .css("color", "black");
      }
    });
});
