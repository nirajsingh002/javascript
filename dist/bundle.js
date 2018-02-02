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
				var APRcalc = new _mcaCalculator2.default(form);
				console.log(APRcalc);
				var calculatedValues = _common2.default.sequientiallyRunFn.call(APRcalc, "dailyPayment", "daysToRepay", "financingCost", "APRCalculation", "dailyInterestRate");
				console.log(calculatedValues);
				APRcalc.printCalcValues('printOutput', calculatedValues);
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
    isValid: form.checkValidity.bind(form)
    // Object.assign(props, options);
  };console.log('props', props);
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
    if (element.checkValidity()) {
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
};[HTMLInputElement].forEach(function (constructor) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBiNjk4YTg2ZGUwNTUzNTNjMTM0ZiIsIndlYnBhY2s6Ly8vLi9qcy9jb21tb24uanMiLCJ3ZWJwYWNrOi8vLy4vanMvYXBwLmpzIiwid2VicGFjazovLy8uL2pzL3ZhbGlkYXRpb24uanMiLCJ3ZWJwYWNrOi8vLy4vanMvYWRkY3VzdG9tLXZhbGlkYXRpb24uanMiLCJ3ZWJwYWNrOi8vLy4vanMvcm91dGluZXMvZ3JlYXRlcnRoYW4uanMiLCJ3ZWJwYWNrOi8vLy4vanMvbWNhQ2FsY3VsYXRvci5qcyIsIndlYnBhY2s6Ly8vLi9qcy9yYXRlLmpzIl0sIm5hbWVzIjpbIlV0aWxzIiwiJCQiLCJzZWxlY3RvciIsInBhcmVudFNlbGVjdG9yIiwic2xpY2UiLCJjYWxsIiwicXVlcnlTZWxlY3RvckFsbCIsImdldEZvcm1DaGlsZHJlbiIsImZvcm0iLCJmaWx0ZXIiLCJjaGlsZCIsInR5cGUiLCJnZXRBdHRyaWJ1dGUiLCJub3RWYWxpZGFibGVFbGVtZW50cyIsImluZGV4T2YiLCJjb25jYXQiLCJhZGRDb21tYXMiLCJuU3RyIiwieCIsInNwbGl0IiwieDEiLCJ4MiIsImxlbmd0aCIsInJneCIsInRlc3QiLCJyZXBsYWNlIiwic2VxdWllbnRpYWxseVJ1bkZuIiwiY3VycmVudE9iaiIsImN1bXVsYXRpdmVWYWx1ZXMiLCJhcmdzIiwiZm9yRWFjaCIsIm5hbWUiLCJpbmRleCIsImFycmF5IiwiT2JqZWN0IiwiYXNzaWduIiwiaXNOdW1iZXIiLCJldnQiLCJ3aW5kb3ciLCJldmVudCIsImNoYXJDb2RlIiwid2hpY2giLCJrZXlDb2RlIiwiY29uc29sZSIsImxvZyIsIm1vZHVsZSIsImV4cG9ydHMiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiY2FsbGJhY2tGbiIsInByZXZlbnREZWZhdWx0IiwiaXNWYWxpZCIsIkFQUmNhbGMiLCJjYWxjdWxhdGVkVmFsdWVzIiwicHJpbnRDYWxjVmFsdWVzIiwiZm9ybVZhbGlkYXRvbkluc3RhbmNlIiwiZWxlbWVudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJ0YXJnZXQiLCJlbG1WYWwiLCJ2YWx1ZSIsImVsZW1lbnROYW1lIiwicmVxdWlyZSIsIkZvcm1WYWxpZGF0aW9uIiwib25TdWJtaXRDYWxsYmFjayIsInByb3BzIiwic2hvd0xhYmVsIiwidXBkYXRlTWVzc2FnZSIsInVwZGF0ZUluY2x1ZGVzIiwiY2hlY2tWYWxpZGl0eSIsImJpbmQiLCJvblN1Ym1pdCIsInNldFN0YXRlIiwidmFsaWRhdGUiLCJhcHBseSIsInN0YXRlIiwic3RhdGVzRm9yRWxlbWVudHMiLCJlbGVtZW50cyIsImNsYXNzTmFtZSIsImNsYXNzTGlzdCIsImFkZCIsInJlbW92ZSIsInJlbW92ZUF0dHJpYnV0ZSIsInNldEF0dHJpYnV0ZSIsInZhbGlkaXR5IiwiYWRkTWVzc2FnZUZvclZhbGlkYXRpb24iLCJ2YWxpZGl0eU9iamVjdCIsImtleSIsIm1lc3NhZ2VzIiwibWVzc2FnZSIsImhpZGUiLCJzaG93Iiwic3R5bGUiLCJkaXNwbGF5IiwiaW5jbHVkZXNDYWNoZSIsImlkIiwiaW5uZXJIVE1MIiwiYWRkTGFiZWwiLCJwYXJlbnROb2RlIiwibGFiZWxUZXh0IiwibGFiZWxFbGVtIiwiY3JlYXRlRWxlbWVudCIsImluc2VydEJlZm9yZSIsImNoaWxkTm9kZXMiLCJyb3V0aW5lcyIsImNoZWNrR3JlYXRlclRoYW4iLCJIVE1MSW5wdXRFbGVtZW50IiwiY29uc3RydWN0b3IiLCJkZWZpbmVQcm9wZXJ0eSIsInByb3RvdHlwZSIsImdldCIsImN1c3RvbVZhbGlkaXR5IiwidmFsaWQiLCJoYXNPd25Qcm9wZXJ0eSIsImNvbmZpZ3VyYWJsZSIsImlucHV0IiwiaGFzQXR0cmlidXRlIiwidGFnTmFtZSIsInRvTG93ZXJDYXNlIiwiY2hlY2tlZCIsInZhbHVlMSIsIk51bWJlciIsImNvbXBhcmV3dGloRWxtIiwidmFsdWUyIiwicXVlcnlTZWxlY3RvciIsIkFQUkNhbGN1bGF0b3IiLCJjdXJyZW50T2JqZWN0IiwiZ2V0VmFsdWVzIiwiY3JlYXRlRm9ybVZhbHVlc09iamVjdCIsIk9iaiIsImRhaWx5UGF5bWVudCIsImRhaWx5UGF5bWVudEFtb3VudCIsImlucHV0Rm9ybVZhbHVlcyIsInByb2plY3RlZE1DUyIsInBlcmNlbnRhZ2VGQ1MiLCJ0b0ZpeGVkIiwiZGF5c1RvUmVwYXkiLCJwYXliYWNrQW1vdW50IiwiZmluYW5jaW5nQ29zdCIsImZpbmFuY2luZ19jb3N0IiwiYW1vdW50QWR2YW5jZWQiLCJBUFJDYWxjdWxhdGlvbiIsImVmZmVjdGl2ZV9BUFIiLCJkYWlseUludGVyZXN0UmF0ZSIsImRhaWx5SW50ZXJlc3RSYXRlQW1vdW50IiwibnVtYmVyIiwib3V0cHV0Q29udGFpbmVyIiwiaHRtbFN0ciIsInRvUGVyY2VudGFnZSIsImRlY2ltYWxOdW1iZXIiLCJSQVRFIiwicGVyaW9kcyIsInBheW1lbnQiLCJwcmVzZW50IiwiZnV0dXJlIiwiZ3Vlc3MiLCJ1bmRlZmluZWQiLCJlcHNNYXgiLCJpdGVyTWF4IiwieSIsInkwIiwieTEiLCJ4MCIsImYiLCJpIiwicmF0ZSIsIk1hdGgiLCJhYnMiLCJleHAiXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO0FDVkE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFD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U0FBT0MsSUFBUDtBQUNILENBekNEOztBQTJDQXhILE9BQU9DLE9BQVAsR0FBaUJ3RyxJQUFqQixDIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcImZvcm1WYWxpZGF0aW9uXCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcImZvcm1WYWxpZGF0aW9uXCJdID0gZmFjdG9yeSgpO1xufSkodHlwZW9mIHNlbGYgIT09ICd1bmRlZmluZWQnID8gc2VsZiA6IHRoaXMsIGZ1bmN0aW9uKCkge1xucmV0dXJuIFxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvYXNzZXRzL1wiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDEpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGI2OThhODZkZTA1NTM1M2MxMzRmIiwiLypcclxuXHRkZXNjOiBjb21tb24gZnVuY3Rpb25hbGl0aWVzXHJcbiovXHJcbnZhciBVdGlscyA9IChmdW5jdGlvbiAoKSB7XHJcblxyXG5cdFx0ZnVuY3Rpb24gJCQgKHNlbGVjdG9yLCBwYXJlbnRTZWxlY3Rvcikge1xyXG5cdCAgICAgIHJldHVybiBbXS5zbGljZS5jYWxsKHBhcmVudFNlbGVjdG9yLnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpKVxyXG5cdCAgICB9XHJcblxyXG5cdCAgICBmdW5jdGlvbiBnZXRGb3JtQ2hpbGRyZW4gKGZvcm0pIHtcclxuXHQgICAgICByZXR1cm4gJCQoJ2lucHV0JywgZm9ybSlcclxuXHQgICAgICAgICAgLmZpbHRlcihmdW5jdGlvbihjaGlsZCkge1xyXG5cdCAgICAgICAgICAgIGNvbnN0IHR5cGUgPSBjaGlsZC5nZXRBdHRyaWJ1dGUoJ25hbWUnKVxyXG5cdCAgICAgICAgICAgIGNvbnN0IG5vdFZhbGlkYWJsZUVsZW1lbnRzID0gW1wiYnV0dG9uXCIsIFwic3VibWl0XCIsIFwicmVzZXRcIiwgXCJmaWxlXCJdXHJcblx0ICAgICAgICAgICAgcmV0dXJuIG5vdFZhbGlkYWJsZUVsZW1lbnRzLmluZGV4T2YodHlwZSkgPT09IC0xXHJcblx0ICAgICAgICAgIH0pXHJcblx0ICAgICAgICAgIC5jb25jYXQoJCQoJ3RleHRhcmVhLCBzZWxlY3QnLCBmb3JtKSlcclxuXHQgICAgfVxyXG5cdCAgICBcclxuXHQgICAgLypmdW5jdGlvbiBhZGRDb21tYXMobnVtYmVyKSB7XHJcblx0XHRcdHJldHVybiBudW1iZXIudG9GaXhlZCgwKS5yZXBsYWNlKC8oXFxkKSg/PShcXGRcXGRcXGQpKyg/IVxcZCkpL2csIFwiJDEsXCIpO1xyXG5cdFx0fSovXHJcblxyXG5cdFx0ZnVuY3Rpb24gYWRkQ29tbWFzKG5TdHIpIHtcclxuXHRcdFx0blN0ciArPSAnJztcclxuXHRcdFx0Y29uc3QgeCA9IG5TdHIuc3BsaXQoJy4nKTtcclxuXHRcdFx0dmFyIHgxID0geFswXTtcclxuXHRcdFx0dmFyIHgyID0geC5sZW5ndGggPiAxID8gJy4nICsgeFsxXSA6ICcnO1xyXG5cdFx0XHR2YXIgcmd4ID0gLyhcXGQrKShcXGR7M30pLztcclxuXHRcdFx0d2hpbGUgKHJneC50ZXN0KHgxKSkge1xyXG5cdFx0XHRcdHgxID0geDEucmVwbGFjZShyZ3gsICckMScgKyAnLCcgKyAnJDInKTtcclxuXHRcdFx0fSBcclxuXHRcdFx0cmV0dXJuIHgxICsgeDI7XHJcblx0XHR9XHJcblxyXG5cclxuXHRcdGZ1bmN0aW9uIHNlcXVpZW50aWFsbHlSdW5GbiguLi5hcmdzKSB7XHJcblx0XHRcdC8vIHZhciBhcmdzID0gW10uc2xpY2UuY2FsbChhcmd1bWVudHMpO1xyXG5cdFx0XHR2YXIgY3VycmVudE9iaiA9IHRoaXM7XHJcblx0XHRcdHZhciBjdW11bGF0aXZlVmFsdWVzID0ge307IFxyXG5cdFx0XHRhcmdzLmZvckVhY2goZnVuY3Rpb24obmFtZSwgaW5kZXgsIGFycmF5KSB7XHJcblx0XHRcdFx0T2JqZWN0LmFzc2lnbihjdW11bGF0aXZlVmFsdWVzLCB7W25hbWVdOiBjdXJyZW50T2JqW25hbWVdKGN1bXVsYXRpdmVWYWx1ZXMpfSlcclxuXHRcdFx0XHQvKmN1bXVsYXRpdmVWYWx1ZXNbaW5kZXhdID0ge1xyXG5cdFx0XHRcdFx0W25hbWVdOiBjdXJyZW50T2JqW25hbWVdKGN1bXVsYXRpdmVWYWx1ZXMpXHRcclxuXHRcdFx0XHR9ICovXHJcblx0XHRcdH0pXHJcblx0XHRcdHJldHVybiBjdW11bGF0aXZlVmFsdWVzO1xyXG5cdFx0fVxyXG5cdFx0Ly8gcmVzdHJpY3QgdG8gZW50ZXIgbnVtYmVyIG9ubHlcclxuXHRcdGZ1bmN0aW9uIGlzTnVtYmVyKGV2dCkge1xyXG5cdFx0XHRldnQgPSAoZXZ0KSA/IGV2dCA6IHdpbmRvdy5ldmVudDtcclxuXHRcdFx0dmFyIGNoYXJDb2RlID0gKGV2dC53aGljaCkgPyBldnQud2hpY2ggOiBldnQua2V5Q29kZTtcclxuXHRcdFx0aWYoY2hhckNvZGUgPiAzMSAmJiAoY2hhckNvZGUgPCA0OCB8fCBjaGFyQ29kZSA+IDU3KSkge1xyXG5cdFx0XHRcdGNvbnNvbGUubG9nKCdmYWxzZScpO1xyXG5cdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0fVxyXG5cdFx0XHRcdGNvbnNvbGUubG9nKCd0cnVlJyk7XHJcblx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0fSBcclxuXHJcblx0ICAgIHJldHVybiB7XHJcblx0ICAgIFx0JCQ6ICQkLFxyXG5cdCAgICBcdGdldEZvcm1DaGlsZHJlbjogZ2V0Rm9ybUNoaWxkcmVuLFxyXG5cdCAgICBcdHNlcXVpZW50aWFsbHlSdW5Gbjogc2VxdWllbnRpYWxseVJ1bkZuLFxyXG5cdCAgICBcdGlzTnVtYmVyOiBpc051bWJlcixcclxuXHQgICAgXHRhZGRDb21tYXM6IGFkZENvbW1hc1xyXG5cdCAgICB9XHJcbn0pKClcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gVXRpbHNcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9qcy9jb21tb24uanMiLCIvKlxyXG5cdERlc2M6IEZvcm0gdmFsaWRhdGlvblxyXG4qL1xyXG5cclxuaW1wb3J0IFV0aWxzIGZyb20gJy4vY29tbW9uJ1xyXG5pbXBvcnQgRm9ybVZhbGlkYXRpb24gZnJvbSAnLi92YWxpZGF0aW9uJztcclxuaW1wb3J0IEFQUkNhbGN1bGF0b3IgZnJvbSAnLi9tY2FDYWxjdWxhdG9yJztcclxuXHJcbndpbmRvdy5VdGlscyA9IFV0aWxzO1xyXG5cclxudmFyIGZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYXByQ2FsYycpO1xyXG5cclxuZnVuY3Rpb24gY2FsbGJhY2tGbihldmVudCkge1xyXG5cdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHRcdGlmKHRoaXMuaXNWYWxpZCgpKSB7XHJcblx0XHR2YXIgQVBSY2FsYyA9IG5ldyBBUFJDYWxjdWxhdG9yKGZvcm0pO1xyXG5cdFx0Y29uc29sZS5sb2coQVBSY2FsYylcclxuXHRcdHZhciBjYWxjdWxhdGVkVmFsdWVzID0gVXRpbHMuc2VxdWllbnRpYWxseVJ1bkZuLmNhbGwoQVBSY2FsYywgXCJkYWlseVBheW1lbnRcIiwgXCJkYXlzVG9SZXBheVwiLCBcImZpbmFuY2luZ0Nvc3RcIiwgXCJBUFJDYWxjdWxhdGlvblwiLCBcImRhaWx5SW50ZXJlc3RSYXRlXCIpO1xyXG5cdFx0Y29uc29sZS5sb2coY2FsY3VsYXRlZFZhbHVlcylcclxuXHRcdEFQUmNhbGMucHJpbnRDYWxjVmFsdWVzKCdwcmludE91dHB1dCcsIGNhbGN1bGF0ZWRWYWx1ZXMpXHJcblx0XHR9XHJcbn1cclxuXHJcbnZhciBmb3JtVmFsaWRhdG9uSW5zdGFuY2UgPSBGb3JtVmFsaWRhdGlvbihmb3JtLCBjYWxsYmFja0ZuKTtcclxuXHJcblxyXG5VdGlscy5nZXRGb3JtQ2hpbGRyZW4oZm9ybSkuZm9yRWFjaChmdW5jdGlvbihlbGVtZW50KSB7XHJcbiAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBmdW5jdGlvbihldmVudCkge1xyXG4gICAgICAgIGNvbnN0IHRhcmdldCA9IGV2ZW50LnRhcmdldFxyXG5cdFx0Y29uc3QgZWxtVmFsID0gdGFyZ2V0LnZhbHVlO1xyXG5cdFx0Y29uc3QgZWxlbWVudE5hbWUgPSBlbGVtZW50LmdldEF0dHJpYnV0ZSgnbmFtZScpO1xyXG5cdFx0VXRpbHMuJCQoYFtuYW1lPSR7ZWxlbWVudE5hbWV9XWAsIGZvcm0pWzBdLnZhbHVlID0gVXRpbHMuYWRkQ29tbWFzKGVsbVZhbC5yZXBsYWNlKC8sL2csIFwiXCIpKVxyXG4gICAgICB9LCBmYWxzZSlcclxuICAgIH0pXHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2pzL2FwcC5qcyIsIi8vIHJlcXVpcmUoJy4vaHRtbDV2YWxpZGF0aW9uJyk7XHJcblxyXG5pbXBvcnQgVXRpbHMgZnJvbSAnLi9jb21tb24nXHJcblxyXG4gIC8qIGNvbW1vbiBmdW5jdGlvbmFsaXRpZXMgKi9cclxuICByZXF1aXJlKCcuL2FkZGN1c3RvbS12YWxpZGF0aW9uJyk7XHJcbiAgXHJcbiAgY29uc3QgJCQgPSBVdGlscy4kJDtcclxuICBjb25zdCBnZXRGb3JtQ2hpbGRyZW4gPSBVdGlscy5nZXRGb3JtQ2hpbGRyZW47XHJcblxyXG4gIGZ1bmN0aW9uIEZvcm1WYWxpZGF0aW9uKGZvcm0sIG9uU3VibWl0Q2FsbGJhY2sgPSBmdW5jdGlvbiAoKSB7fSkge1xyXG5cclxuICAgIC8qdmFyIG9wdGlvbnMgPSBhcmd1bWVudHMubGVuZ3RoID09IDIgPiAodHlwZW9mIG9wdGlvbnMpICBcclxuICAgIHZhciBvblN1Ym1pdENhbGxiYWNrID0gYXJndW1lbnRzLmxlbmd0aCA+IDIgJiYgYXJndW1lbnRzWzJdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMl0gOiBmdW5jdGlvbiAoKSB7fTsqL1xyXG5cclxuICAgIC8qIHByb3BzICovXHJcblxyXG4gICAgY29uc3QgcHJvcHMgPSB7XHJcbiAgICAgIHNob3dMYWJlbDogdHJ1ZSxcclxuICAgICAgdXBkYXRlTWVzc2FnZSxcclxuICAgICAgdXBkYXRlSW5jbHVkZXMsXHJcbiAgICAgIGlzVmFsaWQ6IGZvcm0uY2hlY2tWYWxpZGl0eS5iaW5kKGZvcm0pXHJcbiAgICB9XHJcbiAgICAvLyBPYmplY3QuYXNzaWduKHByb3BzLCBvcHRpb25zKTtcclxuICAgIGNvbnNvbGUubG9nKCdwcm9wcycsIHByb3BzKTtcclxuICAgIC8qIGZ1bmN0aW9uICovXHJcbiAgICBmdW5jdGlvbiBvblN1Ym1pdCguLi5hcmdzKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCdmb3JtIHN1Ym1pdHRlZCcpO1xyXG4gICAgICBzZXRTdGF0ZShmb3JtLCAnc3VibWl0dGVkJywgdHJ1ZSk7XHJcbiAgICAgIHZhbGlkYXRlKGZvcm0pXHJcbiAgICAgIGdldEZvcm1DaGlsZHJlbihmb3JtKS5mb3JFYWNoKHZhbGlkYXRlKVxyXG4gICAgICBvblN1Ym1pdENhbGxiYWNrLmFwcGx5KHByb3BzLCBhcmdzKVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHNldFN0YXRlKHRhcmdldCwgc3RhdGUsIHZhbHVlKSB7XHJcbiAgICAgIGNvbnN0IG5hbWUgPSB0YXJnZXQuZ2V0QXR0cmlidXRlKCduYW1lJyk7XHJcbiAgICAgIGNvbnN0IHN0YXRlc0ZvckVsZW1lbnRzID0gJCQoYFtkYXRhLXN0YXRlcy1mb3I9XCIke25hbWV9XCJdYCwgZm9ybSk7XHJcbiAgICAgIGNvbnN0IGVsZW1lbnRzID0gW3RhcmdldF0uY29uY2F0KHN0YXRlc0ZvckVsZW1lbnRzKVxyXG4gICAgICBjb25zdCBjbGFzc05hbWUgPSBgaXMtJHtzdGF0ZX1gXHJcblxyXG4gICAgICBpZih2YWx1ZSkgZWxlbWVudHMuZm9yRWFjaChlbGVtZW50ID0+IGVsZW1lbnQuY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpKVxyXG4gICAgICBlbHNlIGVsZW1lbnRzLmZvckVhY2goZWxlbWVudCA9PiBlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NOYW1lKSlcclxuICAgIH1cclxuXHJcbiAgIFxyXG4gICAgZnVuY3Rpb24gdmFsaWRhdGUgKGVsZW1lbnQpIHtcclxuICAgICAgaWYoZWxlbWVudC5jaGVja1ZhbGlkaXR5KCkpIHtcclxuICAgICAgICBlbGVtZW50LnJlbW92ZUF0dHJpYnV0ZSgnYXJpYS1pbnZhbGlkJylcclxuICAgICAgICBzZXRTdGF0ZShlbGVtZW50LCAndmFsaWQnLCB0cnVlKSAvLyBhZGQgY2xhc3MgaXMtdmFsaWRcclxuICAgICAgICBzZXRTdGF0ZShlbGVtZW50LCAnaW52YWxpZCcsIGZhbHNlKSAvLyByZW1vdmUgY2xhc3MgaXMtaW52YWxpZFxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiaW52YWxpZFwiKVxyXG4gICAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKCdhcmlhLWludmFsaWQnLCAndHJ1ZScpO1xyXG4gICAgICAgIHNldFN0YXRlKGVsZW1lbnQsICd2YWxpZCcsIGZhbHNlKSAvLyByZW1vdmUgY2xhc3MgaXMtdmFsaWRcclxuICAgICAgICBzZXRTdGF0ZShlbGVtZW50LCAnaW52YWxpZCcsIHRydWUpIC8vIGFkZCBjbGFzcyBpcy1pbnZhbGlkXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIHNob3cgJiBoaWRlIHJlbGV2YW50IG1lc3NhZ2VzXHJcbiAgICAgIHVwZGF0ZU1lc3NhZ2UoZWxlbWVudClcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiB1cGRhdGVNZXNzYWdlIChlbGVtZW50KSB7XHJcbiAgICAgIGNvbnN0IG5hbWUgPSBlbGVtZW50LmdldEF0dHJpYnV0ZSgnbmFtZScpXHJcbiAgICAgIGNvbnN0IHZhbGlkaXR5ID0gZWxlbWVudC52YWxpZGl0eSBcclxuICAgICAgLy8gY29uc3QgY3VzdG9tVmFsaWRpdHkgPSBlbGVtZW50LmN1c3RvbVZhbGlkaXR5IFxyXG4gICAgICBhZGRNZXNzYWdlRm9yVmFsaWRhdGlvbihuYW1lLCB2YWxpZGl0eSkgLy8gY2hlY2sgZm9yIGRlZmF1bHQgdmFsaWRpdHkgb2JqZWN0XHJcbiAgICAgIC8vIGFkZE1lc3NhZ2VGb3JWYWxpZGF0aW9uKG5hbWUsIGN1c3RvbVZhbGlkaXR5KSAvLyBjaGVjayBmb3IgY3VzdG9tIHZhbGlkaXR5IG9iamVjdFxyXG5cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBhZGRNZXNzYWdlRm9yVmFsaWRhdGlvbihuYW1lLCB2YWxpZGl0eU9iamVjdCkge1xyXG4gICAgICBmb3IgKCBsZXQga2V5IGluIHZhbGlkaXR5T2JqZWN0ICkge1xyXG4gICAgICAgIC8qXHJcbiAgICAgICAgICB0aGUgdmFsaWRpdHlTdGF0ZSBvYmplY3QncyBwcm9wZXRpZXMgYXJlIG5vdCBpdHMgb3duXHJcbiAgICAgICAgICBzbyB3ZSBtdXN0IG5vdCB1c2UgdGhlIC5oYXNPd25Qcm9wZXJ0eSBmaWx0ZXJcclxuXHJcbiAgICAgICAgICB0aGUgdmFsaWRpdHlTdGF0ZSBvYmplY3QgaGFzIGEgXCJ2YWxpZFwiIHByb3BlcnR5XHJcbiAgICAgICAgICB0aGF0IGlzIHRydWUgd2hlbiB0aGUgaW5wdXQgaXMgdmFsaWQgYW5kIGZhbHNlIG90aGVyd2lzZVxyXG4gICAgICAgICAgaXQncyBub3QgcmVhbGx5IGFuIGVycm9yLXJlbGF0ZWQgcHJvcGVydHkgc28gd2UgaWdub3JlIGl0XHJcbiAgICAgICAgKi9cclxuICAgICAgICBpZihrZXkgPT09ICd2YWxpZCcpIGNvbnRpbnVlXHJcblxyXG4gICAgICAgIC8qXHJcbiAgICAgICAgICB0aGUgcHJvcGVydHkgaXMgc2V0IHRvIHRydWUgd2hlbiB0aGUgY29uZGl0aW9uIGlzIG5vdCBtZXRcclxuICAgICAgICAgIGUuZyBhbiBlbXB0eSByZXF1aXJlZCBmaWVsZCBoYXMgdGhlIHZhbHVlTWlzc2luZyBwcm9wZXJ0eSBzZXQgdG8gdHJ1ZVxyXG4gICAgICAgICovXHJcbiAgICAgICAgY29uc3QgaXNWYWxpZCA9IHZhbGlkaXR5T2JqZWN0W2tleV0gPT09IGZhbHNlXHJcblxyXG4gICAgICAgIGNvbnN0IG1lc3NhZ2VzID0gJCQoYFtkYXRhLWVycm9ycy1mb3I9XCIke25hbWV9XCJdIFtkYXRhLWVycm9ycy13aGVuPVwiJHtrZXl9XCJdYCwgZm9ybSlcclxuXHJcbiAgICAgICAgbWVzc2FnZXMuZm9yRWFjaChmdW5jdGlvbiAobWVzc2FnZSkge1xyXG4gICAgICAgICAgaWYoaXNWYWxpZCkgaGlkZShtZXNzYWdlKVxyXG4gICAgICAgICAgZWxzZSBzaG93KG1lc3NhZ2UpXHJcbiAgICAgICAgfSlcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gc2hvdyhlbGVtZW50KSB7XHJcbiAgICAgIGVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICcnXHJcbiAgICAgIGVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKCdhcmlhLWhpZGRlbicpXHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gaGlkZShlbGVtZW50KSB7XHJcbiAgICAgIGVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdub25lJ1xyXG4gICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAndHJ1ZScpXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgaW5jbHVkZXNDYWNoZSA9IHt9XHJcblxyXG4gIGZ1bmN0aW9uIHVwZGF0ZUluY2x1ZGVzICgpIHtcclxuICAgICQkKCdbZGF0YS1pbmNsdWRlXScsIGZvcm0pLmZvckVhY2goZnVuY3Rpb24gKGVsZW1lbnQpIHtcclxuICAgICAgY29uc3QgaWQgPSBlbGVtZW50LmdldEF0dHJpYnV0ZSgnZGF0YS1pbmNsdWRlJylcclxuICAgICAgaWYgKGluY2x1ZGVzQ2FjaGVbaWRdID09IG51bGwpIGluY2x1ZGVzQ2FjaGVbaWRdID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpLmlubmVySFRNTFxyXG4gICAgICBlbGVtZW50LmlubmVySFRNTCA9IGluY2x1ZGVzQ2FjaGVbaWRdXHJcbiAgICB9KVxyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gYWRkTGFiZWwoZWxlbWVudCwgZm9ybSkge1xyXG4gICAgICBjb25zdCBwYXJlbnROb2RlID0gZWxlbWVudC5wYXJlbnROb2RlLFxyXG4gICAgICAgICAgICBuYW1lID0gZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ25hbWUnKTtcclxuICAgIGlmKGVsZW1lbnQudmFsdWUpIHtcclxuICAgIGlmKCQkKGBbZm9yPSR7bmFtZX1dYCwgZm9ybSkubGVuZ3RoKSByZXR1cm4gZmFsc2U7IC8vIGlmIGV4aXN0XHJcbiAgICAgICAgY29uc3QgbGFiZWxUZXh0ID0gZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ3BsYWNlaG9sZGVyJyksXHJcbiAgICAgICAgICAgICAgbGFiZWxFbGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGFiZWwnKTtcclxuICAgICAgICAgICAgICBsYWJlbEVsZW0uaW5uZXJIVE1MID0gbGFiZWxUZXh0O1xyXG4gICAgICAgICAgICAgIGxhYmVsRWxlbS5zZXRBdHRyaWJ1dGUoJ2ZvcicsIG5hbWUpXHJcbiAgICAgICAgICAgICAgLy9wcmVwZW5kIGl0XHJcbiAgICAgICAgICAgICAgcGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUobGFiZWxFbGVtLCBwYXJlbnROb2RlLmNoaWxkTm9kZXNbMF0pXHJcbiAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAkJChgW2Zvcj0ke25hbWV9XWAsIGZvcm0pWzBdLmNsYXNzTGlzdC5hZGQoJ2FuaW1hdGlvbicpXHJcbiAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgJCQoYFtmb3I9JHtuYW1lfV1gLCBmb3JtKS5sZW5ndGggPyAkJChgW2Zvcj0ke25hbWV9XWAsIGZvcm0pWzBdLnJlbW92ZSgpIDogJyc7XHJcbiAgICB9XHJcbiAgfVxyXG4gICAgLyogaW5pdCAqL1xyXG4gICAgZm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCBvblN1Ym1pdCwgZmFsc2UpO1xyXG5cclxuICAgIGZvcm0uYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgY29uc3QgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0XHJcblxyXG4gICAgICBzZXRTdGF0ZSh0YXJnZXQsICdjaGFuZ2VkJywgdHJ1ZSlcclxuICAgICAgdmFsaWRhdGUodGFyZ2V0KVxyXG4gICAgICBcclxuICAgIH0sIGZhbHNlKVxyXG4gICAgLy8gc2hvdyBsYWJlbCB0cnVlXHJcbiAgICBpZihwcm9wcy5zaG93TGFiZWwpIHtcclxuICAgICAgZ2V0Rm9ybUNoaWxkcmVuKGZvcm0pLmZvckVhY2goZnVuY3Rpb24oZWxlbWVudCkge1xyXG4gICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBmdW5jdGlvbihldmVudCkge1xyXG4gICAgICAgICAgY29uc3QgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0XHJcblxyXG4gICAgICAgICAgYWRkTGFiZWwodGFyZ2V0LCBmb3JtKVxyXG4gICAgICAgIH0sIGZhbHNlKVxyXG4gICAgICB9KVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICAkJCgnW2RhdGEtZXJyb3JzLXdoZW5dJywgZm9ybSkuZm9yRWFjaChoaWRlKVxyXG4gICAgXHJcbiAgICB1cGRhdGVJbmNsdWRlcygpXHJcbiAgICAkJCgnW2RhdGEtZXJyb3JzLXdoZW5dJywgZm9ybSkuZm9yRWFjaChoaWRlKVxyXG4gICAgcmV0dXJuIHByb3BzO1xyXG4gIH1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gRm9ybVZhbGlkYXRpb247XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vanMvdmFsaWRhdGlvbi5qcyIsIi8qXHJcblx0RGVzYzogYWRkIGN1c3RvbSB2YWxpZGF0aW9uXHJcbiovXHJcblxyXG5jb25zdCByb3V0aW5lcyA9IHtcclxuICBjaGVja0dyZWF0ZXJUaGFuOiByZXF1aXJlKCcuL3JvdXRpbmVzL2dyZWF0ZXJ0aGFuJylcclxufVxyXG5cclxuO1tIVE1MSW5wdXRFbGVtZW50XS5mb3JFYWNoKGZ1bmN0aW9uIChjb25zdHJ1Y3Rvcikge1xyXG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjb25zdHJ1Y3Rvci5wcm90b3R5cGUsICdjdXN0b21WYWxpZGl0eScsIHtcclxuXHRcdGdldCgpIHtcclxuXHRcdFx0Y29uc3QgY3VzdG9tVmFsaWRpdHkgPSB7IHZhbGlkOiB0cnVlIH1cclxuXHJcblx0XHRcdGZvcihsZXQgbmFtZSBpbiByb3V0aW5lcykge1xyXG5cdFx0XHRcdGlmKCFyb3V0aW5lcy5oYXNPd25Qcm9wZXJ0eShuYW1lKSkgY29udGludWVcclxuXHJcblx0XHRcdFx0Y3VzdG9tVmFsaWRpdHlbbmFtZV0gPSByb3V0aW5lc1tuYW1lXSh0aGlzKVxyXG5cdFx0XHRcdGlmIChjdXN0b21WYWxpZGl0eVtuYW1lXSA9PT0gdHJ1ZSkgY3VzdG9tVmFsaWRpdHkudmFsaWQgPSBmYWxzZVxyXG5cdFx0XHR9XHJcblx0XHRyZXR1cm4gY3VzdG9tVmFsaWRpdHlcclxuXHRcdH0sXHJcblx0XHRjb25maWd1cmFibGU6IHRydWVcclxuXHR9KVxyXG59KVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2pzL2FkZGN1c3RvbS12YWxpZGF0aW9uLmpzIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaW5wdXQpIHtcclxuXHRpZighaW5wdXQuaGFzQXR0cmlidXRlKCdncmVhdGVyVGhhbicpKSByZXR1cm4gZmFsc2VcclxuXHRcdGNvbnNvbGUubG9nKCdub3QgZ3JlYXRlciB0aGFuJylcclxuXHRjb25zdCB0eXBlID0gaW5wdXQuZ2V0QXR0cmlidXRlKCd0eXBlJykgfHwgaW5wdXQudGFnTmFtZS50b0xvd2VyQ2FzZSgpXHJcblxyXG5cdGlmKHR5cGUgPT09ICdjaGVja2JveCcpIHJldHVybiBpbnB1dC5jaGVja2VkICE9PSB0cnVlXHJcblx0aWYodHlwZSAhPT0gJ3JhZGlvJyAmJiB0eXBlICE9PSAncmFuZ2UnKSB7XHJcblxyXG5cdFx0Y29uc3QgdmFsdWUxID0gTnVtYmVyKGlucHV0LnZhbHVlLnJlcGxhY2UoL1xcLC9nLCAnJykpIC8vIHZhbHVlMVxyXG5cdFx0Y29uc3QgY29tcGFyZXd0aWhFbG0gPSBpbnB1dC5nZXRBdHRyaWJ1dGUoJ2dyZWF0ZXJUaGFuJylcclxuXHRcdGNvbnN0IHZhbHVlMiA9IE51bWJlcihkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBbbmFtZT1cIiR7Y29tcGFyZXd0aWhFbG19XCJdYCkudmFsdWUucmVwbGFjZSgvXFwsL2csICcnKSkgLy8gdmFsdWUyXHJcblx0XHRjb25zb2xlLmxvZygnY29tcGFyZScsIHZhbHVlMSA+IHZhbHVlMilcclxuXHJcblx0XHRyZXR1cm4gKHZhbHVlMSA8IHZhbHVlMilcclxuXHR9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vanMvcm91dGluZXMvZ3JlYXRlcnRoYW4uanMiLCIvKlxyXG5cdERlc2M6IE1DQSBBUFIgQ2FsY3VsYXRvclxyXG4qL1xyXG5cclxuaW1wb3J0IFV0aWxzIGZyb20gJy4vY29tbW9uJ1xyXG5pbXBvcnQgUkFURSBmcm9tICcuL3JhdGUnXHJcblxyXG5mdW5jdGlvbiBBUFJDYWxjdWxhdG9yKGZvcm0pIHtcclxuXHRjb25zb2xlLmxvZygnbWNhQ2FsY3VsYXRvcjExMScpXHJcblx0dmFyIGN1cnJlbnRPYmplY3QgPSB0aGlzO1xyXG5cdFxyXG5cdGZ1bmN0aW9uIGdldFZhbHVlcyhlbGVtZW50TmFtZSwgZm9ybSkge1xyXG5cdFx0cmV0dXJuIFV0aWxzLiQkKGBbbmFtZT0ke2VsZW1lbnROYW1lfV1gLCBmb3JtKVswXS52YWx1ZS5yZXBsYWNlKC9cXCwvZywgJycpO1xyXG5cdH1cclxuXHRcclxuXHRmdW5jdGlvbiBjcmVhdGVGb3JtVmFsdWVzT2JqZWN0KGZvcm0pIHtcclxuXHRcdGNvbnN0IE9iaiA9IHt9XHJcblx0XHRcdFx0VXRpbHMuZ2V0Rm9ybUNoaWxkcmVuKGZvcm0pLmZvckVhY2goZnVuY3Rpb24oZWxlbWVudCkge1xyXG5cdFx0XHRcdGNvbnN0IGVsZW1lbnROYW1lID0gZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ25hbWUnKTtcclxuXHRcdFx0XHRcdE9ialtlbGVtZW50TmFtZV0gPSBnZXRWYWx1ZXMoZWxlbWVudE5hbWUsIGZvcm0pXHJcblx0XHRcdCAgIH0pXHJcblx0XHRyZXR1cm4gT2JqO1xyXG5cdH1cclxuXHJcblx0Ly8gYXBwcm94IGRhaWx5IFBheW1lbnQgPSAoRXN0aW1hdGVkIG1vbnRobHkgY2FyZCBzYWxlcyAvIDMwKSAqIHBlcmNlbnRhZ2VfZnV0dXJlX2NhcmRfc2FsZXNcclxuXHRmdW5jdGlvbiBkYWlseVBheW1lbnQoKSB7XHJcblx0XHRjb25zdCBkYWlseVBheW1lbnRBbW91bnQgPSAodGhpcy5pbnB1dEZvcm1WYWx1ZXMucHJvamVjdGVkTUNTLzMwKSAqICh0aGlzLmlucHV0Rm9ybVZhbHVlcy5wZXJjZW50YWdlRkNTLzEwMCk7XHJcblx0XHRyZXR1cm4gZGFpbHlQYXltZW50QW1vdW50LnRvRml4ZWQoMCk7XHJcblx0fVxyXG5cdC8vIGFwcHJveC4gIyBEYXlzIHRvIFJlcGF5ID0gUGF5YmFjayBBbW91bnQgLyBEYWlseSBQYXltZW50XHJcblx0ZnVuY3Rpb24gZGF5c1RvUmVwYXkoY3VtdWxhdGl2ZVZhbHVlcykge1xyXG5cdFx0Y29uc3QgZGF5c1RvUmVwYXkgPSAodGhpcy5pbnB1dEZvcm1WYWx1ZXMucGF5YmFja0Ftb3VudCAvIGN1bXVsYXRpdmVWYWx1ZXNbXCJkYWlseVBheW1lbnRcIl0pO1xyXG5cdFx0cmV0dXJuIGFkZENvbW1hcyhkYXlzVG9SZXBheSk7XHJcblx0fVxyXG5cclxuXHQvLyBGaW5hbmNpbmcgQ29zdCA9IFBheWJhY2sgQW1vdXQgLSBBbW91bnQgQWR2YW5jZWRcclxuXHRmdW5jdGlvbiBmaW5hbmNpbmdDb3N0ICgpIHtcclxuXHRcdGNvbnN0IGZpbmFuY2luZ19jb3N0ID0gTnVtYmVyKHRoaXMuaW5wdXRGb3JtVmFsdWVzLnBheWJhY2tBbW91bnQgLSB0aGlzLmlucHV0Rm9ybVZhbHVlcy5hbW91bnRBZHZhbmNlZClcclxuXHRcdHJldHVybiBmaW5hbmNpbmdfY29zdDtcclxuXHR9XHJcblxyXG5cdC8vIEVmZmVjdGl2ZSBBUFIgPSBSQVRFKGRheXNUb1JlcGF5LCBkYWlseVBheW1lbnQsIGFkdmFuY2VBbW91bnQpICogMzY1ICogMTAwXHJcblx0ZnVuY3Rpb24gQVBSQ2FsY3VsYXRpb24oY3VtdWxhdGl2ZVZhbHVlcykge1xyXG5cdFx0Y29uc3QgZWZmZWN0aXZlX0FQUiA9IFJBVEUoY3VtdWxhdGl2ZVZhbHVlcy5kYXlzVG9SZXBheSwgLShjdW11bGF0aXZlVmFsdWVzLmRhaWx5UGF5bWVudCksIE51bWJlcih0aGlzLmlucHV0Rm9ybVZhbHVlcy5hbW91bnRBZHZhbmNlZCkpICogMzY1ICogMTAwO1xyXG5cdFx0cmV0dXJuIGVmZmVjdGl2ZV9BUFIudG9GaXhlZCgyKTtcclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIGRhaWx5SW50ZXJlc3RSYXRlKGN1bXVsYXRpdmVWYWx1ZXMpIHtcclxuXHRcdGNvbnN0IGRhaWx5SW50ZXJlc3RSYXRlQW1vdW50ID0gKGN1bXVsYXRpdmVWYWx1ZXMuQVBSQ2FsY3VsYXRpb24gLyAzNjUpO1xyXG5cdFx0cmV0dXJuIGRhaWx5SW50ZXJlc3RSYXRlQW1vdW50LnRvRml4ZWQoNClcclxuXHR9XHJcblx0Ly8gdXRpbGl0eSBmdW5jdGlvbnNcclxuXHRmdW5jdGlvbiBhZGRDb21tYXMobnVtYmVyKSB7XHJcblx0XHRcdHJldHVybiBudW1iZXIudG9GaXhlZCgwKS5yZXBsYWNlKC8oXFxkKSg/PShcXGRcXGRcXGQpKyg/IVxcZCkpL2csIFwiJDEsXCIpO1xyXG5cdFx0fVxyXG5cclxuXHQvLyBwcmludCB2YWx1ZXNcclxuXHRmdW5jdGlvbiBwcmludENhbGNWYWx1ZXMoc2VsZWN0b3IsIGNhbGN1bGF0ZWRWYWx1ZXMpIHtcclxuXHRcdGNvbnN0IG91dHB1dENvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHNlbGVjdG9yKTtcclxuXHRcdHZhciAgaHRtbFN0ciA9ICcnO1xyXG5cdFx0XHQgaHRtbFN0ciArPSBgPHRhYmxlPlxcXHJcblx0XHRcdFx0XHRcdFx0PHRyPjx0ZD4gRGFpbHkgUGF5bWVudCA8L3RkPjx0ZD4kICR7Y2FsY3VsYXRlZFZhbHVlc1snZGFpbHlQYXltZW50J119IDwvdGQ+PC90cj5cXFxyXG5cdFx0XHRcdFx0XHRcdDx0cj48dGQ+IERhaWx5IEludGVyZXN0IFJhdGUgPC90ZD48dGQ+ICR7Y2FsY3VsYXRlZFZhbHVlc1snZGFpbHlJbnRlcmVzdFJhdGUnXX0gJTwvdGQ+PC90cj5cXFxyXG5cdFx0XHRcdFx0XHRcdDx0cj48dGQ+IEFQUiA8L3RkPjx0ZD4gJHtjYWxjdWxhdGVkVmFsdWVzWydBUFJDYWxjdWxhdGlvbiddfSAlPC90ZD48L3RyPlxcXHJcblx0XHRcdFx0XHRcdFx0PHRyPjx0ZD4gUmVwYWlkIGluIGFib3V0IDwvdGQ+PHRkPiAke2NhbGN1bGF0ZWRWYWx1ZXNbJ2RheXNUb1JlcGF5J119IGRheXM8L3RkPjwvdHI+XFxcclxuXHRcdFx0XHRcdFx0XHQ8dHI+PHRkPiBUb3RhbCBGaW5hbmNpbmcgQ29zdCA8L3RkPjx0ZD4kICR7Y2FsY3VsYXRlZFZhbHVlc1snZmluYW5jaW5nQ29zdCddfSA8L3RkPjwvdHI+XFxcclxuXHRcdFx0XHRcdFx0PC90YWJsZT5gOyBcclxuXHRcdG91dHB1dENvbnRhaW5lci5pbm5lckhUTUwgPSBodG1sU3RyO1xyXG5cdH1cclxuXHQvLyBhZGQgcGVyY2VudGFnZSBzaWduIGFuZCBmaXhlZCB0byB0d28gZGVjaW1hbCBwb2ludFxyXG5cdGZ1bmN0aW9uIHRvUGVyY2VudGFnZShudW1iZXIsIGRlY2ltYWxOdW1iZXIpIHtcclxuXHRcdFx0bnVtYmVyID0gbnVtYmVyLnRvRml4ZWQoZGVjaW1hbE51bWJlcilcclxuXHRcdHJldHVybiBudW1iZXIrXCIlXCI7XHJcblx0fVxyXG5cdFxyXG5cclxuXHRyZXR1cm4ge1xyXG5cdFx0aW5wdXRGb3JtVmFsdWVzOiBjcmVhdGVGb3JtVmFsdWVzT2JqZWN0KGZvcm0pLFxyXG5cdFx0ZGFpbHlQYXltZW50OiBkYWlseVBheW1lbnQsXHJcblx0XHRkYXlzVG9SZXBheTogZGF5c1RvUmVwYXksXHJcblx0XHRmaW5hbmNpbmdDb3N0OiBmaW5hbmNpbmdDb3N0LFxyXG5cdFx0QVBSQ2FsY3VsYXRpb246IEFQUkNhbGN1bGF0aW9uLFxyXG5cdFx0ZGFpbHlJbnRlcmVzdFJhdGU6IGRhaWx5SW50ZXJlc3RSYXRlLFxyXG5cdFx0cHJpbnRDYWxjVmFsdWVzOiBwcmludENhbGNWYWx1ZXNcclxuXHR9IC8vT2JqZWN0LmFzc2lnbih0aGlzLmlucHV0VmFsdWVzLCB0aGlzLnB1YmxpY01ldGhvZHMpIDtcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBBUFJDYWxjdWxhdG9yO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2pzL21jYUNhbGN1bGF0b3IuanMiLCJjb25zdCBSQVRFID0gZnVuY3Rpb24ocGVyaW9kcywgcGF5bWVudCwgcHJlc2VudCwgZnV0dXJlLCB0eXBlLCBndWVzcykge1xyXG4gICAgZ3Vlc3MgPSAoZ3Vlc3MgPT09IHVuZGVmaW5lZCkgPyAwLjAxIDogZ3Vlc3M7XHJcbiAgICBmdXR1cmUgPSAoZnV0dXJlID09PSB1bmRlZmluZWQpID8gMCA6IGZ1dHVyZTtcclxuICAgIHR5cGUgPSAodHlwZSA9PT0gdW5kZWZpbmVkKSA/IDAgOiB0eXBlO1xyXG4gIFxyXG4gICAgLy8gU2V0IG1heGltdW0gZXBzaWxvbiBmb3IgZW5kIG9mIGl0ZXJhdGlvblxyXG4gICAgdmFyIGVwc01heCA9IDFlLTEwO1xyXG4gIFxyXG4gICAgLy8gU2V0IG1heGltdW0gbnVtYmVyIG9mIGl0ZXJhdGlvbnNcclxuICAgIHZhciBpdGVyTWF4ID0gMTA7XHJcbiAgXHJcbiAgICAvLyBJbXBsZW1lbnQgTmV3dG9uJ3MgbWV0aG9kXHJcbiAgICB2YXIgeSwgeTAsIHkxLCB4MCwgeDEgPSAwLFxyXG4gICAgICBmID0gMCxcclxuICAgICAgaSA9IDA7XHJcbiAgICB2YXIgcmF0ZSA9IGd1ZXNzO1xyXG4gICAgaWYgKE1hdGguYWJzKHJhdGUpIDwgZXBzTWF4KSB7XHJcbiAgICAgIHkgPSBwcmVzZW50ICogKDEgKyBwZXJpb2RzICogcmF0ZSkgKyBwYXltZW50ICogKDEgKyByYXRlICogdHlwZSkgKiBwZXJpb2RzICsgZnV0dXJlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgZiA9IE1hdGguZXhwKHBlcmlvZHMgKiBNYXRoLmxvZygxICsgcmF0ZSkpO1xyXG4gICAgICB5ID0gcHJlc2VudCAqIGYgKyBwYXltZW50ICogKDEgLyByYXRlICsgdHlwZSkgKiAoZiAtIDEpICsgZnV0dXJlO1xyXG4gICAgfVxyXG4gICAgeTAgPSBwcmVzZW50ICsgcGF5bWVudCAqIHBlcmlvZHMgKyBmdXR1cmU7XHJcbiAgICB5MSA9IHByZXNlbnQgKiBmICsgcGF5bWVudCAqICgxIC8gcmF0ZSArIHR5cGUpICogKGYgLSAxKSArIGZ1dHVyZTtcclxuICAgIGkgPSB4MCA9IDA7XHJcbiAgICB4MSA9IHJhdGU7XHJcbiAgICB3aGlsZSAoKE1hdGguYWJzKHkwIC0geTEpID4gZXBzTWF4KSAmJiAoaSA8IGl0ZXJNYXgpKSB7XHJcbiAgICAgIHJhdGUgPSAoeTEgKiB4MCAtIHkwICogeDEpIC8gKHkxIC0geTApO1xyXG4gICAgICB4MCA9IHgxO1xyXG4gICAgICB4MSA9IHJhdGU7XHJcbiAgICAgICAgaWYgKE1hdGguYWJzKHJhdGUpIDwgZXBzTWF4KSB7XHJcbiAgICAgICAgICB5ID0gcHJlc2VudCAqICgxICsgcGVyaW9kcyAqIHJhdGUpICsgcGF5bWVudCAqICgxICsgcmF0ZSAqIHR5cGUpICogcGVyaW9kcyArIGZ1dHVyZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgZiA9IE1hdGguZXhwKHBlcmlvZHMgKiBNYXRoLmxvZygxICsgcmF0ZSkpO1xyXG4gICAgICAgICAgeSA9IHByZXNlbnQgKiBmICsgcGF5bWVudCAqICgxIC8gcmF0ZSArIHR5cGUpICogKGYgLSAxKSArIGZ1dHVyZTtcclxuICAgICAgICB9XHJcbiAgICAgIHkwID0geTE7XHJcbiAgICAgIHkxID0geTtcclxuICAgICAgKytpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJhdGU7XHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFJBVEU7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vanMvcmF0ZS5qcyJdLCJzb3VyY2VSb290IjoiIn0=