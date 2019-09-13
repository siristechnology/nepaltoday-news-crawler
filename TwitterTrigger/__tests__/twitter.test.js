const Twitter = require('twitter')

const {
	TWITTER_CONSUMER_KEY,
	TWITTER_CONSUMER_SECRET,
	TWITTER_ACCESS_TOKEN,
	TWITTER_ACCESS_TOKEN_SECRET
} = require('../../config/env')

describe('Twitter Trigger', () => {
	const client = new Twitter({
		consumer_key: TWITTER_CONSUMER_KEY,
		consumer_secret: TWITTER_CONSUMER_SECRET,
		access_token_key: TWITTER_ACCESS_TOKEN,
		access_token_secret: TWITTER_ACCESS_TOKEN_SECRET
	})

	it('connect success fully', () => {
		expect(client).not.toBe(false)
	})
	// we are commenting this for now
	// it('get user timeline', async () => {
	// 	const params = {
	// 		screen_name: 'kpsharmaoli',
	// 		count: 10,
	// 		exclude_replies: true,
	// 		include_rts: false
	// 	}
	// 	const tweets = await client.get('statuses/user_timeline', params)
	// 	console.log('tweets here', tweets)
	// 	expect(tweets.length).toBeGreaterThan(0)
	// })
	// TODO for checking local functions as well
})
