// let prevLengthOfTextarea = 0;
let defaultCharsLeft = 140;



$(document).ready(function() {
  $("form").hide().show(1000)
    .find("textarea")
    //count happens when key is released
    .keyup(function() {
      const charInTextarea = $(this).val().length;
      const charsLeft = defaultCharsLeft - charInTextarea;
      if (charsLeft < 0) {
        ["-", charsLeft].join("");
        // this refers to <textarea>
        $(this)
          .next()
          .find("output")
          .text(charsLeft)
          .css("color", "red");
          console.log(this)
      }
      $(this)
        .next()
        .find("output")
        .text(charsLeft);
    
    });
  });