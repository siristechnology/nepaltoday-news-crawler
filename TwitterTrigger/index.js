module.exports = async function(context, myTimer) {
  var timeStamp = new Date().toISOString();
  const { TweetDbService } = require("nepaltoday-db-service");
  const Twitter = require("twitter");

  const {
    TWITTER_CONSUMER_KEY,
    TWITTER_CONSUMER_SECRET,
    BEARER_ACCESS_TOKEN
  } = require("../config/env");

  const client = new Twitter({
    consumer_key: TWITTER_CONSUMER_KEY,
    consumer_secret: TWITTER_CONSUMER_SECRET,
    bearer_token: BEARER_ACCESS_TOKEN
  });

  function sortAndSaveTweets(tweets) {
    const filterdTweets = tweets.filter(
      tweet => tweet.in_reply_to_status_id === null
    );
    TweetDbService.saveTweets(filterdTweets)
      .then(res => context.log("tweets saved", res))
      .catch(error => context.log("error on saving tweet", error));
  }

  function getTweetByHandle(user) {
    try {
      let params = { q: `${user.handle}`, count: 5 };
      client.get("search/tweets", params, (error, tweets) => {
        if (!error) {
          sortAndSaveTweets(tweets);
        }
        throw new Error("Error occured while fetching tweets", error);
      });
    } catch (error) {
      context.log(error);
    }
  }

  const twitterHandles = await TweetDbService.getTwitterHandles();
  if (twitterHandles) {
    twitterHandles.forEach(user => {
      getTweetByHandle(user);
    });
  }
};
