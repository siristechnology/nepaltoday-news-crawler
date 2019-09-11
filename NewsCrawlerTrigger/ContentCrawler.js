const Mercury = require('@postlight/mercury-parser')
const Entities = require('html-entities').AllHtmlEntities

const getContent = content => {
	const entities = new Entities()

	const rejex = /(<([^>]+)>)/gi

	return entities
		.decode(content)
		.replace(rejex, '')
		.slice(0, 1000)
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
