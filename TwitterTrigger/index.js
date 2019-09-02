module.exports = async function(context, myTimer) {
	var timeStamp = new Date().toISOString()
	const { TweetDbService } = require('nepaltoday-db-service')
	const Twitter = require('twitter')

	const { TWITTER_CONSUMER_KEY, TWITTER_CONSUMER_SECRET, BEARER_ACCESS_TOKEN } = require('../config/env')

	const client = new Twitter({
		consumer_key: TWITTER_CONSUMER_KEY,
		consumer_secret: TWITTER_CONSUMER_SECRET,
		bearer_token: BEARER_ACCESS_TOKEN
	})

	async function sortAndSaveTweets(tweets, user) {
		const filterdTweets = Array.from(tweets)
			.filter(tweet => tweet.in_reply_to_status_id === null)
			.map(tweet => {
				return {
					...tweet,
					twitterHandle: user._id
				}
			})

		const savedTweets = await TweetDbService.saveTweets(filterdTweets)
		if (savedTweets) {
			context.done()
		}
	}

	function getTweets(handle) {
		return new Promise((resolve, reject) => {
			let params = { q: `${handle}` }
			client.get('search/tweets', params, function(error, tweets, response) {
				if (!error) {
					context.log('tweets in --', tweets)
					resolve(tweets.statuses)
				} else {
					reject(error)
				}
			})
		})
	}

	async function getTweetByHandle(user) {
		try {
			const handle = user.handle
			const tweets = await getTweets(handle)
			if (tweets && tweets.length > 0) {
				sortAndSaveTweets(tweets, user)
			} else {
				context.log('error on getting tweets !!!!!!!!!!!!!!!!!')
			}
		} catch (error) {
			context.log('error occured', error)
		}
	}

	try {
		const twitterHandles = await TweetDbService.getTwitterHandles()
		if (twitterHandles) {
			for (user of twitterHandles) {
				context.log('user here', user)
				await getTweetByHandle(user)
			}
		}
	} catch (error) {
		context.log(error)
	}
}
