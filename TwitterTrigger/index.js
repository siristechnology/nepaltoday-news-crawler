module.exports = async function(context, myTimer) {
	var timeStamp = new Date().toISOString()
	const { TweetDbService } = require('nepaltoday-db-service')
	const Twitter = require('twitter')

	const {
		TWITTER_CONSUMER_KEY,
		TWITTER_CONSUMER_SECRET,
		TWITTER_ACCESS_TOKEN,
		TWITTER_ACCESS_TOKEN_SECRET
	} = require('../config/env')

	const client = new Twitter({
		consumer_key: TWITTER_CONSUMER_KEY,
		consumer_secret: TWITTER_CONSUMER_SECRET,
		access_token_key: TWITTER_ACCESS_TOKEN,
		access_token_secret: TWITTER_ACCESS_TOKEN_SECRET
	})

	async function sortAndSaveTweets(tweets, user) {
		const filterdTweets = Array.from(tweets).map(tweet => {
			return {
				...tweet,
				twitterHandle: user._id
			}
		})
		const savedTweets = await TweetDbService.saveTweets(filterdTweets)
		if (savedTweets) {
			context.log('tweet saved successfully')
		}
	}

	function searchTweets(handle) {
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

	async function getUserTimeline(handle) {
		const params = {
			screen_name: `${handle}`,
			count: 10,
			exclude_replies: true,
			include_rts: false
		}
		const rawTweets = await client.get('statuses/user_timeline', params)
		const tweets =
			rawTweets &&
			rawTweets.map(tweet => ({
				publishedDate: tweet.created_at,
				tweetId: tweet.id_str || tweet.id,
				text: tweet.text,
				name: tweet.user.name,
				handle: tweet.user.screen_name,
				description: tweet.user.description,
				profileImage: tweet.user.profile_image_url_https
			}))

		return tweets
	}

	async function getTweetByHandle(user) {
		try {
			const handle = user.handle
			const tweets = await getUserTimeline(handle)
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
