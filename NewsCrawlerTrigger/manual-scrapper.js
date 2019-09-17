const cheerio = require('cheerio')
const request = require('request')
module.exports = function manualScrapper(link, logoLink, selector, context) {
	return new Promise((resolve, reject) => {
		request(link, function(err, res, body) {
			if (err) {
				reject({
					error: {
						status: true,
						stack: err
					},
					data: null
				})
			} else {
				let $ = cheerio.load(body)
				const title = $(selector.TITLE).text()
				const shortDescription = $(selector.EXCERPT)
					.text()
					.slice(0, 300)
				const imageLink = $(selector.LEAD_IMAGE.PATH).attr(selector.LEAD_IMAGE.SELECTOR) || logoLink
				const content = $(selector.CONTENT)
					.text()
					.trim()
					.slice(0, 2000)
				const publishedDate = new Date()
				resolve({
					error: false,
					data: {
						title,
						shortDescription,
						imageLink,
						content,
						link,
						publishedDate
					}
				})
			}
		})
	})
}
