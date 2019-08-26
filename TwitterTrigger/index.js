module.exports = async function(context, myTimer) {
  var timeStamp = new Date().toISOString();
  const { TweetDbService } = require("nepaltoday-db-service");
  const Twitter = require("twitter");

  const {
    TWITTER_CONSUMER_KEY,
    TWITTER_CONSUMER_SECRET,
    TWITTER_TOKEN_SECRET,
    TWITTER_ACCESS_TOKEN
  } = require("../config/env");

  const client = new Twitter({
    consumer_key: TWITTER_CONSUMER_KEY,
    consumer_secret: TWITTER_CONSUMER_SECRET,
    access_token_key: TWITTER_ACCESS_TOKEN,
    access_token_secret: TWITTER_TOKEN_SECRET
  });

  context.log("");

  async function getTweetByHandle(handle) {
    // use api to get latest tweet
    var params = { screen_name: "nodejs" };
    const tweet = await client.get("statuses/user_timeline", params);
    context.log("Tweeter feed", tweet);
  }

  const twitterHandles = await TweetDbService.getTwitterHandles();
  if (twitterHandles) {
    twitterHandles.forEach(user => {
      getTweetByHandle(user.handle);
    });
  }
  //use twitter api library to get tweets
  //sort tweets using algorithm
  //store tweets in mongodb using db-service
};
