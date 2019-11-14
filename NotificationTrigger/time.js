const { NOTIFICATION_END_TIME, NOTIFICATION_START_TIME } = require('./config')
const verifyNoticiableTime = (currentTime, startTime = NOTIFICATION_START_TIME, endTime = NOTIFICATION_END_TIME) => {
	const currentNumericTime = Number(currentTime.replace(':', ''))
	if (currentNumericTime >= startTime && currentNumericTime <= endTime) {
		return currentNumericTime
	}
	return false
}

module.exports = {
	verifyNoticiableTime
}
