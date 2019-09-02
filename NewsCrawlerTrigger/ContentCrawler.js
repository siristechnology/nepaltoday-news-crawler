const Mercury = require('@postlight/mercury-parser')

const scrapeNewsContent = async (link, logoLink) => {
	try {
		const scrappedNews = await Mercury.parse(link)
		if (scrappedNews) {
			return {
				title: scrappedNews.title,
				shortDescription: scrappedNews.excerpt,
				content: null,
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
