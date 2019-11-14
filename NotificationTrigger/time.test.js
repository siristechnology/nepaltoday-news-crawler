const { verifyNoticiableTime } = require('./time')
describe('time test', () => {
	it('test the noticiable time', () => {
		expect(verifyNoticiableTime('21:05')).toBe(2105)
		expect(verifyNoticiableTime('21:06')).toBe(false)
		expect(verifyNoticiableTime('20:59')).toBe(false)
	})
})
