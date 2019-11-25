const moment = require('moment')
const { NOTIFICATION_END_TIME, NOTIFICATION_START_TIME } = require('./config')
const verifyNoticiableTime = (currentTime, startTime = NOTIFICATION_START_TIME, endTime = NOTIFICATION_END_TIME) => {
	const currentNumericTime = Number(currentTime.replace(':', ''))
	if (currentNumericTime >= startTime && currentNumericTime <= endTime) {
		return true
	}
	return false
}

const getStartEndTime = () => {
	const startTime = moment().startOf('day')
	const endTime = moment().endOf('day')
	return {
		startTime,
		endTime
	}
}

module.exports = {
	getStartEndTime,
	verifyNoticiableTime
}
