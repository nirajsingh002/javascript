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
		console.log('form valid');
		var APRcalc = new _mcaCalculator2.default(form);
		console.log(APRcalc);
		var calculatedValues = _common2.default.sequientiallyRunFn.call(APRcalc, "dailyPayment", "daysToRepay", "financingCost", "APRCalculation", "dailyInterestRate");
		console.log(calculatedValues);
	} else {
		console.log('form invalid');
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

		var value1 = Number(input.value); // value1
		var comparewtihElm = input.getAttribute('greaterThan');
		var value2 = Number(document.querySelector('[name="' + comparewtihElm + '"]').value); // value2
		console.log('compare', value1 < value2);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCAxYjViYWRmZjBkMzc3OTkzMTZlNyIsIndlYnBhY2s6Ly8vLi9qcy9jb21tb24uanMiLCJ3ZWJwYWNrOi8vLy4vanMvYXBwLmpzIiwid2VicGFjazovLy8uL2pzL3ZhbGlkYXRpb24uanMiLCJ3ZWJwYWNrOi8vLy4vanMvYWRkY3VzdG9tLXZhbGlkYXRpb24uanMiLCJ3ZWJwYWNrOi8vLy4vanMvcm91dGluZXMvZ3JlYXRlcnRoYW4uanMiLCJ3ZWJwYWNrOi8vLy4vanMvbWNhQ2FsY3VsYXRvci5qcyIsIndlYnBhY2s6Ly8vLi9qcy9yYXRlLmpzIl0sIm5hbWVzIjpbIlV0aWxzIiwiJCQiLCJzZWxlY3RvciIsInBhcmVudFNlbGVjdG9yIiwic2xpY2UiLCJjYWxsIiwicXVlcnlTZWxlY3RvckFsbCIsImdldEZvcm1DaGlsZHJlbiIsImZvcm0iLCJmaWx0ZXIiLCJjaGlsZCIsInR5cGUiLCJnZXRBdHRyaWJ1dGUiLCJub3RWYWxpZGFibGVFbGVtZW50cyIsImluZGV4T2YiLCJjb25jYXQiLCJhZGRDb21tYXMiLCJudW1iZXIiLCJ0b0ZpeGVkIiwicmVwbGFjZSIsInNlcXVpZW50aWFsbHlSdW5GbiIsImN1cnJlbnRPYmoiLCJjdW11bGF0aXZlVmFsdWVzIiwiYXJncyIsImZvckVhY2giLCJuYW1lIiwiaW5kZXgiLCJhcnJheSIsIk9iamVjdCIsImFzc2lnbiIsIm1vZHVsZSIsImV4cG9ydHMiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiY2FsbGJhY2tGbiIsImV2ZW50IiwicHJldmVudERlZmF1bHQiLCJpc1ZhbGlkIiwiY29uc29sZSIsImxvZyIsIkFQUmNhbGMiLCJjYWxjdWxhdGVkVmFsdWVzIiwiZm9ybVZhbGlkYXRvbkluc3RhbmNlIiwicmVxdWlyZSIsIkZvcm1WYWxpZGF0aW9uIiwib25TdWJtaXRDYWxsYmFjayIsInByb3BzIiwidXBkYXRlTWVzc2FnZSIsInVwZGF0ZUluY2x1ZGVzIiwiY2hlY2tWYWxpZGl0eSIsImN1c3RvbUNoZWNrVmFsaWRpdHkiLCJvblN1Ym1pdCIsInNldFN0YXRlIiwidmFsaWRhdGUiLCJhcHBseSIsInRhcmdldCIsInN0YXRlIiwidmFsdWUiLCJzdGF0ZXNGb3JFbGVtZW50cyIsImVsZW1lbnRzIiwiY2xhc3NOYW1lIiwiZWxlbWVudCIsImNsYXNzTGlzdCIsImFkZCIsInJlbW92ZSIsInJlbW92ZUF0dHJpYnV0ZSIsInNldEF0dHJpYnV0ZSIsInZhbGlkaXR5IiwiY3VzdG9tVmFsaWRpdHkiLCJhZGRNZXNzYWdlRm9yVmFsaWRhdGlvbiIsInZhbGlkaXR5T2JqZWN0Iiwia2V5IiwibWVzc2FnZXMiLCJtZXNzYWdlIiwiaGlkZSIsInNob3ciLCJzdHlsZSIsImRpc3BsYXkiLCJpbmNsdWRlc0NhY2hlIiwiaWQiLCJpbm5lckhUTUwiLCJhZGRMYWJlbCIsInBhcmVudE5vZGUiLCJsZW5ndGgiLCJsYWJlbFRleHQiLCJsYWJlbEVsZW0iLCJjcmVhdGVFbGVtZW50IiwiaW5zZXJ0QmVmb3JlIiwiY2hpbGROb2RlcyIsImFkZEV2ZW50TGlzdGVuZXIiLCJyb3V0aW5lcyIsImNoZWNrR3JlYXRlclRoYW4iLCJIVE1MSW5wdXRFbGVtZW50IiwiSFRNTEZvcm1FbGVtZW50IiwiY29uc3RydWN0b3IiLCJkZWZpbmVQcm9wZXJ0eSIsInByb3RvdHlwZSIsImdldCIsInZhbGlkIiwiaGFzT3duUHJvcGVydHkiLCJjb25maWd1cmFibGUiLCJpbnB1dCIsImV2ZXJ5IiwiaGFzQXR0cmlidXRlIiwidGFnTmFtZSIsInRvTG93ZXJDYXNlIiwiY2hlY2tlZCIsInZhbHVlMSIsIk51bWJlciIsImNvbXBhcmV3dGloRWxtIiwidmFsdWUyIiwicXVlcnlTZWxlY3RvciIsIkFQUkNhbGN1bGF0b3IiLCJjdXJyZW50T2JqZWN0IiwiZ2V0VmFsdWVzIiwiZWxlbWVudE5hbWUiLCJjcmVhdGVGb3JtVmFsdWVzT2JqZWN0IiwiT2JqIiwiZGFpbHlQYXltZW50IiwiZGFpbHlQYXltZW50QW1vdW50IiwiaW5wdXRGb3JtVmFsdWVzIiwicHJvamVjdGVkTUNTIiwicGVyY2VudGFnZUZDUyIsImRheXNUb1JlcGF5IiwicGF5YmFja0Ftb3VudCIsImZpbmFuY2luZ0Nvc3QiLCJmaW5hbmNpbmdfY29zdCIsImFtb3VudEFkdmFuY2VkIiwiQVBSQ2FsY3VsYXRpb24iLCJlZmZlY3RpdmVfQVBSIiwiZGFpbHlJbnRlcmVzdFJhdGUiLCJkYWlseUludGVyZXN0UmF0ZUFtb3VudCIsInRvUGVyY2VudGFnZSIsImRlY2ltYWxOdW1iZXIiLCJSQVRFIiwicGVyaW9kcyIsInBheW1lbnQiLCJwcmVzZW50IiwiZnV0dXJlIiwiZ3Vlc3MiLCJ1bmRlZmluZWQiLCJlcHNNYXgiLCJpdGVyTWF4IiwieSIsInkwIiwieTEiLCJ4MCIsIngxIiwiZiIsImkiLCJyYXRlIiwiTWF0aCIsImFicyIsImV4cCJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87QUNWQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7O0FDN0RBOzs7QUFHQSxJQUFJQSxRQUFTLFlBQVk7O0FBRXZCLFVBQVNDLEVBQVQsQ0FBYUMsUUFBYixFQUF1QkMsY0FB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QXBCLEdBQThCRyxNQUFuQztBQUNBTyxPQUFLUixVQUFVVyxDQUFWLEdBQWNaLFdBQVcsSUFBSWMsSUFBSixHQUFXM0ksSUFBdEIsS0FBK0J5SSxJQUFJLENBQW5DLENBQWQsR0FBc0RWLE1BQTNEO0FBQ0FXLE1BQUlILEtBQUssQ0FBVDtBQUNBQyxPQUFLRyxJQUFMO0FBQ0EsU0FBUUMsS0FBS0MsR0FBTCxDQUFTUixLQUFLQyxFQUFkLElBQW9CSixNQUFyQixJQUFpQ1EsSUFBSVAsT0FBNUMsRUFBc0Q7QUFDcERRLFdBQU8sQ0FBQ0wsS0FBS0MsRUFBTCxHQUFVRixLQUFLRyxFQUFoQixLQUF1QkYsS0FBS0QsRUFBNUIsQ0FBUDtBQUNBRSxTQUFLQyxFQUFMO0FBQ0FBLFNBQUtHLElBQUw7QUFDRSxRQUFJQyxLQUFLQyxHQUFMLENBQVNGLElBQVQsSUFBaUJULE1BQXJCLEVBQTZCO0FBQzNCRSxVQUFJTixXQUFXLElBQUlGLFVBQVVlLElBQXpCLElBQWlDZCxXQUFXLElBQUljLE9BQU8zSSxJQUF0QixJQUE4QjRILE9BQS9ELEdBQXlFRyxNQUE3RTtBQUNELEtBRkQsTUFFTztBQUNMVSxVQUFJRyxLQUFLRSxHQUFMLENBQVNsQixVQUFVZ0IsS0FBS2hILEdBQUwsQ0FBUyxJQUFJK0csSUFBYixDQUFuQixDQUFKO0FBQ0FQLFVBQUlOLFVBQVVXLENBQVYsR0FBY1osV0FBVyxJQUFJYyxJQUFKLEdBQVczSSxJQUF0QixLQUErQnlJLElBQUksQ0FBbkMsQ0FBZCxHQUFzRFYsTUFBMUQ7QUFDRDtBQUNITSxTQUFLQyxFQUFMO0FBQ0FBLFNBQUtGLENBQUw7QUFDQSxNQUFFTSxDQUFGO0FBQ0Q7QUFDRCxTQUFPQyxJQUFQO0FBQ0gsQ0F6Q0Q7O0FBMkNBeEgsT0FBT0MsT0FBUCxHQUFpQnVHLElBQWpCLEMiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiZm9ybVZhbGlkYXRpb25cIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wiZm9ybVZhbGlkYXRpb25cIl0gPSBmYWN0b3J5KCk7XG59KSh0eXBlb2Ygc2VsZiAhPT0gJ3VuZGVmaW5lZCcgPyBzZWxmIDogdGhpcywgZnVuY3Rpb24oKSB7XG5yZXR1cm4gXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9hc3NldHMvXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgMWI1YmFkZmYwZDM3Nzk5MzE2ZTciLCIvKlxyXG5cdGRlc2M6IGNvbW1vbiBmaW5jdGlvbmFsaXRpZXNcclxuKi9cclxudmFyIFV0aWxzID0gKGZ1bmN0aW9uICgpIHtcclxuXHJcblx0XHRmdW5jdGlvbiAkJCAoc2VsZWN0b3IsIHBhcmVudFNlbGVjdG9yKSB7XHJcblx0ICAgICAgcmV0dXJuIFtdLnNsaWNlLmNhbGwocGFyZW50U2VsZWN0b3IucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvcikpXHJcblx0ICAgIH1cclxuXHJcblx0ICAgIGZ1bmN0aW9uIGdldEZvcm1DaGlsZHJlbiAoZm9ybSkge1xyXG5cdCAgICAgIHJldHVybiAkJCgnaW5wdXQnLCBmb3JtKVxyXG5cdCAgICAgICAgICAuZmlsdGVyKGZ1bmN0aW9uKGNoaWxkKSB7XHJcblx0ICAgICAgICAgICAgY29uc3QgdHlwZSA9IGNoaWxkLmdldEF0dHJpYnV0ZSgnbmFtZScpXHJcblx0ICAgICAgICAgICAgY29uc3Qgbm90VmFsaWRhYmxlRWxlbWVudHMgPSBbXCJidXR0b25cIiwgXCJzdWJtaXRcIiwgXCJyZXNldFwiLCBcImZpbGVcIl1cclxuXHQgICAgICAgICAgICByZXR1cm4gbm90VmFsaWRhYmxlRWxlbWVudHMuaW5kZXhPZih0eXBlKSA9PT0gLTFcclxuXHQgICAgICAgICAgfSlcclxuXHQgICAgICAgICAgLmNvbmNhdCgkJCgndGV4dGFyZWEsIHNlbGVjdCcsIGZvcm0pKVxyXG5cdCAgICB9XHJcblx0ICAgIFxyXG5cdCAgICBmdW5jdGlvbiBhZGRDb21tYXMobnVtYmVyKSB7XHJcblx0XHRcdHJldHVybiBudW1iZXIudG9GaXhlZCgwKS5yZXBsYWNlKC8oXFxkKSg/PShcXGRcXGRcXGQpKyg/IVxcZCkpL2csIFwiJDEsXCIpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGZ1bmN0aW9uIHNlcXVpZW50aWFsbHlSdW5GbiguLi5hcmdzKSB7XHJcblx0XHRcdC8vIHZhciBhcmdzID0gW10uc2xpY2UuY2FsbChhcmd1bWVudHMpO1xyXG5cdFx0XHR2YXIgY3VycmVudE9iaiA9IHRoaXM7XHJcblx0XHRcdHZhciBjdW11bGF0aXZlVmFsdWVzID0ge307IFxyXG5cdFx0XHRhcmdzLmZvckVhY2goZnVuY3Rpb24obmFtZSwgaW5kZXgsIGFycmF5KSB7XHJcblx0XHRcdFx0T2JqZWN0LmFzc2lnbihjdW11bGF0aXZlVmFsdWVzLCB7W25hbWVdOiBjdXJyZW50T2JqW25hbWVdKGN1bXVsYXRpdmVWYWx1ZXMpfSlcclxuXHRcdFx0XHQvKmN1bXVsYXRpdmVWYWx1ZXNbaW5kZXhdID0ge1xyXG5cdFx0XHRcdFx0W25hbWVdOiBjdXJyZW50T2JqW25hbWVdKGN1bXVsYXRpdmVWYWx1ZXMpXHRcclxuXHRcdFx0XHR9ICovXHJcblx0XHRcdH0pXHJcblx0XHRcdHJldHVybiBjdW11bGF0aXZlVmFsdWVzO1xyXG5cdFx0fVxyXG5cdCAgICByZXR1cm4ge1xyXG5cdCAgICBcdCQkOiAkJCxcclxuXHQgICAgXHRnZXRGb3JtQ2hpbGRyZW46IGdldEZvcm1DaGlsZHJlbixcclxuXHQgICAgXHRzZXF1aWVudGlhbGx5UnVuRm46IHNlcXVpZW50aWFsbHlSdW5GblxyXG5cdCAgICB9XHJcbn0pKClcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gVXRpbHNcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9qcy9jb21tb24uanMiLCIvKlxyXG5cdERlc2M6IEZvcm0gdmFsaWRhdGlvblxyXG4qL1xyXG5cclxuaW1wb3J0IFV0aWxzIGZyb20gJy4vY29tbW9uJ1xyXG5pbXBvcnQgRm9ybVZhbGlkYXRpb24gZnJvbSAnLi92YWxpZGF0aW9uJztcclxuaW1wb3J0IEFQUkNhbGN1bGF0b3IgZnJvbSAnLi9tY2FDYWxjdWxhdG9yJztcclxuXHJcblxyXG5cclxudmFyIGZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYXByQ2FsYycpO1xyXG5cclxuZnVuY3Rpb24gY2FsbGJhY2tGbihldmVudCkge1xyXG5cdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHRcdGlmKHRoaXMuaXNWYWxpZCgpKSB7XHJcblx0XHRjb25zb2xlLmxvZygnZm9ybSB2YWxpZCcpXHJcblx0XHR2YXIgQVBSY2FsYyA9IG5ldyBBUFJDYWxjdWxhdG9yKGZvcm0pO1xyXG5cdFx0Y29uc29sZS5sb2coQVBSY2FsYylcclxuXHRcdHZhciBjYWxjdWxhdGVkVmFsdWVzID0gVXRpbHMuc2VxdWllbnRpYWxseVJ1bkZuLmNhbGwoQVBSY2FsYywgXCJkYWlseVBheW1lbnRcIiwgXCJkYXlzVG9SZXBheVwiLCBcImZpbmFuY2luZ0Nvc3RcIiwgXCJBUFJDYWxjdWxhdGlvblwiLCBcImRhaWx5SW50ZXJlc3RSYXRlXCIpO1xyXG5cdFx0Y29uc29sZS5sb2coY2FsY3VsYXRlZFZhbHVlcylcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGNvbnNvbGUubG9nKCdmb3JtIGludmFsaWQnKVxyXG5cdFx0fVxyXG59XHJcblxyXG52YXIgZm9ybVZhbGlkYXRvbkluc3RhbmNlID0gRm9ybVZhbGlkYXRpb24oZm9ybSwgY2FsbGJhY2tGbik7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2pzL2FwcC5qcyIsIi8vIHJlcXVpcmUoJy4vaHRtbDV2YWxpZGF0aW9uJyk7XHJcblxyXG5pbXBvcnQgVXRpbHMgZnJvbSAnLi9jb21tb24nXHJcblxyXG4gIC8qIGNvbW1vbiBmdW5jdGlvbmFsaXRpZXMgKi9cclxuICByZXF1aXJlKCcuL2FkZGN1c3RvbS12YWxpZGF0aW9uJyk7XHJcbiAgXHJcbiAgY29uc3QgJCQgPSBVdGlscy4kJDtcclxuICBjb25zdCBnZXRGb3JtQ2hpbGRyZW4gPSBVdGlscy5nZXRGb3JtQ2hpbGRyZW47XHJcblxyXG4gIGZ1bmN0aW9uIEZvcm1WYWxpZGF0aW9uKGZvcm0sIG9uU3VibWl0Q2FsbGJhY2sgPSBmdW5jdGlvbiAoKSB7fSkge1xyXG5cclxuICAgIC8qIHByb3BzICovXHJcblxyXG4gICAgY29uc3QgcHJvcHMgPSB7XHJcbiAgICAgIHVwZGF0ZU1lc3NhZ2UsXHJcbiAgICAgIHVwZGF0ZUluY2x1ZGVzLFxyXG4gICAgICBpc1ZhbGlkOiBpc1ZhbGlkXHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBpc1ZhbGlkKCkge1xyXG4gICAgICByZXR1cm4gKCBmb3JtLmNoZWNrVmFsaWRpdHkoKSAmJiBmb3JtLmN1c3RvbUNoZWNrVmFsaWRpdHkoKSApXHJcbiAgICB9XHJcbiAgICAvKiBmdW5jdGlvbiAqL1xyXG4gICAgZnVuY3Rpb24gb25TdWJtaXQoLi4uYXJncykge1xyXG4gICAgICBjb25zb2xlLmxvZygnZm9ybSBzdWJtaXR0ZWQnKTtcclxuICAgICAgc2V0U3RhdGUoZm9ybSwgJ3N1Ym1pdHRlZCcsIHRydWUpO1xyXG4gICAgICB2YWxpZGF0ZShmb3JtKVxyXG4gICAgICBnZXRGb3JtQ2hpbGRyZW4oZm9ybSkuZm9yRWFjaCh2YWxpZGF0ZSlcclxuICAgICAgb25TdWJtaXRDYWxsYmFjay5hcHBseShwcm9wcywgYXJncylcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBzZXRTdGF0ZSh0YXJnZXQsIHN0YXRlLCB2YWx1ZSkge1xyXG4gICAgICBjb25zdCBuYW1lID0gdGFyZ2V0LmdldEF0dHJpYnV0ZSgnbmFtZScpO1xyXG4gICAgICBjb25zdCBzdGF0ZXNGb3JFbGVtZW50cyA9ICQkKGBbZGF0YS1zdGF0ZXMtZm9yPVwiJHtuYW1lfVwiXWAsIGZvcm0pO1xyXG4gICAgICBjb25zdCBlbGVtZW50cyA9IFt0YXJnZXRdLmNvbmNhdChzdGF0ZXNGb3JFbGVtZW50cylcclxuICAgICAgY29uc3QgY2xhc3NOYW1lID0gYGlzLSR7c3RhdGV9YFxyXG5cclxuICAgICAgaWYodmFsdWUpIGVsZW1lbnRzLmZvckVhY2goZWxlbWVudCA9PiBlbGVtZW50LmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKSlcclxuICAgICAgZWxzZSBlbGVtZW50cy5mb3JFYWNoKGVsZW1lbnQgPT4gZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKGNsYXNzTmFtZSkpXHJcbiAgICB9XHJcblxyXG4gICBcclxuICAgIGZ1bmN0aW9uIHZhbGlkYXRlIChlbGVtZW50KSB7XHJcbiAgICAgIGlmKGVsZW1lbnQuY2hlY2tWYWxpZGl0eSgpICYmIGVsZW1lbnQuY3VzdG9tQ2hlY2tWYWxpZGl0eSgpKSB7XHJcbiAgICAgICAgZWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoJ2FyaWEtaW52YWxpZCcpXHJcbiAgICAgICAgc2V0U3RhdGUoZWxlbWVudCwgJ3ZhbGlkJywgdHJ1ZSkgLy8gYWRkIGNsYXNzIGlzLXZhbGlkXHJcbiAgICAgICAgc2V0U3RhdGUoZWxlbWVudCwgJ2ludmFsaWQnLCBmYWxzZSkgLy8gcmVtb3ZlIGNsYXNzIGlzLWludmFsaWRcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcImludmFsaWRcIilcclxuICAgICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZSgnYXJpYS1pbnZhbGlkJywgJ3RydWUnKTtcclxuICAgICAgICBzZXRTdGF0ZShlbGVtZW50LCAndmFsaWQnLCBmYWxzZSkgLy8gcmVtb3ZlIGNsYXNzIGlzLXZhbGlkXHJcbiAgICAgICAgc2V0U3RhdGUoZWxlbWVudCwgJ2ludmFsaWQnLCB0cnVlKSAvLyBhZGQgY2xhc3MgaXMtaW52YWxpZFxyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBzaG93ICYgaGlkZSByZWxldmFudCBtZXNzYWdlc1xyXG4gICAgICB1cGRhdGVNZXNzYWdlKGVsZW1lbnQpXHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gdXBkYXRlTWVzc2FnZSAoZWxlbWVudCkge1xyXG4gICAgICBjb25zdCBuYW1lID0gZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ25hbWUnKVxyXG4gICAgICBjb25zdCB2YWxpZGl0eSA9IGVsZW1lbnQudmFsaWRpdHkgXHJcbiAgICAgIGNvbnN0IGN1c3RvbVZhbGlkaXR5ID0gZWxlbWVudC5jdXN0b21WYWxpZGl0eSBcclxuICAgICBhZGRNZXNzYWdlRm9yVmFsaWRhdGlvbihuYW1lLCB2YWxpZGl0eSkgLy8gY2hlY2sgZm9yIGRlZmF1bHQgdmFsaWRpdHkgb2JqZWN0XHJcbiAgICAgYWRkTWVzc2FnZUZvclZhbGlkYXRpb24obmFtZSwgY3VzdG9tVmFsaWRpdHkpIC8vIGNoZWNrIGZvciBjdXN0b20gdmFsaWRpdHkgb2JqZWN0XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGFkZE1lc3NhZ2VGb3JWYWxpZGF0aW9uKG5hbWUsIHZhbGlkaXR5T2JqZWN0KSB7XHJcbiAgICAgIGZvciAoIGxldCBrZXkgaW4gdmFsaWRpdHlPYmplY3QgKSB7XHJcbiAgICAgICAgLypcclxuICAgICAgICAgIHRoZSB2YWxpZGl0eVN0YXRlIG9iamVjdCdzIHByb3BldGllcyBhcmUgbm90IGl0cyBvd25cclxuICAgICAgICAgIHNvIHdlIG11c3Qgbm90IHVzZSB0aGUgLmhhc093blByb3BlcnR5IGZpbHRlclxyXG5cclxuICAgICAgICAgIHRoZSB2YWxpZGl0eVN0YXRlIG9iamVjdCBoYXMgYSBcInZhbGlkXCIgcHJvcGVydHlcclxuICAgICAgICAgIHRoYXQgaXMgdHJ1ZSB3aGVuIHRoZSBpbnB1dCBpcyB2YWxpZCBhbmQgZmFsc2Ugb3RoZXJ3aXNlXHJcbiAgICAgICAgICBpdCdzIG5vdCByZWFsbHkgYW4gZXJyb3ItcmVsYXRlZCBwcm9wZXJ0eSBzbyB3ZSBpZ25vcmUgaXRcclxuICAgICAgICAqL1xyXG4gICAgICAgIGlmKGtleSA9PT0gJ3ZhbGlkJykgY29udGludWVcclxuXHJcbiAgICAgICAgLypcclxuICAgICAgICAgIHRoZSBwcm9wZXJ0eSBpcyBzZXQgdG8gdHJ1ZSB3aGVuIHRoZSBjb25kaXRpb24gaXMgbm90IG1ldFxyXG4gICAgICAgICAgZS5nIGFuIGVtcHR5IHJlcXVpcmVkIGZpZWxkIGhhcyB0aGUgdmFsdWVNaXNzaW5nIHByb3BlcnR5IHNldCB0byB0cnVlXHJcbiAgICAgICAgKi9cclxuICAgICAgICBjb25zdCBpc1ZhbGlkID0gdmFsaWRpdHlPYmplY3Rba2V5XSA9PT0gZmFsc2VcclxuXHJcbiAgICAgICAgY29uc3QgbWVzc2FnZXMgPSAkJChgW2RhdGEtZXJyb3JzLWZvcj1cIiR7bmFtZX1cIl0gW2RhdGEtZXJyb3JzLXdoZW49XCIke2tleX1cIl1gLCBmb3JtKVxyXG5cclxuICAgICAgICBtZXNzYWdlcy5mb3JFYWNoKGZ1bmN0aW9uIChtZXNzYWdlKSB7XHJcbiAgICAgICAgICBpZihpc1ZhbGlkKSBoaWRlKG1lc3NhZ2UpXHJcbiAgICAgICAgICBlbHNlIHNob3cobWVzc2FnZSlcclxuICAgICAgICB9KVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBzaG93KGVsZW1lbnQpIHtcclxuICAgICAgZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJydcclxuICAgICAgZWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJylcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBoaWRlKGVsZW1lbnQpIHtcclxuICAgICAgZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXHJcbiAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICd0cnVlJylcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBpbmNsdWRlc0NhY2hlID0ge31cclxuXHJcbiAgZnVuY3Rpb24gdXBkYXRlSW5jbHVkZXMgKCkge1xyXG4gICAgJCQoJ1tkYXRhLWluY2x1ZGVdJywgZm9ybSkuZm9yRWFjaChmdW5jdGlvbiAoZWxlbWVudCkge1xyXG4gICAgICBjb25zdCBpZCA9IGVsZW1lbnQuZ2V0QXR0cmlidXRlKCdkYXRhLWluY2x1ZGUnKVxyXG4gICAgICBpZiAoaW5jbHVkZXNDYWNoZVtpZF0gPT0gbnVsbCkgaW5jbHVkZXNDYWNoZVtpZF0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCkuaW5uZXJIVE1MXHJcbiAgICAgIGVsZW1lbnQuaW5uZXJIVE1MID0gaW5jbHVkZXNDYWNoZVtpZF1cclxuICAgIH0pXHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBhZGRMYWJlbChlbGVtZW50LCBmb3JtKSB7XHJcbiAgICAgIGNvbnN0IHBhcmVudE5vZGUgPSBlbGVtZW50LnBhcmVudE5vZGUsXHJcbiAgICAgICAgICAgIG5hbWUgPSBlbGVtZW50LmdldEF0dHJpYnV0ZSgnbmFtZScpO1xyXG4gICAgaWYoZWxlbWVudC52YWx1ZSkge1xyXG4gICAgaWYoJCQoYFtmb3I9JHtuYW1lfV1gLCBmb3JtKS5sZW5ndGgpIHJldHVybiBmYWxzZTsgLy8gaWYgZXhpc3RcclxuICAgICAgICBjb25zdCBsYWJlbFRleHQgPSBlbGVtZW50LmdldEF0dHJpYnV0ZSgncGxhY2Vob2xkZXInKSxcclxuICAgICAgICAgICAgICBsYWJlbEVsZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsYWJlbCcpO1xyXG4gICAgICAgICAgICAgIGxhYmVsRWxlbS5pbm5lckhUTUwgPSBsYWJlbFRleHQ7XHJcbiAgICAgICAgICAgICAgbGFiZWxFbGVtLnNldEF0dHJpYnV0ZSgnZm9yJywgbmFtZSlcclxuICAgICAgICAgICAgICAvL3ByZXBlbmQgaXRcclxuICAgICAgICAgICAgICBwYXJlbnROb2RlLmluc2VydEJlZm9yZShsYWJlbEVsZW0sIHBhcmVudE5vZGUuY2hpbGROb2Rlc1swXSlcclxuICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICQkKGBbZm9yPSR7bmFtZX1dYCwgZm9ybSlbMF0uY2xhc3NMaXN0LmFkZCgnYW5pbWF0aW9uJylcclxuICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAkJChgW2Zvcj0ke25hbWV9XWAsIGZvcm0pLmxlbmd0aCA/ICQkKGBbZm9yPSR7bmFtZX1dYCwgZm9ybSlbMF0ucmVtb3ZlKCkgOiAnJztcclxuICAgIH1cclxuICB9XHJcbiAgICAvKiBpbml0ICovXHJcbiAgICBmb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIG9uU3VibWl0LCBmYWxzZSk7XHJcblxyXG4gICAgZm9ybS5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBmdW5jdGlvbihldmVudCkge1xyXG4gICAgICBjb25zdCB0YXJnZXQgPSBldmVudC50YXJnZXRcclxuXHJcbiAgICAgIHNldFN0YXRlKHRhcmdldCwgJ2NoYW5nZWQnLCB0cnVlKVxyXG4gICAgICB2YWxpZGF0ZSh0YXJnZXQpXHJcbiAgICAgIFxyXG4gICAgfSwgZmFsc2UpXHJcblxyXG4gICAgZ2V0Rm9ybUNoaWxkcmVuKGZvcm0pLmZvckVhY2goZnVuY3Rpb24oZWxlbWVudCkge1xyXG4gICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgICBjb25zdCB0YXJnZXQgPSBldmVudC50YXJnZXRcclxuICAgICAgICBhZGRMYWJlbCh0YXJnZXQsIGZvcm0pXHJcbiAgICAgIH0sIGZhbHNlKVxyXG4gICAgfSlcclxuXHJcbiAgICBcclxuICAgICQkKCdbZGF0YS1lcnJvcnMtd2hlbl0nLCBmb3JtKS5mb3JFYWNoKGhpZGUpXHJcbiAgICBcclxuICAgIHVwZGF0ZUluY2x1ZGVzKClcclxuICAgICQkKCdbZGF0YS1lcnJvcnMtd2hlbl0nLCBmb3JtKS5mb3JFYWNoKGhpZGUpXHJcbiAgICByZXR1cm4gcHJvcHM7XHJcbiAgfVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBGb3JtVmFsaWRhdGlvbjtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9qcy92YWxpZGF0aW9uLmpzIiwiLypcclxuXHREZXNjOiBhZGQgY3VzdG9tIHZhbGlkYXRpb25cclxuKi9cclxuXHJcbmNvbnN0IHJvdXRpbmVzID0ge1xyXG4gIGNoZWNrR3JlYXRlclRoYW46IHJlcXVpcmUoJy4vcm91dGluZXMvZ3JlYXRlcnRoYW4nKVxyXG59XHJcblxyXG47W0hUTUxJbnB1dEVsZW1lbnQsIEhUTUxGb3JtRWxlbWVudF0uZm9yRWFjaChmdW5jdGlvbiAoY29uc3RydWN0b3IpIHtcclxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoY29uc3RydWN0b3IucHJvdG90eXBlLCAnY3VzdG9tVmFsaWRpdHknLCB7XHJcblx0XHRnZXQoKSB7XHJcblx0XHRcdGNvbnN0IGN1c3RvbVZhbGlkaXR5ID0geyB2YWxpZDogdHJ1ZSB9XHJcblxyXG5cdFx0XHRmb3IobGV0IG5hbWUgaW4gcm91dGluZXMpIHtcclxuXHRcdFx0XHRpZighcm91dGluZXMuaGFzT3duUHJvcGVydHkobmFtZSkpIGNvbnRpbnVlXHJcblxyXG5cdFx0XHRcdGN1c3RvbVZhbGlkaXR5W25hbWVdID0gcm91dGluZXNbbmFtZV0odGhpcylcclxuXHRcdFx0XHRpZiAoY3VzdG9tVmFsaWRpdHlbbmFtZV0gPT09IHRydWUpIGN1c3RvbVZhbGlkaXR5LnZhbGlkID0gZmFsc2VcclxuXHRcdFx0fVxyXG5cdFx0cmV0dXJuIGN1c3RvbVZhbGlkaXR5XHJcblx0XHR9LFxyXG5cdFx0Y29uZmlndXJhYmxlOiB0cnVlXHJcblx0fSk7XHJcbiBcdGNvbnN0cnVjdG9yLnByb3RvdHlwZS5jdXN0b21DaGVja1ZhbGlkaXR5ID0gZnVuY3Rpb24oKSB7XHJcblx0Y29uc29sZS5sb2coJ2N1c3RvbUNoZWNrVmFsaWRpdHknKVxyXG5cdGNvbnN0IGZvcm0gPSB0aGlzO1xyXG5cclxuXHRmdW5jdGlvbiAkJCAoIHNlbGVjdG9yICkge1xyXG5cdFx0cmV0dXJuIFtdLnNsaWNlLmNhbGwoZm9ybS5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKSlcclxuXHR9XHJcblxyXG5cdHJldHVybiAkJCgnaW5wdXQnKVxyXG5cdFx0LmZpbHRlcigoaW5wdXQpID0+IFsnYnV0dG9uJywgJ3N1Ym1pdCcsICdyZXNldCddLmluZGV4T2YoaW5wdXQuZ2V0QXR0cmlidXRlKCd0eXBlJykpID09PSAtMSApXHJcblx0XHQuY29uY2F0KCQkKCd0ZXh0YXJlYSwgc2VsZWN0JykpXHJcblx0XHQuZXZlcnkoKGlucHV0KSA9PiBpbnB1dC5jdXN0b21WYWxpZGl0eS52YWxpZCA9PT0gdHJ1ZSlcclxuXHR9XHJcbn0pXHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2pzL2FkZGN1c3RvbS12YWxpZGF0aW9uLmpzIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaW5wdXQpIHtcclxuXHRpZighaW5wdXQuaGFzQXR0cmlidXRlKCdncmVhdGVyVGhhbicpKSByZXR1cm4gZmFsc2VcclxuXHRcdGNvbnNvbGUubG9nKCdub3QgZ3JlYXRlciB0aGFuJylcclxuXHRjb25zdCB0eXBlID0gaW5wdXQuZ2V0QXR0cmlidXRlKCd0eXBlJykgfHwgaW5wdXQudGFnTmFtZS50b0xvd2VyQ2FzZSgpXHJcblxyXG5cdGlmKHR5cGUgPT09ICdjaGVja2JveCcpIHJldHVybiBpbnB1dC5jaGVja2VkICE9PSB0cnVlXHJcblx0aWYodHlwZSAhPT0gJ3JhZGlvJyAmJiB0eXBlICE9PSAncmFuZ2UnKSB7XHJcblxyXG5cdFx0Y29uc3QgdmFsdWUxID0gTnVtYmVyKGlucHV0LnZhbHVlKSAvLyB2YWx1ZTFcclxuXHRcdGNvbnN0IGNvbXBhcmV3dGloRWxtID0gaW5wdXQuZ2V0QXR0cmlidXRlKCdncmVhdGVyVGhhbicpXHJcblx0XHRjb25zdCB2YWx1ZTIgPSBOdW1iZXIoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgW25hbWU9XCIke2NvbXBhcmV3dGloRWxtfVwiXWApLnZhbHVlKSAvLyB2YWx1ZTJcclxuXHRcdGNvbnNvbGUubG9nKCdjb21wYXJlJywgdmFsdWUxIDwgdmFsdWUyKVxyXG5cclxuXHRcdHJldHVybiAodmFsdWUxIDwgdmFsdWUyKVxyXG5cdH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9qcy9yb3V0aW5lcy9ncmVhdGVydGhhbi5qcyIsIi8qXHJcblx0RGVzYzogTUNBIEFQUiBDYWxjdWxhdG9yXHJcbiovXHJcblxyXG5pbXBvcnQgVXRpbHMgZnJvbSAnLi9jb21tb24nXHJcbmltcG9ydCBSQVRFIGZyb20gJy4vcmF0ZSdcclxuXHJcbmZ1bmN0aW9uIEFQUkNhbGN1bGF0b3IoZm9ybSkge1xyXG5cdGNvbnNvbGUubG9nKCdtY2FDYWxjdWxhdG9yMTExJylcclxuXHR2YXIgY3VycmVudE9iamVjdCA9IHRoaXM7XHJcblx0XHJcblx0ZnVuY3Rpb24gZ2V0VmFsdWVzKGVsZW1lbnROYW1lLCBmb3JtKSB7XHJcblx0XHRyZXR1cm4gVXRpbHMuJCQoYFtuYW1lPSR7ZWxlbWVudE5hbWV9XWAsIGZvcm0pWzBdLnZhbHVlO1xyXG5cdH1cclxuXHRcclxuXHRmdW5jdGlvbiBjcmVhdGVGb3JtVmFsdWVzT2JqZWN0KGZvcm0pIHtcclxuXHRcdGNvbnN0IE9iaiA9IHt9XHJcblx0XHRcdFx0VXRpbHMuZ2V0Rm9ybUNoaWxkcmVuKGZvcm0pLmZvckVhY2goZnVuY3Rpb24oZWxlbWVudCkge1xyXG5cdFx0XHRcdGNvbnN0IGVsZW1lbnROYW1lID0gZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ25hbWUnKTtcclxuXHRcdFx0XHRcdE9ialtlbGVtZW50TmFtZV0gPSBnZXRWYWx1ZXMoZWxlbWVudE5hbWUsIGZvcm0pXHJcblx0XHRcdCAgIH0pXHJcblx0XHRyZXR1cm4gT2JqO1xyXG5cdH1cclxuXHJcblx0Ly8gYXBwcm94IGRhaWx5IFBheW1lbnQgPSAoRXN0aW1hdGVkIG1vbnRobHkgY2FyZCBzYWxlcyAvIDMwKSAqIHBlcmNlbnRhZ2VfZnV0dXJlX2NhcmRfc2FsZXNcclxuXHRmdW5jdGlvbiBkYWlseVBheW1lbnQoKSB7XHJcblx0XHRjb25zdCBkYWlseVBheW1lbnRBbW91bnQgPSAodGhpcy5pbnB1dEZvcm1WYWx1ZXMucHJvamVjdGVkTUNTLzMwKSAqICh0aGlzLmlucHV0Rm9ybVZhbHVlcy5wZXJjZW50YWdlRkNTLzEwMCk7XHJcblx0XHRyZXR1cm4gZGFpbHlQYXltZW50QW1vdW50LnRvRml4ZWQoMCk7XHJcblx0fVxyXG5cdC8vIGFwcHJveC4gIyBEYXlzIHRvIFJlcGF5ID0gUGF5YmFjayBBbW91bnQgLyBEYWlseSBQYXltZW50XHJcblx0ZnVuY3Rpb24gZGF5c1RvUmVwYXkoY3VtdWxhdGl2ZVZhbHVlcykge1xyXG5cdFx0Y29uc3QgZGF5c1RvUmVwYXkgPSAodGhpcy5pbnB1dEZvcm1WYWx1ZXMucGF5YmFja0Ftb3VudCAvIGN1bXVsYXRpdmVWYWx1ZXNbXCJkYWlseVBheW1lbnRcIl0pO1xyXG5cdFx0cmV0dXJuIGFkZENvbW1hcyhkYXlzVG9SZXBheSk7XHJcblx0fVxyXG5cclxuXHQvLyBGaW5hbmNpbmcgQ29zdCA9IFBheWJhY2sgQW1vdXQgLSBBbW91bnQgQWR2YW5jZWRcclxuXHRmdW5jdGlvbiBmaW5hbmNpbmdDb3N0ICgpIHtcclxuXHRcdGNvbnN0IGZpbmFuY2luZ19jb3N0ID0gTnVtYmVyKHRoaXMuaW5wdXRGb3JtVmFsdWVzLnBheWJhY2tBbW91bnQgLSB0aGlzLmlucHV0Rm9ybVZhbHVlcy5hbW91bnRBZHZhbmNlZClcclxuXHRcdHJldHVybiBmaW5hbmNpbmdfY29zdDtcclxuXHR9XHJcblxyXG5cdC8vIEVmZmVjdGl2ZSBBUFIgPSBSQVRFKGRheXNUb1JlcGF5LCBkYWlseVBheW1lbnQsIGFkdmFuY2VBbW91bnQpICogMzY1ICogMTAwXHJcblx0ZnVuY3Rpb24gQVBSQ2FsY3VsYXRpb24oY3VtdWxhdGl2ZVZhbHVlcykge1xyXG5cdFx0Y29uc3QgZWZmZWN0aXZlX0FQUiA9IFJBVEUoY3VtdWxhdGl2ZVZhbHVlcy5kYXlzVG9SZXBheSwgLShjdW11bGF0aXZlVmFsdWVzLmRhaWx5UGF5bWVudCksIE51bWJlcih0aGlzLmlucHV0Rm9ybVZhbHVlcy5hbW91bnRBZHZhbmNlZCkpICogMzY1ICogMTAwO1xyXG5cdFx0cmV0dXJuIGVmZmVjdGl2ZV9BUFIudG9GaXhlZCgyKTtcclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIGRhaWx5SW50ZXJlc3RSYXRlKGN1bXVsYXRpdmVWYWx1ZXMpIHtcclxuXHRcdGNvbnN0IGRhaWx5SW50ZXJlc3RSYXRlQW1vdW50ID0gKGN1bXVsYXRpdmVWYWx1ZXMuQVBSQ2FsY3VsYXRpb24gLyAzNjUpO1xyXG5cdFx0cmV0dXJuIGRhaWx5SW50ZXJlc3RSYXRlQW1vdW50LnRvRml4ZWQoNClcclxuXHR9XHJcblx0Ly8gdXRpbGl0eSBmdW5jdGlvbnNcclxuXHRmdW5jdGlvbiBhZGRDb21tYXMobnVtYmVyKSB7XHJcblx0XHRcdHJldHVybiBudW1iZXIudG9GaXhlZCgwKS5yZXBsYWNlKC8oXFxkKSg/PShcXGRcXGRcXGQpKyg/IVxcZCkpL2csIFwiJDEsXCIpO1xyXG5cdFx0fVxyXG5cdC8vIGFkZCBwZXJjZW50YWdlIHNpZ24gYW5kIGZpeGVkIHRvIHR3byBkZWNpbWFsIHBvaW50XHJcblx0ZnVuY3Rpb24gdG9QZXJjZW50YWdlKG51bWJlciwgZGVjaW1hbE51bWJlcikge1xyXG5cdFx0XHRudW1iZXIgPSBudW1iZXIudG9GaXhlZChkZWNpbWFsTnVtYmVyKVxyXG5cdFx0cmV0dXJuIG51bWJlcitcIiVcIjtcclxuXHR9XHJcblx0XHJcblxyXG5cdHJldHVybiB7XHJcblx0XHRpbnB1dEZvcm1WYWx1ZXM6IGNyZWF0ZUZvcm1WYWx1ZXNPYmplY3QoZm9ybSksXHJcblx0XHRkYWlseVBheW1lbnQ6IGRhaWx5UGF5bWVudCxcclxuXHRcdGRheXNUb1JlcGF5OiBkYXlzVG9SZXBheSxcclxuXHRcdGZpbmFuY2luZ0Nvc3Q6IGZpbmFuY2luZ0Nvc3QsXHJcblx0XHRBUFJDYWxjdWxhdGlvbjogQVBSQ2FsY3VsYXRpb24sXHJcblx0XHRkYWlseUludGVyZXN0UmF0ZTogZGFpbHlJbnRlcmVzdFJhdGVcclxuXHR9IC8vT2JqZWN0LmFzc2lnbih0aGlzLmlucHV0VmFsdWVzLCB0aGlzLnB1YmxpY01ldGhvZHMpIDtcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBBUFJDYWxjdWxhdG9yO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2pzL21jYUNhbGN1bGF0b3IuanMiLCJjb25zdCBSQVRFID0gZnVuY3Rpb24ocGVyaW9kcywgcGF5bWVudCwgcHJlc2VudCwgZnV0dXJlLCB0eXBlLCBndWVzcykge1xyXG4gICAgZ3Vlc3MgPSAoZ3Vlc3MgPT09IHVuZGVmaW5lZCkgPyAwLjAxIDogZ3Vlc3M7XHJcbiAgICBmdXR1cmUgPSAoZnV0dXJlID09PSB1bmRlZmluZWQpID8gMCA6IGZ1dHVyZTtcclxuICAgIHR5cGUgPSAodHlwZSA9PT0gdW5kZWZpbmVkKSA/IDAgOiB0eXBlO1xyXG4gIFxyXG4gICAgLy8gU2V0IG1heGltdW0gZXBzaWxvbiBmb3IgZW5kIG9mIGl0ZXJhdGlvblxyXG4gICAgdmFyIGVwc01heCA9IDFlLTEwO1xyXG4gIFxyXG4gICAgLy8gU2V0IG1heGltdW0gbnVtYmVyIG9mIGl0ZXJhdGlvbnNcclxuICAgIHZhciBpdGVyTWF4ID0gMTA7XHJcbiAgXHJcbiAgICAvLyBJbXBsZW1lbnQgTmV3dG9uJ3MgbWV0aG9kXHJcbiAgICB2YXIgeSwgeTAsIHkxLCB4MCwgeDEgPSAwLFxyXG4gICAgICBmID0gMCxcclxuICAgICAgaSA9IDA7XHJcbiAgICB2YXIgcmF0ZSA9IGd1ZXNzO1xyXG4gICAgaWYgKE1hdGguYWJzKHJhdGUpIDwgZXBzTWF4KSB7XHJcbiAgICAgIHkgPSBwcmVzZW50ICogKDEgKyBwZXJpb2RzICogcmF0ZSkgKyBwYXltZW50ICogKDEgKyByYXRlICogdHlwZSkgKiBwZXJpb2RzICsgZnV0dXJlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgZiA9IE1hdGguZXhwKHBlcmlvZHMgKiBNYXRoLmxvZygxICsgcmF0ZSkpO1xyXG4gICAgICB5ID0gcHJlc2VudCAqIGYgKyBwYXltZW50ICogKDEgLyByYXRlICsgdHlwZSkgKiAoZiAtIDEpICsgZnV0dXJlO1xyXG4gICAgfVxyXG4gICAgeTAgPSBwcmVzZW50ICsgcGF5bWVudCAqIHBlcmlvZHMgKyBmdXR1cmU7XHJcbiAgICB5MSA9IHByZXNlbnQgKiBmICsgcGF5bWVudCAqICgxIC8gcmF0ZSArIHR5cGUpICogKGYgLSAxKSArIGZ1dHVyZTtcclxuICAgIGkgPSB4MCA9IDA7XHJcbiAgICB4MSA9IHJhdGU7XHJcbiAgICB3aGlsZSAoKE1hdGguYWJzKHkwIC0geTEpID4gZXBzTWF4KSAmJiAoaSA8IGl0ZXJNYXgpKSB7XHJcbiAgICAgIHJhdGUgPSAoeTEgKiB4MCAtIHkwICogeDEpIC8gKHkxIC0geTApO1xyXG4gICAgICB4MCA9IHgxO1xyXG4gICAgICB4MSA9IHJhdGU7XHJcbiAgICAgICAgaWYgKE1hdGguYWJzKHJhdGUpIDwgZXBzTWF4KSB7XHJcbiAgICAgICAgICB5ID0gcHJlc2VudCAqICgxICsgcGVyaW9kcyAqIHJhdGUpICsgcGF5bWVudCAqICgxICsgcmF0ZSAqIHR5cGUpICogcGVyaW9kcyArIGZ1dHVyZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgZiA9IE1hdGguZXhwKHBlcmlvZHMgKiBNYXRoLmxvZygxICsgcmF0ZSkpO1xyXG4gICAgICAgICAgeSA9IHByZXNlbnQgKiBmICsgcGF5bWVudCAqICgxIC8gcmF0ZSArIHR5cGUpICogKGYgLSAxKSArIGZ1dHVyZTtcclxuICAgICAgICB9XHJcbiAgICAgIHkwID0geTE7XHJcbiAgICAgIHkxID0geTtcclxuICAgICAgKytpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJhdGU7XHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFJBVEU7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vanMvcmF0ZS5qcyJdLCJzb3VyY2VSb290IjoiIn0=