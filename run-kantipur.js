module.exports = async function(context, myTimer) {
	const cheerio = require('cheerio')
	const request = require('request')
	const { selector } = require('./NewsCrawlerTrigger/config/selector')
	try {
		const url = 'https://ekantipur.com/bibidha/2019/09/10/156811002238917391.html'
		request(url, async function(err, res, body) {
			if (err) {
				console.log('error occured', err)
			} else {
				let $ = cheerio.load(body)
				let headline, excerpt, leadImage, content
				headline = $(selector.kantipur.TITLE).text()
				console.log('headline here', headline)
				excerpt = $(selector.kantipur.EXCERPT).text()
				console.log('excerpt here', excerpt)

				// leadImage = await $('article.normal div.description div.image figure img').attr('src')
				leadImage = $(selector.kantipur.LEAD_IMAGE).attr('data-src')
				console.log('lead image here', leadImage)
				content = $(selector.kantipur.CONTENT).text()

				console.log('content here', content)

				// div.description: nth - child(5) > div: nth - child(5)
			}
		})
	} catch (error) {
		context.log('error occured here', error)
	}
}
