module.exports = function (input) {
	if(!input.hasAttribute('greaterThan')) return false
		console.log('not greater than')
	const type = input.getAttribute('type') || input.tagName.toLowerCase()

	if(type === 'checkbox') return input.checked !== true
	if(type !== 'radio' && type !== 'range') {

		const value1 = Number(input.value) // value1
		const comparewtihElm = input.getAttribute('greaterThan')
		const value2 = Number(document.querySelector(`[name="${comparewtihElm}"]`).value) // value2
		console.log('compare', value1 < value2)

		return (value1 < value2)
	}
}
