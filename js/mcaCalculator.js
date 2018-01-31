/*
	Desc: MCA APR Calculator
*/

import Utils from './common'


function APRCalculator(form) {
	console.log('mcaCalculator111')
	var currentObject = this;
	this.inputValues = {
		inputFormValues: createFormValuesObject(form),
	}
/*
	const dailyPaymentA = dailyPayment.call(this)
	const daysToRepayA = daysToRepay.call(this)
	
	this.outputValues =  {
		calculatedValues: {
			dailyPayment: dailyPaymentA,
			daysToRepay: daysToRepayA
		}
	}*/
	var	cumulativeValues = [];
	// this.sequientiallyRunFn = this.sequientiallyRunFn.bind(this);

	sequientiallyRunFn.call(this, dailyPayment, daysToRepay)
	
	
	function getValues(elementName, form) {
		return Utils.$$(`[name=${elementName}]`, form)[0].value;
	}
	
	function createFormValuesObject(form) {
		const Obj = {}
				Utils.getFormChildren(form).forEach(function(element) {
				const elementName = element.getAttribute('name');
					Obj[elementName] = getValues(elementName, form)
			   })
		return Obj;
	}

	// approx daily Payment = (Estimated monthly card sales / 30) * percentage_future_card_sales
	function dailyPayment() {
		const dailyPaymentAmount = (this.inputValues.inputFormValues.projectedMCS/30) * (this.inputValues.inputFormValues.percentageFCS/100);
		return dailyPaymentAmount.toFixed(0);
	}
	// approx. # Days to Repay = Payback Amount / Daily Payment
	function daysToRepay() {
		const daysToRepay = (this.inputValues.inputFormValues.paybackAmount / dailyPaymentA);
		return addCommas(daysToRepay);
	}

	function calculatedValues(){
		var calculatedValues = {
									dailyPaymentAmount: dailyPayment(),
									daysToRepay: daysToRepay()
								}
		return calculatedValues;
	}

	// utility functions
	function addCommas(number) {
			return number.toFixed(0).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
		}

	function sequientiallyRunFn(...args) {
		// var args = [].slice.call(arguments);
		
		args.forEach(function(name, index, array) {
			cumulativeValues[index] = {
				[name]: array[index].call(currentObject)	
			} 
		})
		return cumulativeValues;
	}

	return Object.assign({}, this.inputValues, this.outputValues) ;
}

module.exports = APRCalculator;