/*
	desc: common functionalities
*/
var Utils = (function () {

		function $$ (selector, parentSelector) {
	      return [].slice.call(parentSelector.querySelectorAll(selector))
	    }

	    function getFormChildren (form) {
	      return $$('input', form)
	          .filter(function(child) {
	            const type = child.getAttribute('name')
	            const notValidableElements = ["button", "submit", "reset", "file"]
	            return notValidableElements.indexOf(type) === -1
	          })
	          .concat($$('textarea, select', form))
	    }
	    
	    /*function addCommas(number) {
			return number.toFixed(0).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
		}*/

		function addCommas(nStr) {
			nStr += '';
			const x = nStr.split('.');
			var x1 = x[0];
			var x2 = x.length > 1 ? '.' + x[1] : '';
			var rgx = /(\d+)(\d{3})/;
			while (rgx.test(x1)) {
				x1 = x1.replace(rgx, '$1' + ',' + '$2');
			} 
			return x1 + x2;
		}


		function sequientiallyRunFn(...args) {
			// var args = [].slice.call(arguments);
			var currentObj = this;
			var cumulativeValues = {}; 
			args.forEach(function(name, index, array) {
				Object.assign(cumulativeValues, {[name]: currentObj[name](cumulativeValues)})
				/*cumulativeValues[index] = {
					[name]: currentObj[name](cumulativeValues)	
				} */
			})
			return cumulativeValues;
		}
		// restrict to enter number only
		function isNumber(evt) {
			evt = (evt) ? evt : window.event;
			var charCode = (evt.which) ? evt.which : evt.keyCode;
			if(charCode > 31 && (charCode < 48 || charCode > 57)) {
				console.log('false');
				return false;
			}
				console.log('true');
			return true;
		} 

		// check for leap year
		function isLeapYear(currentYear) {
			return (currentYear % 400 === 0) || (currentYear % 100 !== 0 && currentYear % 4 === 0);
		}

	    return {
	    	$$: $$,
	    	getFormChildren: getFormChildren,
	    	sequientiallyRunFn: sequientiallyRunFn,
	    	isNumber: isNumber,
	    	addCommas: addCommas,
	    	isLeapYear: isLeapYear
	    }
})()

module.exports = Utils