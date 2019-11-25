const getSegment = (link = '', num = 0) => {
	const arr = link.split('/')
	return arr[num + 2]
}

module.exports = {
	getSegment
}
