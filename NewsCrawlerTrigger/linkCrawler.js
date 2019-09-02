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
			return scrapeSetoPatiLink(url, context)
		case RATOPATI:
			return scrapeRatoPatiLink(url, context)
		case DAINIK_KHABAR:
			return scrapeDainikNepalLinks(url, context)
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
				$('.items').each(function(index) {
					const link = $(this)
						.find('a')
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
				$('.news_loop').each(function(index) {
					const link = $(this)
						.find('a')
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
				$('.item-content').each(function(index) {
					const link = $(this)
						.find('a')
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

module.exports = {
	scrapeNewsLink
}
