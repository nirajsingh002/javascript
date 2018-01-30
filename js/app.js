/*
	Desc: Form validation
*/

import FormValidation from './validation';
import APRCalculator from './mcaCalculator';



var form = document.getElementById('aprCalc');

function callbackFn(event) {
		event.preventDefault();
		var APRcalc = new APRCalculator(form);
		APRcalc.getValues();
}

var formValidatonInstance = FormValidation(form, callbackFn);
