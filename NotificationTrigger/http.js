const axios = require('axios')
const { FIREBASE_NOTIFICATION_URL, FIREBASE_SERVER_KEY } = require('./config')
axios.defaults.headers.common['Authorization'] = `key=${FIREBASE_SERVER_KEY}`

const post = async (url = FIREBASE_NOTIFICATION_URL, data = {}) => {
	const response = await axios.post(url, data)
	return response
}

module.exports = {
	post
}
