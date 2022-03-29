// security function preventing cross-site scripting (xss)
const escape = function (str) {
  let p = document.createElement("p");
  //createTextNode used to escape HTML chars
  p.appendChild(document.createTextNode(str));
  return p.innerHTML;
};




// creates html element to be rendered from json object
const createTweetElement = function (tweetData) {
  const $tweet = $(
    `<article class="tweet">
    <header>
    
    <img src=${tweetData.user.avatars}>
    <p> ${tweetData.user.name} </p>
    
    <span class="handle">${tweetData.user.handle}</span>
    </header>
    
    <p> ${escape(tweetData.content.text)} </p>
    
    <footer>
    <span>${timeago.format(tweetData.created_at)}</span>
    <span>
    <i class="fa-solid fa-flag fa-xs"></i>
    <i class="fa-solid fa-retweet fa-xs"></i>
    <i class="fa-solid fa-heart fa-xs"></i>
    </span>
    `
  );
  return $tweet;
};





// renders html created with createTweetElement function
const renderTweet = function (data) {
  //loop through json data
  data.forEach((tweetData) => {
    // store data of current index in loop
    const tweetEl = createTweetElement(tweetData);
    // add to top of tweet-container
    $("section.tweet-container").prepend(tweetEl);
  });
};






// async loading of new tweets (no page refresh)
const loadTweets = () => {
  $.ajax({
    method: "GET",
    url: "/tweets",
    dataType: "json",
    success: function (data) {
      renderTweet(data);
    },
  });
};







$(document).ready(function () {
  console.log("ready!");

  $("form").submit(function (event) {
    event.preventDefault();

    const $formInput = $("#tweet-text");

    if ($formInput.val() === "") {
      alert("Form is empty!");
    } else {
      // async request to post new tweets
      $.ajax({
        url: "/tweets",
        method: "POST",
        type: "application/json",
        data: $(this).serialize(),
        success: function () {
          $("textarea").val("");
          $.get("/tweets", (data) => {
            // ISSUE: not where/how to execute alert?

            const newTweet = [data.slice(-1).pop()];
            renderTweet(newTweet);
          });
        },
      });
    }
  });
  loadTweets();
});
