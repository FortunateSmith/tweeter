//let prevLengthOfTextarea = 0;
let defaultCharsLeft = 140;


$(document).ready(function() {
  $("form").hide().show(1000)
    .find("textarea")
    .keyup(function() {
      const charInTextarea = $(this).val().length;
      const charsLeft = defaultCharsLeft - charInTextarea;
      if (charsLeft > defaultCharsLeft) {
        ["-", charsLeft].join("");
        $(this)
          .next()
          .find("output")
          .text(charsLeft)
          .css("color", "red");
      }
      $(this)
        .next()
        .find("output")
        .text(charsLeft);
    
    });
  });