/*
	Desc: MCA APR Calculator
*/

function APRCalculator(form) {
	console.log('mcaCalculator')
	const formValidationFunctions = new FormValidation();

	const props = {
		getValues: getValues,
		formValues: createFormValuesObject()
	}
	
	function $$ (selector) {
      return [].slice.call(form.querySelectorAll(selector))
    }

	function getValues(elementName) {
		return $$(`[name=${elementName}]`)[0].value;
	}
	
	function createFormValuesObject() {
		console.log(formValidationFunctions.getFormChildren())
	}

	return props;
}

module.exports = APRCalculator;