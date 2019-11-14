const axios = require('axios')
const { FIREBASE_NOTIFICATION_URL } = require('./config')

const post = async (url = FIREBASE_NOTIFICATION_URL, data = {}) => {
	const response = await axios.post(url, data)
	return response
}

module.exports = {
	post
}
