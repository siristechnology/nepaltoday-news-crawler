module.exports = async function(context, myTimer) {
	const moment = require('moment-timezone')
	const { verifyNoticiableTime } = require('./time')

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
				const noticiableUsers = userWithCurrentTime.map(user => {
					if (verifyNoticiableTime(user.currentTime)) {
						// send notification
					}
				})
				console.log('_____________latestArticle__________', latestArticle)
				console.log('_____________noticiableUsers__________', noticiableUsers)
			}
		}
	} catch (error) {
		console.log('_____________error__________', error)
	}

	context.log('JavaScript timer trigger function ran!', timeStamp)
}
