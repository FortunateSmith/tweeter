/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
// const tweetData = {
//   user: {
//     name: "Descartes",
//     avatars: "https://i.imgur.com/nlhLi3I.png",
//     handle: "@rd",
//   },
//   content: {
//     text: "Je pense , donc je suis",
//   },
//   created_at: 1648310316916,
// };


const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]




// creates html element to be rendered from json object
const createTweetElement = function (tweetData) {
  const $tweet = $(
    `<article class="tweet">
    <header>
    
    <img src=${tweetData.user.avatars}>
    <p> ${tweetData.user.name} </p>
    
    <span class="handle">${tweetData.user.handle}</span>
    </header>
    
    <p> ${tweetData.content.text} </p>
    
    <footer>
    <span>${tweetData.created_at}</span>
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
const renderTweet = function(data) {
  data.forEach(tweetData => {
    // console.log(tweetData.content);
    const tweetEl = createTweetElement(tweetData)
    $("section.tweet-container").prepend(tweetEl);
  });
}




$(document).ready(function () {
  console.log("ready!");
  renderTweet(data);
});
