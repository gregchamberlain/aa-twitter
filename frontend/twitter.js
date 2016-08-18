const InfiniteTweets = require("./infinite_tweets.js");
const FollowToggle = require('./follow_toggle.js');
const UsersSearch = require('./user_search.js');
const TweetCompose = require('./tweet_compose.js');
$(() => {
  $('.users-search').each((i, rootEl) => {
    new UsersSearch($(rootEl));
  });
  $('.follow-toggle').each((i, rootEl) => {
    new FollowToggle($(rootEl));
  });
  $('.tweet-compose').each((i, rootEl) => {
    new TweetCompose($(rootEl));
  });
  new InfiniteTweets();
});
