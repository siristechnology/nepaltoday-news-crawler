module.exports = async function(context, myTimer) {
	const moment = require('moment-timezone')
	const timeStamp = new Date().toISOString()

	const { post } = require('./http')
	const { verifyNoticiableTime, getStartEndTime } = require('./notificationTime')
	const { userDbService, newsDbService, NotificationDbService } = require('nepaltoday-db-service')

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
				const todaysTimeFrame = getStartEndTime()

				const todaysNotifications = await NotificationDbService.getNotifications({
					createdAt: { $gte: todaysTimeFrame.startTime, $lt: todaysTimeFrame.endTime }
				})
				if (latestArticle) {
					const notifications = []
					for (const user of userWithCurrentTime) {
						const isSent = todaysNotifications.find(
							notification =>
								String(notification.user) === String(user._id) &&
								String(notification.article) === String(latestArticle[0]._id)
						)
						if (isSent) {
							continue
						}
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
								const payload = {
									article: latestArticle[0]._id,
									user: user._id
								}
								notifications.push(payload)
							}
						}
					}
					if (notifications.length > 0) {
						const notificationResponse = await NotificationDbService.saveNotifications(notifications)
						if (notificationResponse) {
							context.log('_____________notifications are saved successfully__________')
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
