const Mercury = require('@postlight/mercury-parser')
const Entities = require('html-entities').AllHtmlEntities
const { url } = require('./config/url')
const { selector } = require('./config/selector')
const manualScrapper = require('./manual-scrapper')

const getContent = content => {
	const entities = new Entities()

	const rejex = /(<([^>]+)>)/gi

	return entities
		.decode(content)
		.replace(rejex, '')
		.slice(0, 1000)
}

const getTitle = async (link, baseUrl, context) => {
	if (baseUrl === url.RATOPATI) {
		const { headline } = await manualScrapper(link, selector.ratopati)
		console.log('rato pati headings are', headline)
		return headline
	}
	return 'hello world'
}

const scrapeNewsContent = async (link, logoLink, context) => {
	try {
		const scrappedNews = await Mercury.parse(link)
		if (scrappedNews) {
			return {
				title: scrappedNews.title,
				shortDescription: scrappedNews.excerpt,
				content: scrappedNews.content ? getContent(scrappedNews.content) : null,
				link: scrappedNews.url || link,
				imageLink: scrappedNews.lead_image_url || logoLink,
				publishedDate: scrappedNews.date_published || new Date()
			}
		}
		return {}
	} catch (error) {
		return null
	}
}

module.exports = {
	scrapeNewsContent
}
