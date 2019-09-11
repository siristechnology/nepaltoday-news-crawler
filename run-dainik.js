const cheerio = require('cheerio')
const request = require('request')
const { selector } = require('./NewsCrawlerTrigger/config/selector')
try {
	const url = 'https://www.dainiknepal.com/2019/09/411725.html'
	request(url, async function(err, res, body) {
		if (err) {
			console.log('error occured', err)
		} else {
			let $ = cheerio.load(body)
			let headline, excerpt, leadImage, content

			headline = $('div#sing_left div#sing_cont h1.inside_head').text()
			console.log('headline here', headline)

			excerpt = $('div#sing_left div#sing_cont div.content p:nth-child(2)').text()
			console.log('excerpt here', excerpt)

			// leadImage = await $('article.normal div.description div.image figure img').attr('src')
			leadImage = $('div#sing_left div#sing_cont div.content img').attr('src')
			console.log('lead image here', leadImage)
			content = $('div#sing_left div#sing_cont div.content p').text()

			console.log('content here', content)
		}
	})
} catch (error) {
	context.log('error occured here', error)
}
