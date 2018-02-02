/*
	Desc: MCA APR Calculator
*/

import Utils from './common'
import RATE from './rate'

function APRCalculator(form) {
	console.log('mcaCalculator111')
	var currentObject = this;
	
	function getValues(elementName, form) {
		return Utils.$$(`[name=${elementName}]`, form)[0].value.replace(/\,/g, '');
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
		const dailyPaymentAmount = (this.inputFormValues.projectedMCS/30) * (this.inputFormValues.percentageFCS/100);
		return dailyPaymentAmount.toFixed(0);
	}
	// approx. # Days to Repay = Payback Amount / Daily Payment
	function daysToRepay(cumulativeValues) {
		const daysToRepay = (this.inputFormValues.paybackAmount / cumulativeValues["dailyPayment"]);
		return addCommas(daysToRepay);
	}

	// Financing Cost = Payback Amout - Amount Advanced
	function financingCost () {
		const financing_cost = Number(this.inputFormValues.paybackAmount - this.inputFormValues.amountAdvanced)
		return financing_cost;
	}

	// Effective APR = RATE(daysToRepay, dailyPayment, advanceAmount) * 365 * 100
	function APRCalculation(cumulativeValues) {
		const effective_APR = RATE(cumulativeValues.daysToRepay, -(cumulativeValues.dailyPayment), Number(this.inputFormValues.amountAdvanced)) * 365 * 100;
		return effective_APR.toFixed(2);
	}

	function dailyInterestRate(cumulativeValues) {
		const dailyInterestRateAmount = (cumulativeValues.APRCalculation / 365);
		return dailyInterestRateAmount.toFixed(4)
	}
	// utility functions
	function addCommas(number) {
			return number.toFixed(0).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
		}

	// print values
	function printCalcValues(selector, calculatedValues) {
		const outputContainer = document.getElementById(selector);
		var  htmlStr = '';
			 htmlStr += `<table>\
							<tr><td> Daily Payment </td><td>$ ${calculatedValues['dailyPayment']} </td></tr>\
							<tr><td> Daily Interest Rate </td><td> ${calculatedValues['dailyInterestRate']} %</td></tr>\
							<tr><td> APR </td><td> ${calculatedValues['APRCalculation']} %</td></tr>\
							<tr><td> Repaid in about </td><td> ${calculatedValues['daysToRepay']} days</td></tr>\
							<tr><td> Total Financing Cost </td><td>$ ${calculatedValues['financingCost']} </td></tr>\
						</table>`; 
		outputContainer.innerHTML = htmlStr;
	}
	// add percentage sign and fixed to two decimal point
	function toPercentage(number, decimalNumber) {
			number = number.toFixed(decimalNumber)
		return number+"%";
	}
	

	return {
		inputFormValues: createFormValuesObject(form),
		dailyPayment: dailyPayment,
		daysToRepay: daysToRepay,
		financingCost: financingCost,
		APRCalculation: APRCalculation,
		dailyInterestRate: dailyInterestRate,
		printCalcValues: printCalcValues
	} //Object.assign(this.inputValues, this.publicMethods) ;
}

module.exports = APRCalculator;