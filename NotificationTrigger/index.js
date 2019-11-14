module.exports = async function(context, myTimer) {
	const moment = require('moment-timezone')
	const timeStamp = new Date().toISOString()
	const { userDbService } = require('nepaltoday-db-service')

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
				// Todo: get the latest news from db
				// check if time is 9pm if it is send notification using firebase api
			}
		}
	} catch (error) {
		console.log('_____________error__________', error)
	}

	context.log('JavaScript timer trigger function ran!', timeStamp)
}
