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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _validation = __webpack_require__(1);

var _validation2 = _interopRequireDefault(_validation);

var _mcaCalculator = __webpack_require__(5);

var _mcaCalculator2 = _interopRequireDefault(_mcaCalculator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
	Desc: Form validation
*/

var form = document.getElementById('aprCalc');

function callbackFn(event) {
		event.preventDefault();
		if (this.isValid()) {
				var APRcalc = new _mcaCalculator2.default(form);
				console.log(APRcalc);
		}
}

var formValidatonInstance = (0, _validation2.default)(form, callbackFn);

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _common = __webpack_require__(2);

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

  /*function $$ (selector) {
    return [].slice.call(form.querySelectorAll(selector))
  }
    function getFormChildren () {
    return $$('input')
        .filter(function(child) {
          const type = child.getAttribute('name')
          const notValidableElements = ["button", "submit", "reset", "file"]
          return notValidableElements.indexOf(type) === -1
        })
        .concat($$('textarea, select'))
  }*/

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
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


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
	return {
		$$: $$,
		getFormChildren: getFormChildren
	};
}();

module.exports = Utils;

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


var _common = __webpack_require__(2);

var _common2 = _interopRequireDefault(_common);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; } /*
                                                                                                                                                                                                                  	Desc: MCA APR Calculator
                                                                                                                                                                                                                  */

function APRCalculator(form) {
	console.log('mcaCalculator111');
	var currentObject = this;
	this.inputValues = {
		inputFormValues: createFormValuesObject(form)
		/*
  	const dailyPaymentA = dailyPayment.call(this)
  	const daysToRepayA = daysToRepay.call(this)
  	
  	this.outputValues =  {
  		calculatedValues: {
  			dailyPayment: dailyPaymentA,
  			daysToRepay: daysToRepayA
  		}
  	}*/
	};var cumulativeValues = [];
	// this.sequientiallyRunFn = this.sequientiallyRunFn.bind(this);

	sequientiallyRunFn.call(this, dailyPayment, daysToRepay);

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
		var dailyPaymentAmount = this.inputValues.inputFormValues.projectedMCS / 30 * (this.inputValues.inputFormValues.percentageFCS / 100);
		return dailyPaymentAmount.toFixed(0);
	}
	// approx. # Days to Repay = Payback Amount / Daily Payment
	function daysToRepay() {
		var daysToRepay = this.inputValues.inputFormValues.paybackAmount / dailyPaymentA;
		return addCommas(daysToRepay);
	}

	function calculatedValues() {
		var calculatedValues = {
			dailyPaymentAmount: dailyPayment(),
			daysToRepay: daysToRepay()
		};
		return calculatedValues;
	}

	// utility functions
	function addCommas(number) {
		return number.toFixed(0).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
	}

	function sequientiallyRunFn() {
		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		// var args = [].slice.call(arguments);

		args.forEach(function (name, index, array) {
			cumulativeValues[index] = _defineProperty({}, name, array[index].call(currentObject));
		});
		return cumulativeValues;
	}

	return Object.assign({}, this.inputValues, this.outputValues);
}

module.exports = APRCalculator;

