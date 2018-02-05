/*
	Desc: add custom validation
*/

const routines = {
  checkGreaterThan: require('./routines/greaterthan')
}

;[HTMLInputElement, HTMLFormElement].forEach(function (constructor) {
	Object.defineProperty(constructor.prototype, 'customValidity', {
		get() {
			const customValidity = { valid: true }

			for(let name in routines) {
				if(!routines.hasOwnProperty(name)) continue

				customValidity[name] = routines[name](this)
				if (customValidity[name] === true) customValidity.valid = false
			}
		return customValidity
		},
		configurable: true
	});
 	constructor.prototype.customCheckValidity = function() {
	console.log('customCheckValidity')
	const form = this;

	function $$ ( selector ) {
		return [].slice.call(form.querySelectorAll(selector))
	}

	return $$('input')
		.filter((input) => ['button', 'submit', 'reset'].indexOf(input.getAttribute('type')) === -1 )
		.concat($$('textarea, select'))
		.every((input) => input.customValidity.valid === true)
	}
})
