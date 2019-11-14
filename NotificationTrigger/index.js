module.exports = async function(context, myTimer) {
	const moment = require('moment-timezone')
	const timeStamp = new Date().toISOString()

	const { post } = require('./http')
	const { verifyNoticiableTime } = require('./time')
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
			if (userWithCurrentTime) {
				const latestArticle = await newsDbService.getLatestNewsArticle()
				if (latestArticle) {
					for (const user of userWithCurrentTime) {
						const eligibleTime = verifyNoticiableTime(user.currentTime)
						if (eligibleTime) {
							const data = {
								notification: {
									title: latestArticle[0].title,
									body: latestArticle[0].shortDescription
								},
								to: user.fcmToken
							}
							const response = await post(undefined, data)
							if (response.status === 200) {
								context.log('_____________notificaton send successfully__________')
							}
						}
					}
				}
			}
		}
	} catch (error) {
		context.log('_____________error__________', error)
	}

	context.log('JavaScript timer trigger function ran!', timeStamp)
}
