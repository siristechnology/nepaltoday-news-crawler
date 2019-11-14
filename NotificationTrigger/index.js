module.exports = async function(context, myTimer) {
	const moment = require('moment-timezone')
	const { verifyNoticiableTime } = require('./time')
	const { post } = require('./http')

	const timeStamp = new Date().toISOString()
	const { userDbService, newsDbService } = require('nepaltoday-db-service')

	if (myTimer.IsPastDue) {
		context.log('________________JavaScript is running late!_______________')
	}

	try {
		const users = await userDbService.getUsers()
		if (users) {
			const userWithCurrentTime = users.map(user => {
				const currentTime = moment()
					.tz(user.timeZone)
					.format('HH:mm')

				return {
					...user,
					currentTime
				}
			})
			console.log('_____________userWithCurrentTime__________', userWithCurrentTime)
			if (userWithCurrentTime) {
				const latestArticle = await newsDbService.getLatestNewsArticle()
				console.log('_____________latestArticle__________', latestArticle)
				if (latestArticle) {
					for (const user of userWithCurrentTime) {
						const eligibleTime = verifyNoticiableTime(user.currentTime)
						console.log('_____________eligibleTime__________', eligibleTime)
						if (eligibleTime) {
							const data = {
								notification: {
									title: latestArticle[0].title,
									body: latestArticle[0].shortDescription
								},
								to: user.fcmToken
							}
							console.log('_____________data__________', data)
							const response = await post(undefined, data)
							console.log('_____________response__________', response)
						}
					}
				}
			}
		}
	} catch (error) {
		console.log('_____________error__________', error)
	}

	context.log('JavaScript timer trigger function ran!', timeStamp)
}
