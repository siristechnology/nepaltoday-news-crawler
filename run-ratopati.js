module.exports = async function(context, myTimer) {
	const cheerio = require('cheerio')
	const request = require('request')
	const { selector } = require('./NewsCrawlerTrigger/config/selector')
	try {
		const url = 'https://ratopati.com/story/99093/2019/9/3/banana-business'
		request(url, async function(err, res, body) {
			if (err) {
				console.log('error occured', err)
			} else {
				let $ = cheerio.load(body)
				let headline, excerpt, leadImage, content

				headline = $(selector.ratopati.TITLE).text()
				console.log('headline here', headline)

				excerpt = $(selector.ratopati.EXCERPT).text()
				console.log('excerpt here', excerpt)

				// leadImage = await $('article.normal div.description div.image figure img').attr('src')
				leadImage = $(selector.ratopati.LEAD_IMAGE.PATH).attr(selector.ratopati.LEAD_IMAGE.SELECTOR)
				console.log('lead image here', leadImage)
				content = $(selector.ratopati.CONTENT).text()

				console.log('content here', content)
			}
		})
	} catch (error) {
		context.log('error occured here', error)
	}
}
