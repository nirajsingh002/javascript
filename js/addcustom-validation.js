/*
	Desc: add custom validation
*/

const routines = {
  checkGreaterThan: require('./routines/greaterthan')
}

;[HTMLInputElement].forEach(function (constructor) {
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
	})
})