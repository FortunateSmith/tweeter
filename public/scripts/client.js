// security function preventing cross-site scripting (xss)
const escape = function(str) {
  let p = document.createElement("p");
  p.appendChild(document.createTextNode(str));
  return p.innerHTML;
};



// HTML element from new tweet
const createTweetElement = function(tweetData) {
  const $tweet = $(
    `<article class="tweet">
    <header>
      <img src=${tweetData.user.avatars}>
      <p>${tweetData.user.name}</p>
      <span class="handle">${tweetData.user.handle}</span>
    </header>
    <p>${escape(tweetData.content.text)}</p>
    <footer>
      <span>${timeago.format(tweetData.created_at)}</span>
      <div class="icons">
        <i class="fa-solid fa-flag fa-xs"></i>
        <i class="fa-solid fa-retweet fa-xs"></i>
        <i class="fa-solid fa-heart fa-xs"></i>
      </div>
    </footer>`
  );
  return $tweet;
};




// renders html created with createTweetElement function
const renderTweet = function(data) {
  data.forEach((tweetData) => {
    const tweetEl = createTweetElement(tweetData);
    $("section.tweet-container").prepend(tweetEl);
  });
};




// async loading of new tweets (no page refresh)
const loadTweets = () => {
  $.ajax({
    method: "GET",
    url: "/tweets",
    dataType: "json",
    success: function(data) {
      renderTweet(data);
    },
  });
};




$(document).ready(function() {
  
  loadTweets();
  
  $("form").submit(function(event) {
    event.preventDefault();

    // Dynamic error messages
    if ($("#tweet-text").val().trim().length === 0) {
      $("#err-msg").text("Field Cannot Be Empty.");
      $(".error").slideDown();
      return;
    }
    if ($("#tweet-text").val().length > 140) {
      $("#err-msg").text("Field Cannot Exceed 140 Characters.");
      $(".error").slideDown();
      return;
    }
    
    $(".error").hide();
    
  
    // async request to post new tweets
    $.ajax({
      url: "/tweets",
      method: "POST",
      type: "application/json",
      data: $(this).serialize(),


      success: function() {
        $("textarea").val("");
        $.get("/tweets", (data) => {
          const newTweet = [data.slice(-1).pop()];
          renderTweet(newTweet);
        });
        // reset character counter fix
        $(".counter").val("140")
      },
    });
  });
});
