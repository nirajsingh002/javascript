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

	// check for leap year
	function isLeapYear(currentYear) {
		return currentYear % 400 === 0 || currentYear % 100 !== 0 && currentYear % 4 === 0;
	}

	return {
		$$: $$,
		getFormChildren: getFormChildren,
		sequientiallyRunFn: sequientiallyRunFn,
		isNumber: isNumber,
		addCommas: addCommas,
		isLeapYear: isLeapYear
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
    // console.log('form submitted');
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
    var customValidity = element.customValidity;
    addMessageForValidation(name, validity); // check for default validity object
    addMessageForValidation(name, customValidity); // check for custom validity object
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
		var percentage_of_sales_withheld = this.inputFormValues.percentageFCS / 100;
		var dailyPaymentAmount = this.inputFormValues.projectedMCS / 30 * percentage_of_sales_withheld;
		return dailyPaymentAmount;
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
		return effective_APR;
	}

	function dailyInterestRate(cumulativeValues) {
		var currentYear = new Date().getFullYear();
		var number_of_days = _common2.default.isLeapYear(currentYear) ? 366 : 365;
		var dailyInterestRateAmount = cumulativeValues.APRCalculation / number_of_days;
		return dailyInterestRateAmount;
	}
	// utility functions
	function addCommas(number) {
		return number.toFixed(0).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
	}

	// print values
	function printCalcValues(selector, calculatedValues) {
		var outputContainer = document.getElementById(selector);
		var daily_payment = calculatedValues['dailyPayment'].toFixed(2);
		var APRCalculation = calculatedValues['APRCalculation'].toFixed(2);
		var dailyInterestRate = calculatedValues['dailyInterestRate'].toFixed(4);
		var htmlStr = '';
		htmlStr += '<table cellspacing="10">\t\t\t\t\t\t\t<tr><td> Daily Payment </td><td>$ ' + daily_payment + ' </td></tr>\t\t\t\t\t\t\t<tr><td> Daily Interest Rate </td><td> ' + dailyInterestRate + ' %</td></tr>\t\t\t\t\t\t\t<tr><td> APR </td><td> ' + APRCalculation + ' %</td></tr>\t\t\t\t\t\t\t<tr><td> Repaid in about </td><td> ' + calculatedValues['daysToRepay'] + ' days</td></tr>\t\t\t\t\t\t\t<tr><td> Total Financing Cost </td><td>$ ' + calculatedValues['financingCost'] + ' </td></tr>\t\t\t\t\t\t</table>';
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBhZDZkNzg1MTZkM2ViM2VmZGY1MSIsIndlYnBhY2s6Ly8vLi9zcmMvanMvY29tbW9uLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcHAuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3ZhbGlkYXRpb24uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FkZGN1c3RvbS12YWxpZGF0aW9uLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9yb3V0aW5lcy9ncmVhdGVydGhhbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvbWNhQ2FsY3VsYXRvci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvcmF0ZS5qcyJdLCJuYW1lcyI6WyJVdGlscyIsIiQkIiwic2VsZWN0b3IiLCJwYXJlbnRTZWxlY3RvciIsInNsaWNlIiwiY2FsbCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJnZXRGb3JtQ2hpbGRyZW4iLCJmb3JtIiwiZmlsdGVyIiwiY2hpbGQiLCJ0eXBlIiwiZ2V0QXR0cmlidXRlIiwibm90VmFsaWRhYmxlRWxlbWVudHMiLCJpbmRleE9mIiwiY29uY2F0IiwiYWRkQ29tbWFzIiwiblN0ciIsIngiLCJzcGxpdCIsIngxIiwieDIiLCJsZW5ndGgiLCJyZ3giLCJ0ZXN0IiwicmVwbGFjZSIsInNlcXVpZW50aWFsbHlSdW5GbiIsImN1cnJlbnRPYmoiLCJjdW11bGF0aXZlVmFsdWVzIiwiYXJncyIsImZvckVhY2giLCJuYW1lIiwiaW5kZXgiLCJhcnJheSIsIk9iamVjdCIsImFzc2lnbiIsImlzTnVtYmVyIiwiZXZ0Iiwid2luZG93IiwiZXZlbnQiLCJjaGFyQ29kZSIsIndoaWNoIiwia2V5Q29kZSIsImNvbnNvbGUiLCJsb2ciLCJpc0xlYXBZZWFyIiwiY3VycmVudFllYXIiLCJtb2R1bGUiLCJleHBvcnRzIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsImNhbGxiYWNrRm4iLCJwcmV2ZW50RGVmYXVsdCIsImlzVmFsaWQiLCJBUFJjYWxjIiwiY2FsY3VsYXRlZFZhbHVlcyIsInByaW50Q2FsY1ZhbHVlcyIsImZvcm1WYWxpZGF0b25JbnN0YW5jZSIsImVsZW1lbnQiLCJhZGRFdmVudExpc3RlbmVyIiwidGFyZ2V0IiwiZWxtVmFsIiwidmFsdWUiLCJlbGVtZW50TmFtZSIsInJlcXVpcmUiLCJGb3JtVmFsaWRhdGlvbiIsIm9uU3VibWl0Q2FsbGJhY2siLCJwcm9wcyIsInNob3dMYWJlbCIsInVwZGF0ZU1lc3NhZ2UiLCJ1cGRhdGVJbmNsdWRlcyIsImNoZWNrVmFsaWRpdHkiLCJjdXN0b21DaGVja1ZhbGlkaXR5Iiwib25TdWJtaXQiLCJzZXRTdGF0ZSIsInZhbGlkYXRlIiwiYXBwbHkiLCJzdGF0ZSIsInN0YXRlc0ZvckVsZW1lbnRzIiwiZWxlbWVudHMiLCJjbGFzc05hbWUiLCJjbGFzc0xpc3QiLCJhZGQiLCJyZW1vdmUiLCJyZW1vdmVBdHRyaWJ1dGUiLCJzZXRBdHRyaWJ1dGUiLCJ2YWxpZGl0eSIsImN1c3RvbVZhbGlkaXR5IiwiYWRkTWVzc2FnZUZvclZhbGlkYXRpb24iLCJ2YWxpZGl0eU9iamVjdCIsImtleSIsIm1lc3NhZ2VzIiwibWVzc2FnZSIsImhpZGUiLCJzaG93Iiwic3R5bGUiLCJkaXNwbGF5IiwiaW5jbHVkZXNDYWNoZSIsImlkIiwiaW5uZXJIVE1MIiwiYWRkTGFiZWwiLCJwYXJlbnROb2RlIiwibGFiZWxUZXh0IiwibGFiZWxFbGVtIiwiY3JlYXRlRWxlbWVudCIsImluc2VydEJlZm9yZSIsImNoaWxkTm9kZXMiLCJyb3V0aW5lcyIsImNoZWNrR3JlYXRlclRoYW4iLCJIVE1MSW5wdXRFbGVtZW50IiwiSFRNTEZvcm1FbGVtZW50IiwiY29uc3RydWN0b3IiLCJkZWZpbmVQcm9wZXJ0eSIsInByb3RvdHlwZSIsImdldCIsInZhbGlkIiwiaGFzT3duUHJvcGVydHkiLCJjb25maWd1cmFibGUiLCJpbnB1dCIsImV2ZXJ5IiwiaGFzQXR0cmlidXRlIiwidGFnTmFtZSIsInRvTG93ZXJDYXNlIiwiY2hlY2tlZCIsInZhbHVlMSIsIk51bWJlciIsImNvbXBhcmV3dGloRWxtIiwidmFsdWUyIiwicXVlcnlTZWxlY3RvciIsIkFQUkNhbGN1bGF0b3IiLCJjdXJyZW50T2JqZWN0IiwiZ2V0VmFsdWVzIiwiY3JlYXRlRm9ybVZhbHVlc09iamVjdCIsIk9iaiIsImRhaWx5UGF5bWVudCIsInBlcmNlbnRhZ2Vfb2Zfc2FsZXNfd2l0aGhlbGQiLCJpbnB1dEZvcm1WYWx1ZXMiLCJwZXJjZW50YWdlRkNTIiwiZGFpbHlQYXltZW50QW1vdW50IiwicHJvamVjdGVkTUNTIiwiZGF5c1RvUmVwYXkiLCJwYXliYWNrQW1vdW50IiwiZmluYW5jaW5nQ29zdCIsImZpbmFuY2luZ19jb3N0IiwiYW1vdW50QWR2YW5jZWQiLCJBUFJDYWxjdWxhdGlvbiIsImVmZmVjdGl2ZV9BUFIiLCJkYWlseUludGVyZXN0UmF0ZSIsIkRhdGUiLCJnZXRGdWxsWWVhciIsIm51bWJlcl9vZl9kYXlzIiwiZGFpbHlJbnRlcmVzdFJhdGVBbW91bnQiLCJudW1iZXIiLCJ0b0ZpeGVkIiwib3V0cHV0Q29udGFpbmVyIiwiZGFpbHlfcGF5bWVudCIsImh0bWxTdHIiLCJ0b1BlcmNlbnRhZ2UiLCJkZWNpbWFsTnVtYmVyIiwiUkFURSIsInBlcmlvZHMiLCJwYXltZW50IiwicHJlc2VudCIsImZ1dHVyZSIsImd1ZXNzIiwidW5kZWZpbmVkIiwiZXBzTWF4IiwiaXRlck1heCIsInkiLCJ5MCIsInkxIiwieDAiLCJmIiwiaSIsInJhdGUiLCJNYXRoIiwiYWJzIiwiZXhwIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztBQ1ZBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FB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VWMsSUFBekIsSUFBaUNiLFdBQVcsSUFBSWEsT0FBT25LLElBQXRCLElBQThCcUosT0FBL0QsR0FBeUVHLE1BQTdFO0FBQ0QsS0FGRCxNQUVPO0FBQ0xTLFVBQUlHLEtBQUtFLEdBQUwsQ0FBU2pCLFVBQVVlLEtBQUtuSSxHQUFMLENBQVMsSUFBSWtJLElBQWIsQ0FBbkIsQ0FBSjtBQUNBTixVQUFJTixVQUFVVSxDQUFWLEdBQWNYLFdBQVcsSUFBSWEsSUFBSixHQUFXbkssSUFBdEIsS0FBK0JpSyxJQUFJLENBQW5DLENBQWQsR0FBc0RULE1BQTFEO0FBQ0Q7QUFDSE0sU0FBS0MsRUFBTDtBQUNBQSxTQUFLRixDQUFMO0FBQ0EsTUFBRUssQ0FBRjtBQUNEO0FBQ0QsU0FBT0MsSUFBUDtBQUNILENBekNEOztBQTJDQS9ILE9BQU9DLE9BQVAsR0FBaUIrRyxJQUFqQixDIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcImZvcm1WYWxpZGF0aW9uXCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcImZvcm1WYWxpZGF0aW9uXCJdID0gZmFjdG9yeSgpO1xufSkodHlwZW9mIHNlbGYgIT09ICd1bmRlZmluZWQnID8gc2VsZiA6IHRoaXMsIGZ1bmN0aW9uKCkge1xucmV0dXJuIFxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvYXNzZXRzL1wiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDEpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGFkNmQ3ODUxNmQzZWIzZWZkZjUxIiwiLypcclxuXHRkZXNjOiBjb21tb24gZnVuY3Rpb25hbGl0aWVzXHJcbiovXHJcbnZhciBVdGlscyA9IChmdW5jdGlvbiAoKSB7XHJcblxyXG5cdFx0ZnVuY3Rpb24gJCQgKHNlbGVjdG9yLCBwYXJlbnRTZWxlY3Rvcikge1xyXG5cdCAgICAgIHJldHVybiBbXS5zbGljZS5jYWxsKHBhcmVudFNlbGVjdG9yLnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpKVxyXG5cdCAgICB9XHJcblxyXG5cdCAgICBmdW5jdGlvbiBnZXRGb3JtQ2hpbGRyZW4gKGZvcm0pIHtcclxuXHQgICAgICByZXR1cm4gJCQoJ2lucHV0JywgZm9ybSlcclxuXHQgICAgICAgICAgLmZpbHRlcihmdW5jdGlvbihjaGlsZCkge1xyXG5cdCAgICAgICAgICAgIGNvbnN0IHR5cGUgPSBjaGlsZC5nZXRBdHRyaWJ1dGUoJ25hbWUnKVxyXG5cdCAgICAgICAgICAgIGNvbnN0IG5vdFZhbGlkYWJsZUVsZW1lbnRzID0gW1wiYnV0dG9uXCIsIFwic3VibWl0XCIsIFwicmVzZXRcIiwgXCJmaWxlXCJdXHJcblx0ICAgICAgICAgICAgcmV0dXJuIG5vdFZhbGlkYWJsZUVsZW1lbnRzLmluZGV4T2YodHlwZSkgPT09IC0xXHJcblx0ICAgICAgICAgIH0pXHJcblx0ICAgICAgICAgIC5jb25jYXQoJCQoJ3RleHRhcmVhLCBzZWxlY3QnLCBmb3JtKSlcclxuXHQgICAgfVxyXG5cdCAgICBcclxuXHQgICAgLypmdW5jdGlvbiBhZGRDb21tYXMobnVtYmVyKSB7XHJcblx0XHRcdHJldHVybiBudW1iZXIudG9GaXhlZCgwKS5yZXBsYWNlKC8oXFxkKSg/PShcXGRcXGRcXGQpKyg/IVxcZCkpL2csIFwiJDEsXCIpO1xyXG5cdFx0fSovXHJcblxyXG5cdFx0ZnVuY3Rpb24gYWRkQ29tbWFzKG5TdHIpIHtcclxuXHRcdFx0blN0ciArPSAnJztcclxuXHRcdFx0Y29uc3QgeCA9IG5TdHIuc3BsaXQoJy4nKTtcclxuXHRcdFx0dmFyIHgxID0geFswXTtcclxuXHRcdFx0dmFyIHgyID0geC5sZW5ndGggPiAxID8gJy4nICsgeFsxXSA6ICcnO1xyXG5cdFx0XHR2YXIgcmd4ID0gLyhcXGQrKShcXGR7M30pLztcclxuXHRcdFx0d2hpbGUgKHJneC50ZXN0KHgxKSkge1xyXG5cdFx0XHRcdHgxID0geDEucmVwbGFjZShyZ3gsICckMScgKyAnLCcgKyAnJDInKTtcclxuXHRcdFx0fSBcclxuXHRcdFx0cmV0dXJuIHgxICsgeDI7XHJcblx0XHR9XHJcblxyXG5cclxuXHRcdGZ1bmN0aW9uIHNlcXVpZW50aWFsbHlSdW5GbiguLi5hcmdzKSB7XHJcblx0XHRcdC8vIHZhciBhcmdzID0gW10uc2xpY2UuY2FsbChhcmd1bWVudHMpO1xyXG5cdFx0XHR2YXIgY3VycmVudE9iaiA9IHRoaXM7XHJcblx0XHRcdHZhciBjdW11bGF0aXZlVmFsdWVzID0ge307IFxyXG5cdFx0XHRhcmdzLmZvckVhY2goZnVuY3Rpb24obmFtZSwgaW5kZXgsIGFycmF5KSB7XHJcblx0XHRcdFx0T2JqZWN0LmFzc2lnbihjdW11bGF0aXZlVmFsdWVzLCB7W25hbWVdOiBjdXJyZW50T2JqW25hbWVdKGN1bXVsYXRpdmVWYWx1ZXMpfSlcclxuXHRcdFx0XHQvKmN1bXVsYXRpdmVWYWx1ZXNbaW5kZXhdID0ge1xyXG5cdFx0XHRcdFx0W25hbWVdOiBjdXJyZW50T2JqW25hbWVdKGN1bXVsYXRpdmVWYWx1ZXMpXHRcclxuXHRcdFx0XHR9ICovXHJcblx0XHRcdH0pXHJcblx0XHRcdHJldHVybiBjdW11bGF0aXZlVmFsdWVzO1xyXG5cdFx0fVxyXG5cdFx0Ly8gcmVzdHJpY3QgdG8gZW50ZXIgbnVtYmVyIG9ubHlcclxuXHRcdGZ1bmN0aW9uIGlzTnVtYmVyKGV2dCkge1xyXG5cdFx0XHRldnQgPSAoZXZ0KSA/IGV2dCA6IHdpbmRvdy5ldmVudDtcclxuXHRcdFx0dmFyIGNoYXJDb2RlID0gKGV2dC53aGljaCkgPyBldnQud2hpY2ggOiBldnQua2V5Q29kZTtcclxuXHRcdFx0aWYoY2hhckNvZGUgPiAzMSAmJiAoY2hhckNvZGUgPCA0OCB8fCBjaGFyQ29kZSA+IDU3KSkge1xyXG5cdFx0XHRcdGNvbnNvbGUubG9nKCdmYWxzZScpO1xyXG5cdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0fVxyXG5cdFx0XHRcdGNvbnNvbGUubG9nKCd0cnVlJyk7XHJcblx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0fSBcclxuXHJcblx0XHQvLyBjaGVjayBmb3IgbGVhcCB5ZWFyXHJcblx0XHRmdW5jdGlvbiBpc0xlYXBZZWFyKGN1cnJlbnRZZWFyKSB7XHJcblx0XHRcdHJldHVybiAoY3VycmVudFllYXIgJSA0MDAgPT09IDApIHx8IChjdXJyZW50WWVhciAlIDEwMCAhPT0gMCAmJiBjdXJyZW50WWVhciAlIDQgPT09IDApO1xyXG5cdFx0fVxyXG5cclxuXHQgICAgcmV0dXJuIHtcclxuXHQgICAgXHQkJDogJCQsXHJcblx0ICAgIFx0Z2V0Rm9ybUNoaWxkcmVuOiBnZXRGb3JtQ2hpbGRyZW4sXHJcblx0ICAgIFx0c2VxdWllbnRpYWxseVJ1bkZuOiBzZXF1aWVudGlhbGx5UnVuRm4sXHJcblx0ICAgIFx0aXNOdW1iZXI6IGlzTnVtYmVyLFxyXG5cdCAgICBcdGFkZENvbW1hczogYWRkQ29tbWFzLFxyXG5cdCAgICBcdGlzTGVhcFllYXI6IGlzTGVhcFllYXJcclxuXHQgICAgfVxyXG59KSgpXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFV0aWxzXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzL2NvbW1vbi5qcyIsIi8qXHJcblx0RGVzYzogRm9ybSB2YWxpZGF0aW9uXHJcbiovXHJcblxyXG5pbXBvcnQgVXRpbHMgZnJvbSAnLi9jb21tb24nXHJcbmltcG9ydCBGb3JtVmFsaWRhdGlvbiBmcm9tICcuL3ZhbGlkYXRpb24nO1xyXG5pbXBvcnQgQVBSQ2FsY3VsYXRvciBmcm9tICcuL21jYUNhbGN1bGF0b3InO1xyXG5cclxud2luZG93LlV0aWxzID0gVXRpbHM7XHJcblxyXG52YXIgZm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhcHJDYWxjJyk7XHJcblxyXG5mdW5jdGlvbiBjYWxsYmFja0ZuKGV2ZW50KSB7XHJcblx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0aWYodGhpcy5pc1ZhbGlkKCkpIHtcclxuXHRcdGNvbnNvbGUubG9nKCdmb3JtIHZhbGlkJylcclxuXHRcdHZhciBBUFJjYWxjID0gbmV3IEFQUkNhbGN1bGF0b3IoZm9ybSk7XHJcblx0XHRjb25zb2xlLmxvZyhBUFJjYWxjKVxyXG5cdFx0dmFyIGNhbGN1bGF0ZWRWYWx1ZXMgPSBVdGlscy5zZXF1aWVudGlhbGx5UnVuRm4uY2FsbChBUFJjYWxjLCBcImRhaWx5UGF5bWVudFwiLCBcImRheXNUb1JlcGF5XCIsIFwiZmluYW5jaW5nQ29zdFwiLCBcIkFQUkNhbGN1bGF0aW9uXCIsIFwiZGFpbHlJbnRlcmVzdFJhdGVcIik7XHJcblx0XHRjb25zb2xlLmxvZyhjYWxjdWxhdGVkVmFsdWVzKVxyXG5cdFx0QVBSY2FsYy5wcmludENhbGNWYWx1ZXMoJ3ByaW50T3V0cHV0JywgY2FsY3VsYXRlZFZhbHVlcylcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGNvbnNvbGUubG9nKCdmb3JtIGludmFsaWQnKVxyXG5cdFx0fVxyXG59XHJcblxyXG52YXIgZm9ybVZhbGlkYXRvbkluc3RhbmNlID0gRm9ybVZhbGlkYXRpb24oZm9ybSwgY2FsbGJhY2tGbik7XHJcblxyXG5cclxuVXRpbHMuZ2V0Rm9ybUNoaWxkcmVuKGZvcm0pLmZvckVhY2goZnVuY3Rpb24oZWxlbWVudCkge1xyXG4gICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgICBjb25zdCB0YXJnZXQgPSBldmVudC50YXJnZXRcclxuXHRcdGNvbnN0IGVsbVZhbCA9IHRhcmdldC52YWx1ZTtcclxuXHRcdGNvbnN0IGVsZW1lbnROYW1lID0gZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ25hbWUnKTtcclxuXHRcdFV0aWxzLiQkKGBbbmFtZT0ke2VsZW1lbnROYW1lfV1gLCBmb3JtKVswXS52YWx1ZSA9IFV0aWxzLmFkZENvbW1hcyhlbG1WYWwucmVwbGFjZSgvLC9nLCBcIlwiKSlcclxuICAgICAgfSwgZmFsc2UpXHJcbiAgICB9KVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvanMvYXBwLmpzIiwiLy8gcmVxdWlyZSgnLi9odG1sNXZhbGlkYXRpb24nKTtcclxuXHJcbmltcG9ydCBVdGlscyBmcm9tICcuL2NvbW1vbidcclxuXHJcbiAgLyogY29tbW9uIGZ1bmN0aW9uYWxpdGllcyAqL1xyXG4gIHJlcXVpcmUoJy4vYWRkY3VzdG9tLXZhbGlkYXRpb24nKTtcclxuICBcclxuICBjb25zdCAkJCA9IFV0aWxzLiQkO1xyXG4gIGNvbnN0IGdldEZvcm1DaGlsZHJlbiA9IFV0aWxzLmdldEZvcm1DaGlsZHJlbjtcclxuXHJcbiAgZnVuY3Rpb24gRm9ybVZhbGlkYXRpb24oZm9ybSwgb25TdWJtaXRDYWxsYmFjayA9IGZ1bmN0aW9uICgpIHt9KSB7XHJcblxyXG4gICAgLyp2YXIgb3B0aW9ucyA9IGFyZ3VtZW50cy5sZW5ndGggPT0gMiA+ICh0eXBlb2Ygb3B0aW9ucykgIFxyXG4gICAgdmFyIG9uU3VibWl0Q2FsbGJhY2sgPSBhcmd1bWVudHMubGVuZ3RoID4gMiAmJiBhcmd1bWVudHNbMl0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1syXSA6IGZ1bmN0aW9uICgpIHt9OyovXHJcblxyXG4gICAgLyogcHJvcHMgKi9cclxuXHJcbiAgICBjb25zdCBwcm9wcyA9IHtcclxuICAgICAgc2hvd0xhYmVsOiB0cnVlLFxyXG4gICAgICB1cGRhdGVNZXNzYWdlLFxyXG4gICAgICB1cGRhdGVJbmNsdWRlcyxcclxuICAgICAgaXNWYWxpZDogaXNWYWxpZFxyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gaXNWYWxpZCgpIHtcclxuICAgICAgcmV0dXJuICggZm9ybS5jaGVja1ZhbGlkaXR5KCkgJiYgZm9ybS5jdXN0b21DaGVja1ZhbGlkaXR5KCkgKVxyXG4gICAgfVxyXG5cclxuICAgIC8qIGZ1bmN0aW9uICovXHJcbiAgICBmdW5jdGlvbiBvblN1Ym1pdCguLi5hcmdzKSB7XHJcbiAgICAgIC8vIGNvbnNvbGUubG9nKCdmb3JtIHN1Ym1pdHRlZCcpO1xyXG4gICAgICBzZXRTdGF0ZShmb3JtLCAnc3VibWl0dGVkJywgdHJ1ZSk7XHJcbiAgICAgIHZhbGlkYXRlKGZvcm0pXHJcbiAgICAgIGdldEZvcm1DaGlsZHJlbihmb3JtKS5mb3JFYWNoKHZhbGlkYXRlKVxyXG4gICAgICBvblN1Ym1pdENhbGxiYWNrLmFwcGx5KHByb3BzLCBhcmdzKVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHNldFN0YXRlKHRhcmdldCwgc3RhdGUsIHZhbHVlKSB7XHJcbiAgICAgIGNvbnN0IG5hbWUgPSB0YXJnZXQuZ2V0QXR0cmlidXRlKCduYW1lJyk7XHJcbiAgICAgIGNvbnN0IHN0YXRlc0ZvckVsZW1lbnRzID0gJCQoYFtkYXRhLXN0YXRlcy1mb3I9XCIke25hbWV9XCJdYCwgZm9ybSk7XHJcbiAgICAgIGNvbnN0IGVsZW1lbnRzID0gW3RhcmdldF0uY29uY2F0KHN0YXRlc0ZvckVsZW1lbnRzKVxyXG4gICAgICBjb25zdCBjbGFzc05hbWUgPSBgaXMtJHtzdGF0ZX1gXHJcblxyXG4gICAgICBpZih2YWx1ZSkgZWxlbWVudHMuZm9yRWFjaChlbGVtZW50ID0+IGVsZW1lbnQuY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpKVxyXG4gICAgICBlbHNlIGVsZW1lbnRzLmZvckVhY2goZWxlbWVudCA9PiBlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NOYW1lKSlcclxuICAgIH1cclxuXHJcbiAgIFxyXG4gICAgZnVuY3Rpb24gdmFsaWRhdGUgKGVsZW1lbnQpIHtcclxuICAgICAgaWYoZWxlbWVudC5jaGVja1ZhbGlkaXR5KCkgJiYgZWxlbWVudC5jdXN0b21DaGVja1ZhbGlkaXR5KCkpIHtcclxuICAgICAgICBlbGVtZW50LnJlbW92ZUF0dHJpYnV0ZSgnYXJpYS1pbnZhbGlkJylcclxuICAgICAgICBzZXRTdGF0ZShlbGVtZW50LCAndmFsaWQnLCB0cnVlKSAvLyBhZGQgY2xhc3MgaXMtdmFsaWRcclxuICAgICAgICBzZXRTdGF0ZShlbGVtZW50LCAnaW52YWxpZCcsIGZhbHNlKSAvLyByZW1vdmUgY2xhc3MgaXMtaW52YWxpZFxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiaW52YWxpZFwiKVxyXG4gICAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKCdhcmlhLWludmFsaWQnLCAndHJ1ZScpO1xyXG4gICAgICAgIHNldFN0YXRlKGVsZW1lbnQsICd2YWxpZCcsIGZhbHNlKSAvLyByZW1vdmUgY2xhc3MgaXMtdmFsaWRcclxuICAgICAgICBzZXRTdGF0ZShlbGVtZW50LCAnaW52YWxpZCcsIHRydWUpIC8vIGFkZCBjbGFzcyBpcy1pbnZhbGlkXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIHNob3cgJiBoaWRlIHJlbGV2YW50IG1lc3NhZ2VzXHJcbiAgICAgIHVwZGF0ZU1lc3NhZ2UoZWxlbWVudClcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiB1cGRhdGVNZXNzYWdlIChlbGVtZW50KSB7XHJcbiAgICAgIGNvbnN0IG5hbWUgPSBlbGVtZW50LmdldEF0dHJpYnV0ZSgnbmFtZScpXHJcbiAgICAgIGNvbnN0IHZhbGlkaXR5ID0gZWxlbWVudC52YWxpZGl0eSBcclxuICAgICAgY29uc3QgY3VzdG9tVmFsaWRpdHkgPSBlbGVtZW50LmN1c3RvbVZhbGlkaXR5IFxyXG4gICAgICBhZGRNZXNzYWdlRm9yVmFsaWRhdGlvbihuYW1lLCB2YWxpZGl0eSkgLy8gY2hlY2sgZm9yIGRlZmF1bHQgdmFsaWRpdHkgb2JqZWN0XHJcbiAgICAgIGFkZE1lc3NhZ2VGb3JWYWxpZGF0aW9uKG5hbWUsIGN1c3RvbVZhbGlkaXR5KSAvLyBjaGVjayBmb3IgY3VzdG9tIHZhbGlkaXR5IG9iamVjdFxyXG5cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBhZGRNZXNzYWdlRm9yVmFsaWRhdGlvbihuYW1lLCB2YWxpZGl0eU9iamVjdCkge1xyXG4gICAgICBmb3IgKCBsZXQga2V5IGluIHZhbGlkaXR5T2JqZWN0ICkge1xyXG4gICAgICAgIC8qXHJcbiAgICAgICAgICB0aGUgdmFsaWRpdHlTdGF0ZSBvYmplY3QncyBwcm9wZXRpZXMgYXJlIG5vdCBpdHMgb3duXHJcbiAgICAgICAgICBzbyB3ZSBtdXN0IG5vdCB1c2UgdGhlIC5oYXNPd25Qcm9wZXJ0eSBmaWx0ZXJcclxuXHJcbiAgICAgICAgICB0aGUgdmFsaWRpdHlTdGF0ZSBvYmplY3QgaGFzIGEgXCJ2YWxpZFwiIHByb3BlcnR5XHJcbiAgICAgICAgICB0aGF0IGlzIHRydWUgd2hlbiB0aGUgaW5wdXQgaXMgdmFsaWQgYW5kIGZhbHNlIG90aGVyd2lzZVxyXG4gICAgICAgICAgaXQncyBub3QgcmVhbGx5IGFuIGVycm9yLXJlbGF0ZWQgcHJvcGVydHkgc28gd2UgaWdub3JlIGl0XHJcbiAgICAgICAgKi9cclxuICAgICAgICBpZihrZXkgPT09ICd2YWxpZCcpIGNvbnRpbnVlXHJcblxyXG4gICAgICAgIC8qXHJcbiAgICAgICAgICB0aGUgcHJvcGVydHkgaXMgc2V0IHRvIHRydWUgd2hlbiB0aGUgY29uZGl0aW9uIGlzIG5vdCBtZXRcclxuICAgICAgICAgIGUuZyBhbiBlbXB0eSByZXF1aXJlZCBmaWVsZCBoYXMgdGhlIHZhbHVlTWlzc2luZyBwcm9wZXJ0eSBzZXQgdG8gdHJ1ZVxyXG4gICAgICAgICovXHJcbiAgICAgICAgY29uc3QgaXNWYWxpZCA9IHZhbGlkaXR5T2JqZWN0W2tleV0gPT09IGZhbHNlXHJcblxyXG4gICAgICAgIGNvbnN0IG1lc3NhZ2VzID0gJCQoYFtkYXRhLWVycm9ycy1mb3I9XCIke25hbWV9XCJdIFtkYXRhLWVycm9ycy13aGVuPVwiJHtrZXl9XCJdYCwgZm9ybSlcclxuXHJcbiAgICAgICAgbWVzc2FnZXMuZm9yRWFjaChmdW5jdGlvbiAobWVzc2FnZSkge1xyXG4gICAgICAgICAgaWYoaXNWYWxpZCkgaGlkZShtZXNzYWdlKVxyXG4gICAgICAgICAgZWxzZSBzaG93KG1lc3NhZ2UpXHJcbiAgICAgICAgfSlcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gc2hvdyhlbGVtZW50KSB7XHJcbiAgICAgIGVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICcnXHJcbiAgICAgIGVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKCdhcmlhLWhpZGRlbicpXHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gaGlkZShlbGVtZW50KSB7XHJcbiAgICAgIGVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdub25lJ1xyXG4gICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAndHJ1ZScpXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgaW5jbHVkZXNDYWNoZSA9IHt9XHJcblxyXG4gIGZ1bmN0aW9uIHVwZGF0ZUluY2x1ZGVzICgpIHtcclxuICAgICQkKCdbZGF0YS1pbmNsdWRlXScsIGZvcm0pLmZvckVhY2goZnVuY3Rpb24gKGVsZW1lbnQpIHtcclxuICAgICAgY29uc3QgaWQgPSBlbGVtZW50LmdldEF0dHJpYnV0ZSgnZGF0YS1pbmNsdWRlJylcclxuICAgICAgaWYgKGluY2x1ZGVzQ2FjaGVbaWRdID09IG51bGwpIGluY2x1ZGVzQ2FjaGVbaWRdID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpLmlubmVySFRNTFxyXG4gICAgICBlbGVtZW50LmlubmVySFRNTCA9IGluY2x1ZGVzQ2FjaGVbaWRdXHJcbiAgICB9KVxyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gYWRkTGFiZWwoZWxlbWVudCwgZm9ybSkge1xyXG4gICAgICBjb25zdCBwYXJlbnROb2RlID0gZWxlbWVudC5wYXJlbnROb2RlLFxyXG4gICAgICAgICAgICBuYW1lID0gZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ25hbWUnKTtcclxuICAgIGlmKGVsZW1lbnQudmFsdWUpIHtcclxuICAgIGlmKCQkKGBbZm9yPSR7bmFtZX1dYCwgZm9ybSkubGVuZ3RoKSByZXR1cm4gZmFsc2U7IC8vIGlmIGV4aXN0XHJcbiAgICAgICAgY29uc3QgbGFiZWxUZXh0ID0gZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ3BsYWNlaG9sZGVyJyksXHJcbiAgICAgICAgICAgICAgbGFiZWxFbGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGFiZWwnKTtcclxuICAgICAgICAgICAgICBsYWJlbEVsZW0uaW5uZXJIVE1MID0gbGFiZWxUZXh0O1xyXG4gICAgICAgICAgICAgIGxhYmVsRWxlbS5zZXRBdHRyaWJ1dGUoJ2ZvcicsIG5hbWUpXHJcbiAgICAgICAgICAgICAgLy9wcmVwZW5kIGl0XHJcbiAgICAgICAgICAgICAgcGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUobGFiZWxFbGVtLCBwYXJlbnROb2RlLmNoaWxkTm9kZXNbMF0pXHJcbiAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAkJChgW2Zvcj0ke25hbWV9XWAsIGZvcm0pWzBdLmNsYXNzTGlzdC5hZGQoJ2FuaW1hdGlvbicpXHJcbiAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgJCQoYFtmb3I9JHtuYW1lfV1gLCBmb3JtKS5sZW5ndGggPyAkJChgW2Zvcj0ke25hbWV9XWAsIGZvcm0pWzBdLnJlbW92ZSgpIDogJyc7XHJcbiAgICB9XHJcbiAgfVxyXG4gICAgLyogaW5pdCAqL1xyXG4gICAgZm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCBvblN1Ym1pdCwgZmFsc2UpO1xyXG5cclxuICAgIGZvcm0uYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgY29uc3QgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0XHJcblxyXG4gICAgICBzZXRTdGF0ZSh0YXJnZXQsICdjaGFuZ2VkJywgdHJ1ZSlcclxuICAgICAgdmFsaWRhdGUodGFyZ2V0KVxyXG4gICAgICBcclxuICAgIH0sIGZhbHNlKVxyXG4gICAgLy8gc2hvdyBsYWJlbCB0cnVlXHJcbiAgICBpZihwcm9wcy5zaG93TGFiZWwpIHtcclxuICAgICAgZ2V0Rm9ybUNoaWxkcmVuKGZvcm0pLmZvckVhY2goZnVuY3Rpb24oZWxlbWVudCkge1xyXG4gICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBmdW5jdGlvbihldmVudCkge1xyXG4gICAgICAgICAgY29uc3QgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0XHJcblxyXG4gICAgICAgICAgYWRkTGFiZWwodGFyZ2V0LCBmb3JtKVxyXG4gICAgICAgIH0sIGZhbHNlKVxyXG4gICAgICB9KVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICAkJCgnW2RhdGEtZXJyb3JzLXdoZW5dJywgZm9ybSkuZm9yRWFjaChoaWRlKVxyXG4gICAgXHJcbiAgICB1cGRhdGVJbmNsdWRlcygpXHJcbiAgICAkJCgnW2RhdGEtZXJyb3JzLXdoZW5dJywgZm9ybSkuZm9yRWFjaChoaWRlKVxyXG4gICAgcmV0dXJuIHByb3BzO1xyXG4gIH1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gRm9ybVZhbGlkYXRpb247XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzL3ZhbGlkYXRpb24uanMiLCIvKlxyXG5cdERlc2M6IGFkZCBjdXN0b20gdmFsaWRhdGlvblxyXG4qL1xyXG5cclxuY29uc3Qgcm91dGluZXMgPSB7XHJcbiAgY2hlY2tHcmVhdGVyVGhhbjogcmVxdWlyZSgnLi9yb3V0aW5lcy9ncmVhdGVydGhhbicpXHJcbn1cclxuXHJcbjtbSFRNTElucHV0RWxlbWVudCwgSFRNTEZvcm1FbGVtZW50XS5mb3JFYWNoKGZ1bmN0aW9uIChjb25zdHJ1Y3Rvcikge1xyXG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjb25zdHJ1Y3Rvci5wcm90b3R5cGUsICdjdXN0b21WYWxpZGl0eScsIHtcclxuXHRcdGdldCgpIHtcclxuXHRcdFx0Y29uc3QgY3VzdG9tVmFsaWRpdHkgPSB7IHZhbGlkOiB0cnVlIH1cclxuXHJcblx0XHRcdGZvcihsZXQgbmFtZSBpbiByb3V0aW5lcykge1xyXG5cdFx0XHRcdGlmKCFyb3V0aW5lcy5oYXNPd25Qcm9wZXJ0eShuYW1lKSkgY29udGludWVcclxuXHJcblx0XHRcdFx0Y3VzdG9tVmFsaWRpdHlbbmFtZV0gPSByb3V0aW5lc1tuYW1lXSh0aGlzKVxyXG5cdFx0XHRcdGlmIChjdXN0b21WYWxpZGl0eVtuYW1lXSA9PT0gdHJ1ZSkgY3VzdG9tVmFsaWRpdHkudmFsaWQgPSBmYWxzZVxyXG5cdFx0XHR9XHJcblx0XHRyZXR1cm4gY3VzdG9tVmFsaWRpdHlcclxuXHRcdH0sXHJcblx0XHRjb25maWd1cmFibGU6IHRydWVcclxuXHR9KTtcclxuIFx0Y29uc3RydWN0b3IucHJvdG90eXBlLmN1c3RvbUNoZWNrVmFsaWRpdHkgPSBmdW5jdGlvbigpIHtcclxuXHRjb25zb2xlLmxvZygnY3VzdG9tQ2hlY2tWYWxpZGl0eScpXHJcblx0Y29uc3QgZm9ybSA9IHRoaXM7XHJcblxyXG5cdGZ1bmN0aW9uICQkICggc2VsZWN0b3IgKSB7XHJcblx0XHRyZXR1cm4gW10uc2xpY2UuY2FsbChmb3JtLnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpKVxyXG5cdH1cclxuXHJcblx0cmV0dXJuICQkKCdpbnB1dCcpXHJcblx0XHQuZmlsdGVyKChpbnB1dCkgPT4gWydidXR0b24nLCAnc3VibWl0JywgJ3Jlc2V0J10uaW5kZXhPZihpbnB1dC5nZXRBdHRyaWJ1dGUoJ3R5cGUnKSkgPT09IC0xIClcclxuXHRcdC5jb25jYXQoJCQoJ3RleHRhcmVhLCBzZWxlY3QnKSlcclxuXHRcdC5ldmVyeSgoaW5wdXQpID0+IGlucHV0LmN1c3RvbVZhbGlkaXR5LnZhbGlkID09PSB0cnVlKVxyXG5cdH1cclxufSlcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzL2FkZGN1c3RvbS12YWxpZGF0aW9uLmpzIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaW5wdXQpIHtcclxuXHRpZighaW5wdXQuaGFzQXR0cmlidXRlKCdncmVhdGVyVGhhbicpKSByZXR1cm4gZmFsc2VcclxuXHRcdGNvbnNvbGUubG9nKCdub3QgZ3JlYXRlciB0aGFuJylcclxuXHRjb25zdCB0eXBlID0gaW5wdXQuZ2V0QXR0cmlidXRlKCd0eXBlJykgfHwgaW5wdXQudGFnTmFtZS50b0xvd2VyQ2FzZSgpXHJcblxyXG5cdGlmKHR5cGUgPT09ICdjaGVja2JveCcpIHJldHVybiBpbnB1dC5jaGVja2VkICE9PSB0cnVlXHJcblx0aWYodHlwZSAhPT0gJ3JhZGlvJyAmJiB0eXBlICE9PSAncmFuZ2UnKSB7XHJcblxyXG5cdFx0Y29uc3QgdmFsdWUxID0gTnVtYmVyKGlucHV0LnZhbHVlLnJlcGxhY2UoL1xcLC9nLCAnJykpIC8vIHZhbHVlMVxyXG5cdFx0Y29uc3QgY29tcGFyZXd0aWhFbG0gPSBpbnB1dC5nZXRBdHRyaWJ1dGUoJ2dyZWF0ZXJUaGFuJylcclxuXHRcdGNvbnN0IHZhbHVlMiA9IE51bWJlcihkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBbbmFtZT1cIiR7Y29tcGFyZXd0aWhFbG19XCJdYCkudmFsdWUucmVwbGFjZSgvXFwsL2csICcnKSkgLy8gdmFsdWUyXHJcblx0XHRjb25zb2xlLmxvZygnY29tcGFyZScsIHZhbHVlMSA+IHZhbHVlMilcclxuXHJcblx0XHRyZXR1cm4gKHZhbHVlMSA8IHZhbHVlMilcclxuXHR9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzL3JvdXRpbmVzL2dyZWF0ZXJ0aGFuLmpzIiwiLypcclxuXHREZXNjOiBNQ0EgQVBSIENhbGN1bGF0b3JcclxuKi9cclxuXHJcbmltcG9ydCBVdGlscyBmcm9tICcuL2NvbW1vbidcclxuaW1wb3J0IFJBVEUgZnJvbSAnLi9yYXRlJ1xyXG5cclxuZnVuY3Rpb24gQVBSQ2FsY3VsYXRvcihmb3JtKSB7XHJcblx0Y29uc29sZS5sb2coJ21jYUNhbGN1bGF0b3IxMTEnKVxyXG5cdHZhciBjdXJyZW50T2JqZWN0ID0gdGhpcztcclxuXHRcclxuXHRmdW5jdGlvbiBnZXRWYWx1ZXMoZWxlbWVudE5hbWUsIGZvcm0pIHtcclxuXHRcdHJldHVybiBVdGlscy4kJChgW25hbWU9JHtlbGVtZW50TmFtZX1dYCwgZm9ybSlbMF0udmFsdWUucmVwbGFjZSgvXFwsL2csICcnKTtcclxuXHR9XHJcblx0XHJcblx0ZnVuY3Rpb24gY3JlYXRlRm9ybVZhbHVlc09iamVjdChmb3JtKSB7XHJcblx0XHRjb25zdCBPYmogPSB7fVxyXG5cdFx0XHRcdFV0aWxzLmdldEZvcm1DaGlsZHJlbihmb3JtKS5mb3JFYWNoKGZ1bmN0aW9uKGVsZW1lbnQpIHtcclxuXHRcdFx0XHRjb25zdCBlbGVtZW50TmFtZSA9IGVsZW1lbnQuZ2V0QXR0cmlidXRlKCduYW1lJyk7XHJcblx0XHRcdFx0XHRPYmpbZWxlbWVudE5hbWVdID0gZ2V0VmFsdWVzKGVsZW1lbnROYW1lLCBmb3JtKVxyXG5cdFx0XHQgICB9KVxyXG5cdFx0cmV0dXJuIE9iajtcclxuXHR9XHJcblxyXG5cdC8vIGFwcHJveCBkYWlseSBQYXltZW50ID0gKEVzdGltYXRlZCBtb250aGx5IGNhcmQgc2FsZXMgLyAzMCkgKiBwZXJjZW50YWdlX2Z1dHVyZV9jYXJkX3NhbGVzXHJcblx0ZnVuY3Rpb24gZGFpbHlQYXltZW50KCkge1xyXG5cdFx0Y29uc3QgcGVyY2VudGFnZV9vZl9zYWxlc193aXRoaGVsZCA9IHRoaXMuaW5wdXRGb3JtVmFsdWVzLnBlcmNlbnRhZ2VGQ1MvMTAwO1xyXG5cdFx0Y29uc3QgZGFpbHlQYXltZW50QW1vdW50ID0gKHRoaXMuaW5wdXRGb3JtVmFsdWVzLnByb2plY3RlZE1DUy8zMCkgKiBwZXJjZW50YWdlX29mX3NhbGVzX3dpdGhoZWxkO1xyXG5cdFx0cmV0dXJuIGRhaWx5UGF5bWVudEFtb3VudDtcclxuXHR9XHJcblx0Ly8gYXBwcm94LiAjIERheXMgdG8gUmVwYXkgPSBQYXliYWNrIEFtb3VudCAvIERhaWx5IFBheW1lbnRcclxuXHRmdW5jdGlvbiBkYXlzVG9SZXBheShjdW11bGF0aXZlVmFsdWVzKSB7XHJcblx0XHRjb25zdCBkYXlzVG9SZXBheSA9ICh0aGlzLmlucHV0Rm9ybVZhbHVlcy5wYXliYWNrQW1vdW50IC8gY3VtdWxhdGl2ZVZhbHVlc1tcImRhaWx5UGF5bWVudFwiXSk7XHJcblx0XHRyZXR1cm4gYWRkQ29tbWFzKGRheXNUb1JlcGF5KTtcclxuXHR9XHJcblxyXG5cdC8vIEZpbmFuY2luZyBDb3N0ID0gUGF5YmFjayBBbW91dCAtIEFtb3VudCBBZHZhbmNlZFxyXG5cdGZ1bmN0aW9uIGZpbmFuY2luZ0Nvc3QgKCkge1xyXG5cdFx0Y29uc3QgZmluYW5jaW5nX2Nvc3QgPSBOdW1iZXIodGhpcy5pbnB1dEZvcm1WYWx1ZXMucGF5YmFja0Ftb3VudCAtIHRoaXMuaW5wdXRGb3JtVmFsdWVzLmFtb3VudEFkdmFuY2VkKVxyXG5cdFx0cmV0dXJuIGZpbmFuY2luZ19jb3N0O1xyXG5cdH1cclxuXHJcblx0Ly8gRWZmZWN0aXZlIEFQUiA9IFJBVEUoZGF5c1RvUmVwYXksIGRhaWx5UGF5bWVudCwgYWR2YW5jZUFtb3VudCkgKiAzNjUgKiAxMDBcclxuXHRmdW5jdGlvbiBBUFJDYWxjdWxhdGlvbihjdW11bGF0aXZlVmFsdWVzKSB7XHJcblx0XHRjb25zdCBlZmZlY3RpdmVfQVBSID0gUkFURShjdW11bGF0aXZlVmFsdWVzLmRheXNUb1JlcGF5LCAtKGN1bXVsYXRpdmVWYWx1ZXMuZGFpbHlQYXltZW50KSwgTnVtYmVyKHRoaXMuaW5wdXRGb3JtVmFsdWVzLmFtb3VudEFkdmFuY2VkKSkgKiAzNjUgKiAxMDA7XHJcblx0XHRyZXR1cm4gZWZmZWN0aXZlX0FQUjtcclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIGRhaWx5SW50ZXJlc3RSYXRlKGN1bXVsYXRpdmVWYWx1ZXMpIHtcclxuXHRcdGNvbnN0IGN1cnJlbnRZZWFyID0gbmV3IERhdGUoKS5nZXRGdWxsWWVhcigpO1xyXG5cdFx0Y29uc3QgbnVtYmVyX29mX2RheXMgPSBVdGlscy5pc0xlYXBZZWFyKGN1cnJlbnRZZWFyKSA/IDM2NiA6IDM2NTtcclxuXHRcdGNvbnN0IGRhaWx5SW50ZXJlc3RSYXRlQW1vdW50ID0gKGN1bXVsYXRpdmVWYWx1ZXMuQVBSQ2FsY3VsYXRpb24gLyBudW1iZXJfb2ZfZGF5cyk7XHJcblx0XHRyZXR1cm4gZGFpbHlJbnRlcmVzdFJhdGVBbW91bnQ7XHJcblx0fVxyXG5cdC8vIHV0aWxpdHkgZnVuY3Rpb25zXHJcblx0ZnVuY3Rpb24gYWRkQ29tbWFzKG51bWJlcikge1xyXG5cdFx0XHRyZXR1cm4gbnVtYmVyLnRvRml4ZWQoMCkucmVwbGFjZSgvKFxcZCkoPz0oXFxkXFxkXFxkKSsoPyFcXGQpKS9nLCBcIiQxLFwiKTtcclxuXHRcdH1cclxuXHJcblx0Ly8gcHJpbnQgdmFsdWVzXHJcblx0ZnVuY3Rpb24gcHJpbnRDYWxjVmFsdWVzKHNlbGVjdG9yLCBjYWxjdWxhdGVkVmFsdWVzKSB7XHJcblx0XHRjb25zdCBvdXRwdXRDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChzZWxlY3Rvcik7XHJcblx0XHRjb25zdCBkYWlseV9wYXltZW50ID0gY2FsY3VsYXRlZFZhbHVlc1snZGFpbHlQYXltZW50J10udG9GaXhlZCgyKTtcclxuXHRcdGNvbnN0IEFQUkNhbGN1bGF0aW9uID0gY2FsY3VsYXRlZFZhbHVlc1snQVBSQ2FsY3VsYXRpb24nXS50b0ZpeGVkKDIpO1xyXG5cdFx0Y29uc3QgZGFpbHlJbnRlcmVzdFJhdGUgPSBjYWxjdWxhdGVkVmFsdWVzWydkYWlseUludGVyZXN0UmF0ZSddLnRvRml4ZWQoNCk7XHJcblx0XHR2YXIgIGh0bWxTdHIgPSAnJztcclxuXHRcdFx0IGh0bWxTdHIgKz0gYDx0YWJsZSBjZWxsc3BhY2luZz1cIjEwXCI+XFxcclxuXHRcdFx0XHRcdFx0XHQ8dHI+PHRkPiBEYWlseSBQYXltZW50IDwvdGQ+PHRkPiQgJHtkYWlseV9wYXltZW50fSA8L3RkPjwvdHI+XFxcclxuXHRcdFx0XHRcdFx0XHQ8dHI+PHRkPiBEYWlseSBJbnRlcmVzdCBSYXRlIDwvdGQ+PHRkPiAke2RhaWx5SW50ZXJlc3RSYXRlfSAlPC90ZD48L3RyPlxcXHJcblx0XHRcdFx0XHRcdFx0PHRyPjx0ZD4gQVBSIDwvdGQ+PHRkPiAke0FQUkNhbGN1bGF0aW9ufSAlPC90ZD48L3RyPlxcXHJcblx0XHRcdFx0XHRcdFx0PHRyPjx0ZD4gUmVwYWlkIGluIGFib3V0IDwvdGQ+PHRkPiAke2NhbGN1bGF0ZWRWYWx1ZXNbJ2RheXNUb1JlcGF5J119IGRheXM8L3RkPjwvdHI+XFxcclxuXHRcdFx0XHRcdFx0XHQ8dHI+PHRkPiBUb3RhbCBGaW5hbmNpbmcgQ29zdCA8L3RkPjx0ZD4kICR7Y2FsY3VsYXRlZFZhbHVlc1snZmluYW5jaW5nQ29zdCddfSA8L3RkPjwvdHI+XFxcclxuXHRcdFx0XHRcdFx0PC90YWJsZT5gOyBcclxuXHRcdG91dHB1dENvbnRhaW5lci5pbm5lckhUTUwgPSBodG1sU3RyO1xyXG5cdH1cclxuXHQvLyBhZGQgcGVyY2VudGFnZSBzaWduIGFuZCBmaXhlZCB0byB0d28gZGVjaW1hbCBwb2ludFxyXG5cdGZ1bmN0aW9uIHRvUGVyY2VudGFnZShudW1iZXIsIGRlY2ltYWxOdW1iZXIpIHtcclxuXHRcdFx0bnVtYmVyID0gbnVtYmVyLnRvRml4ZWQoZGVjaW1hbE51bWJlcilcclxuXHRcdHJldHVybiBudW1iZXIrXCIlXCI7XHJcblx0fVxyXG5cdFxyXG5cclxuXHRyZXR1cm4ge1xyXG5cdFx0aW5wdXRGb3JtVmFsdWVzOiBjcmVhdGVGb3JtVmFsdWVzT2JqZWN0KGZvcm0pLFxyXG5cdFx0ZGFpbHlQYXltZW50OiBkYWlseVBheW1lbnQsXHJcblx0XHRkYXlzVG9SZXBheTogZGF5c1RvUmVwYXksXHJcblx0XHRmaW5hbmNpbmdDb3N0OiBmaW5hbmNpbmdDb3N0LFxyXG5cdFx0QVBSQ2FsY3VsYXRpb246IEFQUkNhbGN1bGF0aW9uLFxyXG5cdFx0ZGFpbHlJbnRlcmVzdFJhdGU6IGRhaWx5SW50ZXJlc3RSYXRlLFxyXG5cdFx0cHJpbnRDYWxjVmFsdWVzOiBwcmludENhbGNWYWx1ZXNcclxuXHR9IC8vT2JqZWN0LmFzc2lnbih0aGlzLmlucHV0VmFsdWVzLCB0aGlzLnB1YmxpY01ldGhvZHMpIDtcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBBUFJDYWxjdWxhdG9yO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9qcy9tY2FDYWxjdWxhdG9yLmpzIiwiY29uc3QgUkFURSA9IGZ1bmN0aW9uKHBlcmlvZHMsIHBheW1lbnQsIHByZXNlbnQsIGZ1dHVyZSwgdHlwZSwgZ3Vlc3MpIHtcclxuICAgIGd1ZXNzID0gKGd1ZXNzID09PSB1bmRlZmluZWQpID8gMC4wMSA6IGd1ZXNzO1xyXG4gICAgZnV0dXJlID0gKGZ1dHVyZSA9PT0gdW5kZWZpbmVkKSA/IDAgOiBmdXR1cmU7XHJcbiAgICB0eXBlID0gKHR5cGUgPT09IHVuZGVmaW5lZCkgPyAwIDogdHlwZTtcclxuICBcclxuICAgIC8vIFNldCBtYXhpbXVtIGVwc2lsb24gZm9yIGVuZCBvZiBpdGVyYXRpb25cclxuICAgIHZhciBlcHNNYXggPSAxZS0xMDtcclxuICBcclxuICAgIC8vIFNldCBtYXhpbXVtIG51bWJlciBvZiBpdGVyYXRpb25zXHJcbiAgICB2YXIgaXRlck1heCA9IDEwO1xyXG4gIFxyXG4gICAgLy8gSW1wbGVtZW50IE5ld3RvbidzIG1ldGhvZFxyXG4gICAgdmFyIHksIHkwLCB5MSwgeDAsIHgxID0gMCxcclxuICAgICAgZiA9IDAsXHJcbiAgICAgIGkgPSAwO1xyXG4gICAgdmFyIHJhdGUgPSBndWVzcztcclxuICAgIGlmIChNYXRoLmFicyhyYXRlKSA8IGVwc01heCkge1xyXG4gICAgICB5ID0gcHJlc2VudCAqICgxICsgcGVyaW9kcyAqIHJhdGUpICsgcGF5bWVudCAqICgxICsgcmF0ZSAqIHR5cGUpICogcGVyaW9kcyArIGZ1dHVyZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGYgPSBNYXRoLmV4cChwZXJpb2RzICogTWF0aC5sb2coMSArIHJhdGUpKTtcclxuICAgICAgeSA9IHByZXNlbnQgKiBmICsgcGF5bWVudCAqICgxIC8gcmF0ZSArIHR5cGUpICogKGYgLSAxKSArIGZ1dHVyZTtcclxuICAgIH1cclxuICAgIHkwID0gcHJlc2VudCArIHBheW1lbnQgKiBwZXJpb2RzICsgZnV0dXJlO1xyXG4gICAgeTEgPSBwcmVzZW50ICogZiArIHBheW1lbnQgKiAoMSAvIHJhdGUgKyB0eXBlKSAqIChmIC0gMSkgKyBmdXR1cmU7XHJcbiAgICBpID0geDAgPSAwO1xyXG4gICAgeDEgPSByYXRlO1xyXG4gICAgd2hpbGUgKChNYXRoLmFicyh5MCAtIHkxKSA+IGVwc01heCkgJiYgKGkgPCBpdGVyTWF4KSkge1xyXG4gICAgICByYXRlID0gKHkxICogeDAgLSB5MCAqIHgxKSAvICh5MSAtIHkwKTtcclxuICAgICAgeDAgPSB4MTtcclxuICAgICAgeDEgPSByYXRlO1xyXG4gICAgICAgIGlmIChNYXRoLmFicyhyYXRlKSA8IGVwc01heCkge1xyXG4gICAgICAgICAgeSA9IHByZXNlbnQgKiAoMSArIHBlcmlvZHMgKiByYXRlKSArIHBheW1lbnQgKiAoMSArIHJhdGUgKiB0eXBlKSAqIHBlcmlvZHMgKyBmdXR1cmU7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGYgPSBNYXRoLmV4cChwZXJpb2RzICogTWF0aC5sb2coMSArIHJhdGUpKTtcclxuICAgICAgICAgIHkgPSBwcmVzZW50ICogZiArIHBheW1lbnQgKiAoMSAvIHJhdGUgKyB0eXBlKSAqIChmIC0gMSkgKyBmdXR1cmU7XHJcbiAgICAgICAgfVxyXG4gICAgICB5MCA9IHkxO1xyXG4gICAgICB5MSA9IHk7XHJcbiAgICAgICsraTtcclxuICAgIH1cclxuICAgIHJldHVybiByYXRlO1xyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBSQVRFO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9qcy9yYXRlLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==