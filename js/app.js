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
		var APRcalc = new APRCalculator(form);
		console.log(APRcalc)
		var calculatedValues = Utils.sequientiallyRunFn.call(APRcalc, "dailyPayment", "daysToRepay", "financingCost", "APRCalculation", "dailyInterestRate");
		console.log(calculatedValues)
		
		}
}

var formValidatonInstance = FormValidation(form, callbackFn);
