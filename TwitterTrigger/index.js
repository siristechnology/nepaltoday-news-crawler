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

  async function sortAndSaveTweets(tweets, user) {
    const filterdTweets = Array.from(tweets)
      .filter(tweet => tweet.in_reply_to_status_id === null)
      .map(tweet => {
        return {
          ...tweet,
          twitterHandle: user._id
        };
      });

    const savedTweets = await TweetDbService.saveTweets(filterdTweets);
    if (savedTweets) {
      context.done();
    }
  }

  function getTweetByHandle(user) {
    try {
      let params = { q: `${user.handle}` };
      client.get("search/tweets", params, function(error, tweets, response) {
        if (!error) {
          context.log("tweets in --", tweets);
          sortAndSaveTweets(tweets.statuses, user);
        } else {
          throw new Error(
            `Error occured while fetching tweets STACK: ${error}`
          );
        }
      });
    } catch (error) {
      context.error(error);
    }
  }

  try {
    const twitterHandles = await TweetDbService.getTwitterHandles();
    if (twitterHandles) {
      twitterHandles.forEach(user => {
        context.log("user here", user);
        getTweetByHandle(user);
      });
    }
  } catch (error) {
    context.error(error);
  }
};
