const { verifyNoticiableTime } = require('./notificationTime')
describe('time test', () => {
	it('test the noticiable time', () => {
		expect(verifyNoticiableTime('21:05', 2100, 2105)).toBe(2105)
		expect(verifyNoticiableTime('21:06', 2100, 2105)).toBe(false)
		expect(verifyNoticiableTime('20:59', 2100, 2105)).toBe(false)
	})
})
