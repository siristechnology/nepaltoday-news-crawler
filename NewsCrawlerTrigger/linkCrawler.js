const cheerio = require('cheerio')
const request = require('request')

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

const scrapeKantipurNewsLink = url => {
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
const scrapeSetoPatiLink = url => {
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
const scrapeDainikNepalLinks = url => {
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
const scrapeRatoPatiLink = url => {
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