/***/ })
/******/ ]);
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBmZmVlMDI0ZWQ2ZTZkMTA5NmU0ZiIsIndlYnBhY2s6Ly8vLi9qcy9hcHAuanMiLCJ3ZWJwYWNrOi8vLy4vanMvdmFsaWRhdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9qcy9jb21tb24uanMiLCJ3ZWJwYWNrOi8vLy4vanMvYWRkY3VzdG9tLXZhbGlkYXRpb24uanMiLCJ3ZWJwYWNrOi8vLy4vanMvcm91dGluZXMvZ3JlYXRlcnRoYW4uanMiLCJ3ZWJwYWNrOi8vLy4vanMvbWNhQ2FsY3VsYXRvci5qcyJdLCJuYW1lcyI6WyJmb3JtIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsImNhbGxiYWNrRm4iLCJldmVudCIsInByZXZlbnREZWZhdWx0IiwiaXNWYWxpZCIsIkFQUmNhbGMiLCJjb25zb2xlIiwibG9nIiwiZm9ybVZhbGlkYXRvbkluc3RhbmNlIiwicmVxdWlyZSIsIiQkIiwiZ2V0Rm9ybUNoaWxkcmVuIiwiRm9ybVZhbGlkYXRpb24iLCJvblN1Ym1pdENhbGxiYWNrIiwicHJvcHMiLCJ1cGRhdGVNZXNzYWdlIiwidXBkYXRlSW5jbHVkZXMiLCJjaGVja1ZhbGlkaXR5IiwiYmluZCIsIm9uU3VibWl0Iiwic2V0U3RhdGUiLCJ2YWxpZGF0ZSIsImZvckVhY2giLCJhcmdzIiwiYXBwbHkiLCJ0YXJnZXQiLCJzdGF0ZSIsInZhbHVlIiwibmFtZSIsImdldEF0dHJpYnV0ZSIsInN0YXRlc0ZvckVsZW1lbnRzIiwiZWxlbWVudHMiLCJjb25jYXQiLCJjbGFzc05hbWUiLCJlbGVtZW50IiwiY2xhc3NMaXN0IiwiYWRkIiwicmVtb3ZlIiwicmVtb3ZlQXR0cmlidXRlIiwic2V0QXR0cmlidXRlIiwidmFsaWRpdHkiLCJjdXN0b21WYWxpZGl0eSIsImFkZE1lc3NhZ2VGb3JWYWxpZGF0aW9uIiwidmFsaWRpdHlPYmplY3QiLCJrZXkiLCJtZXNzYWdlcyIsIm1lc3NhZ2UiLCJoaWRlIiwic2hvdyIsInN0eWxlIiwiZGlzcGxheSIsImluY2x1ZGVzQ2FjaGUiLCJpZCIsImlubmVySFRNTCIsImFkZExhYmVsIiwicGFyZW50Tm9kZSIsImxlbmd0aCIsImxhYmVsVGV4dCIsImxhYmVsRWxlbSIsImNyZWF0ZUVsZW1lbnQiLCJpbnNlcnRCZWZvcmUiLCJjaGlsZE5vZGVzIiwiYWRkRXZlbnRMaXN0ZW5lciIsIm1vZHVsZSIsImV4cG9ydHMiLCJVdGlscyIsInNlbGVjdG9yIiwicGFyZW50U2VsZWN0b3IiLCJzbGljZSIsImNhbGwiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZmlsdGVyIiwiY2hpbGQiLCJ0eXBlIiwibm90VmFsaWRhYmxlRWxlbWVudHMiLCJpbmRleE9mIiwiYWRkQ29tbWFzIiwibnVtYmVyIiwidG9GaXhlZCIsInJlcGxhY2UiLCJyb3V0aW5lcyIsImNoZWNrR3JlYXRlclRoYW4iLCJIVE1MSW5wdXRFbGVtZW50IiwiY29uc3RydWN0b3IiLCJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsInByb3RvdHlwZSIsImdldCIsInZhbGlkIiwiaGFzT3duUHJvcGVydHkiLCJjb25maWd1cmFibGUiLCJpbnB1dCIsImhhc0F0dHJpYnV0ZSIsInRhZ05hbWUiLCJ0b0xvd2VyQ2FzZSIsImNoZWNrZWQiLCJ2YWx1ZTEiLCJOdW1iZXIiLCJjb21wYXJld3RpaEVsbSIsInZhbHVlMiIsInF1ZXJ5U2VsZWN0b3IiLCJBUFJDYWxjdWxhdG9yIiwiY3VycmVudE9iamVjdCIsImlucHV0VmFsdWVzIiwiaW5wdXRGb3JtVmFsdWVzIiwiY3JlYXRlRm9ybVZhbHVlc09iamVjdCIsImN1bXVsYXRpdmVWYWx1ZXMiLCJzZXF1aWVudGlhbGx5UnVuRm4iLCJkYWlseVBheW1lbnQiLCJkYXlzVG9SZXBheSIsImdldFZhbHVlcyIsImVsZW1lbnROYW1lIiwiT2JqIiwiZGFpbHlQYXltZW50QW1vdW50IiwicHJvamVjdGVkTUNTIiwicGVyY2VudGFnZUZDUyIsInBheWJhY2tBbW91bnQiLCJkYWlseVBheW1lbnRBIiwiY2FsY3VsYXRlZFZhbHVlcyIsImluZGV4IiwiYXJyYXkiLCJhc3NpZ24iLCJvdXRwdXRWYWx1ZXMiXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO0FDVkE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7QUN6REE7Ozs7QUFDQTs7Ozs7O0FBTEE7Ozs7QUFTQSxJQUFJQSxPQUFPQyxTQUFTQyxjQUFULENBQXdCLFNBQXhCLENBQVg7O0FBRUEsU0FBU0MsVUFBVCxDQUFvQkMsS0FBcEIsRUFBMkI7QUFDekJBLFFBQU1DLGNBQU47QUFDQSxNQUFHLEtBQUtDLE9BQUwsRUFBSCxFQUFtQjtBQUNuQixRQUFJQyxVQUFVLDRCQUFrQlAsSUFBbEIsQ0FBZDtBQUNBUSxZQUFRQyxHQUFSLENBQVlGLE9BQVo7QUFFQztBQUNGOztBQUVELElBQUlHLHdCQUF3QiwwQkFBZVYsSUFBZixFQUFxQkcsVUFBckIsQ0FBNUIsQzs7Ozs7Ozs7O0FDbEJBOzs7Ozs7QUFFRTtBQUNBLG1CQUFBUSxDQUFRLENBQVIsRSxDQUxGOztBQU9FLElBQU1DLEtBQUssaUJBQU1BLEVBQWpCO0FBQ0EsSUFBTUMsa0JBQWtCLGlCQUFNQSxlQUE5Qjs7QUFFQSxTQUFT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QUFNRCxLQUFOLEVBQWFsRCxJQUFiLENBQWtCaUMsYUFBbEIsQ0FEVDtBQUdBLEdBSkQ7QUFLQSxTQUFPSSxnQkFBUDtBQUNBOztBQUVELFFBQU90QixPQUFPcUMsTUFBUCxDQUFjLEVBQWQsRUFBa0IsS0FBS2xCLFdBQXZCLEVBQW9DLEtBQUttQixZQUF6QyxDQUFQO0FBQ0E7O0FBRUQzRCxPQUFPQyxPQUFQLEdBQWlCcUMsYUFBakIsQyIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJmb3JtVmFsaWRhdGlvblwiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJmb3JtVmFsaWRhdGlvblwiXSA9IGZhY3RvcnkoKTtcbn0pKHR5cGVvZiBzZWxmICE9PSAndW5kZWZpbmVkJyA/IHNlbGYgOiB0aGlzLCBmdW5jdGlvbigpIHtcbnJldHVybiBcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL2Fzc2V0cy9cIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBmZmVlMDI0ZWQ2ZTZkMTA5NmU0ZiIsIi8qXHJcblx0RGVzYzogRm9ybSB2YWxpZGF0aW9uXHJcbiovXHJcblxyXG5pbXBvcnQgRm9ybVZhbGlkYXRpb24gZnJvbSAnLi92YWxpZGF0aW9uJztcclxuaW1wb3J0IEFQUkNhbGN1bGF0b3IgZnJvbSAnLi9tY2FDYWxjdWxhdG9yJztcclxuXHJcblxyXG5cclxudmFyIGZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYXByQ2FsYycpO1xyXG5cclxuZnVuY3Rpb24gY2FsbGJhY2tGbihldmVudCkge1xyXG5cdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHRcdGlmKHRoaXMuaXNWYWxpZCgpKSB7XHJcblx0XHR2YXIgQVBSY2FsYyA9IG5ldyBBUFJDYWxjdWxhdG9yKGZvcm0pO1xyXG5cdFx0Y29uc29sZS5sb2coQVBSY2FsYylcclxuXHRcdFxyXG5cdFx0fVxyXG59XHJcblxyXG52YXIgZm9ybVZhbGlkYXRvbkluc3RhbmNlID0gRm9ybVZhbGlkYXRpb24oZm9ybSwgY2FsbGJhY2tGbik7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2pzL2FwcC5qcyIsIi8vIHJlcXVpcmUoJy4vaHRtbDV2YWxpZGF0aW9uJyk7XHJcblxyXG5pbXBvcnQgVXRpbHMgZnJvbSAnLi9jb21tb24nXHJcblxyXG4gIC8qIGNvbW1vbiBmdW5jdGlvbmFsaXRpZXMgKi9cclxuICByZXF1aXJlKCcuL2FkZGN1c3RvbS12YWxpZGF0aW9uJyk7XHJcbiAgXHJcbiAgY29uc3QgJCQgPSBVdGlscy4kJDtcclxuICBjb25zdCBnZXRGb3JtQ2hpbGRyZW4gPSBVdGlscy5nZXRGb3JtQ2hpbGRyZW47XHJcblxyXG4gIGZ1bmN0aW9uIEZvcm1WYWxpZGF0aW9uKGZvcm0sIG9uU3VibWl0Q2FsbGJhY2sgPSBmdW5jdGlvbiAoKSB7fSkge1xyXG5cclxuICAgIC8qIHByb3BzICovXHJcblxyXG4gICAgY29uc3QgcHJvcHMgPSB7XHJcbiAgICAgIHVwZGF0ZU1lc3NhZ2UsXHJcbiAgICAgIHVwZGF0ZUluY2x1ZGVzLFxyXG4gICAgICBpc1ZhbGlkOiBmb3JtLmNoZWNrVmFsaWRpdHkuYmluZChmb3JtKVxyXG4gICAgfVxyXG5cclxuICAgIC8qIGZ1bmN0aW9uICovXHJcbiAgICBmdW5jdGlvbiBvblN1Ym1pdCguLi5hcmdzKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCdmb3JtIHN1Ym1pdHRlZCcpO1xyXG4gICAgICBzZXRTdGF0ZShmb3JtLCAnc3VibWl0dGVkJywgdHJ1ZSk7XHJcbiAgICAgIHZhbGlkYXRlKGZvcm0pXHJcbiAgICAgIGdldEZvcm1DaGlsZHJlbihmb3JtKS5mb3JFYWNoKHZhbGlkYXRlKVxyXG4gICAgICBvblN1Ym1pdENhbGxiYWNrLmFwcGx5KHByb3BzLCBhcmdzKVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHNldFN0YXRlKHRhcmdldCwgc3RhdGUsIHZhbHVlKSB7XHJcbiAgICAgIGNvbnN0IG5hbWUgPSB0YXJnZXQuZ2V0QXR0cmlidXRlKCduYW1lJyk7XHJcbiAgICAgIGNvbnN0IHN0YXRlc0ZvckVsZW1lbnRzID0gJCQoYFtkYXRhLXN0YXRlcy1mb3I9XCIke25hbWV9XCJdYCwgZm9ybSk7XHJcbiAgICAgIGNvbnN0IGVsZW1lbnRzID0gW3RhcmdldF0uY29uY2F0KHN0YXRlc0ZvckVsZW1lbnRzKVxyXG4gICAgICBjb25zdCBjbGFzc05hbWUgPSBgaXMtJHtzdGF0ZX1gXHJcblxyXG4gICAgICBpZih2YWx1ZSkgZWxlbWVudHMuZm9yRWFjaChlbGVtZW50ID0+IGVsZW1lbnQuY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpKVxyXG4gICAgICBlbHNlIGVsZW1lbnRzLmZvckVhY2goZWxlbWVudCA9PiBlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NOYW1lKSlcclxuICAgIH1cclxuXHJcbiAgICAvKmZ1bmN0aW9uICQkIChzZWxlY3Rvcikge1xyXG4gICAgICByZXR1cm4gW10uc2xpY2UuY2FsbChmb3JtLnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpKVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGdldEZvcm1DaGlsZHJlbiAoKSB7XHJcbiAgICAgIHJldHVybiAkJCgnaW5wdXQnKVxyXG4gICAgICAgICAgLmZpbHRlcihmdW5jdGlvbihjaGlsZCkge1xyXG4gICAgICAgICAgICBjb25zdCB0eXBlID0gY2hpbGQuZ2V0QXR0cmlidXRlKCduYW1lJylcclxuICAgICAgICAgICAgY29uc3Qgbm90VmFsaWRhYmxlRWxlbWVudHMgPSBbXCJidXR0b25cIiwgXCJzdWJtaXRcIiwgXCJyZXNldFwiLCBcImZpbGVcIl1cclxuICAgICAgICAgICAgcmV0dXJuIG5vdFZhbGlkYWJsZUVsZW1lbnRzLmluZGV4T2YodHlwZSkgPT09IC0xXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgICAgLmNvbmNhdCgkJCgndGV4dGFyZWEsIHNlbGVjdCcpKVxyXG4gICAgfSovXHJcblxyXG4gICAgZnVuY3Rpb24gdmFsaWRhdGUgKGVsZW1lbnQpIHtcclxuICAgICAgaWYoZWxlbWVudC5jaGVja1ZhbGlkaXR5KCkpIHtcclxuICAgICAgICBlbGVtZW50LnJlbW92ZUF0dHJpYnV0ZSgnYXJpYS1pbnZhbGlkJylcclxuICAgICAgICBzZXRTdGF0ZShlbGVtZW50LCAndmFsaWQnLCB0cnVlKSAvLyBhZGQgY2xhc3MgaXMtdmFsaWRcclxuICAgICAgICBzZXRTdGF0ZShlbGVtZW50LCAnaW52YWxpZCcsIGZhbHNlKSAvLyByZW1vdmUgY2xhc3MgaXMtaW52YWxpZFxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiaW52YWxpZFwiKVxyXG4gICAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKCdhcmlhLWludmFsaWQnLCAndHJ1ZScpO1xyXG4gICAgICAgIHNldFN0YXRlKGVsZW1lbnQsICd2YWxpZCcsIGZhbHNlKSAvLyByZW1vdmUgY2xhc3MgaXMtdmFsaWRcclxuICAgICAgICBzZXRTdGF0ZShlbGVtZW50LCAnaW52YWxpZCcsIHRydWUpIC8vIGFkZCBjbGFzcyBpcy1pbnZhbGlkXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIHNob3cgJiBoaWRlIHJlbGV2YW50IG1lc3NhZ2VzXHJcbiAgICAgIHVwZGF0ZU1lc3NhZ2UoZWxlbWVudClcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiB1cGRhdGVNZXNzYWdlIChlbGVtZW50KSB7XHJcbiAgICAgIGNvbnN0IG5hbWUgPSBlbGVtZW50LmdldEF0dHJpYnV0ZSgnbmFtZScpXHJcbiAgICAgIGNvbnN0IHZhbGlkaXR5ID0gZWxlbWVudC52YWxpZGl0eSBcclxuICAgICAgY29uc3QgY3VzdG9tVmFsaWRpdHkgPSBlbGVtZW50LmN1c3RvbVZhbGlkaXR5IFxyXG4gICAgIGFkZE1lc3NhZ2VGb3JWYWxpZGF0aW9uKG5hbWUsIHZhbGlkaXR5KSAvLyBjaGVjayBmb3IgZGVmYXVsdCB2YWxpZGl0eSBvYmplY3RcclxuICAgICBhZGRNZXNzYWdlRm9yVmFsaWRhdGlvbihuYW1lLCBjdXN0b21WYWxpZGl0eSkgLy8gY2hlY2sgZm9yIGN1c3RvbSB2YWxpZGl0eSBvYmplY3RcclxuXHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gYWRkTWVzc2FnZUZvclZhbGlkYXRpb24obmFtZSwgdmFsaWRpdHlPYmplY3QpIHtcclxuICAgICAgZm9yICggbGV0IGtleSBpbiB2YWxpZGl0eU9iamVjdCApIHtcclxuICAgICAgICAvKlxyXG4gICAgICAgICAgdGhlIHZhbGlkaXR5U3RhdGUgb2JqZWN0J3MgcHJvcGV0aWVzIGFyZSBub3QgaXRzIG93blxyXG4gICAgICAgICAgc28gd2UgbXVzdCBub3QgdXNlIHRoZSAuaGFzT3duUHJvcGVydHkgZmlsdGVyXHJcblxyXG4gICAgICAgICAgdGhlIHZhbGlkaXR5U3RhdGUgb2JqZWN0IGhhcyBhIFwidmFsaWRcIiBwcm9wZXJ0eVxyXG4gICAgICAgICAgdGhhdCBpcyB0cnVlIHdoZW4gdGhlIGlucHV0IGlzIHZhbGlkIGFuZCBmYWxzZSBvdGhlcndpc2VcclxuICAgICAgICAgIGl0J3Mgbm90IHJlYWxseSBhbiBlcnJvci1yZWxhdGVkIHByb3BlcnR5IHNvIHdlIGlnbm9yZSBpdFxyXG4gICAgICAgICovXHJcbiAgICAgICAgaWYoa2V5ID09PSAndmFsaWQnKSBjb250aW51ZVxyXG5cclxuICAgICAgICAvKlxyXG4gICAgICAgICAgdGhlIHByb3BlcnR5IGlzIHNldCB0byB0cnVlIHdoZW4gdGhlIGNvbmRpdGlvbiBpcyBub3QgbWV0XHJcbiAgICAgICAgICBlLmcgYW4gZW1wdHkgcmVxdWlyZWQgZmllbGQgaGFzIHRoZSB2YWx1ZU1pc3NpbmcgcHJvcGVydHkgc2V0IHRvIHRydWVcclxuICAgICAgICAqL1xyXG4gICAgICAgIGNvbnN0IGlzVmFsaWQgPSB2YWxpZGl0eU9iamVjdFtrZXldID09PSBmYWxzZVxyXG5cclxuICAgICAgICBjb25zdCBtZXNzYWdlcyA9ICQkKGBbZGF0YS1lcnJvcnMtZm9yPVwiJHtuYW1lfVwiXSBbZGF0YS1lcnJvcnMtd2hlbj1cIiR7a2V5fVwiXWAsIGZvcm0pXHJcblxyXG4gICAgICAgIG1lc3NhZ2VzLmZvckVhY2goZnVuY3Rpb24gKG1lc3NhZ2UpIHtcclxuICAgICAgICAgIGlmKGlzVmFsaWQpIGhpZGUobWVzc2FnZSlcclxuICAgICAgICAgIGVsc2Ugc2hvdyhtZXNzYWdlKVxyXG4gICAgICAgIH0pXHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIHNob3coZWxlbWVudCkge1xyXG4gICAgICBlbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnJ1xyXG4gICAgICBlbGVtZW50LnJlbW92ZUF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nKVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGhpZGUoZWxlbWVudCkge1xyXG4gICAgICBlbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcclxuICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ3RydWUnKVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGluY2x1ZGVzQ2FjaGUgPSB7fVxyXG5cclxuICBmdW5jdGlvbiB1cGRhdGVJbmNsdWRlcyAoKSB7XHJcbiAgICAkJCgnW2RhdGEtaW5jbHVkZV0nLCBmb3JtKS5mb3JFYWNoKGZ1bmN0aW9uIChlbGVtZW50KSB7XHJcbiAgICAgIGNvbnN0IGlkID0gZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2RhdGEtaW5jbHVkZScpXHJcbiAgICAgIGlmIChpbmNsdWRlc0NhY2hlW2lkXSA9PSBudWxsKSBpbmNsdWRlc0NhY2hlW2lkXSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKS5pbm5lckhUTUxcclxuICAgICAgZWxlbWVudC5pbm5lckhUTUwgPSBpbmNsdWRlc0NhY2hlW2lkXVxyXG4gICAgfSlcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGFkZExhYmVsKGVsZW1lbnQsIGZvcm0pIHtcclxuICAgICAgY29uc3QgcGFyZW50Tm9kZSA9IGVsZW1lbnQucGFyZW50Tm9kZSxcclxuICAgICAgICAgICAgbmFtZSA9IGVsZW1lbnQuZ2V0QXR0cmlidXRlKCduYW1lJyk7XHJcbiAgICBpZihlbGVtZW50LnZhbHVlKSB7XHJcbiAgICBpZigkJChgW2Zvcj0ke25hbWV9XWAsIGZvcm0pLmxlbmd0aCkgcmV0dXJuIGZhbHNlOyAvLyBpZiBleGlzdFxyXG4gICAgICAgIGNvbnN0IGxhYmVsVGV4dCA9IGVsZW1lbnQuZ2V0QXR0cmlidXRlKCdwbGFjZWhvbGRlcicpLFxyXG4gICAgICAgICAgICAgIGxhYmVsRWxlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xhYmVsJyk7XHJcbiAgICAgICAgICAgICAgbGFiZWxFbGVtLmlubmVySFRNTCA9IGxhYmVsVGV4dDtcclxuICAgICAgICAgICAgICBsYWJlbEVsZW0uc2V0QXR0cmlidXRlKCdmb3InLCBuYW1lKVxyXG4gICAgICAgICAgICAgIC8vcHJlcGVuZCBpdFxyXG4gICAgICAgICAgICAgIHBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKGxhYmVsRWxlbSwgcGFyZW50Tm9kZS5jaGlsZE5vZGVzWzBdKVxyXG4gICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgJCQoYFtmb3I9JHtuYW1lfV1gLCBmb3JtKVswXS5jbGFzc0xpc3QuYWRkKCdhbmltYXRpb24nKVxyXG4gICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICQkKGBbZm9yPSR7bmFtZX1dYCwgZm9ybSkubGVuZ3RoID8gJCQoYFtmb3I9JHtuYW1lfV1gLCBmb3JtKVswXS5yZW1vdmUoKSA6ICcnO1xyXG4gICAgfVxyXG4gIH1cclxuICAgIC8qIGluaXQgKi9cclxuICAgIGZvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0Jywgb25TdWJtaXQsIGZhbHNlKTtcclxuXHJcbiAgICBmb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgIGNvbnN0IHRhcmdldCA9IGV2ZW50LnRhcmdldFxyXG5cclxuICAgICAgc2V0U3RhdGUodGFyZ2V0LCAnY2hhbmdlZCcsIHRydWUpXHJcbiAgICAgIHZhbGlkYXRlKHRhcmdldClcclxuICAgICAgXHJcbiAgICB9LCBmYWxzZSlcclxuXHJcbiAgICBnZXRGb3JtQ2hpbGRyZW4oZm9ybSkuZm9yRWFjaChmdW5jdGlvbihlbGVtZW50KSB7XHJcbiAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBmdW5jdGlvbihldmVudCkge1xyXG4gICAgICAgIGNvbnN0IHRhcmdldCA9IGV2ZW50LnRhcmdldFxyXG4gICAgICAgIGFkZExhYmVsKHRhcmdldCwgZm9ybSlcclxuICAgICAgfSwgZmFsc2UpXHJcbiAgICB9KVxyXG5cclxuICAgIFxyXG4gICAgJCQoJ1tkYXRhLWVycm9ycy13aGVuXScsIGZvcm0pLmZvckVhY2goaGlkZSlcclxuICAgIFxyXG4gICAgdXBkYXRlSW5jbHVkZXMoKVxyXG4gICAgJCQoJ1tkYXRhLWVycm9ycy13aGVuXScsIGZvcm0pLmZvckVhY2goaGlkZSlcclxuICAgIHJldHVybiBwcm9wcztcclxuICB9XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEZvcm1WYWxpZGF0aW9uO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2pzL3ZhbGlkYXRpb24uanMiLCIvKlxyXG5cdGRlc2M6IGNvbW1vbiBmaW5jdGlvbmFsaXRpZXNcclxuKi9cclxudmFyIFV0aWxzID0gKGZ1bmN0aW9uICgpIHtcclxuXHJcblx0XHRmdW5jdGlvbiAkJCAoc2VsZWN0b3IsIHBhcmVudFNlbGVjdG9yKSB7XHJcblx0ICAgICAgcmV0dXJuIFtdLnNsaWNlLmNhbGwocGFyZW50U2VsZWN0b3IucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvcikpXHJcblx0ICAgIH1cclxuXHJcblx0ICAgIGZ1bmN0aW9uIGdldEZvcm1DaGlsZHJlbiAoZm9ybSkge1xyXG5cdCAgICAgIHJldHVybiAkJCgnaW5wdXQnLCBmb3JtKVxyXG5cdCAgICAgICAgICAuZmlsdGVyKGZ1bmN0aW9uKGNoaWxkKSB7XHJcblx0ICAgICAgICAgICAgY29uc3QgdHlwZSA9IGNoaWxkLmdldEF0dHJpYnV0ZSgnbmFtZScpXHJcblx0ICAgICAgICAgICAgY29uc3Qgbm90VmFsaWRhYmxlRWxlbWVudHMgPSBbXCJidXR0b25cIiwgXCJzdWJtaXRcIiwgXCJyZXNldFwiLCBcImZpbGVcIl1cclxuXHQgICAgICAgICAgICByZXR1cm4gbm90VmFsaWRhYmxlRWxlbWVudHMuaW5kZXhPZih0eXBlKSA9PT0gLTFcclxuXHQgICAgICAgICAgfSlcclxuXHQgICAgICAgICAgLmNvbmNhdCgkJCgndGV4dGFyZWEsIHNlbGVjdCcsIGZvcm0pKVxyXG5cdCAgICB9XHJcblx0ICAgIFxyXG5cdCAgICBmdW5jdGlvbiBhZGRDb21tYXMobnVtYmVyKSB7XHJcblx0XHRcdHJldHVybiBudW1iZXIudG9GaXhlZCgwKS5yZXBsYWNlKC8oXFxkKSg/PShcXGRcXGRcXGQpKyg/IVxcZCkpL2csIFwiJDEsXCIpO1xyXG5cdFx0fVxyXG5cdCAgICByZXR1cm4ge1xyXG5cdCAgICBcdCQkOiAkJCxcclxuXHQgICAgXHRnZXRGb3JtQ2hpbGRyZW46IGdldEZvcm1DaGlsZHJlblxyXG5cdCAgICB9XHJcbn0pKClcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gVXRpbHNcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9qcy9jb21tb24uanMiLCIvKlxyXG5cdERlc2M6IGFkZCBjdXN0b20gdmFsaWRhdGlvblxyXG4qL1xyXG5cclxuY29uc3Qgcm91dGluZXMgPSB7XHJcbiAgY2hlY2tHcmVhdGVyVGhhbjogcmVxdWlyZSgnLi9yb3V0aW5lcy9ncmVhdGVydGhhbicpXHJcbn1cclxuXHJcbjtbSFRNTElucHV0RWxlbWVudF0uZm9yRWFjaChmdW5jdGlvbiAoY29uc3RydWN0b3IpIHtcclxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoY29uc3RydWN0b3IucHJvdG90eXBlLCAnY3VzdG9tVmFsaWRpdHknLCB7XHJcblx0XHRnZXQoKSB7XHJcblx0XHRcdGNvbnN0IGN1c3RvbVZhbGlkaXR5ID0geyB2YWxpZDogdHJ1ZSB9XHJcblxyXG5cdFx0XHRmb3IobGV0IG5hbWUgaW4gcm91dGluZXMpIHtcclxuXHRcdFx0XHRpZighcm91dGluZXMuaGFzT3duUHJvcGVydHkobmFtZSkpIGNvbnRpbnVlXHJcblxyXG5cdFx0XHRcdGN1c3RvbVZhbGlkaXR5W25hbWVdID0gcm91dGluZXNbbmFtZV0odGhpcylcclxuXHRcdFx0XHRpZiAoY3VzdG9tVmFsaWRpdHlbbmFtZV0gPT09IHRydWUpIGN1c3RvbVZhbGlkaXR5LnZhbGlkID0gZmFsc2VcclxuXHRcdFx0fVxyXG5cdFx0cmV0dXJuIGN1c3RvbVZhbGlkaXR5XHJcblx0XHR9LFxyXG5cdFx0Y29uZmlndXJhYmxlOiB0cnVlXHJcblx0fSlcclxufSlcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9qcy9hZGRjdXN0b20tdmFsaWRhdGlvbi5qcyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGlucHV0KSB7XHJcblx0aWYoIWlucHV0Lmhhc0F0dHJpYnV0ZSgnZ3JlYXRlclRoYW4nKSkgcmV0dXJuIGZhbHNlXHJcblx0XHRjb25zb2xlLmxvZygnbm90IGdyZWF0ZXIgdGhhbicpXHJcblx0Y29uc3QgdHlwZSA9IGlucHV0LmdldEF0dHJpYnV0ZSgndHlwZScpIHx8IGlucHV0LnRhZ05hbWUudG9Mb3dlckNhc2UoKVxyXG5cclxuXHRpZih0eXBlID09PSAnY2hlY2tib3gnKSByZXR1cm4gaW5wdXQuY2hlY2tlZCAhPT0gdHJ1ZVxyXG5cdGlmKHR5cGUgIT09ICdyYWRpbycgJiYgdHlwZSAhPT0gJ3JhbmdlJykge1xyXG5cclxuXHRcdGNvbnN0IHZhbHVlMSA9IE51bWJlcihpbnB1dC52YWx1ZSkgLy8gdmFsdWUxXHJcblx0XHRjb25zdCBjb21wYXJld3RpaEVsbSA9IGlucHV0LmdldEF0dHJpYnV0ZSgnZ3JlYXRlclRoYW4nKVxyXG5cdFx0Y29uc3QgdmFsdWUyID0gTnVtYmVyKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYFtuYW1lPVwiJHtjb21wYXJld3RpaEVsbX1cIl1gKS52YWx1ZSkgLy8gdmFsdWUyXHJcblx0XHRjb25zb2xlLmxvZygnY29tcGFyZScsIHZhbHVlMSA+IHZhbHVlMilcclxuXHJcblx0XHRyZXR1cm4gKHZhbHVlMSA8IHZhbHVlMilcclxuXHR9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vanMvcm91dGluZXMvZ3JlYXRlcnRoYW4uanMiLCIvKlxyXG5cdERlc2M6IE1DQSBBUFIgQ2FsY3VsYXRvclxyXG4qL1xyXG5cclxuaW1wb3J0IFV0aWxzIGZyb20gJy4vY29tbW9uJ1xyXG5cclxuXHJcbmZ1bmN0aW9uIEFQUkNhbGN1bGF0b3IoZm9ybSkge1xyXG5cdGNvbnNvbGUubG9nKCdtY2FDYWxjdWxhdG9yMTExJylcclxuXHR2YXIgY3VycmVudE9iamVjdCA9IHRoaXM7XHJcblx0dGhpcy5pbnB1dFZhbHVlcyA9IHtcclxuXHRcdGlucHV0Rm9ybVZhbHVlczogY3JlYXRlRm9ybVZhbHVlc09iamVjdChmb3JtKSxcclxuXHR9XHJcbi8qXHJcblx0Y29uc3QgZGFpbHlQYXltZW50QSA9IGRhaWx5UGF5bWVudC5jYWxsKHRoaXMpXHJcblx0Y29uc3QgZGF5c1RvUmVwYXlBID0gZGF5c1RvUmVwYXkuY2FsbCh0aGlzKVxyXG5cdFxyXG5cdHRoaXMub3V0cHV0VmFsdWVzID0gIHtcclxuXHRcdGNhbGN1bGF0ZWRWYWx1ZXM6IHtcclxuXHRcdFx0ZGFpbHlQYXltZW50OiBkYWlseVBheW1lbnRBLFxyXG5cdFx0XHRkYXlzVG9SZXBheTogZGF5c1RvUmVwYXlBXHJcblx0XHR9XHJcblx0fSovXHJcblx0dmFyXHRjdW11bGF0aXZlVmFsdWVzID0gW107XHJcblx0Ly8gdGhpcy5zZXF1aWVudGlhbGx5UnVuRm4gPSB0aGlzLnNlcXVpZW50aWFsbHlSdW5Gbi5iaW5kKHRoaXMpO1xyXG5cclxuXHRzZXF1aWVudGlhbGx5UnVuRm4uY2FsbCh0aGlzLCBkYWlseVBheW1lbnQsIGRheXNUb1JlcGF5KVxyXG5cdFxyXG5cdFxyXG5cdGZ1bmN0aW9uIGdldFZhbHVlcyhlbGVtZW50TmFtZSwgZm9ybSkge1xyXG5cdFx0cmV0dXJuIFV0aWxzLiQkKGBbbmFtZT0ke2VsZW1lbnROYW1lfV1gLCBmb3JtKVswXS52YWx1ZTtcclxuXHR9XHJcblx0XHJcblx0ZnVuY3Rpb24gY3JlYXRlRm9ybVZhbHVlc09iamVjdChmb3JtKSB7XHJcblx0XHRjb25zdCBPYmogPSB7fVxyXG5cdFx0XHRcdFV0aWxzLmdldEZvcm1DaGlsZHJlbihmb3JtKS5mb3JFYWNoKGZ1bmN0aW9uKGVsZW1lbnQpIHtcclxuXHRcdFx0XHRjb25zdCBlbGVtZW50TmFtZSA9IGVsZW1lbnQuZ2V0QXR0cmlidXRlKCduYW1lJyk7XHJcblx0XHRcdFx0XHRPYmpbZWxlbWVudE5hbWVdID0gZ2V0VmFsdWVzKGVsZW1lbnROYW1lLCBmb3JtKVxyXG5cdFx0XHQgICB9KVxyXG5cdFx0cmV0dXJuIE9iajtcclxuXHR9XHJcblxyXG5cdC8vIGFwcHJveCBkYWlseSBQYXltZW50ID0gKEVzdGltYXRlZCBtb250aGx5IGNhcmQgc2FsZXMgLyAzMCkgKiBwZXJjZW50YWdlX2Z1dHVyZV9jYXJkX3NhbGVzXHJcblx0ZnVuY3Rpb24gZGFpbHlQYXltZW50KCkge1xyXG5cdFx0Y29uc3QgZGFpbHlQYXltZW50QW1vdW50ID0gKHRoaXMuaW5wdXRWYWx1ZXMuaW5wdXRGb3JtVmFsdWVzLnByb2plY3RlZE1DUy8zMCkgKiAodGhpcy5pbnB1dFZhbHVlcy5pbnB1dEZvcm1WYWx1ZXMucGVyY2VudGFnZUZDUy8xMDApO1xyXG5cdFx0cmV0dXJuIGRhaWx5UGF5bWVudEFtb3VudC50b0ZpeGVkKDApO1xyXG5cdH1cclxuXHQvLyBhcHByb3guICMgRGF5cyB0byBSZXBheSA9IFBheWJhY2sgQW1vdW50IC8gRGFpbHkgUGF5bWVudFxyXG5cdGZ1bmN0aW9uIGRheXNUb1JlcGF5KCkge1xyXG5cdFx0Y29uc3QgZGF5c1RvUmVwYXkgPSAodGhpcy5pbnB1dFZhbHVlcy5pbnB1dEZvcm1WYWx1ZXMucGF5YmFja0Ftb3VudCAvIGRhaWx5UGF5bWVudEEpO1xyXG5cdFx0cmV0dXJuIGFkZENvbW1hcyhkYXlzVG9SZXBheSk7XHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBjYWxjdWxhdGVkVmFsdWVzKCl7XHJcblx0XHR2YXIgY2FsY3VsYXRlZFZhbHVlcyA9IHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0ZGFpbHlQYXltZW50QW1vdW50OiBkYWlseVBheW1lbnQoKSxcclxuXHRcdFx0XHRcdFx0XHRcdFx0ZGF5c1RvUmVwYXk6IGRheXNUb1JlcGF5KClcclxuXHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdHJldHVybiBjYWxjdWxhdGVkVmFsdWVzO1xyXG5cdH1cclxuXHJcblx0Ly8gdXRpbGl0eSBmdW5jdGlvbnNcclxuXHRmdW5jdGlvbiBhZGRDb21tYXMobnVtYmVyKSB7XHJcblx0XHRcdHJldHVybiBudW1iZXIudG9GaXhlZCgwKS5yZXBsYWNlKC8oXFxkKSg/PShcXGRcXGRcXGQpKyg/IVxcZCkpL2csIFwiJDEsXCIpO1xyXG5cdFx0fVxyXG5cclxuXHRmdW5jdGlvbiBzZXF1aWVudGlhbGx5UnVuRm4oLi4uYXJncykge1xyXG5cdFx0Ly8gdmFyIGFyZ3MgPSBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cyk7XHJcblx0XHRcclxuXHRcdGFyZ3MuZm9yRWFjaChmdW5jdGlvbihuYW1lLCBpbmRleCwgYXJyYXkpIHtcclxuXHRcdFx0Y3VtdWxhdGl2ZVZhbHVlc1tpbmRleF0gPSB7XHJcblx0XHRcdFx0W25hbWVdOiBhcnJheVtpbmRleF0uY2FsbChjdXJyZW50T2JqZWN0KVx0XHJcblx0XHRcdH0gXHJcblx0XHR9KVxyXG5cdFx0cmV0dXJuIGN1bXVsYXRpdmVWYWx1ZXM7XHJcblx0fVxyXG5cclxuXHRyZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5pbnB1dFZhbHVlcywgdGhpcy5vdXRwdXRWYWx1ZXMpIDtcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBBUFJDYWxjdWxhdG9yO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2pzL21jYUNhbGN1bGF0b3IuanMiXSwic291cmNlUm9vdCI6IiJ9