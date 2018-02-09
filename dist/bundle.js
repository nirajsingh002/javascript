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
		//190
		if (charCode === 46) {
			// allow dot
			return true;
		}
		if (charCode > 31 && (charCode < 48 || charCode > 57)) {
			console.log('false');
			return false;
		}

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
//# sourceMappingURL=bundle.js.map