const puppeteer = require('puppeteer')
const cheerio = require('cheerio')
const request = require('request')
process.setMaxListeners(Infinity)
const { newsPortalLink } = require('../constants/portal')
const { KANTIPUR, SETOPATI, RATOPATI, DAINIK_KHABAR } = newsPortalLink

const scrapeNewsLink = async (baseUrl, url, context) => {
	switch (baseUrl) {
		case KANTIPUR:
			return scrapeKantipurNewsLink(url, context)
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

const scrapeKantipurNewsLink = (url, context) => {
	return new Promise((resolve, reject) => {
		request(url, function(err, res, body) {
			if (err) {
				reject({
					error: {
						status: true,
						stack: err
					},
					links: null
				})
			} else {
				let $ = cheerio.load(body)
				const links = []
				$('article').each(function(index) {
					const link = $(this)
						.find('h2>a')
						.attr('href')
					links.push(`https://ekantipur.com${link}`)
				})

				resolve({
					error: false,
					links: links.slice(0, 2)
				})
			}
		})
	})
}
const scrapeSetoPatiLink = (url, context) => {
	return new Promise((resolve, reject) => {
		request(url, function(err, res, body) {
			if (err) {
				reject({
					error: {
						status: true,
						stack: err
					},
					links: null
				})
			} else {
				let $ = cheerio.load(body)
				const links = []
				$('article').each(function(index) {
					const link = $(this)
						.find('.items > a')
						.attr('href')
					links.push(link)
				})

				resolve({
					error: false,
					links: links.slice(0, 2)
				})
			}
		})
	})
}
const scrapeDainikNepalLinks = (url, context) => {
	return new Promise((resolve, reject) => {
		request(url, function(err, res, body) {
			if (err) {
				reject({
					error: {
						status: true,
						stack: err
					},
					links: null
				})
			} else {
				let $ = cheerio.load(body)
				const links = []
				$('article').each(function(index) {
					const link = $(this)
						.find('.news_loop a')
						.attr('href')
					links.push(link)
				})

				resolve({
					error: false,
					links: links.slice(0, 2)
				})
			}
		})
	})
}
const scrapeRatoPatiLink = (url, context) => {
	return new Promise((resolve, reject) => {
		request(url, function(err, res, body) {
			if (err) {
				reject({
					error: {
						status: true,
						stack: err
					},
					links: null
				})
			} else {
				let $ = cheerio.load(body)
				const links = []
				$('article').each(function(index) {
					const link = $(this)
						.find('.item-content  a')
						.attr('href')
					links.push(`https://ratopati.com${link}`)
				})

				resolve({
					error: false,
					links: links.slice(0, 2)
				})
			}
		})
	})
}

// const scrapeSetoPatiLink = async url => {
// 	const browser = await puppeteer.launch()
// 	const page = await browser.newPage()
// 	await page.goto(url, { timeout: 0 })

// 	const scrapedData = await page.evaluate(() =>
// 		Array.from(document.querySelectorAll('.big-feature > a, .items > a '))
// 			.slice(0, 1)
// 			.map(link => ({
// 				url: link.getAttribute('href')
// 			}))
// 	)

// 	await page.close()
// 	await browser.close()
// 	return { error: false, links: scrapedData }
// }

// const scrapeRatoPatiLink = async url => {
// 	try {
// 		const browser = await puppeteer.launch()
// 		const page = await browser.newPage()
// 		await page.goto(url, { timeout: 0 })

// 		const scrapedData = await page.evaluate(() =>
// 			Array.from(document.querySelectorAll('.item-content  a'))
// 				.slice(0, 1)
// 				.map(link => ({
// 					url: `https://ratopati.com${link.getAttribute('href')}`
// 				}))
// 		)

// 		await page.close()
// 		await browser.close()
// 		return { error: false, links: scrapedData }
// 	} catch (err) {
// 		return {
// 			error: {
// 				status: true,
// 				stack: err
// 			},
// 			links: null
// 		}
// 	}
// }

// const scrapeDainikNepalLinks = async url => {
// 	try {
// 		const browser = await puppeteer.launch()
// 		const page = await browser.newPage()
// 		await page.goto(url, { timeout: 0 })

// 		const scrapedData = await page.evaluate(() =>
// 			Array.from(document.querySelectorAll('.news_loop a'))
// 				.slice(0, 1)
// 				.map(link => ({
// 					url: link.getAttribute('href')
// 				}))
// 		)

// 		await page.close()
// 		await browser.close()
// 		return { error: false, links: scrapedData }
// 	} catch (err) {
// 		return {
// 			error: {
// 				status: true,
// 				stack: err
// 			},
// 			links: null
// 		}
// 	}
// }

module.exports = {
	scrapeNewsLink
}
