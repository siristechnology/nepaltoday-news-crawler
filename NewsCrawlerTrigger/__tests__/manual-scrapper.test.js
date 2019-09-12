import manualScrapper from '../manual-scrapper'
import { selector } from '../config/selector'

describe('manual-scrapper', () => {
	it('manualScrapper should scrape ekantipur', async () => {
		const link = 'https://ekantipur.com/bibidha/2019/09/10/156811002238917391.html'
		const logoLink = 'test logoLink'

		const { error, data } = await manualScrapper(link, logoLink, selector.kantipur)

		expect(data.content).not.toBe(null)
		expect(error).toBeFalsy()
	})
})
