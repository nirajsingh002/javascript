/*
	Desc: Form validation
*/

import FormValidation from './validation';
import APRCalculator from './mcaCalculator';



var form = document.getElementById('aprCalc');

function callbackFn(event) {
		event.preventDefault();
		if(this.isValid()) {
		var APRcalc = new APRCalculator(form);
		console.log(APRcalc)
		
		}
}

var formValidatonInstance = FormValidation(form, callbackFn);
