/*
	Desc: Form validation
*/

import Utils from './common'
import FormValidation from './validation';
import APRCalculator from './mcaCalculator';



var form = document.getElementById('aprCalc');

function callbackFn(event) {
		event.preventDefault();
		if(this.isValid()) {
		console.log('form valid')
		var APRcalc = new APRCalculator(form);
		console.log(APRcalc)
		var calculatedValues = Utils.sequientiallyRunFn.call(APRcalc, "dailyPayment", "daysToRepay", "financingCost", "APRCalculation", "dailyInterestRate");
		console.log(calculatedValues)
		} else {
			console.log('form invalid')
		}
}

var formValidatonInstance = FormValidation(form, callbackFn);
