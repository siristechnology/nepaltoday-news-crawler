const puppeteer = require('puppeteer')
process.setMaxListeners(Infinity)
const { newsPortalLink } = require('../constants/portal')
const { KANTIPUR, SETOPATI, RATOPATI, DAINIK_KHABAR } = newsPortalLink

const scrapeNewsLink = async (baseUrl, url) => {
	switch (baseUrl) {
		case KANTIPUR:
			return scrapeKantipurNewsLink(url)
		case SETOPATI:
			return scrapeSetoPatiLink(url)
		case RATOPATI:
			return scrapeRatoPatiLink(url)
		case DAINIK_KHABAR:
			return scrapeDainikNepalLinks(url)
		default:
			return {
				error: {
					status: true
				},
				links: null
			}
	}
}

const scrapeKantipurNewsLink = async url => {
	try {
		const browser = await puppeteer.launch()
		const page = await browser.newPage()
		await page.goto(url, { timeout: 0 })

		const scrapedData = await page.evaluate(() =>
			Array.from(document.querySelectorAll('article > h1, h2 > a '))
				.slice(0, 1)
				.map(link => ({
					url: `https://ekantipur.com${link.getAttribute('href')}`
				}))
		)
		await page.close()
		await browser.close()
		return { error: false, links: scrapedData }
	} catch (err) {
		return {
			error: {
				status: true,
				stack: err
			},
			links: null
		}
	}
}

const scrapeSetoPatiLink = async url => {
	const browser = await puppeteer.launch()
	const page = await browser.newPage()
	await page.goto(url, { timeout: 0 })

	const scrapedData = await page.evaluate(() =>
		Array.from(document.querySelectorAll('.big-feature > a, .items > a '))
			.slice(0, 1)
			.map(link => ({
				url: link.getAttribute('href')
			}))
	)

	await page.close()
	await browser.close()
	return { error: false, links: scrapedData }
}

const scrapeRatoPatiLink = async url => {
	try {
		const browser = await puppeteer.launch()
		const page = await browser.newPage()
		await page.goto(url, { timeout: 0 })

		const scrapedData = await page.evaluate(() =>
			Array.from(document.querySelectorAll('.item-content  a'))
				.slice(0, 1)
				.map(link => ({
					url: `https://ratopati.com${link.getAttribute('href')}`
				}))
		)

		await page.close()
		await browser.close()
		return { error: false, links: scrapedData }
	} catch (err) {
		return {
			error: {
				status: true,
				stack: err
			},
			links: null
		}
	}
}

const scrapeDainikNepalLinks = async url => {
	try {
		const browser = await puppeteer.launch()
		const page = await browser.newPage()
		await page.goto(url, { timeout: 0 })

		const scrapedData = await page.evaluate(() =>
			Array.from(document.querySelectorAll('.news_loop a'))
				.slice(0, 1)
				.map(link => ({
					url: link.getAttribute('href')
				}))
		)

		await page.close()
		await browser.close()
		return { error: false, links: scrapedData }
	} catch (err) {
		return {
			error: {
				status: true,
				stack: err
			},
			links: null
		}
	}
}

module.exports = {
	scrapeNewsLink
}
