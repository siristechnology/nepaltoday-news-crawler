import { scrapeNewsLink } from '../linkCrawler'

describe('link-crawler integration test', () => {
	it('link-crawler show crawl setopati link', async () => {
		const baseUrl = 'https://setopati.com'
		const url = 'https://setopati.com/sports'
		const { error, links } = await scrapeNewsLink(baseUrl, url)
		expect(links).not.toBe(null)
		expect(error).toBeFalsy()
	})
	it('link-crawler show crawl setopati link', async () => {
		const baseUrl = 'https://setopati.com'
		const url = 'https://setopati.com/sports'
		const { error, links } = await scrapeNewsLink(baseUrl, url)
		expect(links).not.toBe(null)
		expect(error).toBeFalsy()
	})
	it('link-crawler show crawl dainikhabar link', async () => {
		const baseUrl = 'https://dainiknepal.com'
		const url = 'https://www.dainiknepal.com/section/latest-news'
		const { error, links } = await scrapeNewsLink(baseUrl, url)
		expect(links).not.toBe(null)
		expect(error).toBeFalsy()
	})
	it('link-crawler should crawl onlinekhabar link', async () => {
		const baseUrl = 'https://onlinekhabar.com'
		const url = 'https://www.onlinekhabar.com/business'

		const { error, links } = await scrapeNewsLink(baseUrl, url)
		expect(links).not.toBe(null)
		expect(error).toBeFalsy()
	})
})
