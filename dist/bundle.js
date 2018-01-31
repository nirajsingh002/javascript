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
	desc: common finctionalities
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

	function addCommas(number) {
		return number.toFixed(0).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
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
	return {
		$$: $$,
		getFormChildren: getFormChildren,
		sequientiallyRunFn: sequientiallyRunFn
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

var form = document.getElementById('aprCalc'); /*
                                               	Desc: Form validation
                                               */

function callbackFn(event) {
		event.preventDefault();
		if (this.isValid()) {
				var APRcalc = new _mcaCalculator2.default(form);
				console.log(APRcalc);
				var calculatedValues = _common2.default.sequientiallyRunFn.call(APRcalc, "dailyPayment", "daysToRepay", "financingCost", "APRCalculation", "dailyInterestRate");
				console.log(calculatedValues);
		}
}

var formValidatonInstance = (0, _validation2.default)(form, callbackFn);

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


  /* props */

  var props = {
    updateMessage: updateMessage,
    updateIncludes: updateIncludes,
    isValid: form.checkValidity.bind(form)

    /* function */
  };function onSubmit() {
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

  getFormChildren(form).forEach(function (element) {
    element.addEventListener('keyup', function (event) {
      var target = event.target;
      addLabel(target, form);
    }, false);
  });

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

		var value1 = Number(input.value); // value1
		var comparewtihElm = input.getAttribute('greaterThan');
		var value2 = Number(document.querySelector('[name="' + comparewtihElm + '"]').value); // value2
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
		return _common2.default.$$('[name=' + elementName + ']', form)[0].value;
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
		dailyInterestRate: dailyInterestRate //Object.assign(this.inputValues, this.publicMethods) ;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBmYTE3MjhmOWIxMzAzZTE5MGY0ZSIsIndlYnBhY2s6Ly8vLi9qcy9jb21tb24uanMiLCJ3ZWJwYWNrOi8vLy4vanMvYXBwLmpzIiwid2VicGFjazovLy8uL2pzL3ZhbGlkYXRpb24uanMiLCJ3ZWJwYWNrOi8vLy4vanMvYWRkY3VzdG9tLXZhbGlkYXRpb24uanMiLCJ3ZWJwYWNrOi8vLy4vanMvcm91dGluZXMvZ3JlYXRlcnRoYW4uanMiLCJ3ZWJwYWNrOi8vLy4vanMvbWNhQ2FsY3VsYXRvci5qcyIsIndlYnBhY2s6Ly8vLi9qcy9yYXRlLmpzIl0sIm5hbWVzIjpbIlV0aWxzIiwiJCQiLCJzZWxlY3RvciIsInBhcmVudFNlbGVjdG9yIiwic2xpY2UiLCJjYWxsIiwicXVlcnlTZWxlY3RvckFsbCIsImdldEZvcm1DaGlsZHJlbiIsImZvcm0iLCJmaWx0ZXIiLCJjaGlsZCIsInR5cGUiLCJnZXRBdHRyaWJ1dGUiLCJub3RWYWxpZGFibGVFbGVtZW50cyIsImluZGV4T2YiLCJjb25jYXQiLCJhZGRDb21tYXMiLCJudW1iZXIiLCJ0b0ZpeGVkIiwicmVwbGFjZSIsInNlcXVpZW50aWFsbHlSdW5GbiIsImN1cnJlbnRPYmoiLCJjdW11bGF0aXZlVmFsdWVzIiwiYXJncyIsImZvckVhY2giLCJuYW1lIiwiaW5kZXgiLCJhcnJheSIsIk9iamVjdCIsImFzc2lnbiIsIm1vZHVsZSIsImV4cG9ydHMiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiY2FsbGJhY2tGbiIsImV2ZW50IiwicHJldmVudERlZmF1bHQiLCJpc1ZhbGlkIiwiQVBSY2FsYyIsImNvbnNvbGUiLCJsb2ciLCJjYWxjdWxhdGVkVmFsdWVzIiwiZm9ybVZhbGlkYXRvbkluc3RhbmNlIiwicmVxdWlyZSIsIkZvcm1WYWxpZGF0aW9uIiwib25TdWJtaXRDYWxsYmFjayIsInByb3BzIiwidXBkYXRlTWVzc2FnZSIsInVwZGF0ZUluY2x1ZGVzIiwiY2hlY2tWYWxpZGl0eSIsImJpbmQiLCJvblN1Ym1pdCIsInNldFN0YXRlIiwidmFsaWRhdGUiLCJhcHBseSIsInRhcmdldCIsInN0YXRlIiwidmFsdWUiLCJzdGF0ZXNGb3JFbGVtZW50cyIsImVsZW1lbnRzIiwiY2xhc3NOYW1lIiwiZWxlbWVudCIsImNsYXNzTGlzdCIsImFkZCIsInJlbW92ZSIsInJlbW92ZUF0dHJpYnV0ZSIsInNldEF0dHJpYnV0ZSIsInZhbGlkaXR5IiwiY3VzdG9tVmFsaWRpdHkiLCJhZGRNZXNzYWdlRm9yVmFsaWRhdGlvbiIsInZhbGlkaXR5T2JqZWN0Iiwia2V5IiwibWVzc2FnZXMiLCJtZXNzYWdlIiwiaGlkZSIsInNob3ciLCJzdHlsZSIsImRpc3BsYXkiLCJpbmNsdWRlc0NhY2hlIiwiaWQiLCJpbm5lckhUTUwiLCJhZGRMYWJlbCIsInBhcmVudE5vZGUiLCJsZW5ndGgiLCJsYWJlbFRleHQiLCJsYWJlbEVsZW0iLCJjcmVhdGVFbGVtZW50IiwiaW5zZXJ0QmVmb3JlIiwiY2hpbGROb2RlcyIsImFkZEV2ZW50TGlzdGVuZXIiLCJyb3V0aW5lcyIsImNoZWNrR3JlYXRlclRoYW4iLCJIVE1MSW5wdXRFbGVtZW50IiwiY29uc3RydWN0b3IiLCJkZWZpbmVQcm9wZXJ0eSIsInByb3RvdHlwZSIsImdldCIsInZhbGlkIiwiaGFzT3duUHJvcGVydHkiLCJjb25maWd1cmFibGUiLCJpbnB1dCIsImhhc0F0dHJpYnV0ZSIsInRhZ05hbWUiLCJ0b0xvd2VyQ2FzZSIsImNoZWNrZWQiLCJ2YWx1ZTEiLCJOdW1iZXIiLCJjb21wYXJld3RpaEVsbSIsInZhbHVlMiIsInF1ZXJ5U2VsZWN0b3IiLCJBUFJDYWxjdWxhdG9yIiwiY3VycmVudE9iamVjdCIsImdldFZhbHVlcyIsImVsZW1lbnROYW1lIiwiY3JlYXRlRm9ybVZhbHVlc09iamVjdCIsIk9iaiIsImRhaWx5UGF5bWVudCIsImRhaWx5UGF5bWVudEFtb3VudCIsImlucHV0Rm9ybVZhbHVlcyIsInByb2plY3RlZE1DUyIsInBlcmNlbnRhZ2VGQ1MiLCJkYXlzVG9SZXBheSIsInBheWJhY2tBbW91bnQiLCJmaW5hbmNpbmdDb3N0IiwiZmluYW5jaW5nX2Nvc3QiLCJhbW91bnRBZHZhbmNlZCIsIkFQUkNhbGN1bGF0aW9uIiwiZWZmZWN0aXZlX0FQUiIsImRhaWx5SW50ZXJlc3RSYXRlIiwiZGFpbHlJbnRlcmVzdFJhdGVBbW91bnQiLCJ0b1BlcmNlbnRhZ2UiLCJkZWNpbWFsTnVtYmVyIiwiUkFURSIsInBlcmlvZHMiLCJwYXltZW50IiwicHJlc2VudCIsImZ1dHVyZSIsImd1ZXNzIiwidW5kZWZpbmVkIiwiZXBzTWF4IiwiaXRlck1heCIsInkiLCJ5MCIsInkxIiwieDAiLCJ4MSIsImYiLCJpIiwicmF0ZSIsIk1hdGgiLCJhYnMiLCJleHAiXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO0FDVkE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7OztBQzdEQTs7O0FBR0EsSUFBSUEsUUFBUyxZQUFZOztBQUV2QixVQUFTQyxFQUFULENBQWFDLFFBQWIsRUFBdUJDLGNBQXZCLEVBQXVDO0FBQ2xDLFNBQU8sR0FBR0MsS0FBSCxDQUFTQyxJQUFU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QUtGLENBQUw7QUFDQSxNQUFFTSxDQUFGO0FBQ0Q7QUFDRCxTQUFPQyxJQUFQO0FBQ0gsQ0F6Q0Q7O0FBMkNBdEgsT0FBT0MsT0FBUCxHQUFpQnFHLElBQWpCLEMiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiZm9ybVZhbGlkYXRpb25cIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wiZm9ybVZhbGlkYXRpb25cIl0gPSBmYWN0b3J5KCk7XG59KSh0eXBlb2Ygc2VsZiAhPT0gJ3VuZGVmaW5lZCcgPyBzZWxmIDogdGhpcywgZnVuY3Rpb24oKSB7XG5yZXR1cm4gXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9hc3NldHMvXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgZmExNzI4ZjliMTMwM2UxOTBmNGUiLCIvKlxyXG5cdGRlc2M6IGNvbW1vbiBmaW5jdGlvbmFsaXRpZXNcclxuKi9cclxudmFyIFV0aWxzID0gKGZ1bmN0aW9uICgpIHtcclxuXHJcblx0XHRmdW5jdGlvbiAkJCAoc2VsZWN0b3IsIHBhcmVudFNlbGVjdG9yKSB7XHJcblx0ICAgICAgcmV0dXJuIFtdLnNsaWNlLmNhbGwocGFyZW50U2VsZWN0b3IucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvcikpXHJcblx0ICAgIH1cclxuXHJcblx0ICAgIGZ1bmN0aW9uIGdldEZvcm1DaGlsZHJlbiAoZm9ybSkge1xyXG5cdCAgICAgIHJldHVybiAkJCgnaW5wdXQnLCBmb3JtKVxyXG5cdCAgICAgICAgICAuZmlsdGVyKGZ1bmN0aW9uKGNoaWxkKSB7XHJcblx0ICAgICAgICAgICAgY29uc3QgdHlwZSA9IGNoaWxkLmdldEF0dHJpYnV0ZSgnbmFtZScpXHJcblx0ICAgICAgICAgICAgY29uc3Qgbm90VmFsaWRhYmxlRWxlbWVudHMgPSBbXCJidXR0b25cIiwgXCJzdWJtaXRcIiwgXCJyZXNldFwiLCBcImZpbGVcIl1cclxuXHQgICAgICAgICAgICByZXR1cm4gbm90VmFsaWRhYmxlRWxlbWVudHMuaW5kZXhPZih0eXBlKSA9PT0gLTFcclxuXHQgICAgICAgICAgfSlcclxuXHQgICAgICAgICAgLmNvbmNhdCgkJCgndGV4dGFyZWEsIHNlbGVjdCcsIGZvcm0pKVxyXG5cdCAgICB9XHJcblx0ICAgIFxyXG5cdCAgICBmdW5jdGlvbiBhZGRDb21tYXMobnVtYmVyKSB7XHJcblx0XHRcdHJldHVybiBudW1iZXIudG9GaXhlZCgwKS5yZXBsYWNlKC8oXFxkKSg/PShcXGRcXGRcXGQpKyg/IVxcZCkpL2csIFwiJDEsXCIpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGZ1bmN0aW9uIHNlcXVpZW50aWFsbHlSdW5GbiguLi5hcmdzKSB7XHJcblx0XHRcdC8vIHZhciBhcmdzID0gW10uc2xpY2UuY2FsbChhcmd1bWVudHMpO1xyXG5cdFx0XHR2YXIgY3VycmVudE9iaiA9IHRoaXM7XHJcblx0XHRcdHZhciBjdW11bGF0aXZlVmFsdWVzID0ge307IFxyXG5cdFx0XHRhcmdzLmZvckVhY2goZnVuY3Rpb24obmFtZSwgaW5kZXgsIGFycmF5KSB7XHJcblx0XHRcdFx0T2JqZWN0LmFzc2lnbihjdW11bGF0aXZlVmFsdWVzLCB7W25hbWVdOiBjdXJyZW50T2JqW25hbWVdKGN1bXVsYXRpdmVWYWx1ZXMpfSlcclxuXHRcdFx0XHQvKmN1bXVsYXRpdmVWYWx1ZXNbaW5kZXhdID0ge1xyXG5cdFx0XHRcdFx0W25hbWVdOiBjdXJyZW50T2JqW25hbWVdKGN1bXVsYXRpdmVWYWx1ZXMpXHRcclxuXHRcdFx0XHR9ICovXHJcblx0XHRcdH0pXHJcblx0XHRcdHJldHVybiBjdW11bGF0aXZlVmFsdWVzO1xyXG5cdFx0fVxyXG5cdCAgICByZXR1cm4ge1xyXG5cdCAgICBcdCQkOiAkJCxcclxuXHQgICAgXHRnZXRGb3JtQ2hpbGRyZW46IGdldEZvcm1DaGlsZHJlbixcclxuXHQgICAgXHRzZXF1aWVudGlhbGx5UnVuRm46IHNlcXVpZW50aWFsbHlSdW5GblxyXG5cdCAgICB9XHJcbn0pKClcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gVXRpbHNcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9qcy9jb21tb24uanMiLCIvKlxyXG5cdERlc2M6IEZvcm0gdmFsaWRhdGlvblxyXG4qL1xyXG5cclxuaW1wb3J0IFV0aWxzIGZyb20gJy4vY29tbW9uJ1xyXG5pbXBvcnQgRm9ybVZhbGlkYXRpb24gZnJvbSAnLi92YWxpZGF0aW9uJztcclxuaW1wb3J0IEFQUkNhbGN1bGF0b3IgZnJvbSAnLi9tY2FDYWxjdWxhdG9yJztcclxuXHJcblxyXG5cclxudmFyIGZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYXByQ2FsYycpO1xyXG5cclxuZnVuY3Rpb24gY2FsbGJhY2tGbihldmVudCkge1xyXG5cdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHRcdGlmKHRoaXMuaXNWYWxpZCgpKSB7XHJcblx0XHR2YXIgQVBSY2FsYyA9IG5ldyBBUFJDYWxjdWxhdG9yKGZvcm0pO1xyXG5cdFx0Y29uc29sZS5sb2coQVBSY2FsYylcclxuXHRcdHZhciBjYWxjdWxhdGVkVmFsdWVzID0gVXRpbHMuc2VxdWllbnRpYWxseVJ1bkZuLmNhbGwoQVBSY2FsYywgXCJkYWlseVBheW1lbnRcIiwgXCJkYXlzVG9SZXBheVwiLCBcImZpbmFuY2luZ0Nvc3RcIiwgXCJBUFJDYWxjdWxhdGlvblwiLCBcImRhaWx5SW50ZXJlc3RSYXRlXCIpO1xyXG5cdFx0Y29uc29sZS5sb2coY2FsY3VsYXRlZFZhbHVlcylcclxuXHRcdFxyXG5cdFx0fVxyXG59XHJcblxyXG52YXIgZm9ybVZhbGlkYXRvbkluc3RhbmNlID0gRm9ybVZhbGlkYXRpb24oZm9ybSwgY2FsbGJhY2tGbik7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2pzL2FwcC5qcyIsIi8vIHJlcXVpcmUoJy4vaHRtbDV2YWxpZGF0aW9uJyk7XHJcblxyXG5pbXBvcnQgVXRpbHMgZnJvbSAnLi9jb21tb24nXHJcblxyXG4gIC8qIGNvbW1vbiBmdW5jdGlvbmFsaXRpZXMgKi9cclxuICByZXF1aXJlKCcuL2FkZGN1c3RvbS12YWxpZGF0aW9uJyk7XHJcbiAgXHJcbiAgY29uc3QgJCQgPSBVdGlscy4kJDtcclxuICBjb25zdCBnZXRGb3JtQ2hpbGRyZW4gPSBVdGlscy5nZXRGb3JtQ2hpbGRyZW47XHJcblxyXG4gIGZ1bmN0aW9uIEZvcm1WYWxpZGF0aW9uKGZvcm0sIG9uU3VibWl0Q2FsbGJhY2sgPSBmdW5jdGlvbiAoKSB7fSkge1xyXG5cclxuICAgIC8qIHByb3BzICovXHJcblxyXG4gICAgY29uc3QgcHJvcHMgPSB7XHJcbiAgICAgIHVwZGF0ZU1lc3NhZ2UsXHJcbiAgICAgIHVwZGF0ZUluY2x1ZGVzLFxyXG4gICAgICBpc1ZhbGlkOiBmb3JtLmNoZWNrVmFsaWRpdHkuYmluZChmb3JtKVxyXG4gICAgfVxyXG5cclxuICAgIC8qIGZ1bmN0aW9uICovXHJcbiAgICBmdW5jdGlvbiBvblN1Ym1pdCguLi5hcmdzKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCdmb3JtIHN1Ym1pdHRlZCcpO1xyXG4gICAgICBzZXRTdGF0ZShmb3JtLCAnc3VibWl0dGVkJywgdHJ1ZSk7XHJcbiAgICAgIHZhbGlkYXRlKGZvcm0pXHJcbiAgICAgIGdldEZvcm1DaGlsZHJlbihmb3JtKS5mb3JFYWNoKHZhbGlkYXRlKVxyXG4gICAgICBvblN1Ym1pdENhbGxiYWNrLmFwcGx5KHByb3BzLCBhcmdzKVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHNldFN0YXRlKHRhcmdldCwgc3RhdGUsIHZhbHVlKSB7XHJcbiAgICAgIGNvbnN0IG5hbWUgPSB0YXJnZXQuZ2V0QXR0cmlidXRlKCduYW1lJyk7XHJcbiAgICAgIGNvbnN0IHN0YXRlc0ZvckVsZW1lbnRzID0gJCQoYFtkYXRhLXN0YXRlcy1mb3I9XCIke25hbWV9XCJdYCwgZm9ybSk7XHJcbiAgICAgIGNvbnN0IGVsZW1lbnRzID0gW3RhcmdldF0uY29uY2F0KHN0YXRlc0ZvckVsZW1lbnRzKVxyXG4gICAgICBjb25zdCBjbGFzc05hbWUgPSBgaXMtJHtzdGF0ZX1gXHJcblxyXG4gICAgICBpZih2YWx1ZSkgZWxlbWVudHMuZm9yRWFjaChlbGVtZW50ID0+IGVsZW1lbnQuY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpKVxyXG4gICAgICBlbHNlIGVsZW1lbnRzLmZvckVhY2goZWxlbWVudCA9PiBlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NOYW1lKSlcclxuICAgIH1cclxuXHJcbiAgIFxyXG4gICAgZnVuY3Rpb24gdmFsaWRhdGUgKGVsZW1lbnQpIHtcclxuICAgICAgaWYoZWxlbWVudC5jaGVja1ZhbGlkaXR5KCkpIHtcclxuICAgICAgICBlbGVtZW50LnJlbW92ZUF0dHJpYnV0ZSgnYXJpYS1pbnZhbGlkJylcclxuICAgICAgICBzZXRTdGF0ZShlbGVtZW50LCAndmFsaWQnLCB0cnVlKSAvLyBhZGQgY2xhc3MgaXMtdmFsaWRcclxuICAgICAgICBzZXRTdGF0ZShlbGVtZW50LCAnaW52YWxpZCcsIGZhbHNlKSAvLyByZW1vdmUgY2xhc3MgaXMtaW52YWxpZFxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiaW52YWxpZFwiKVxyXG4gICAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKCdhcmlhLWludmFsaWQnLCAndHJ1ZScpO1xyXG4gICAgICAgIHNldFN0YXRlKGVsZW1lbnQsICd2YWxpZCcsIGZhbHNlKSAvLyByZW1vdmUgY2xhc3MgaXMtdmFsaWRcclxuICAgICAgICBzZXRTdGF0ZShlbGVtZW50LCAnaW52YWxpZCcsIHRydWUpIC8vIGFkZCBjbGFzcyBpcy1pbnZhbGlkXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIHNob3cgJiBoaWRlIHJlbGV2YW50IG1lc3NhZ2VzXHJcbiAgICAgIHVwZGF0ZU1lc3NhZ2UoZWxlbWVudClcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiB1cGRhdGVNZXNzYWdlIChlbGVtZW50KSB7XHJcbiAgICAgIGNvbnN0IG5hbWUgPSBlbGVtZW50LmdldEF0dHJpYnV0ZSgnbmFtZScpXHJcbiAgICAgIGNvbnN0IHZhbGlkaXR5ID0gZWxlbWVudC52YWxpZGl0eSBcclxuICAgICAgY29uc3QgY3VzdG9tVmFsaWRpdHkgPSBlbGVtZW50LmN1c3RvbVZhbGlkaXR5IFxyXG4gICAgIGFkZE1lc3NhZ2VGb3JWYWxpZGF0aW9uKG5hbWUsIHZhbGlkaXR5KSAvLyBjaGVjayBmb3IgZGVmYXVsdCB2YWxpZGl0eSBvYmplY3RcclxuICAgICBhZGRNZXNzYWdlRm9yVmFsaWRhdGlvbihuYW1lLCBjdXN0b21WYWxpZGl0eSkgLy8gY2hlY2sgZm9yIGN1c3RvbSB2YWxpZGl0eSBvYmplY3RcclxuXHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gYWRkTWVzc2FnZUZvclZhbGlkYXRpb24obmFtZSwgdmFsaWRpdHlPYmplY3QpIHtcclxuICAgICAgZm9yICggbGV0IGtleSBpbiB2YWxpZGl0eU9iamVjdCApIHtcclxuICAgICAgICAvKlxyXG4gICAgICAgICAgdGhlIHZhbGlkaXR5U3RhdGUgb2JqZWN0J3MgcHJvcGV0aWVzIGFyZSBub3QgaXRzIG93blxyXG4gICAgICAgICAgc28gd2UgbXVzdCBub3QgdXNlIHRoZSAuaGFzT3duUHJvcGVydHkgZmlsdGVyXHJcblxyXG4gICAgICAgICAgdGhlIHZhbGlkaXR5U3RhdGUgb2JqZWN0IGhhcyBhIFwidmFsaWRcIiBwcm9wZXJ0eVxyXG4gICAgICAgICAgdGhhdCBpcyB0cnVlIHdoZW4gdGhlIGlucHV0IGlzIHZhbGlkIGFuZCBmYWxzZSBvdGhlcndpc2VcclxuICAgICAgICAgIGl0J3Mgbm90IHJlYWxseSBhbiBlcnJvci1yZWxhdGVkIHByb3BlcnR5IHNvIHdlIGlnbm9yZSBpdFxyXG4gICAgICAgICovXHJcbiAgICAgICAgaWYoa2V5ID09PSAndmFsaWQnKSBjb250aW51ZVxyXG5cclxuICAgICAgICAvKlxyXG4gICAgICAgICAgdGhlIHByb3BlcnR5IGlzIHNldCB0byB0cnVlIHdoZW4gdGhlIGNvbmRpdGlvbiBpcyBub3QgbWV0XHJcbiAgICAgICAgICBlLmcgYW4gZW1wdHkgcmVxdWlyZWQgZmllbGQgaGFzIHRoZSB2YWx1ZU1pc3NpbmcgcHJvcGVydHkgc2V0IHRvIHRydWVcclxuICAgICAgICAqL1xyXG4gICAgICAgIGNvbnN0IGlzVmFsaWQgPSB2YWxpZGl0eU9iamVjdFtrZXldID09PSBmYWxzZVxyXG5cclxuICAgICAgICBjb25zdCBtZXNzYWdlcyA9ICQkKGBbZGF0YS1lcnJvcnMtZm9yPVwiJHtuYW1lfVwiXSBbZGF0YS1lcnJvcnMtd2hlbj1cIiR7a2V5fVwiXWAsIGZvcm0pXHJcblxyXG4gICAgICAgIG1lc3NhZ2VzLmZvckVhY2goZnVuY3Rpb24gKG1lc3NhZ2UpIHtcclxuICAgICAgICAgIGlmKGlzVmFsaWQpIGhpZGUobWVzc2FnZSlcclxuICAgICAgICAgIGVsc2Ugc2hvdyhtZXNzYWdlKVxyXG4gICAgICAgIH0pXHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIHNob3coZWxlbWVudCkge1xyXG4gICAgICBlbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnJ1xyXG4gICAgICBlbGVtZW50LnJlbW92ZUF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nKVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGhpZGUoZWxlbWVudCkge1xyXG4gICAgICBlbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcclxuICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ3RydWUnKVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGluY2x1ZGVzQ2FjaGUgPSB7fVxyXG5cclxuICBmdW5jdGlvbiB1cGRhdGVJbmNsdWRlcyAoKSB7XHJcbiAgICAkJCgnW2RhdGEtaW5jbHVkZV0nLCBmb3JtKS5mb3JFYWNoKGZ1bmN0aW9uIChlbGVtZW50KSB7XHJcbiAgICAgIGNvbnN0IGlkID0gZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2RhdGEtaW5jbHVkZScpXHJcbiAgICAgIGlmIChpbmNsdWRlc0NhY2hlW2lkXSA9PSBudWxsKSBpbmNsdWRlc0NhY2hlW2lkXSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKS5pbm5lckhUTUxcclxuICAgICAgZWxlbWVudC5pbm5lckhUTUwgPSBpbmNsdWRlc0NhY2hlW2lkXVxyXG4gICAgfSlcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGFkZExhYmVsKGVsZW1lbnQsIGZvcm0pIHtcclxuICAgICAgY29uc3QgcGFyZW50Tm9kZSA9IGVsZW1lbnQucGFyZW50Tm9kZSxcclxuICAgICAgICAgICAgbmFtZSA9IGVsZW1lbnQuZ2V0QXR0cmlidXRlKCduYW1lJyk7XHJcbiAgICBpZihlbGVtZW50LnZhbHVlKSB7XHJcbiAgICBpZigkJChgW2Zvcj0ke25hbWV9XWAsIGZvcm0pLmxlbmd0aCkgcmV0dXJuIGZhbHNlOyAvLyBpZiBleGlzdFxyXG4gICAgICAgIGNvbnN0IGxhYmVsVGV4dCA9IGVsZW1lbnQuZ2V0QXR0cmlidXRlKCdwbGFjZWhvbGRlcicpLFxyXG4gICAgICAgICAgICAgIGxhYmVsRWxlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xhYmVsJyk7XHJcbiAgICAgICAgICAgICAgbGFiZWxFbGVtLmlubmVySFRNTCA9IGxhYmVsVGV4dDtcclxuICAgICAgICAgICAgICBsYWJlbEVsZW0uc2V0QXR0cmlidXRlKCdmb3InLCBuYW1lKVxyXG4gICAgICAgICAgICAgIC8vcHJlcGVuZCBpdFxyXG4gICAgICAgICAgICAgIHBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKGxhYmVsRWxlbSwgcGFyZW50Tm9kZS5jaGlsZE5vZGVzWzBdKVxyXG4gICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgJCQoYFtmb3I9JHtuYW1lfV1gLCBmb3JtKVswXS5jbGFzc0xpc3QuYWRkKCdhbmltYXRpb24nKVxyXG4gICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICQkKGBbZm9yPSR7bmFtZX1dYCwgZm9ybSkubGVuZ3RoID8gJCQoYFtmb3I9JHtuYW1lfV1gLCBmb3JtKVswXS5yZW1vdmUoKSA6ICcnO1xyXG4gICAgfVxyXG4gIH1cclxuICAgIC8qIGluaXQgKi9cclxuICAgIGZvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0Jywgb25TdWJtaXQsIGZhbHNlKTtcclxuXHJcbiAgICBmb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgIGNvbnN0IHRhcmdldCA9IGV2ZW50LnRhcmdldFxyXG5cclxuICAgICAgc2V0U3RhdGUodGFyZ2V0LCAnY2hhbmdlZCcsIHRydWUpXHJcbiAgICAgIHZhbGlkYXRlKHRhcmdldClcclxuICAgICAgXHJcbiAgICB9LCBmYWxzZSlcclxuXHJcbiAgICBnZXRGb3JtQ2hpbGRyZW4oZm9ybSkuZm9yRWFjaChmdW5jdGlvbihlbGVtZW50KSB7XHJcbiAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBmdW5jdGlvbihldmVudCkge1xyXG4gICAgICAgIGNvbnN0IHRhcmdldCA9IGV2ZW50LnRhcmdldFxyXG4gICAgICAgIGFkZExhYmVsKHRhcmdldCwgZm9ybSlcclxuICAgICAgfSwgZmFsc2UpXHJcbiAgICB9KVxyXG5cclxuICAgIFxyXG4gICAgJCQoJ1tkYXRhLWVycm9ycy13aGVuXScsIGZvcm0pLmZvckVhY2goaGlkZSlcclxuICAgIFxyXG4gICAgdXBkYXRlSW5jbHVkZXMoKVxyXG4gICAgJCQoJ1tkYXRhLWVycm9ycy13aGVuXScsIGZvcm0pLmZvckVhY2goaGlkZSlcclxuICAgIHJldHVybiBwcm9wcztcclxuICB9XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEZvcm1WYWxpZGF0aW9uO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2pzL3ZhbGlkYXRpb24uanMiLCIvKlxyXG5cdERlc2M6IGFkZCBjdXN0b20gdmFsaWRhdGlvblxyXG4qL1xyXG5cclxuY29uc3Qgcm91dGluZXMgPSB7XHJcbiAgY2hlY2tHcmVhdGVyVGhhbjogcmVxdWlyZSgnLi9yb3V0aW5lcy9ncmVhdGVydGhhbicpXHJcbn1cclxuXHJcbjtbSFRNTElucHV0RWxlbWVudF0uZm9yRWFjaChmdW5jdGlvbiAoY29uc3RydWN0b3IpIHtcclxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoY29uc3RydWN0b3IucHJvdG90eXBlLCAnY3VzdG9tVmFsaWRpdHknLCB7XHJcblx0XHRnZXQoKSB7XHJcblx0XHRcdGNvbnN0IGN1c3RvbVZhbGlkaXR5ID0geyB2YWxpZDogdHJ1ZSB9XHJcblxyXG5cdFx0XHRmb3IobGV0IG5hbWUgaW4gcm91dGluZXMpIHtcclxuXHRcdFx0XHRpZighcm91dGluZXMuaGFzT3duUHJvcGVydHkobmFtZSkpIGNvbnRpbnVlXHJcblxyXG5cdFx0XHRcdGN1c3RvbVZhbGlkaXR5W25hbWVdID0gcm91dGluZXNbbmFtZV0odGhpcylcclxuXHRcdFx0XHRpZiAoY3VzdG9tVmFsaWRpdHlbbmFtZV0gPT09IHRydWUpIGN1c3RvbVZhbGlkaXR5LnZhbGlkID0gZmFsc2VcclxuXHRcdFx0fVxyXG5cdFx0cmV0dXJuIGN1c3RvbVZhbGlkaXR5XHJcblx0XHR9LFxyXG5cdFx0Y29uZmlndXJhYmxlOiB0cnVlXHJcblx0fSlcclxufSlcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9qcy9hZGRjdXN0b20tdmFsaWRhdGlvbi5qcyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGlucHV0KSB7XHJcblx0aWYoIWlucHV0Lmhhc0F0dHJpYnV0ZSgnZ3JlYXRlclRoYW4nKSkgcmV0dXJuIGZhbHNlXHJcblx0XHRjb25zb2xlLmxvZygnbm90IGdyZWF0ZXIgdGhhbicpXHJcblx0Y29uc3QgdHlwZSA9IGlucHV0LmdldEF0dHJpYnV0ZSgndHlwZScpIHx8IGlucHV0LnRhZ05hbWUudG9Mb3dlckNhc2UoKVxyXG5cclxuXHRpZih0eXBlID09PSAnY2hlY2tib3gnKSByZXR1cm4gaW5wdXQuY2hlY2tlZCAhPT0gdHJ1ZVxyXG5cdGlmKHR5cGUgIT09ICdyYWRpbycgJiYgdHlwZSAhPT0gJ3JhbmdlJykge1xyXG5cclxuXHRcdGNvbnN0IHZhbHVlMSA9IE51bWJlcihpbnB1dC52YWx1ZSkgLy8gdmFsdWUxXHJcblx0XHRjb25zdCBjb21wYXJld3RpaEVsbSA9IGlucHV0LmdldEF0dHJpYnV0ZSgnZ3JlYXRlclRoYW4nKVxyXG5cdFx0Y29uc3QgdmFsdWUyID0gTnVtYmVyKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYFtuYW1lPVwiJHtjb21wYXJld3RpaEVsbX1cIl1gKS52YWx1ZSkgLy8gdmFsdWUyXHJcblx0XHRjb25zb2xlLmxvZygnY29tcGFyZScsIHZhbHVlMSA+IHZhbHVlMilcclxuXHJcblx0XHRyZXR1cm4gKHZhbHVlMSA8IHZhbHVlMilcclxuXHR9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vanMvcm91dGluZXMvZ3JlYXRlcnRoYW4uanMiLCIvKlxyXG5cdERlc2M6IE1DQSBBUFIgQ2FsY3VsYXRvclxyXG4qL1xyXG5cclxuaW1wb3J0IFV0aWxzIGZyb20gJy4vY29tbW9uJ1xyXG5pbXBvcnQgUkFURSBmcm9tICcuL3JhdGUnXHJcblxyXG5mdW5jdGlvbiBBUFJDYWxjdWxhdG9yKGZvcm0pIHtcclxuXHRjb25zb2xlLmxvZygnbWNhQ2FsY3VsYXRvcjExMScpXHJcblx0dmFyIGN1cnJlbnRPYmplY3QgPSB0aGlzO1xyXG5cdFxyXG5cdGZ1bmN0aW9uIGdldFZhbHVlcyhlbGVtZW50TmFtZSwgZm9ybSkge1xyXG5cdFx0cmV0dXJuIFV0aWxzLiQkKGBbbmFtZT0ke2VsZW1lbnROYW1lfV1gLCBmb3JtKVswXS52YWx1ZTtcclxuXHR9XHJcblx0XHJcblx0ZnVuY3Rpb24gY3JlYXRlRm9ybVZhbHVlc09iamVjdChmb3JtKSB7XHJcblx0XHRjb25zdCBPYmogPSB7fVxyXG5cdFx0XHRcdFV0aWxzLmdldEZvcm1DaGlsZHJlbihmb3JtKS5mb3JFYWNoKGZ1bmN0aW9uKGVsZW1lbnQpIHtcclxuXHRcdFx0XHRjb25zdCBlbGVtZW50TmFtZSA9IGVsZW1lbnQuZ2V0QXR0cmlidXRlKCduYW1lJyk7XHJcblx0XHRcdFx0XHRPYmpbZWxlbWVudE5hbWVdID0gZ2V0VmFsdWVzKGVsZW1lbnROYW1lLCBmb3JtKVxyXG5cdFx0XHQgICB9KVxyXG5cdFx0cmV0dXJuIE9iajtcclxuXHR9XHJcblxyXG5cdC8vIGFwcHJveCBkYWlseSBQYXltZW50ID0gKEVzdGltYXRlZCBtb250aGx5IGNhcmQgc2FsZXMgLyAzMCkgKiBwZXJjZW50YWdlX2Z1dHVyZV9jYXJkX3NhbGVzXHJcblx0ZnVuY3Rpb24gZGFpbHlQYXltZW50KCkge1xyXG5cdFx0Y29uc3QgZGFpbHlQYXltZW50QW1vdW50ID0gKHRoaXMuaW5wdXRGb3JtVmFsdWVzLnByb2plY3RlZE1DUy8zMCkgKiAodGhpcy5pbnB1dEZvcm1WYWx1ZXMucGVyY2VudGFnZUZDUy8xMDApO1xyXG5cdFx0cmV0dXJuIGRhaWx5UGF5bWVudEFtb3VudC50b0ZpeGVkKDApO1xyXG5cdH1cclxuXHQvLyBhcHByb3guICMgRGF5cyB0byBSZXBheSA9IFBheWJhY2sgQW1vdW50IC8gRGFpbHkgUGF5bWVudFxyXG5cdGZ1bmN0aW9uIGRheXNUb1JlcGF5KGN1bXVsYXRpdmVWYWx1ZXMpIHtcclxuXHRcdGNvbnN0IGRheXNUb1JlcGF5ID0gKHRoaXMuaW5wdXRGb3JtVmFsdWVzLnBheWJhY2tBbW91bnQgLyBjdW11bGF0aXZlVmFsdWVzW1wiZGFpbHlQYXltZW50XCJdKTtcclxuXHRcdHJldHVybiBhZGRDb21tYXMoZGF5c1RvUmVwYXkpO1xyXG5cdH1cclxuXHJcblx0Ly8gRmluYW5jaW5nIENvc3QgPSBQYXliYWNrIEFtb3V0IC0gQW1vdW50IEFkdmFuY2VkXHJcblx0ZnVuY3Rpb24gZmluYW5jaW5nQ29zdCAoKSB7XHJcblx0XHRjb25zdCBmaW5hbmNpbmdfY29zdCA9IE51bWJlcih0aGlzLmlucHV0Rm9ybVZhbHVlcy5wYXliYWNrQW1vdW50IC0gdGhpcy5pbnB1dEZvcm1WYWx1ZXMuYW1vdW50QWR2YW5jZWQpXHJcblx0XHRyZXR1cm4gZmluYW5jaW5nX2Nvc3Q7XHJcblx0fVxyXG5cclxuXHQvLyBFZmZlY3RpdmUgQVBSID0gUkFURShkYXlzVG9SZXBheSwgZGFpbHlQYXltZW50LCBhZHZhbmNlQW1vdW50KSAqIDM2NSAqIDEwMFxyXG5cdGZ1bmN0aW9uIEFQUkNhbGN1bGF0aW9uKGN1bXVsYXRpdmVWYWx1ZXMpIHtcclxuXHRcdGNvbnN0IGVmZmVjdGl2ZV9BUFIgPSBSQVRFKGN1bXVsYXRpdmVWYWx1ZXMuZGF5c1RvUmVwYXksIC0oY3VtdWxhdGl2ZVZhbHVlcy5kYWlseVBheW1lbnQpLCBOdW1iZXIodGhpcy5pbnB1dEZvcm1WYWx1ZXMuYW1vdW50QWR2YW5jZWQpKSAqIDM2NSAqIDEwMDtcclxuXHRcdHJldHVybiBlZmZlY3RpdmVfQVBSLnRvRml4ZWQoMik7XHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBkYWlseUludGVyZXN0UmF0ZShjdW11bGF0aXZlVmFsdWVzKSB7XHJcblx0XHRjb25zdCBkYWlseUludGVyZXN0UmF0ZUFtb3VudCA9IChjdW11bGF0aXZlVmFsdWVzLkFQUkNhbGN1bGF0aW9uIC8gMzY1KTtcclxuXHRcdHJldHVybiBkYWlseUludGVyZXN0UmF0ZUFtb3VudC50b0ZpeGVkKDQpXHJcblx0fVxyXG5cdC8vIHV0aWxpdHkgZnVuY3Rpb25zXHJcblx0ZnVuY3Rpb24gYWRkQ29tbWFzKG51bWJlcikge1xyXG5cdFx0XHRyZXR1cm4gbnVtYmVyLnRvRml4ZWQoMCkucmVwbGFjZSgvKFxcZCkoPz0oXFxkXFxkXFxkKSsoPyFcXGQpKS9nLCBcIiQxLFwiKTtcclxuXHRcdH1cclxuXHQvLyBhZGQgcGVyY2VudGFnZSBzaWduIGFuZCBmaXhlZCB0byB0d28gZGVjaW1hbCBwb2ludFxyXG5cdGZ1bmN0aW9uIHRvUGVyY2VudGFnZShudW1iZXIsIGRlY2ltYWxOdW1iZXIpIHtcclxuXHRcdFx0bnVtYmVyID0gbnVtYmVyLnRvRml4ZWQoZGVjaW1hbE51bWJlcilcclxuXHRcdHJldHVybiBudW1iZXIrXCIlXCI7XHJcblx0fVxyXG5cdFxyXG5cclxuXHRyZXR1cm4ge1xyXG5cdFx0aW5wdXRGb3JtVmFsdWVzOiBjcmVhdGVGb3JtVmFsdWVzT2JqZWN0KGZvcm0pLFxyXG5cdFx0ZGFpbHlQYXltZW50OiBkYWlseVBheW1lbnQsXHJcblx0XHRkYXlzVG9SZXBheTogZGF5c1RvUmVwYXksXHJcblx0XHRmaW5hbmNpbmdDb3N0OiBmaW5hbmNpbmdDb3N0LFxyXG5cdFx0QVBSQ2FsY3VsYXRpb246IEFQUkNhbGN1bGF0aW9uLFxyXG5cdFx0ZGFpbHlJbnRlcmVzdFJhdGU6IGRhaWx5SW50ZXJlc3RSYXRlXHJcblx0fSAvL09iamVjdC5hc3NpZ24odGhpcy5pbnB1dFZhbHVlcywgdGhpcy5wdWJsaWNNZXRob2RzKSA7XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gQVBSQ2FsY3VsYXRvcjtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9qcy9tY2FDYWxjdWxhdG9yLmpzIiwiY29uc3QgUkFURSA9IGZ1bmN0aW9uKHBlcmlvZHMsIHBheW1lbnQsIHByZXNlbnQsIGZ1dHVyZSwgdHlwZSwgZ3Vlc3MpIHtcclxuICAgIGd1ZXNzID0gKGd1ZXNzID09PSB1bmRlZmluZWQpID8gMC4wMSA6IGd1ZXNzO1xyXG4gICAgZnV0dXJlID0gKGZ1dHVyZSA9PT0gdW5kZWZpbmVkKSA/IDAgOiBmdXR1cmU7XHJcbiAgICB0eXBlID0gKHR5cGUgPT09IHVuZGVmaW5lZCkgPyAwIDogdHlwZTtcclxuICBcclxuICAgIC8vIFNldCBtYXhpbXVtIGVwc2lsb24gZm9yIGVuZCBvZiBpdGVyYXRpb25cclxuICAgIHZhciBlcHNNYXggPSAxZS0xMDtcclxuICBcclxuICAgIC8vIFNldCBtYXhpbXVtIG51bWJlciBvZiBpdGVyYXRpb25zXHJcbiAgICB2YXIgaXRlck1heCA9IDEwO1xyXG4gIFxyXG4gICAgLy8gSW1wbGVtZW50IE5ld3RvbidzIG1ldGhvZFxyXG4gICAgdmFyIHksIHkwLCB5MSwgeDAsIHgxID0gMCxcclxuICAgICAgZiA9IDAsXHJcbiAgICAgIGkgPSAwO1xyXG4gICAgdmFyIHJhdGUgPSBndWVzcztcclxuICAgIGlmIChNYXRoLmFicyhyYXRlKSA8IGVwc01heCkge1xyXG4gICAgICB5ID0gcHJlc2VudCAqICgxICsgcGVyaW9kcyAqIHJhdGUpICsgcGF5bWVudCAqICgxICsgcmF0ZSAqIHR5cGUpICogcGVyaW9kcyArIGZ1dHVyZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGYgPSBNYXRoLmV4cChwZXJpb2RzICogTWF0aC5sb2coMSArIHJhdGUpKTtcclxuICAgICAgeSA9IHByZXNlbnQgKiBmICsgcGF5bWVudCAqICgxIC8gcmF0ZSArIHR5cGUpICogKGYgLSAxKSArIGZ1dHVyZTtcclxuICAgIH1cclxuICAgIHkwID0gcHJlc2VudCArIHBheW1lbnQgKiBwZXJpb2RzICsgZnV0dXJlO1xyXG4gICAgeTEgPSBwcmVzZW50ICogZiArIHBheW1lbnQgKiAoMSAvIHJhdGUgKyB0eXBlKSAqIChmIC0gMSkgKyBmdXR1cmU7XHJcbiAgICBpID0geDAgPSAwO1xyXG4gICAgeDEgPSByYXRlO1xyXG4gICAgd2hpbGUgKChNYXRoLmFicyh5MCAtIHkxKSA+IGVwc01heCkgJiYgKGkgPCBpdGVyTWF4KSkge1xyXG4gICAgICByYXRlID0gKHkxICogeDAgLSB5MCAqIHgxKSAvICh5MSAtIHkwKTtcclxuICAgICAgeDAgPSB4MTtcclxuICAgICAgeDEgPSByYXRlO1xyXG4gICAgICAgIGlmIChNYXRoLmFicyhyYXRlKSA8IGVwc01heCkge1xyXG4gICAgICAgICAgeSA9IHByZXNlbnQgKiAoMSArIHBlcmlvZHMgKiByYXRlKSArIHBheW1lbnQgKiAoMSArIHJhdGUgKiB0eXBlKSAqIHBlcmlvZHMgKyBmdXR1cmU7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGYgPSBNYXRoLmV4cChwZXJpb2RzICogTWF0aC5sb2coMSArIHJhdGUpKTtcclxuICAgICAgICAgIHkgPSBwcmVzZW50ICogZiArIHBheW1lbnQgKiAoMSAvIHJhdGUgKyB0eXBlKSAqIChmIC0gMSkgKyBmdXR1cmU7XHJcbiAgICAgICAgfVxyXG4gICAgICB5MCA9IHkxO1xyXG4gICAgICB5MSA9IHk7XHJcbiAgICAgICsraTtcclxuICAgIH1cclxuICAgIHJldHVybiByYXRlO1xyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBSQVRFO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2pzL3JhdGUuanMiXSwic291cmNlUm9vdCI6IiJ9