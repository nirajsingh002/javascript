(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["formValidation"] = factory();
	else
		root["formValidation"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/assets/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/*
	desc: common functionalities
*/
var Utils = function () {

	function $$(selector, parentSelector) {
		return [].slice.call(parentSelector.querySelectorAll(selector));
	}

	function getFormChildren(form) {
		return $$('input', form).filter(function (child) {
			var type = child.getAttribute('name');
			var notValidableElements = ["button", "submit", "reset", "file"];
			return notValidableElements.indexOf(type) === -1;
		}).concat($$('textarea, select', form));
	}

	/*function addCommas(number) {
 return number.toFixed(0).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
 }*/

	function addCommas(nStr) {
		nStr += '';
		var x = nStr.split('.');
		var x1 = x[0];
		var x2 = x.length > 1 ? '.' + x[1] : '';
		var rgx = /(\d+)(\d{3})/;
		while (rgx.test(x1)) {
			x1 = x1.replace(rgx, '$1' + ',' + '$2');
		}
		return x1 + x2;
	}

	function sequientiallyRunFn() {
		// var args = [].slice.call(arguments);
		var currentObj = this;
		var cumulativeValues = {};

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		args.forEach(function (name, index, array) {
			Object.assign(cumulativeValues, _defineProperty({}, name, currentObj[name](cumulativeValues)));
			/*cumulativeValues[index] = {
   	[name]: currentObj[name](cumulativeValues)	
   } */
		});
		return cumulativeValues;
	}
	// restrict to enter number only
	function isNumber(evt) {
		evt = evt ? evt : window.event;
		var charCode = evt.which ? evt.which : evt.keyCode;
		if (charCode > 31 && (charCode < 48 || charCode > 57)) {
			console.log('false');
			return false;
		}
		console.log('true');
		return true;
	}

	return {
		$$: $$,
		getFormChildren: getFormChildren,
		sequientiallyRunFn: sequientiallyRunFn,
		isNumber: isNumber,
		addCommas: addCommas
	};
}();

module.exports = Utils;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _common = __webpack_require__(0);

var _common2 = _interopRequireDefault(_common);

var _validation = __webpack_require__(2);

var _validation2 = _interopRequireDefault(_validation);

var _mcaCalculator = __webpack_require__(5);

var _mcaCalculator2 = _interopRequireDefault(_mcaCalculator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.Utils = _common2.default; /*
                                 	Desc: Form validation
                                 */

var form = document.getElementById('aprCalc');

function callbackFn(event) {
		event.preventDefault();
		if (this.isValid()) {
				console.log('form valid');
				var APRcalc = new _mcaCalculator2.default(form);
				console.log(APRcalc);
				var calculatedValues = _common2.default.sequientiallyRunFn.call(APRcalc, "dailyPayment", "daysToRepay", "financingCost", "APRCalculation", "dailyInterestRate");
				console.log(calculatedValues);
				APRcalc.printCalcValues('printOutput', calculatedValues);
		} else {
				console.log('form invalid');
		}
}

var formValidatonInstance = (0, _validation2.default)(form, callbackFn);

_common2.default.getFormChildren(form).forEach(function (element) {
		element.addEventListener('keyup', function (event) {
				var target = event.target;
				var elmVal = target.value;
				var elementName = element.getAttribute('name');
				_common2.default.$$('[name=' + elementName + ']', form)[0].value = _common2.default.addCommas(elmVal.replace(/,/g, ""));
		}, false);
});

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _common = __webpack_require__(0);

var _common2 = _interopRequireDefault(_common);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* common functionalities */
__webpack_require__(3); // require('./html5validation');

var $$ = _common2.default.$$;
var getFormChildren = _common2.default.getFormChildren;

function FormValidation(form) {
  var onSubmitCallback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};


  /*var options = arguments.length == 2 > (typeof options)  
  var onSubmitCallback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};*/

  /* props */

  var props = {
    showLabel: true,
    updateMessage: updateMessage,
    updateIncludes: updateIncludes,
    isValid: isValid
  };
  function isValid() {
    return form.checkValidity() && form.customCheckValidity();
  }

  /* function */
  function onSubmit() {
    console.log('form submitted');
    setState(form, 'submitted', true);
    validate(form);
    getFormChildren(form).forEach(validate);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    onSubmitCallback.apply(props, args);
  }

  function setState(target, state, value) {
    var name = target.getAttribute('name');
    var statesForElements = $$('[data-states-for="' + name + '"]', form);
    var elements = [target].concat(statesForElements);
    var className = 'is-' + state;

    if (value) elements.forEach(function (element) {
      return element.classList.add(className);
    });else elements.forEach(function (element) {
      return element.classList.remove(className);
    });
  }

  function validate(element) {
    if (element.checkValidity() && element.customCheckValidity()) {
      element.removeAttribute('aria-invalid');
      setState(element, 'valid', true); // add class is-valid
      setState(element, 'invalid', false); // remove class is-invalid
    } else {
      console.log("invalid");
      element.setAttribute('aria-invalid', 'true');
      setState(element, 'valid', false); // remove class is-valid
      setState(element, 'invalid', true); // add class is-invalid
    }

    // show & hide relevant messages
    updateMessage(element);
  }

  function updateMessage(element) {
    var name = element.getAttribute('name');
    var validity = element.validity;
    // const customValidity = element.customValidity 
    addMessageForValidation(name, validity); // check for default validity object
    // addMessageForValidation(name, customValidity) // check for custom validity object
  }

  function addMessageForValidation(name, validityObject) {
    var _loop = function _loop(key) {
      /*
        the validityState object's propeties are not its own
        so we must not use the .hasOwnProperty filter
          the validityState object has a "valid" property
        that is true when the input is valid and false otherwise
        it's not really an error-related property so we ignore it
      */
      if (key === 'valid') return 'continue';

      /*
        the property is set to true when the condition is not met
        e.g an empty required field has the valueMissing property set to true
      */
      var isValid = validityObject[key] === false;

      var messages = $$('[data-errors-for="' + name + '"] [data-errors-when="' + key + '"]', form);

      messages.forEach(function (message) {
        if (isValid) hide(message);else show(message);
      });
    };

    for (var key in validityObject) {
      var _ret = _loop(key);

      if (_ret === 'continue') continue;
    }
  }
  function show(element) {
    element.style.display = '';
    element.removeAttribute('aria-hidden');
  }

  function hide(element) {
    element.style.display = 'none';
    element.setAttribute('aria-hidden', 'true');
  }

  var includesCache = {};

  function updateIncludes() {
    $$('[data-include]', form).forEach(function (element) {
      var id = element.getAttribute('data-include');
      if (includesCache[id] == null) includesCache[id] = document.getElementById(id).innerHTML;
      element.innerHTML = includesCache[id];
    });
  }

  function addLabel(element, form) {
    var parentNode = element.parentNode,
        name = element.getAttribute('name');
    if (element.value) {
      if ($$('[for=' + name + ']', form).length) return false; // if exist
      var labelText = element.getAttribute('placeholder'),
          labelElem = document.createElement('label');
      labelElem.innerHTML = labelText;
      labelElem.setAttribute('for', name);
      //prepend it
      parentNode.insertBefore(labelElem, parentNode.childNodes[0]);

      $$('[for=' + name + ']', form)[0].classList.add('animation');
    } else {

      $$('[for=' + name + ']', form).length ? $$('[for=' + name + ']', form)[0].remove() : '';
    }
  }
  /* init */
  form.addEventListener('submit', onSubmit, false);

  form.addEventListener('change', function (event) {
    var target = event.target;

    setState(target, 'changed', true);
    validate(target);
  }, false);
  // show label true
  if (props.showLabel) {
    getFormChildren(form).forEach(function (element) {
      element.addEventListener('keyup', function (event) {
        var target = event.target;

        addLabel(target, form);
      }, false);
    });
  }

  $$('[data-errors-when]', form).forEach(hide);

  updateIncludes();
  $$('[data-errors-when]', form).forEach(hide);
  return props;
}

module.exports = FormValidation;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
	Desc: add custom validation
*/

var routines = {
	checkGreaterThan: __webpack_require__(4)
};[HTMLInputElement, HTMLFormElement].forEach(function (constructor) {
	Object.defineProperty(constructor.prototype, 'customValidity', {
		get: function get() {
			var customValidity = { valid: true };

			for (var name in routines) {
				if (!routines.hasOwnProperty(name)) continue;

				customValidity[name] = routines[name](this);
				if (customValidity[name] === true) customValidity.valid = false;
			}
			return customValidity;
		},

		configurable: true
	});
	constructor.prototype.customCheckValidity = function () {
		console.log('customCheckValidity');
		var form = this;

		function $$(selector) {
			return [].slice.call(form.querySelectorAll(selector));
		}

		return $$('input').filter(function (input) {
			return ['button', 'submit', 'reset'].indexOf(input.getAttribute('type')) === -1;
		}).concat($$('textarea, select')).every(function (input) {
			return input.customValidity.valid === true;
		});
	};
});

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (input) {
	if (!input.hasAttribute('greaterThan')) return false;
	console.log('not greater than');
	var type = input.getAttribute('type') || input.tagName.toLowerCase();

	if (type === 'checkbox') return input.checked !== true;
	if (type !== 'radio' && type !== 'range') {

		var value1 = Number(input.value.replace(/\,/g, '')); // value1
		var comparewtihElm = input.getAttribute('greaterThan');
		var value2 = Number(document.querySelector('[name="' + comparewtihElm + '"]').value.replace(/\,/g, '')); // value2
		console.log('compare', value1 > value2);

		return value1 < value2;
	}
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _common = __webpack_require__(0);

var _common2 = _interopRequireDefault(_common);

var _rate = __webpack_require__(6);

var _rate2 = _interopRequireDefault(_rate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
	Desc: MCA APR Calculator
*/

function APRCalculator(form) {
	console.log('mcaCalculator111');
	var currentObject = this;

	function getValues(elementName, form) {
		return _common2.default.$$('[name=' + elementName + ']', form)[0].value.replace(/\,/g, '');
	}

	function createFormValuesObject(form) {
		var Obj = {};
		_common2.default.getFormChildren(form).forEach(function (element) {
			var elementName = element.getAttribute('name');
			Obj[elementName] = getValues(elementName, form);
		});
		return Obj;
	}

	// approx daily Payment = (Estimated monthly card sales / 30) * percentage_future_card_sales
	function dailyPayment() {
		var dailyPaymentAmount = this.inputFormValues.projectedMCS / 30 * (this.inputFormValues.percentageFCS / 100);
		return dailyPaymentAmount.toFixed(0);
	}
	// approx. # Days to Repay = Payback Amount / Daily Payment
	function daysToRepay(cumulativeValues) {
		var daysToRepay = this.inputFormValues.paybackAmount / cumulativeValues["dailyPayment"];
		return addCommas(daysToRepay);
	}

	// Financing Cost = Payback Amout - Amount Advanced
	function financingCost() {
		var financing_cost = Number(this.inputFormValues.paybackAmount - this.inputFormValues.amountAdvanced);
		return financing_cost;
	}

	// Effective APR = RATE(daysToRepay, dailyPayment, advanceAmount) * 365 * 100
	function APRCalculation(cumulativeValues) {
		var effective_APR = (0, _rate2.default)(cumulativeValues.daysToRepay, -cumulativeValues.dailyPayment, Number(this.inputFormValues.amountAdvanced)) * 365 * 100;
		return effective_APR.toFixed(2);
	}

	function dailyInterestRate(cumulativeValues) {
		var dailyInterestRateAmount = cumulativeValues.APRCalculation / 365;
		return dailyInterestRateAmount.toFixed(4);
	}
	// utility functions
	function addCommas(number) {
		return number.toFixed(0).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
	}

	// print values
	function printCalcValues(selector, calculatedValues) {
		var outputContainer = document.getElementById(selector);
		var htmlStr = '';
		htmlStr += '<table>\t\t\t\t\t\t\t<tr><td> Daily Payment </td><td>$ ' + calculatedValues['dailyPayment'] + ' </td></tr>\t\t\t\t\t\t\t<tr><td> Daily Interest Rate </td><td> ' + calculatedValues['dailyInterestRate'] + ' %</td></tr>\t\t\t\t\t\t\t<tr><td> APR </td><td> ' + calculatedValues['APRCalculation'] + ' %</td></tr>\t\t\t\t\t\t\t<tr><td> Repaid in about </td><td> ' + calculatedValues['daysToRepay'] + ' days</td></tr>\t\t\t\t\t\t\t<tr><td> Total Financing Cost </td><td>$ ' + calculatedValues['financingCost'] + ' </td></tr>\t\t\t\t\t\t</table>';
		outputContainer.innerHTML = htmlStr;
	}
	// add percentage sign and fixed to two decimal point
	function toPercentage(number, decimalNumber) {
		number = number.toFixed(decimalNumber);
		return number + "%";
	}

	return {
		inputFormValues: createFormValuesObject(form),
		dailyPayment: dailyPayment,
		daysToRepay: daysToRepay,
		financingCost: financingCost,
		APRCalculation: APRCalculation,
		dailyInterestRate: dailyInterestRate,
		printCalcValues: printCalcValues //Object.assign(this.inputValues, this.publicMethods) ;
	};
}

module.exports = APRCalculator;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var RATE = function RATE(periods, payment, present, future, type, guess) {
  guess = guess === undefined ? 0.01 : guess;
  future = future === undefined ? 0 : future;
  type = type === undefined ? 0 : type;

  // Set maximum epsilon for end of iteration
  var epsMax = 1e-10;

  // Set maximum number of iterations
  var iterMax = 10;

  // Implement Newton's method
  var y,
      y0,
      y1,
      x0,
      x1 = 0,
      f = 0,
      i = 0;
  var rate = guess;
  if (Math.abs(rate) < epsMax) {
    y = present * (1 + periods * rate) + payment * (1 + rate * type) * periods + future;
  } else {
    f = Math.exp(periods * Math.log(1 + rate));
    y = present * f + payment * (1 / rate + type) * (f - 1) + future;
  }
  y0 = present + payment * periods + future;
  y1 = present * f + payment * (1 / rate + type) * (f - 1) + future;
  i = x0 = 0;
  x1 = rate;
  while (Math.abs(y0 - y1) > epsMax && i < iterMax) {
    rate = (y1 * x0 - y0 * x1) / (y1 - y0);
    x0 = x1;
    x1 = rate;
    if (Math.abs(rate) < epsMax) {
      y = present * (1 + periods * rate) + payment * (1 + rate * type) * periods + future;
    } else {
      f = Math.exp(periods * Math.log(1 + rate));
      y = present * f + payment * (1 / rate + type) * (f - 1) + future;
    }
    y0 = y1;
    y1 = y;
    ++i;
  }
  return rate;
};

module.exports = RATE;

/***/ })
/******/ ]);
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBlMDQ5ZWI2NTZlODQ4MjM0MjY5YiIsIndlYnBhY2s6Ly8vLi9qcy9jb21tb24uanMiLCJ3ZWJwYWNrOi8vLy4vanMvYXBwLmpzIiwid2VicGFjazovLy8uL2pzL3ZhbGlkYXRpb24uanMiLCJ3ZWJwYWNrOi8vLy4vanMvYWRkY3VzdG9tLXZhbGlkYXRpb24uanMiLCJ3ZWJwYWNrOi8vLy4vanMvcm91dGluZXMvZ3JlYXRlcnRoYW4uanMiLCJ3ZWJwYWNrOi8vLy4vanMvbWNhQ2FsY3VsYXRvci5qcyIsIndlYnBhY2s6Ly8vLi9qcy9yYXRlLmpzIl0sIm5hbWVzIjpbIlV0aWxzIiwiJCQiLCJzZWxlY3RvciIsInBhcmVudFNlbGVjdG9yIiwic2xpY2UiLCJjYWxsIiwicXVlcnlTZWxlY3RvckFsbCIsImdldEZvcm1DaGlsZHJlbiIsImZvcm0iLCJmaWx0ZXIiLCJjaGlsZCIsInR5cGUiLCJnZXRBdHRyaWJ1dGUiLCJub3RWYWxpZGFibGVFbGVtZW50cyIsImluZGV4T2YiLCJjb25jYXQiLCJhZGRDb21tYXMiLCJuU3RyIiwieCIsInNwbGl0IiwieDEiLCJ4MiIsImxlbmd0aCIsInJneCIsInRlc3QiLCJyZXBsYWNlIiwic2VxdWllbnRpYWxseVJ1bkZuIiwiY3VycmVudE9iaiIsImN1bXVsYXRpdmVWYWx1ZXMiLCJhcmdzIiwiZm9yRWFjaCIsIm5hbWUiLCJpbmRleCIsImFycmF5IiwiT2JqZWN0IiwiYXNzaWduIiwiaXNOdW1iZXIiLCJldnQiLCJ3aW5kb3ciLCJldmVudCIsImNoYXJDb2RlIiwid2hpY2giLCJrZXlDb2RlIiwiY29uc29sZSIsImxvZyIsIm1vZHVsZSIsImV4cG9ydHMiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiY2FsbGJhY2tGbiIsInByZXZlbnREZWZhdWx0IiwiaXNWYWxpZCIsIkFQUmNhbGMiLCJjYWxjdWxhdGVkVmFsdWVzIiwicHJpbnRDYWxjVmFsdWVzIiwiZm9ybVZhbGlkYXRvbkluc3RhbmNlIiwiZWxlbWVudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJ0YXJnZXQiLCJlbG1WYWwiLCJ2YWx1ZSIsImVsZW1lbnROYW1lIiwicmVxdWlyZSIsIkZvcm1WYWxpZGF0aW9uIiwib25TdWJtaXRDYWxsYmFjayIsInByb3BzIiwic2hvd0xhYmVsIiwidXBkYXRlTWVzc2FnZSIsInVwZGF0ZUluY2x1ZGVzIiwiY2hlY2tWYWxpZGl0eSIsImN1c3RvbUNoZWNrVmFsaWRpdHkiLCJvblN1Ym1pdCIsInNldFN0YXRlIiwidmFsaWRhdGUiLCJhcHBseSIsInN0YXRlIiwic3RhdGVzRm9yRWxlbWVudHMiLCJlbGVtZW50cyIsImNsYXNzTmFtZSIsImNsYXNzTGlzdCIsImFkZCIsInJlbW92ZSIsInJlbW92ZUF0dHJpYnV0ZSIsInNldEF0dHJpYnV0ZSIsInZhbGlkaXR5IiwiYWRkTWVzc2FnZUZvclZhbGlkYXRpb24iLCJ2YWxpZGl0eU9iamVjdCIsImtleSIsIm1lc3NhZ2VzIiwibWVzc2FnZSIsImhpZGUiLCJzaG93Iiwic3R5bGUiLCJkaXNwbGF5IiwiaW5jbHVkZXNDYWNoZSIsImlkIiwiaW5uZXJIVE1MIiwiYWRkTGFiZWwiLCJwYXJlbnROb2RlIiwibGFiZWxUZXh0IiwibGFiZWxFbGVtIiwiY3JlYXRlRWxlbWVudCIsImluc2VydEJlZm9yZSIsImNoaWxkTm9kZXMiLCJyb3V0aW5lcyIsImNoZWNrR3JlYXRlclRoYW4iLCJIVE1MSW5wdXRFbGVtZW50IiwiSFRNTEZvcm1FbGVtZW50IiwiY29uc3RydWN0b3IiLCJkZWZpbmVQcm9wZXJ0eSIsInByb3RvdHlwZSIsImdldCIsImN1c3RvbVZhbGlkaXR5IiwidmFsaWQiLCJoYXNPd25Qcm9wZXJ0eSIsImNvbmZpZ3VyYWJsZSIsImlucHV0IiwiZXZlcnkiLCJoYXNBdHRyaWJ1dGUiLCJ0YWdOYW1lIiwidG9Mb3dlckNhc2UiLCJjaGVja2VkIiwidmFsdWUxIiwiTnVtYmVyIiwiY29tcGFyZXd0aWhFbG0iLCJ2YWx1ZTIiLCJxdWVyeVNlbGVjdG9yIiwiQVBSQ2FsY3VsYXRvciIsImN1cnJlbnRPYmplY3QiLCJnZXRWYWx1ZXMiLCJjcmVhdGVGb3JtVmFsdWVzT2JqZWN0IiwiT2JqIiwiZGFpbHlQYXltZW50IiwiZGFpbHlQYXltZW50QW1vdW50IiwiaW5wdXRGb3JtVmFsdWVzIiwicHJvamVjdGVkTUNTIiwicGVyY2VudGFnZUZDUyIsInRvRml4ZWQiLCJkYXlzVG9SZXBheSIsInBheWJhY2tBbW91bnQiLCJmaW5hbmNpbmdDb3N0IiwiZmluYW5jaW5nX2Nvc3QiLCJhbW91bnRBZHZhbmNlZCIsIkFQUkNhbGN1bGF0aW9uIiwiZWZmZWN0aXZlX0FQUiIsImRhaWx5SW50ZXJlc3RSYXRlIiwiZGFpbHlJbnRlcmVzdFJhdGVBbW91bnQiLCJudW1iZXIiLCJvdXRwdXRDb250YWluZXIiLCJodG1sU3RyIiwidG9QZXJjZW50YWdlIiwiZGVjaW1hbE51bWJlciIsIlJBVEUiLCJwZXJpb2RzIiwicGF5bWVudCIsInByZXNlbnQiLCJmdXR1cmUiLCJndWVzcyIsInVuZGVmaW5lZCIsImVwc01heCIsIml0ZXJNYXgiLCJ5IiwieTAiLCJ5MSIsIngwIiwiZiIsImkiLCJyYXRlIiwiTWF0aCIsImFicyIsImV4cCJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87QUNWQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FB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QUksQ0FBbkMsQ0FBZCxHQUFzRFQsTUFBM0Q7QUFDQVUsTUFBSUYsS0FBSyxDQUFUO0FBQ0FoSixPQUFLbUosSUFBTDtBQUNBLFNBQVFDLEtBQUtDLEdBQUwsQ0FBU1AsS0FBS0MsRUFBZCxJQUFvQkosTUFBckIsSUFBaUNPLElBQUlOLE9BQTVDLEVBQXNEO0FBQ3BETyxXQUFPLENBQUNKLEtBQUtDLEVBQUwsR0FBVUYsS0FBSzlJLEVBQWhCLEtBQXVCK0ksS0FBS0QsRUFBNUIsQ0FBUDtBQUNBRSxTQUFLaEosRUFBTDtBQUNBQSxTQUFLbUosSUFBTDtBQUNFLFFBQUlDLEtBQUtDLEdBQUwsQ0FBU0YsSUFBVCxJQUFpQlIsTUFBckIsRUFBNkI7QUFDM0JFLFVBQUlOLFdBQVcsSUFBSUYsVUFBVWMsSUFBekIsSUFBaUNiLFdBQVcsSUFBSWEsT0FBTzVKLElBQXRCLElBQThCOEksT0FBL0QsR0FBeUVHLE1BQTdFO0FBQ0QsS0FGRCxNQUVPO0FBQ0xTLFVBQUlHLEtBQUtFLEdBQUwsQ0FBU2pCLFVBQVVlLEtBQUs1SCxHQUFMLENBQVMsSUFBSTJILElBQWIsQ0FBbkIsQ0FBSjtBQUNBTixVQUFJTixVQUFVVSxDQUFWLEdBQWNYLFdBQVcsSUFBSWEsSUFBSixHQUFXNUosSUFBdEIsS0FBK0IwSixJQUFJLENBQW5DLENBQWQsR0FBc0RULE1BQTFEO0FBQ0Q7QUFDSE0sU0FBS0MsRUFBTDtBQUNBQSxTQUFLRixDQUFMO0FBQ0EsTUFBRUssQ0FBRjtBQUNEO0FBQ0QsU0FBT0MsSUFBUDtBQUNILENBekNEOztBQTJDQTFILE9BQU9DLE9BQVAsR0FBaUIwRyxJQUFqQixDIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcImZvcm1WYWxpZGF0aW9uXCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcImZvcm1WYWxpZGF0aW9uXCJdID0gZmFjdG9yeSgpO1xufSkodHlwZW9mIHNlbGYgIT09ICd1bmRlZmluZWQnID8gc2VsZiA6IHRoaXMsIGZ1bmN0aW9uKCkge1xucmV0dXJuIFxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvYXNzZXRzL1wiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDEpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGUwNDllYjY1NmU4NDgyMzQyNjliIiwiLypcclxuXHRkZXNjOiBjb21tb24gZnVuY3Rpb25hbGl0aWVzXHJcbiovXHJcbnZhciBVdGlscyA9IChmdW5jdGlvbiAoKSB7XHJcblxyXG5cdFx0ZnVuY3Rpb24gJCQgKHNlbGVjdG9yLCBwYXJlbnRTZWxlY3Rvcikge1xyXG5cdCAgICAgIHJldHVybiBbXS5zbGljZS5jYWxsKHBhcmVudFNlbGVjdG9yLnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpKVxyXG5cdCAgICB9XHJcblxyXG5cdCAgICBmdW5jdGlvbiBnZXRGb3JtQ2hpbGRyZW4gKGZvcm0pIHtcclxuXHQgICAgICByZXR1cm4gJCQoJ2lucHV0JywgZm9ybSlcclxuXHQgICAgICAgICAgLmZpbHRlcihmdW5jdGlvbihjaGlsZCkge1xyXG5cdCAgICAgICAgICAgIGNvbnN0IHR5cGUgPSBjaGlsZC5nZXRBdHRyaWJ1dGUoJ25hbWUnKVxyXG5cdCAgICAgICAgICAgIGNvbnN0IG5vdFZhbGlkYWJsZUVsZW1lbnRzID0gW1wiYnV0dG9uXCIsIFwic3VibWl0XCIsIFwicmVzZXRcIiwgXCJmaWxlXCJdXHJcblx0ICAgICAgICAgICAgcmV0dXJuIG5vdFZhbGlkYWJsZUVsZW1lbnRzLmluZGV4T2YodHlwZSkgPT09IC0xXHJcblx0ICAgICAgICAgIH0pXHJcblx0ICAgICAgICAgIC5jb25jYXQoJCQoJ3RleHRhcmVhLCBzZWxlY3QnLCBmb3JtKSlcclxuXHQgICAgfVxyXG5cdCAgICBcclxuXHQgICAgLypmdW5jdGlvbiBhZGRDb21tYXMobnVtYmVyKSB7XHJcblx0XHRcdHJldHVybiBudW1iZXIudG9GaXhlZCgwKS5yZXBsYWNlKC8oXFxkKSg/PShcXGRcXGRcXGQpKyg/IVxcZCkpL2csIFwiJDEsXCIpO1xyXG5cdFx0fSovXHJcblxyXG5cdFx0ZnVuY3Rpb24gYWRkQ29tbWFzKG5TdHIpIHtcclxuXHRcdFx0blN0ciArPSAnJztcclxuXHRcdFx0Y29uc3QgeCA9IG5TdHIuc3BsaXQoJy4nKTtcclxuXHRcdFx0dmFyIHgxID0geFswXTtcclxuXHRcdFx0dmFyIHgyID0geC5sZW5ndGggPiAxID8gJy4nICsgeFsxXSA6ICcnO1xyXG5cdFx0XHR2YXIgcmd4ID0gLyhcXGQrKShcXGR7M30pLztcclxuXHRcdFx0d2hpbGUgKHJneC50ZXN0KHgxKSkge1xyXG5cdFx0XHRcdHgxID0geDEucmVwbGFjZShyZ3gsICckMScgKyAnLCcgKyAnJDInKTtcclxuXHRcdFx0fSBcclxuXHRcdFx0cmV0dXJuIHgxICsgeDI7XHJcblx0XHR9XHJcblxyXG5cclxuXHRcdGZ1bmN0aW9uIHNlcXVpZW50aWFsbHlSdW5GbiguLi5hcmdzKSB7XHJcblx0XHRcdC8vIHZhciBhcmdzID0gW10uc2xpY2UuY2FsbChhcmd1bWVudHMpO1xyXG5cdFx0XHR2YXIgY3VycmVudE9iaiA9IHRoaXM7XHJcblx0XHRcdHZhciBjdW11bGF0aXZlVmFsdWVzID0ge307IFxyXG5cdFx0XHRhcmdzLmZvckVhY2goZnVuY3Rpb24obmFtZSwgaW5kZXgsIGFycmF5KSB7XHJcblx0XHRcdFx0T2JqZWN0LmFzc2lnbihjdW11bGF0aXZlVmFsdWVzLCB7W25hbWVdOiBjdXJyZW50T2JqW25hbWVdKGN1bXVsYXRpdmVWYWx1ZXMpfSlcclxuXHRcdFx0XHQvKmN1bXVsYXRpdmVWYWx1ZXNbaW5kZXhdID0ge1xyXG5cdFx0XHRcdFx0W25hbWVdOiBjdXJyZW50T2JqW25hbWVdKGN1bXVsYXRpdmVWYWx1ZXMpXHRcclxuXHRcdFx0XHR9ICovXHJcblx0XHRcdH0pXHJcblx0XHRcdHJldHVybiBjdW11bGF0aXZlVmFsdWVzO1xyXG5cdFx0fVxyXG5cdFx0Ly8gcmVzdHJpY3QgdG8gZW50ZXIgbnVtYmVyIG9ubHlcclxuXHRcdGZ1bmN0aW9uIGlzTnVtYmVyKGV2dCkge1xyXG5cdFx0XHRldnQgPSAoZXZ0KSA/IGV2dCA6IHdpbmRvdy5ldmVudDtcclxuXHRcdFx0dmFyIGNoYXJDb2RlID0gKGV2dC53aGljaCkgPyBldnQud2hpY2ggOiBldnQua2V5Q29kZTtcclxuXHRcdFx0aWYoY2hhckNvZGUgPiAzMSAmJiAoY2hhckNvZGUgPCA0OCB8fCBjaGFyQ29kZSA+IDU3KSkge1xyXG5cdFx0XHRcdGNvbnNvbGUubG9nKCdmYWxzZScpO1xyXG5cdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0fVxyXG5cdFx0XHRcdGNvbnNvbGUubG9nKCd0cnVlJyk7XHJcblx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0fSBcclxuXHJcblx0ICAgIHJldHVybiB7XHJcblx0ICAgIFx0JCQ6ICQkLFxyXG5cdCAgICBcdGdldEZvcm1DaGlsZHJlbjogZ2V0Rm9ybUNoaWxkcmVuLFxyXG5cdCAgICBcdHNlcXVpZW50aWFsbHlSdW5Gbjogc2VxdWllbnRpYWxseVJ1bkZuLFxyXG5cdCAgICBcdGlzTnVtYmVyOiBpc051bWJlcixcclxuXHQgICAgXHRhZGRDb21tYXM6IGFkZENvbW1hc1xyXG5cdCAgICB9XHJcbn0pKClcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gVXRpbHNcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9qcy9jb21tb24uanMiLCIvKlxyXG5cdERlc2M6IEZvcm0gdmFsaWRhdGlvblxyXG4qL1xyXG5cclxuaW1wb3J0IFV0aWxzIGZyb20gJy4vY29tbW9uJ1xyXG5pbXBvcnQgRm9ybVZhbGlkYXRpb24gZnJvbSAnLi92YWxpZGF0aW9uJztcclxuaW1wb3J0IEFQUkNhbGN1bGF0b3IgZnJvbSAnLi9tY2FDYWxjdWxhdG9yJztcclxuXHJcbndpbmRvdy5VdGlscyA9IFV0aWxzO1xyXG5cclxudmFyIGZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYXByQ2FsYycpO1xyXG5cclxuZnVuY3Rpb24gY2FsbGJhY2tGbihldmVudCkge1xyXG5cdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHRcdGlmKHRoaXMuaXNWYWxpZCgpKSB7XHJcblx0XHRjb25zb2xlLmxvZygnZm9ybSB2YWxpZCcpXHJcblx0XHR2YXIgQVBSY2FsYyA9IG5ldyBBUFJDYWxjdWxhdG9yKGZvcm0pO1xyXG5cdFx0Y29uc29sZS5sb2coQVBSY2FsYylcclxuXHRcdHZhciBjYWxjdWxhdGVkVmFsdWVzID0gVXRpbHMuc2VxdWllbnRpYWxseVJ1bkZuLmNhbGwoQVBSY2FsYywgXCJkYWlseVBheW1lbnRcIiwgXCJkYXlzVG9SZXBheVwiLCBcImZpbmFuY2luZ0Nvc3RcIiwgXCJBUFJDYWxjdWxhdGlvblwiLCBcImRhaWx5SW50ZXJlc3RSYXRlXCIpO1xyXG5cdFx0Y29uc29sZS5sb2coY2FsY3VsYXRlZFZhbHVlcylcclxuXHRcdEFQUmNhbGMucHJpbnRDYWxjVmFsdWVzKCdwcmludE91dHB1dCcsIGNhbGN1bGF0ZWRWYWx1ZXMpXHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRjb25zb2xlLmxvZygnZm9ybSBpbnZhbGlkJylcclxuXHRcdH1cclxufVxyXG5cclxudmFyIGZvcm1WYWxpZGF0b25JbnN0YW5jZSA9IEZvcm1WYWxpZGF0aW9uKGZvcm0sIGNhbGxiYWNrRm4pO1xyXG5cclxuXHJcblV0aWxzLmdldEZvcm1DaGlsZHJlbihmb3JtKS5mb3JFYWNoKGZ1bmN0aW9uKGVsZW1lbnQpIHtcclxuICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0XHJcblx0XHRjb25zdCBlbG1WYWwgPSB0YXJnZXQudmFsdWU7XHJcblx0XHRjb25zdCBlbGVtZW50TmFtZSA9IGVsZW1lbnQuZ2V0QXR0cmlidXRlKCduYW1lJyk7XHJcblx0XHRVdGlscy4kJChgW25hbWU9JHtlbGVtZW50TmFtZX1dYCwgZm9ybSlbMF0udmFsdWUgPSBVdGlscy5hZGRDb21tYXMoZWxtVmFsLnJlcGxhY2UoLywvZywgXCJcIikpXHJcbiAgICAgIH0sIGZhbHNlKVxyXG4gICAgfSlcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vanMvYXBwLmpzIiwiLy8gcmVxdWlyZSgnLi9odG1sNXZhbGlkYXRpb24nKTtcclxuXHJcbmltcG9ydCBVdGlscyBmcm9tICcuL2NvbW1vbidcclxuXHJcbiAgLyogY29tbW9uIGZ1bmN0aW9uYWxpdGllcyAqL1xyXG4gIHJlcXVpcmUoJy4vYWRkY3VzdG9tLXZhbGlkYXRpb24nKTtcclxuICBcclxuICBjb25zdCAkJCA9IFV0aWxzLiQkO1xyXG4gIGNvbnN0IGdldEZvcm1DaGlsZHJlbiA9IFV0aWxzLmdldEZvcm1DaGlsZHJlbjtcclxuXHJcbiAgZnVuY3Rpb24gRm9ybVZhbGlkYXRpb24oZm9ybSwgb25TdWJtaXRDYWxsYmFjayA9IGZ1bmN0aW9uICgpIHt9KSB7XHJcblxyXG4gICAgLyp2YXIgb3B0aW9ucyA9IGFyZ3VtZW50cy5sZW5ndGggPT0gMiA+ICh0eXBlb2Ygb3B0aW9ucykgIFxyXG4gICAgdmFyIG9uU3VibWl0Q2FsbGJhY2sgPSBhcmd1bWVudHMubGVuZ3RoID4gMiAmJiBhcmd1bWVudHNbMl0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1syXSA6IGZ1bmN0aW9uICgpIHt9OyovXHJcblxyXG4gICAgLyogcHJvcHMgKi9cclxuXHJcbiAgICBjb25zdCBwcm9wcyA9IHtcclxuICAgICAgc2hvd0xhYmVsOiB0cnVlLFxyXG4gICAgICB1cGRhdGVNZXNzYWdlLFxyXG4gICAgICB1cGRhdGVJbmNsdWRlcyxcclxuICAgICAgaXNWYWxpZDogaXNWYWxpZFxyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gaXNWYWxpZCgpIHtcclxuICAgICAgcmV0dXJuICggZm9ybS5jaGVja1ZhbGlkaXR5KCkgJiYgZm9ybS5jdXN0b21DaGVja1ZhbGlkaXR5KCkgKVxyXG4gICAgfVxyXG5cclxuICAgIC8qIGZ1bmN0aW9uICovXHJcbiAgICBmdW5jdGlvbiBvblN1Ym1pdCguLi5hcmdzKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCdmb3JtIHN1Ym1pdHRlZCcpO1xyXG4gICAgICBzZXRTdGF0ZShmb3JtLCAnc3VibWl0dGVkJywgdHJ1ZSk7XHJcbiAgICAgIHZhbGlkYXRlKGZvcm0pXHJcbiAgICAgIGdldEZvcm1DaGlsZHJlbihmb3JtKS5mb3JFYWNoKHZhbGlkYXRlKVxyXG4gICAgICBvblN1Ym1pdENhbGxiYWNrLmFwcGx5KHByb3BzLCBhcmdzKVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHNldFN0YXRlKHRhcmdldCwgc3RhdGUsIHZhbHVlKSB7XHJcbiAgICAgIGNvbnN0IG5hbWUgPSB0YXJnZXQuZ2V0QXR0cmlidXRlKCduYW1lJyk7XHJcbiAgICAgIGNvbnN0IHN0YXRlc0ZvckVsZW1lbnRzID0gJCQoYFtkYXRhLXN0YXRlcy1mb3I9XCIke25hbWV9XCJdYCwgZm9ybSk7XHJcbiAgICAgIGNvbnN0IGVsZW1lbnRzID0gW3RhcmdldF0uY29uY2F0KHN0YXRlc0ZvckVsZW1lbnRzKVxyXG4gICAgICBjb25zdCBjbGFzc05hbWUgPSBgaXMtJHtzdGF0ZX1gXHJcblxyXG4gICAgICBpZih2YWx1ZSkgZWxlbWVudHMuZm9yRWFjaChlbGVtZW50ID0+IGVsZW1lbnQuY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpKVxyXG4gICAgICBlbHNlIGVsZW1lbnRzLmZvckVhY2goZWxlbWVudCA9PiBlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NOYW1lKSlcclxuICAgIH1cclxuXHJcbiAgIFxyXG4gICAgZnVuY3Rpb24gdmFsaWRhdGUgKGVsZW1lbnQpIHtcclxuICAgICAgaWYoZWxlbWVudC5jaGVja1ZhbGlkaXR5KCkgJiYgZWxlbWVudC5jdXN0b21DaGVja1ZhbGlkaXR5KCkpIHtcclxuICAgICAgICBlbGVtZW50LnJlbW92ZUF0dHJpYnV0ZSgnYXJpYS1pbnZhbGlkJylcclxuICAgICAgICBzZXRTdGF0ZShlbGVtZW50LCAndmFsaWQnLCB0cnVlKSAvLyBhZGQgY2xhc3MgaXMtdmFsaWRcclxuICAgICAgICBzZXRTdGF0ZShlbGVtZW50LCAnaW52YWxpZCcsIGZhbHNlKSAvLyByZW1vdmUgY2xhc3MgaXMtaW52YWxpZFxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiaW52YWxpZFwiKVxyXG4gICAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKCdhcmlhLWludmFsaWQnLCAndHJ1ZScpO1xyXG4gICAgICAgIHNldFN0YXRlKGVsZW1lbnQsICd2YWxpZCcsIGZhbHNlKSAvLyByZW1vdmUgY2xhc3MgaXMtdmFsaWRcclxuICAgICAgICBzZXRTdGF0ZShlbGVtZW50LCAnaW52YWxpZCcsIHRydWUpIC8vIGFkZCBjbGFzcyBpcy1pbnZhbGlkXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIHNob3cgJiBoaWRlIHJlbGV2YW50IG1lc3NhZ2VzXHJcbiAgICAgIHVwZGF0ZU1lc3NhZ2UoZWxlbWVudClcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiB1cGRhdGVNZXNzYWdlIChlbGVtZW50KSB7XHJcbiAgICAgIGNvbnN0IG5hbWUgPSBlbGVtZW50LmdldEF0dHJpYnV0ZSgnbmFtZScpXHJcbiAgICAgIGNvbnN0IHZhbGlkaXR5ID0gZWxlbWVudC52YWxpZGl0eSBcclxuICAgICAgLy8gY29uc3QgY3VzdG9tVmFsaWRpdHkgPSBlbGVtZW50LmN1c3RvbVZhbGlkaXR5IFxyXG4gICAgICBhZGRNZXNzYWdlRm9yVmFsaWRhdGlvbihuYW1lLCB2YWxpZGl0eSkgLy8gY2hlY2sgZm9yIGRlZmF1bHQgdmFsaWRpdHkgb2JqZWN0XHJcbiAgICAgIC8vIGFkZE1lc3NhZ2VGb3JWYWxpZGF0aW9uKG5hbWUsIGN1c3RvbVZhbGlkaXR5KSAvLyBjaGVjayBmb3IgY3VzdG9tIHZhbGlkaXR5IG9iamVjdFxyXG5cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBhZGRNZXNzYWdlRm9yVmFsaWRhdGlvbihuYW1lLCB2YWxpZGl0eU9iamVjdCkge1xyXG4gICAgICBmb3IgKCBsZXQga2V5IGluIHZhbGlkaXR5T2JqZWN0ICkge1xyXG4gICAgICAgIC8qXHJcbiAgICAgICAgICB0aGUgdmFsaWRpdHlTdGF0ZSBvYmplY3QncyBwcm9wZXRpZXMgYXJlIG5vdCBpdHMgb3duXHJcbiAgICAgICAgICBzbyB3ZSBtdXN0IG5vdCB1c2UgdGhlIC5oYXNPd25Qcm9wZXJ0eSBmaWx0ZXJcclxuXHJcbiAgICAgICAgICB0aGUgdmFsaWRpdHlTdGF0ZSBvYmplY3QgaGFzIGEgXCJ2YWxpZFwiIHByb3BlcnR5XHJcbiAgICAgICAgICB0aGF0IGlzIHRydWUgd2hlbiB0aGUgaW5wdXQgaXMgdmFsaWQgYW5kIGZhbHNlIG90aGVyd2lzZVxyXG4gICAgICAgICAgaXQncyBub3QgcmVhbGx5IGFuIGVycm9yLXJlbGF0ZWQgcHJvcGVydHkgc28gd2UgaWdub3JlIGl0XHJcbiAgICAgICAgKi9cclxuICAgICAgICBpZihrZXkgPT09ICd2YWxpZCcpIGNvbnRpbnVlXHJcblxyXG4gICAgICAgIC8qXHJcbiAgICAgICAgICB0aGUgcHJvcGVydHkgaXMgc2V0IHRvIHRydWUgd2hlbiB0aGUgY29uZGl0aW9uIGlzIG5vdCBtZXRcclxuICAgICAgICAgIGUuZyBhbiBlbXB0eSByZXF1aXJlZCBmaWVsZCBoYXMgdGhlIHZhbHVlTWlzc2luZyBwcm9wZXJ0eSBzZXQgdG8gdHJ1ZVxyXG4gICAgICAgICovXHJcbiAgICAgICAgY29uc3QgaXNWYWxpZCA9IHZhbGlkaXR5T2JqZWN0W2tleV0gPT09IGZhbHNlXHJcblxyXG4gICAgICAgIGNvbnN0IG1lc3NhZ2VzID0gJCQoYFtkYXRhLWVycm9ycy1mb3I9XCIke25hbWV9XCJdIFtkYXRhLWVycm9ycy13aGVuPVwiJHtrZXl9XCJdYCwgZm9ybSlcclxuXHJcbiAgICAgICAgbWVzc2FnZXMuZm9yRWFjaChmdW5jdGlvbiAobWVzc2FnZSkge1xyXG4gICAgICAgICAgaWYoaXNWYWxpZCkgaGlkZShtZXNzYWdlKVxyXG4gICAgICAgICAgZWxzZSBzaG93KG1lc3NhZ2UpXHJcbiAgICAgICAgfSlcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gc2hvdyhlbGVtZW50KSB7XHJcbiAgICAgIGVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICcnXHJcbiAgICAgIGVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKCdhcmlhLWhpZGRlbicpXHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gaGlkZShlbGVtZW50KSB7XHJcbiAgICAgIGVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdub25lJ1xyXG4gICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAndHJ1ZScpXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgaW5jbHVkZXNDYWNoZSA9IHt9XHJcblxyXG4gIGZ1bmN0aW9uIHVwZGF0ZUluY2x1ZGVzICgpIHtcclxuICAgICQkKCdbZGF0YS1pbmNsdWRlXScsIGZvcm0pLmZvckVhY2goZnVuY3Rpb24gKGVsZW1lbnQpIHtcclxuICAgICAgY29uc3QgaWQgPSBlbGVtZW50LmdldEF0dHJpYnV0ZSgnZGF0YS1pbmNsdWRlJylcclxuICAgICAgaWYgKGluY2x1ZGVzQ2FjaGVbaWRdID09IG51bGwpIGluY2x1ZGVzQ2FjaGVbaWRdID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpLmlubmVySFRNTFxyXG4gICAgICBlbGVtZW50LmlubmVySFRNTCA9IGluY2x1ZGVzQ2FjaGVbaWRdXHJcbiAgICB9KVxyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gYWRkTGFiZWwoZWxlbWVudCwgZm9ybSkge1xyXG4gICAgICBjb25zdCBwYXJlbnROb2RlID0gZWxlbWVudC5wYXJlbnROb2RlLFxyXG4gICAgICAgICAgICBuYW1lID0gZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ25hbWUnKTtcclxuICAgIGlmKGVsZW1lbnQudmFsdWUpIHtcclxuICAgIGlmKCQkKGBbZm9yPSR7bmFtZX1dYCwgZm9ybSkubGVuZ3RoKSByZXR1cm4gZmFsc2U7IC8vIGlmIGV4aXN0XHJcbiAgICAgICAgY29uc3QgbGFiZWxUZXh0ID0gZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ3BsYWNlaG9sZGVyJyksXHJcbiAgICAgICAgICAgICAgbGFiZWxFbGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGFiZWwnKTtcclxuICAgICAgICAgICAgICBsYWJlbEVsZW0uaW5uZXJIVE1MID0gbGFiZWxUZXh0O1xyXG4gICAgICAgICAgICAgIGxhYmVsRWxlbS5zZXRBdHRyaWJ1dGUoJ2ZvcicsIG5hbWUpXHJcbiAgICAgICAgICAgICAgLy9wcmVwZW5kIGl0XHJcbiAgICAgICAgICAgICAgcGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUobGFiZWxFbGVtLCBwYXJlbnROb2RlLmNoaWxkTm9kZXNbMF0pXHJcbiAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAkJChgW2Zvcj0ke25hbWV9XWAsIGZvcm0pWzBdLmNsYXNzTGlzdC5hZGQoJ2FuaW1hdGlvbicpXHJcbiAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgJCQoYFtmb3I9JHtuYW1lfV1gLCBmb3JtKS5sZW5ndGggPyAkJChgW2Zvcj0ke25hbWV9XWAsIGZvcm0pWzBdLnJlbW92ZSgpIDogJyc7XHJcbiAgICB9XHJcbiAgfVxyXG4gICAgLyogaW5pdCAqL1xyXG4gICAgZm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCBvblN1Ym1pdCwgZmFsc2UpO1xyXG5cclxuICAgIGZvcm0uYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgY29uc3QgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0XHJcblxyXG4gICAgICBzZXRTdGF0ZSh0YXJnZXQsICdjaGFuZ2VkJywgdHJ1ZSlcclxuICAgICAgdmFsaWRhdGUodGFyZ2V0KVxyXG4gICAgICBcclxuICAgIH0sIGZhbHNlKVxyXG4gICAgLy8gc2hvdyBsYWJlbCB0cnVlXHJcbiAgICBpZihwcm9wcy5zaG93TGFiZWwpIHtcclxuICAgICAgZ2V0Rm9ybUNoaWxkcmVuKGZvcm0pLmZvckVhY2goZnVuY3Rpb24oZWxlbWVudCkge1xyXG4gICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBmdW5jdGlvbihldmVudCkge1xyXG4gICAgICAgICAgY29uc3QgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0XHJcblxyXG4gICAgICAgICAgYWRkTGFiZWwodGFyZ2V0LCBmb3JtKVxyXG4gICAgICAgIH0sIGZhbHNlKVxyXG4gICAgICB9KVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICAkJCgnW2RhdGEtZXJyb3JzLXdoZW5dJywgZm9ybSkuZm9yRWFjaChoaWRlKVxyXG4gICAgXHJcbiAgICB1cGRhdGVJbmNsdWRlcygpXHJcbiAgICAkJCgnW2RhdGEtZXJyb3JzLXdoZW5dJywgZm9ybSkuZm9yRWFjaChoaWRlKVxyXG4gICAgcmV0dXJuIHByb3BzO1xyXG4gIH1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gRm9ybVZhbGlkYXRpb247XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vanMvdmFsaWRhdGlvbi5qcyIsIi8qXHJcblx0RGVzYzogYWRkIGN1c3RvbSB2YWxpZGF0aW9uXHJcbiovXHJcblxyXG5jb25zdCByb3V0aW5lcyA9IHtcclxuICBjaGVja0dyZWF0ZXJUaGFuOiByZXF1aXJlKCcuL3JvdXRpbmVzL2dyZWF0ZXJ0aGFuJylcclxufVxyXG5cclxuO1tIVE1MSW5wdXRFbGVtZW50LCBIVE1MRm9ybUVsZW1lbnRdLmZvckVhY2goZnVuY3Rpb24gKGNvbnN0cnVjdG9yKSB7XHJcblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGNvbnN0cnVjdG9yLnByb3RvdHlwZSwgJ2N1c3RvbVZhbGlkaXR5Jywge1xyXG5cdFx0Z2V0KCkge1xyXG5cdFx0XHRjb25zdCBjdXN0b21WYWxpZGl0eSA9IHsgdmFsaWQ6IHRydWUgfVxyXG5cclxuXHRcdFx0Zm9yKGxldCBuYW1lIGluIHJvdXRpbmVzKSB7XHJcblx0XHRcdFx0aWYoIXJvdXRpbmVzLmhhc093blByb3BlcnR5KG5hbWUpKSBjb250aW51ZVxyXG5cclxuXHRcdFx0XHRjdXN0b21WYWxpZGl0eVtuYW1lXSA9IHJvdXRpbmVzW25hbWVdKHRoaXMpXHJcblx0XHRcdFx0aWYgKGN1c3RvbVZhbGlkaXR5W25hbWVdID09PSB0cnVlKSBjdXN0b21WYWxpZGl0eS52YWxpZCA9IGZhbHNlXHJcblx0XHRcdH1cclxuXHRcdHJldHVybiBjdXN0b21WYWxpZGl0eVxyXG5cdFx0fSxcclxuXHRcdGNvbmZpZ3VyYWJsZTogdHJ1ZVxyXG5cdH0pO1xyXG4gXHRjb25zdHJ1Y3Rvci5wcm90b3R5cGUuY3VzdG9tQ2hlY2tWYWxpZGl0eSA9IGZ1bmN0aW9uKCkge1xyXG5cdGNvbnNvbGUubG9nKCdjdXN0b21DaGVja1ZhbGlkaXR5JylcclxuXHRjb25zdCBmb3JtID0gdGhpcztcclxuXHJcblx0ZnVuY3Rpb24gJCQgKCBzZWxlY3RvciApIHtcclxuXHRcdHJldHVybiBbXS5zbGljZS5jYWxsKGZvcm0ucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvcikpXHJcblx0fVxyXG5cclxuXHRyZXR1cm4gJCQoJ2lucHV0JylcclxuXHRcdC5maWx0ZXIoKGlucHV0KSA9PiBbJ2J1dHRvbicsICdzdWJtaXQnLCAncmVzZXQnXS5pbmRleE9mKGlucHV0LmdldEF0dHJpYnV0ZSgndHlwZScpKSA9PT0gLTEgKVxyXG5cdFx0LmNvbmNhdCgkJCgndGV4dGFyZWEsIHNlbGVjdCcpKVxyXG5cdFx0LmV2ZXJ5KChpbnB1dCkgPT4gaW5wdXQuY3VzdG9tVmFsaWRpdHkudmFsaWQgPT09IHRydWUpXHJcblx0fVxyXG59KVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9qcy9hZGRjdXN0b20tdmFsaWRhdGlvbi5qcyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGlucHV0KSB7XHJcblx0aWYoIWlucHV0Lmhhc0F0dHJpYnV0ZSgnZ3JlYXRlclRoYW4nKSkgcmV0dXJuIGZhbHNlXHJcblx0XHRjb25zb2xlLmxvZygnbm90IGdyZWF0ZXIgdGhhbicpXHJcblx0Y29uc3QgdHlwZSA9IGlucHV0LmdldEF0dHJpYnV0ZSgndHlwZScpIHx8IGlucHV0LnRhZ05hbWUudG9Mb3dlckNhc2UoKVxyXG5cclxuXHRpZih0eXBlID09PSAnY2hlY2tib3gnKSByZXR1cm4gaW5wdXQuY2hlY2tlZCAhPT0gdHJ1ZVxyXG5cdGlmKHR5cGUgIT09ICdyYWRpbycgJiYgdHlwZSAhPT0gJ3JhbmdlJykge1xyXG5cclxuXHRcdGNvbnN0IHZhbHVlMSA9IE51bWJlcihpbnB1dC52YWx1ZS5yZXBsYWNlKC9cXCwvZywgJycpKSAvLyB2YWx1ZTFcclxuXHRcdGNvbnN0IGNvbXBhcmV3dGloRWxtID0gaW5wdXQuZ2V0QXR0cmlidXRlKCdncmVhdGVyVGhhbicpXHJcblx0XHRjb25zdCB2YWx1ZTIgPSBOdW1iZXIoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgW25hbWU9XCIke2NvbXBhcmV3dGloRWxtfVwiXWApLnZhbHVlLnJlcGxhY2UoL1xcLC9nLCAnJykpIC8vIHZhbHVlMlxyXG5cdFx0Y29uc29sZS5sb2coJ2NvbXBhcmUnLCB2YWx1ZTEgPiB2YWx1ZTIpXHJcblxyXG5cdFx0cmV0dXJuICh2YWx1ZTEgPCB2YWx1ZTIpXHJcblx0fVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2pzL3JvdXRpbmVzL2dyZWF0ZXJ0aGFuLmpzIiwiLypcclxuXHREZXNjOiBNQ0EgQVBSIENhbGN1bGF0b3JcclxuKi9cclxuXHJcbmltcG9ydCBVdGlscyBmcm9tICcuL2NvbW1vbidcclxuaW1wb3J0IFJBVEUgZnJvbSAnLi9yYXRlJ1xyXG5cclxuZnVuY3Rpb24gQVBSQ2FsY3VsYXRvcihmb3JtKSB7XHJcblx0Y29uc29sZS5sb2coJ21jYUNhbGN1bGF0b3IxMTEnKVxyXG5cdHZhciBjdXJyZW50T2JqZWN0ID0gdGhpcztcclxuXHRcclxuXHRmdW5jdGlvbiBnZXRWYWx1ZXMoZWxlbWVudE5hbWUsIGZvcm0pIHtcclxuXHRcdHJldHVybiBVdGlscy4kJChgW25hbWU9JHtlbGVtZW50TmFtZX1dYCwgZm9ybSlbMF0udmFsdWUucmVwbGFjZSgvXFwsL2csICcnKTtcclxuXHR9XHJcblx0XHJcblx0ZnVuY3Rpb24gY3JlYXRlRm9ybVZhbHVlc09iamVjdChmb3JtKSB7XHJcblx0XHRjb25zdCBPYmogPSB7fVxyXG5cdFx0XHRcdFV0aWxzLmdldEZvcm1DaGlsZHJlbihmb3JtKS5mb3JFYWNoKGZ1bmN0aW9uKGVsZW1lbnQpIHtcclxuXHRcdFx0XHRjb25zdCBlbGVtZW50TmFtZSA9IGVsZW1lbnQuZ2V0QXR0cmlidXRlKCduYW1lJyk7XHJcblx0XHRcdFx0XHRPYmpbZWxlbWVudE5hbWVdID0gZ2V0VmFsdWVzKGVsZW1lbnROYW1lLCBmb3JtKVxyXG5cdFx0XHQgICB9KVxyXG5cdFx0cmV0dXJuIE9iajtcclxuXHR9XHJcblxyXG5cdC8vIGFwcHJveCBkYWlseSBQYXltZW50ID0gKEVzdGltYXRlZCBtb250aGx5IGNhcmQgc2FsZXMgLyAzMCkgKiBwZXJjZW50YWdlX2Z1dHVyZV9jYXJkX3NhbGVzXHJcblx0ZnVuY3Rpb24gZGFpbHlQYXltZW50KCkge1xyXG5cdFx0Y29uc3QgZGFpbHlQYXltZW50QW1vdW50ID0gKHRoaXMuaW5wdXRGb3JtVmFsdWVzLnByb2plY3RlZE1DUy8zMCkgKiAodGhpcy5pbnB1dEZvcm1WYWx1ZXMucGVyY2VudGFnZUZDUy8xMDApO1xyXG5cdFx0cmV0dXJuIGRhaWx5UGF5bWVudEFtb3VudC50b0ZpeGVkKDApO1xyXG5cdH1cclxuXHQvLyBhcHByb3guICMgRGF5cyB0byBSZXBheSA9IFBheWJhY2sgQW1vdW50IC8gRGFpbHkgUGF5bWVudFxyXG5cdGZ1bmN0aW9uIGRheXNUb1JlcGF5KGN1bXVsYXRpdmVWYWx1ZXMpIHtcclxuXHRcdGNvbnN0IGRheXNUb1JlcGF5ID0gKHRoaXMuaW5wdXRGb3JtVmFsdWVzLnBheWJhY2tBbW91bnQgLyBjdW11bGF0aXZlVmFsdWVzW1wiZGFpbHlQYXltZW50XCJdKTtcclxuXHRcdHJldHVybiBhZGRDb21tYXMoZGF5c1RvUmVwYXkpO1xyXG5cdH1cclxuXHJcblx0Ly8gRmluYW5jaW5nIENvc3QgPSBQYXliYWNrIEFtb3V0IC0gQW1vdW50IEFkdmFuY2VkXHJcblx0ZnVuY3Rpb24gZmluYW5jaW5nQ29zdCAoKSB7XHJcblx0XHRjb25zdCBmaW5hbmNpbmdfY29zdCA9IE51bWJlcih0aGlzLmlucHV0Rm9ybVZhbHVlcy5wYXliYWNrQW1vdW50IC0gdGhpcy5pbnB1dEZvcm1WYWx1ZXMuYW1vdW50QWR2YW5jZWQpXHJcblx0XHRyZXR1cm4gZmluYW5jaW5nX2Nvc3Q7XHJcblx0fVxyXG5cclxuXHQvLyBFZmZlY3RpdmUgQVBSID0gUkFURShkYXlzVG9SZXBheSwgZGFpbHlQYXltZW50LCBhZHZhbmNlQW1vdW50KSAqIDM2NSAqIDEwMFxyXG5cdGZ1bmN0aW9uIEFQUkNhbGN1bGF0aW9uKGN1bXVsYXRpdmVWYWx1ZXMpIHtcclxuXHRcdGNvbnN0IGVmZmVjdGl2ZV9BUFIgPSBSQVRFKGN1bXVsYXRpdmVWYWx1ZXMuZGF5c1RvUmVwYXksIC0oY3VtdWxhdGl2ZVZhbHVlcy5kYWlseVBheW1lbnQpLCBOdW1iZXIodGhpcy5pbnB1dEZvcm1WYWx1ZXMuYW1vdW50QWR2YW5jZWQpKSAqIDM2NSAqIDEwMDtcclxuXHRcdHJldHVybiBlZmZlY3RpdmVfQVBSLnRvRml4ZWQoMik7XHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBkYWlseUludGVyZXN0UmF0ZShjdW11bGF0aXZlVmFsdWVzKSB7XHJcblx0XHRjb25zdCBkYWlseUludGVyZXN0UmF0ZUFtb3VudCA9IChjdW11bGF0aXZlVmFsdWVzLkFQUkNhbGN1bGF0aW9uIC8gMzY1KTtcclxuXHRcdHJldHVybiBkYWlseUludGVyZXN0UmF0ZUFtb3VudC50b0ZpeGVkKDQpXHJcblx0fVxyXG5cdC8vIHV0aWxpdHkgZnVuY3Rpb25zXHJcblx0ZnVuY3Rpb24gYWRkQ29tbWFzKG51bWJlcikge1xyXG5cdFx0XHRyZXR1cm4gbnVtYmVyLnRvRml4ZWQoMCkucmVwbGFjZSgvKFxcZCkoPz0oXFxkXFxkXFxkKSsoPyFcXGQpKS9nLCBcIiQxLFwiKTtcclxuXHRcdH1cclxuXHJcblx0Ly8gcHJpbnQgdmFsdWVzXHJcblx0ZnVuY3Rpb24gcHJpbnRDYWxjVmFsdWVzKHNlbGVjdG9yLCBjYWxjdWxhdGVkVmFsdWVzKSB7XHJcblx0XHRjb25zdCBvdXRwdXRDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChzZWxlY3Rvcik7XHJcblx0XHR2YXIgIGh0bWxTdHIgPSAnJztcclxuXHRcdFx0IGh0bWxTdHIgKz0gYDx0YWJsZT5cXFxyXG5cdFx0XHRcdFx0XHRcdDx0cj48dGQ+IERhaWx5IFBheW1lbnQgPC90ZD48dGQ+JCAke2NhbGN1bGF0ZWRWYWx1ZXNbJ2RhaWx5UGF5bWVudCddfSA8L3RkPjwvdHI+XFxcclxuXHRcdFx0XHRcdFx0XHQ8dHI+PHRkPiBEYWlseSBJbnRlcmVzdCBSYXRlIDwvdGQ+PHRkPiAke2NhbGN1bGF0ZWRWYWx1ZXNbJ2RhaWx5SW50ZXJlc3RSYXRlJ119ICU8L3RkPjwvdHI+XFxcclxuXHRcdFx0XHRcdFx0XHQ8dHI+PHRkPiBBUFIgPC90ZD48dGQ+ICR7Y2FsY3VsYXRlZFZhbHVlc1snQVBSQ2FsY3VsYXRpb24nXX0gJTwvdGQ+PC90cj5cXFxyXG5cdFx0XHRcdFx0XHRcdDx0cj48dGQ+IFJlcGFpZCBpbiBhYm91dCA8L3RkPjx0ZD4gJHtjYWxjdWxhdGVkVmFsdWVzWydkYXlzVG9SZXBheSddfSBkYXlzPC90ZD48L3RyPlxcXHJcblx0XHRcdFx0XHRcdFx0PHRyPjx0ZD4gVG90YWwgRmluYW5jaW5nIENvc3QgPC90ZD48dGQ+JCAke2NhbGN1bGF0ZWRWYWx1ZXNbJ2ZpbmFuY2luZ0Nvc3QnXX0gPC90ZD48L3RyPlxcXHJcblx0XHRcdFx0XHRcdDwvdGFibGU+YDsgXHJcblx0XHRvdXRwdXRDb250YWluZXIuaW5uZXJIVE1MID0gaHRtbFN0cjtcclxuXHR9XHJcblx0Ly8gYWRkIHBlcmNlbnRhZ2Ugc2lnbiBhbmQgZml4ZWQgdG8gdHdvIGRlY2ltYWwgcG9pbnRcclxuXHRmdW5jdGlvbiB0b1BlcmNlbnRhZ2UobnVtYmVyLCBkZWNpbWFsTnVtYmVyKSB7XHJcblx0XHRcdG51bWJlciA9IG51bWJlci50b0ZpeGVkKGRlY2ltYWxOdW1iZXIpXHJcblx0XHRyZXR1cm4gbnVtYmVyK1wiJVwiO1xyXG5cdH1cclxuXHRcclxuXHJcblx0cmV0dXJuIHtcclxuXHRcdGlucHV0Rm9ybVZhbHVlczogY3JlYXRlRm9ybVZhbHVlc09iamVjdChmb3JtKSxcclxuXHRcdGRhaWx5UGF5bWVudDogZGFpbHlQYXltZW50LFxyXG5cdFx0ZGF5c1RvUmVwYXk6IGRheXNUb1JlcGF5LFxyXG5cdFx0ZmluYW5jaW5nQ29zdDogZmluYW5jaW5nQ29zdCxcclxuXHRcdEFQUkNhbGN1bGF0aW9uOiBBUFJDYWxjdWxhdGlvbixcclxuXHRcdGRhaWx5SW50ZXJlc3RSYXRlOiBkYWlseUludGVyZXN0UmF0ZSxcclxuXHRcdHByaW50Q2FsY1ZhbHVlczogcHJpbnRDYWxjVmFsdWVzXHJcblx0fSAvL09iamVjdC5hc3NpZ24odGhpcy5pbnB1dFZhbHVlcywgdGhpcy5wdWJsaWNNZXRob2RzKSA7XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gQVBSQ2FsY3VsYXRvcjtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9qcy9tY2FDYWxjdWxhdG9yLmpzIiwiY29uc3QgUkFURSA9IGZ1bmN0aW9uKHBlcmlvZHMsIHBheW1lbnQsIHByZXNlbnQsIGZ1dHVyZSwgdHlwZSwgZ3Vlc3MpIHtcclxuICAgIGd1ZXNzID0gKGd1ZXNzID09PSB1bmRlZmluZWQpID8gMC4wMSA6IGd1ZXNzO1xyXG4gICAgZnV0dXJlID0gKGZ1dHVyZSA9PT0gdW5kZWZpbmVkKSA/IDAgOiBmdXR1cmU7XHJcbiAgICB0eXBlID0gKHR5cGUgPT09IHVuZGVmaW5lZCkgPyAwIDogdHlwZTtcclxuICBcclxuICAgIC8vIFNldCBtYXhpbXVtIGVwc2lsb24gZm9yIGVuZCBvZiBpdGVyYXRpb25cclxuICAgIHZhciBlcHNNYXggPSAxZS0xMDtcclxuICBcclxuICAgIC8vIFNldCBtYXhpbXVtIG51bWJlciBvZiBpdGVyYXRpb25zXHJcbiAgICB2YXIgaXRlck1heCA9IDEwO1xyXG4gIFxyXG4gICAgLy8gSW1wbGVtZW50IE5ld3RvbidzIG1ldGhvZFxyXG4gICAgdmFyIHksIHkwLCB5MSwgeDAsIHgxID0gMCxcclxuICAgICAgZiA9IDAsXHJcbiAgICAgIGkgPSAwO1xyXG4gICAgdmFyIHJhdGUgPSBndWVzcztcclxuICAgIGlmIChNYXRoLmFicyhyYXRlKSA8IGVwc01heCkge1xyXG4gICAgICB5ID0gcHJlc2VudCAqICgxICsgcGVyaW9kcyAqIHJhdGUpICsgcGF5bWVudCAqICgxICsgcmF0ZSAqIHR5cGUpICogcGVyaW9kcyArIGZ1dHVyZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGYgPSBNYXRoLmV4cChwZXJpb2RzICogTWF0aC5sb2coMSArIHJhdGUpKTtcclxuICAgICAgeSA9IHByZXNlbnQgKiBmICsgcGF5bWVudCAqICgxIC8gcmF0ZSArIHR5cGUpICogKGYgLSAxKSArIGZ1dHVyZTtcclxuICAgIH1cclxuICAgIHkwID0gcHJlc2VudCArIHBheW1lbnQgKiBwZXJpb2RzICsgZnV0dXJlO1xyXG4gICAgeTEgPSBwcmVzZW50ICogZiArIHBheW1lbnQgKiAoMSAvIHJhdGUgKyB0eXBlKSAqIChmIC0gMSkgKyBmdXR1cmU7XHJcbiAgICBpID0geDAgPSAwO1xyXG4gICAgeDEgPSByYXRlO1xyXG4gICAgd2hpbGUgKChNYXRoLmFicyh5MCAtIHkxKSA+IGVwc01heCkgJiYgKGkgPCBpdGVyTWF4KSkge1xyXG4gICAgICByYXRlID0gKHkxICogeDAgLSB5MCAqIHgxKSAvICh5MSAtIHkwKTtcclxuICAgICAgeDAgPSB4MTtcclxuICAgICAgeDEgPSByYXRlO1xyXG4gICAgICAgIGlmIChNYXRoLmFicyhyYXRlKSA8IGVwc01heCkge1xyXG4gICAgICAgICAgeSA9IHByZXNlbnQgKiAoMSArIHBlcmlvZHMgKiByYXRlKSArIHBheW1lbnQgKiAoMSArIHJhdGUgKiB0eXBlKSAqIHBlcmlvZHMgKyBmdXR1cmU7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGYgPSBNYXRoLmV4cChwZXJpb2RzICogTWF0aC5sb2coMSArIHJhdGUpKTtcclxuICAgICAgICAgIHkgPSBwcmVzZW50ICogZiArIHBheW1lbnQgKiAoMSAvIHJhdGUgKyB0eXBlKSAqIChmIC0gMSkgKyBmdXR1cmU7XHJcbiAgICAgICAgfVxyXG4gICAgICB5MCA9IHkxO1xyXG4gICAgICB5MSA9IHk7XHJcbiAgICAgICsraTtcclxuICAgIH1cclxuICAgIHJldHVybiByYXRlO1xyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBSQVRFO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2pzL3JhdGUuanMiXSwic291cmNlUm9vdCI6IiJ9