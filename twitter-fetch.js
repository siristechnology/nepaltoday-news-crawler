const Twitter = require("twitter");
const {
  TWITTER_CONSUMER_KEY,
  TWITTER_CONSUMER_SECRET,
  BEARER_ACCESS_TOKEN
} = require("./config/env");

const client = new Twitter({
  consumer_key: TWITTER_CONSUMER_KEY,
  consumer_secret: TWITTER_CONSUMER_SECRET,
  bearer_token: BEARER_ACCESS_TOKEN
});

var params = { screen_name: "nodejs" };
client.get("statuses/user_timeline", params, function(error, tweets, response) {
  if (error) {
    console.log("errors here", error);
  } else {
    console.log("tweets here", tweets);
  }
});
