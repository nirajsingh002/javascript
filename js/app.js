/*
	Desc: Form validation
*/

import Utils from './common'
import FormValidation from './validation';
import APRCalculator from './mcaCalculator';

window.Utils = Utils;

var form = document.getElementById('aprCalc');

function callbackFn(event) {
		event.preventDefault();
		if(this.isValid()) {
		var APRcalc = new APRCalculator(form);
		console.log(APRcalc)
		var calculatedValues = Utils.sequientiallyRunFn.call(APRcalc, "dailyPayment", "daysToRepay", "financingCost", "APRCalculation", "dailyInterestRate");
		console.log(calculatedValues)
		APRcalc.printCalcValues('printOutput', calculatedValues)
		}
}

var formValidatonInstance = FormValidation(form, callbackFn);


Utils.getFormChildren(form).forEach(function(element) {
      element.addEventListener('keyup', function(event) {
        const target = event.target
		const elmVal = target.value;
		const elementName = element.getAttribute('name');
		Utils.$$(`[name=${elementName}]`, form)[0].value = Utils.addCommas(elmVal.replace(/,/g, ""))
      }, false)
    })
