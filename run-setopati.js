const cheerio = require('cheerio')
const request = require('request')
const { selector } = require('./NewsCrawlerTrigger/config/selector')
try {
	const url = 'https://www.setopati.com/social/189567'
	request(url, async function(err, res, body) {
		if (err) {
			console.log('error occured', err)
		} else {
			let $ = cheerio.load(body)
			let headline, excerpt, leadImage, content

			headline = $('section.news-detail-section div.title-names span.news-big-title').text()
			console.log('headline here', headline)

			excerpt = $('aside.left-side div.detail-box div.editor-box p:first-child').text()
			console.log('excerpt here', excerpt)

			// leadImage = await $('article.normal div.description div.image figure img').attr('src')
			leadImage = $('section.news-detail-section div.featured-images figure img').attr('src')
			console.log('lead image here', leadImage)
			content = $('aside.left-side div.detail-box div.editor-box').text()

			console.log('content here', content)
		}
	})
} catch (error) {
	context.log('error occured here', error)
}
