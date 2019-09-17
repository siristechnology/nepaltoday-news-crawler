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
	it('manualScrapper should scrape setopati', async () => {
		const link = 'https://www.setopati.com/social/189567'
		const logoLink = 'test logoLink'

		const { error, data } = await manualScrapper(link, logoLink, selector.setopati)

		expect(data.content).not.toBe(null)
		expect(error).toBeFalsy()
	})
	it('content should not start with whitespace', async () => {
		const link = 'https://www.setopati.com/social/189567'
		const logoLink = 'test logoLink'

		const { error, data } = await manualScrapper(link, logoLink, selector.setopati)

		expect(data.content[0]).not.toBe(' ')
		expect(error).toBeFalsy()
	})
	it('manualScrapper should scrape ratopati', async () => {
		const link = 'https://ratopati.com/story/99093/2019/9/3/banana-business'
		const logoLink = 'test logoLink'

		const { error, data } = await manualScrapper(link, logoLink, selector.ratopati)

		expect(data.content).not.toBe(null)
		expect(error).toBeFalsy()
	})
	it('manualScrapper should scrape dainik khavar', async () => {
		const link = 'https://www.dainiknepal.com/2019/09/411725.html'
		const logoLink = 'test logoLink'

		const { error, data } = await manualScrapper(link, logoLink, selector.ratopati)

		expect(data.content).not.toBe(null)
		expect(error).toBeFalsy()
	})
	it('manualScrapper short description not more than 300 ', async () => {
		const link = 'https://ratopati.com/story/99093/2019/9/3/banana-business'
		const logoLink = 'test logoLink'

		const { error, data } = await manualScrapper(link, logoLink, selector.ratopati)

		expect(data.shortDescription.length).not.toBeGreaterThan(300)
		expect(error).toBeFalsy()
	})
})
