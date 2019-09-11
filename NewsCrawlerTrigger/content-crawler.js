const { url } = require('./config/url')
const { selector } = require('./config/selector')
const manualScrapper = require('./manual-scrapper')

const getNewsContent = async (link, logoLink, baseUrl, context) => {
	try {
		if (baseUrl === url.KANTIPUR) {
			const { error, data } = await manualScrapper(link, logoLink, selector.kantipur, context)
			if (!error) {
				return data
			}
		}
		if (baseUrl === url.RATOPATI) {
			const { error, data } = await manualScrapper(link, logoLink, selector.ratopati, context)
			if (!error) {
				return data
			}
		}
		if (baseUrl === url.SETOPATI) {
			const { error, data } = await manualScrapper(link, logoLink, selector.setopati, context)
			if (!error) {
				return data
			}
		}
		if (baseUrl === url.DAINIK_NEPAL) {
			const { error, data } = await manualScrapper(link, logoLink, selector.dainik, context)
			if (!error) {
				return data
			}
		}
		return null
	} catch (error) {
		return null
	}
}

module.exports = {
	getNewsContent
}
