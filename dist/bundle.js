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


var _validation = __webpack_require__(2);

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
		var APRcalc = new _mcaCalculator2.default(form);
		APRcalc.getValues();
}

var formValidatonInstance = (0, _validation2.default)(form, callbackFn);

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
	desc: common finctionalities
*/

function Utils() {

	return {

		$$: function $$(selector) {
			return [].slice.call(document.querySelectorAll(selector));
		},

		getFormChildren: function getFormChildren() {
			return $$('input').filter(function (child) {
				var type = child.getAttribute('name');
				var notValidableElements = ["button", "submit", "reset", "file"];
				return notValidableElements.indexOf(type) === -1;
			}).concat($$('textarea, select'));
		}
	};
}

module.exports = Utils;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _common = __webpack_require__(1);

var _common2 = _interopRequireDefault(_common);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

__webpack_require__(3); // require('./html5validation');

var UtilsObj = new _common2.default();
var $$ = UtilsObj.$$;
var getFormChildren = UtilsObj.getFormChildren;

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
    getFormChildren().forEach(validate);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    onSubmitCallback.apply(props, args);
  }

  function setState(target, state, value) {
    var name = target.getAttribute('name');
    var statesForElements = $$('[data-states-for="' + name + '"]');
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

      var messages = $$('[data-errors-for="' + name + '"] [data-errors-when="' + key + '"]');

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
    $$('[data-include]').forEach(function (element) {
      var id = element.getAttribute('data-include');
      if (includesCache[id] == null) includesCache[id] = document.getElementById(id).innerHTML;
      element.innerHTML = includesCache[id];
    });
  }

  function addLabel(element) {
    var parentNode = element.parentNode,
        name = element.getAttribute('name');
    if (element.value) {
      if ($$('[for=' + name + ']').length) return false; // if exist
      var labelText = element.getAttribute('placeholder'),
          labelElem = document.createElement('label');
      labelElem.innerHTML = labelText;
      labelElem.setAttribute('for', name);
      //prepend it
      parentNode.insertBefore(labelElem, parentNode.childNodes[0]);

      $$('[for=' + name + ']')[0].classList.add('animation');
    } else {

      $$('[for=' + name + ']')[0].length ? $$('[for=' + name + ']')[0].remove() : '';
    }
  }
  /* init */
  form.addEventListener('submit', onSubmit, false);

  form.addEventListener('change', function (event) {
    var target = event.target;

    setState(target, 'changed', true);
    validate(target);
  }, false);

  form.addEventListener('keyup', function (event) {
    var target = event.target;
    addLabel(target);
  }, false);

  $$('[data-errors-when]').forEach(hide);

  updateIncludes();
  $$('[data-errors-when]').forEach(hide);
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


/*
	Desc: MCA APR Calculator
*/

function APRCalculator(form) {
	console.log('mcaCalculator');
	var formValidationFunctions = new FormValidation();

	var props = {
		getValues: getValues,
		formValues: createFormValuesObject()
	};

	function $$(selector) {
		return [].slice.call(form.querySelectorAll(selector));
	}

	function getValues(elementName) {
		return $$('[name=' + elementName + ']')[0].value;
	}

	function createFormValuesObject() {
		console.log(formValidationFunctions.getFormChildren());
	}

	return props;
}

module.exports = APRCalculator;

/***/ })
/******/ ]);
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBjNmFhNTAwZDhlNTA0Y2VjNzI2ZSIsIndlYnBhY2s6Ly8vLi9qcy9hcHAuanMiLCJ3ZWJwYWNrOi8vLy4vanMvY29tbW9uLmpzIiwid2VicGFjazovLy8uL2pzL3ZhbGlkYXRpb24uanMiLCJ3ZWJwYWNrOi8vLy4vanMvYWRkY3VzdG9tLXZhbGlkYXRpb24uanMiLCJ3ZWJwYWNrOi8vLy4vanMvcm91dGluZXMvZ3JlYXRlcnRoYW4uanMiLCJ3ZWJwYWNrOi8vLy4vanMvbWNhQ2FsY3VsYXRvci5qcyJdLCJuYW1lcyI6WyJmb3JtIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsImNhbGxiYWNrRm4iLCJldmVudCIsInByZXZlbnREZWZhdWx0IiwiQVBSY2FsYyIsImdldFZhbHVlcyIsImZvcm1WYWxpZGF0b25JbnN0YW5jZSIsIlV0aWxzIiwiJCQiLCJzZWxlY3RvciIsInNsaWNlIiwiY2FsbCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJnZXRGb3JtQ2hpbGRyZW4iLCJmaWx0ZXIiLCJjaGlsZCIsInR5cGUiLCJnZXRBdHRyaWJ1dGUiLCJub3RWYWxpZGFibGVFbGVtZW50cyIsImluZGV4T2YiLCJjb25jYXQiLCJtb2R1bGUiLCJleHBvcnRzIiwicmVxdWlyZSIsIlV0aWxzT2JqIiwiRm9ybVZhbGlkYXRpb24iLCJvblN1Ym1pdENhbGxiYWNrIiwicHJvcHMiLCJ1cGRhdGVNZXNzYWdlIiwidXBkYXRlSW5jbHVkZXMiLCJpc1ZhbGlkIiwiY2hlY2tWYWxpZGl0eSIsImJpbmQiLCJvblN1Ym1pdCIsImNvbnNvbGUiLCJsb2ciLCJzZXRTdGF0ZSIsInZhbGlkYXRlIiwiZm9yRWFjaCIsImFyZ3MiLCJhcHBseSIsInRhcmdldCIsInN0YXRlIiwidmFsdWUiLCJuYW1lIiwic3RhdGVzRm9yRWxlbWVudHMiLCJlbGVtZW50cyIsImNsYXNzTmFtZSIsImVsZW1lbnQiLCJjbGFzc0xpc3QiLCJhZGQiLCJyZW1vdmUiLCJyZW1vdmVBdHRyaWJ1dGUiLCJzZXRBdHRyaWJ1dGUiLCJ2YWxpZGl0eSIsImN1c3RvbVZhbGlkaXR5IiwiYWRkTWVzc2FnZUZvclZhbGlkYXRpb24iLCJ2YWxpZGl0eU9iamVjdCIsImtleSIsIm1lc3NhZ2VzIiwibWVzc2FnZSIsImhpZGUiLCJzaG93Iiwic3R5bGUiLCJkaXNwbGF5IiwiaW5jbHVkZXNDYWNoZSIsImlkIiwiaW5uZXJIVE1MIiwiYWRkTGFiZWwiLCJwYXJlbnROb2RlIiwibGVuZ3RoIiwibGFiZWxUZXh0IiwibGFiZWxFbGVtIiwiY3JlYXRlRWxlbWVudCIsImluc2VydEJlZm9yZSIsImNoaWxkTm9kZXMiLCJhZGRFdmVudExpc3RlbmVyIiwicm91dGluZXMiLCJjaGVja0dyZWF0ZXJUaGFuIiwiSFRNTElucHV0RWxlbWVudCIsImNvbnN0cnVjdG9yIiwiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJwcm90b3R5cGUiLCJnZXQiLCJ2YWxpZCIsImhhc093blByb3BlcnR5IiwiY29uZmlndXJhYmxlIiwiaW5wdXQiLCJoYXNBdHRyaWJ1dGUiLCJ0YWdOYW1lIiwidG9Mb3dlckNhc2UiLCJjaGVja2VkIiwidmFsdWUxIiwiTnVtYmVyIiwiY29tcGFyZXd0aWhFbG0iLCJ2YWx1ZTIiLCJxdWVyeVNlbGVjdG9yIiwiQVBSQ2FsY3VsYXRvciIsImZvcm1WYWxpZGF0aW9uRnVuY3Rpb25zIiwiZm9ybVZhbHVlcyIsImNyZWF0ZUZvcm1WYWx1ZXNPYmplY3QiLCJlbGVtZW50TmFtZSJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87QUNWQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FB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NUIsRUFBK0IzRCxLQUF0QztBQUNBOztBQUVELFVBQVMwRCxzQkFBVCxHQUFrQztBQUNqQ25FLFVBQVFDLEdBQVIsQ0FBWWdFLHdCQUF3QnRGLGVBQXhCLEVBQVo7QUFDQTs7QUFFRCxRQUFPYyxLQUFQO0FBQ0E7O0FBRUROLE9BQU9DLE9BQVAsR0FBaUI0RSxhQUFqQixDIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcImZvcm1WYWxpZGF0aW9uXCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcImZvcm1WYWxpZGF0aW9uXCJdID0gZmFjdG9yeSgpO1xufSkodHlwZW9mIHNlbGYgIT09ICd1bmRlZmluZWQnID8gc2VsZiA6IHRoaXMsIGZ1bmN0aW9uKCkge1xucmV0dXJuIFxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvYXNzZXRzL1wiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGM2YWE1MDBkOGU1MDRjZWM3MjZlIiwiLypcclxuXHREZXNjOiBGb3JtIHZhbGlkYXRpb25cclxuKi9cclxuXHJcbmltcG9ydCBGb3JtVmFsaWRhdGlvbiBmcm9tICcuL3ZhbGlkYXRpb24nO1xyXG5pbXBvcnQgQVBSQ2FsY3VsYXRvciBmcm9tICcuL21jYUNhbGN1bGF0b3InO1xyXG5cclxuXHJcblxyXG52YXIgZm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhcHJDYWxjJyk7XHJcblxyXG5mdW5jdGlvbiBjYWxsYmFja0ZuKGV2ZW50KSB7XHJcblx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0dmFyIEFQUmNhbGMgPSBuZXcgQVBSQ2FsY3VsYXRvcihmb3JtKTtcclxuXHRcdEFQUmNhbGMuZ2V0VmFsdWVzKCk7XHJcbn1cclxuXHJcbnZhciBmb3JtVmFsaWRhdG9uSW5zdGFuY2UgPSBGb3JtVmFsaWRhdGlvbihmb3JtLCBjYWxsYmFja0ZuKTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vanMvYXBwLmpzIiwiLypcclxuXHRkZXNjOiBjb21tb24gZmluY3Rpb25hbGl0aWVzXHJcbiovXHJcblxyXG5mdW5jdGlvbiBVdGlscygpIHtcclxuXHJcblx0cmV0dXJuIHtcclxuXHJcblx0XHQkJDogZnVuY3Rpb24gKHNlbGVjdG9yKSB7XHJcblx0ICAgICAgcmV0dXJuIFtdLnNsaWNlLmNhbGwoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvcikpXHJcblx0ICAgIH0sXHJcblxyXG5cdCAgICBnZXRGb3JtQ2hpbGRyZW46IGZ1bmN0aW9uICgpIHtcclxuXHQgICAgICByZXR1cm4gJCQoJ2lucHV0JylcclxuXHQgICAgICAgICAgLmZpbHRlcihmdW5jdGlvbihjaGlsZCkge1xyXG5cdCAgICAgICAgICAgIGNvbnN0IHR5cGUgPSBjaGlsZC5nZXRBdHRyaWJ1dGUoJ25hbWUnKVxyXG5cdCAgICAgICAgICAgIGNvbnN0IG5vdFZhbGlkYWJsZUVsZW1lbnRzID0gW1wiYnV0dG9uXCIsIFwic3VibWl0XCIsIFwicmVzZXRcIiwgXCJmaWxlXCJdXHJcblx0ICAgICAgICAgICAgcmV0dXJuIG5vdFZhbGlkYWJsZUVsZW1lbnRzLmluZGV4T2YodHlwZSkgPT09IC0xXHJcblx0ICAgICAgICAgIH0pXHJcblx0ICAgICAgICAgIC5jb25jYXQoJCQoJ3RleHRhcmVhLCBzZWxlY3QnKSlcclxuXHQgICAgfVxyXG5cdH1cclxuXHJcbn1cclxuXHJcblxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBVdGlsc1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2pzL2NvbW1vbi5qcyIsIi8vIHJlcXVpcmUoJy4vaHRtbDV2YWxpZGF0aW9uJyk7XHJcblxyXG5pbXBvcnQgVXRpbHMgZnJvbSAnLi9jb21tb24nXHJcblxyXG5yZXF1aXJlKCcuL2FkZGN1c3RvbS12YWxpZGF0aW9uJyk7XHJcbiAgY29uc3QgVXRpbHNPYmogPSBuZXcgVXRpbHMoKTtcclxuICBjb25zdCAkJCA9IFV0aWxzT2JqLiQkO1xyXG4gIGNvbnN0IGdldEZvcm1DaGlsZHJlbiA9IFV0aWxzT2JqLmdldEZvcm1DaGlsZHJlbjtcclxuXHJcbiAgZnVuY3Rpb24gRm9ybVZhbGlkYXRpb24oZm9ybSwgb25TdWJtaXRDYWxsYmFjayA9IGZ1bmN0aW9uICgpIHt9KSB7XHJcblxyXG4gICAgLyogcHJvcHMgKi9cclxuXHJcbiAgICBjb25zdCBwcm9wcyA9IHtcclxuICAgICAgdXBkYXRlTWVzc2FnZSxcclxuICAgICAgdXBkYXRlSW5jbHVkZXMsXHJcbiAgICAgIGlzVmFsaWQ6IGZvcm0uY2hlY2tWYWxpZGl0eS5iaW5kKGZvcm0pXHJcbiAgICB9XHJcblxyXG4gICAgLyogZnVuY3Rpb24gKi9cclxuICAgIGZ1bmN0aW9uIG9uU3VibWl0KC4uLmFyZ3MpIHtcclxuICAgICAgY29uc29sZS5sb2coJ2Zvcm0gc3VibWl0dGVkJyk7XHJcbiAgICAgIHNldFN0YXRlKGZvcm0sICdzdWJtaXR0ZWQnLCB0cnVlKTtcclxuICAgICAgdmFsaWRhdGUoZm9ybSlcclxuICAgICAgZ2V0Rm9ybUNoaWxkcmVuKCkuZm9yRWFjaCh2YWxpZGF0ZSlcclxuICAgICAgb25TdWJtaXRDYWxsYmFjay5hcHBseShwcm9wcywgYXJncylcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBzZXRTdGF0ZSh0YXJnZXQsIHN0YXRlLCB2YWx1ZSkge1xyXG4gICAgICBjb25zdCBuYW1lID0gdGFyZ2V0LmdldEF0dHJpYnV0ZSgnbmFtZScpO1xyXG4gICAgICBjb25zdCBzdGF0ZXNGb3JFbGVtZW50cyA9ICQkKGBbZGF0YS1zdGF0ZXMtZm9yPVwiJHtuYW1lfVwiXWApO1xyXG4gICAgICBjb25zdCBlbGVtZW50cyA9IFt0YXJnZXRdLmNvbmNhdChzdGF0ZXNGb3JFbGVtZW50cylcclxuICAgICAgY29uc3QgY2xhc3NOYW1lID0gYGlzLSR7c3RhdGV9YFxyXG5cclxuICAgICAgaWYodmFsdWUpIGVsZW1lbnRzLmZvckVhY2goZWxlbWVudCA9PiBlbGVtZW50LmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKSlcclxuICAgICAgZWxzZSBlbGVtZW50cy5mb3JFYWNoKGVsZW1lbnQgPT4gZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKGNsYXNzTmFtZSkpXHJcbiAgICB9XHJcblxyXG4gICAgLypmdW5jdGlvbiAkJCAoc2VsZWN0b3IpIHtcclxuICAgICAgcmV0dXJuIFtdLnNsaWNlLmNhbGwoZm9ybS5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKSlcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBnZXRGb3JtQ2hpbGRyZW4gKCkge1xyXG4gICAgICByZXR1cm4gJCQoJ2lucHV0JylcclxuICAgICAgICAgIC5maWx0ZXIoZnVuY3Rpb24oY2hpbGQpIHtcclxuICAgICAgICAgICAgY29uc3QgdHlwZSA9IGNoaWxkLmdldEF0dHJpYnV0ZSgnbmFtZScpXHJcbiAgICAgICAgICAgIGNvbnN0IG5vdFZhbGlkYWJsZUVsZW1lbnRzID0gW1wiYnV0dG9uXCIsIFwic3VibWl0XCIsIFwicmVzZXRcIiwgXCJmaWxlXCJdXHJcbiAgICAgICAgICAgIHJldHVybiBub3RWYWxpZGFibGVFbGVtZW50cy5pbmRleE9mKHR5cGUpID09PSAtMVxyXG4gICAgICAgICAgfSlcclxuICAgICAgICAgIC5jb25jYXQoJCQoJ3RleHRhcmVhLCBzZWxlY3QnKSlcclxuICAgIH0qL1xyXG5cclxuICAgIGZ1bmN0aW9uIHZhbGlkYXRlIChlbGVtZW50KSB7XHJcbiAgICAgIGlmKGVsZW1lbnQuY2hlY2tWYWxpZGl0eSgpKSB7XHJcbiAgICAgICAgZWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoJ2FyaWEtaW52YWxpZCcpXHJcbiAgICAgICAgc2V0U3RhdGUoZWxlbWVudCwgJ3ZhbGlkJywgdHJ1ZSkgLy8gYWRkIGNsYXNzIGlzLXZhbGlkXHJcbiAgICAgICAgc2V0U3RhdGUoZWxlbWVudCwgJ2ludmFsaWQnLCBmYWxzZSkgLy8gcmVtb3ZlIGNsYXNzIGlzLWludmFsaWRcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcImludmFsaWRcIilcclxuICAgICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZSgnYXJpYS1pbnZhbGlkJywgJ3RydWUnKTtcclxuICAgICAgICBzZXRTdGF0ZShlbGVtZW50LCAndmFsaWQnLCBmYWxzZSkgLy8gcmVtb3ZlIGNsYXNzIGlzLXZhbGlkXHJcbiAgICAgICAgc2V0U3RhdGUoZWxlbWVudCwgJ2ludmFsaWQnLCB0cnVlKSAvLyBhZGQgY2xhc3MgaXMtaW52YWxpZFxyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBzaG93ICYgaGlkZSByZWxldmFudCBtZXNzYWdlc1xyXG4gICAgICB1cGRhdGVNZXNzYWdlKGVsZW1lbnQpXHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gdXBkYXRlTWVzc2FnZSAoZWxlbWVudCkge1xyXG4gICAgICBjb25zdCBuYW1lID0gZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ25hbWUnKVxyXG4gICAgICBjb25zdCB2YWxpZGl0eSA9IGVsZW1lbnQudmFsaWRpdHkgXHJcbiAgICAgIGNvbnN0IGN1c3RvbVZhbGlkaXR5ID0gZWxlbWVudC5jdXN0b21WYWxpZGl0eSBcclxuICAgICBhZGRNZXNzYWdlRm9yVmFsaWRhdGlvbihuYW1lLCB2YWxpZGl0eSkgLy8gY2hlY2sgZm9yIGRlZmF1bHQgdmFsaWRpdHkgb2JqZWN0XHJcbiAgICAgYWRkTWVzc2FnZUZvclZhbGlkYXRpb24obmFtZSwgY3VzdG9tVmFsaWRpdHkpIC8vIGNoZWNrIGZvciBjdXN0b20gdmFsaWRpdHkgb2JqZWN0XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGFkZE1lc3NhZ2VGb3JWYWxpZGF0aW9uKG5hbWUsIHZhbGlkaXR5T2JqZWN0KSB7XHJcbiAgICAgIGZvciAoIGxldCBrZXkgaW4gdmFsaWRpdHlPYmplY3QgKSB7XHJcbiAgICAgICAgLypcclxuICAgICAgICAgIHRoZSB2YWxpZGl0eVN0YXRlIG9iamVjdCdzIHByb3BldGllcyBhcmUgbm90IGl0cyBvd25cclxuICAgICAgICAgIHNvIHdlIG11c3Qgbm90IHVzZSB0aGUgLmhhc093blByb3BlcnR5IGZpbHRlclxyXG5cclxuICAgICAgICAgIHRoZSB2YWxpZGl0eVN0YXRlIG9iamVjdCBoYXMgYSBcInZhbGlkXCIgcHJvcGVydHlcclxuICAgICAgICAgIHRoYXQgaXMgdHJ1ZSB3aGVuIHRoZSBpbnB1dCBpcyB2YWxpZCBhbmQgZmFsc2Ugb3RoZXJ3aXNlXHJcbiAgICAgICAgICBpdCdzIG5vdCByZWFsbHkgYW4gZXJyb3ItcmVsYXRlZCBwcm9wZXJ0eSBzbyB3ZSBpZ25vcmUgaXRcclxuICAgICAgICAqL1xyXG4gICAgICAgIGlmKGtleSA9PT0gJ3ZhbGlkJykgY29udGludWVcclxuXHJcbiAgICAgICAgLypcclxuICAgICAgICAgIHRoZSBwcm9wZXJ0eSBpcyBzZXQgdG8gdHJ1ZSB3aGVuIHRoZSBjb25kaXRpb24gaXMgbm90IG1ldFxyXG4gICAgICAgICAgZS5nIGFuIGVtcHR5IHJlcXVpcmVkIGZpZWxkIGhhcyB0aGUgdmFsdWVNaXNzaW5nIHByb3BlcnR5IHNldCB0byB0cnVlXHJcbiAgICAgICAgKi9cclxuICAgICAgICBjb25zdCBpc1ZhbGlkID0gdmFsaWRpdHlPYmplY3Rba2V5XSA9PT0gZmFsc2VcclxuXHJcbiAgICAgICAgY29uc3QgbWVzc2FnZXMgPSAkJChgW2RhdGEtZXJyb3JzLWZvcj1cIiR7bmFtZX1cIl0gW2RhdGEtZXJyb3JzLXdoZW49XCIke2tleX1cIl1gKVxyXG5cclxuICAgICAgICBtZXNzYWdlcy5mb3JFYWNoKGZ1bmN0aW9uIChtZXNzYWdlKSB7XHJcbiAgICAgICAgICBpZihpc1ZhbGlkKSBoaWRlKG1lc3NhZ2UpXHJcbiAgICAgICAgICBlbHNlIHNob3cobWVzc2FnZSlcclxuICAgICAgICB9KVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBzaG93KGVsZW1lbnQpIHtcclxuICAgICAgZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJydcclxuICAgICAgZWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJylcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBoaWRlKGVsZW1lbnQpIHtcclxuICAgICAgZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXHJcbiAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICd0cnVlJylcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBpbmNsdWRlc0NhY2hlID0ge31cclxuXHJcbiAgZnVuY3Rpb24gdXBkYXRlSW5jbHVkZXMgKCkge1xyXG4gICAgJCQoJ1tkYXRhLWluY2x1ZGVdJykuZm9yRWFjaChmdW5jdGlvbiAoZWxlbWVudCkge1xyXG4gICAgICBjb25zdCBpZCA9IGVsZW1lbnQuZ2V0QXR0cmlidXRlKCdkYXRhLWluY2x1ZGUnKVxyXG4gICAgICBpZiAoaW5jbHVkZXNDYWNoZVtpZF0gPT0gbnVsbCkgaW5jbHVkZXNDYWNoZVtpZF0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCkuaW5uZXJIVE1MXHJcbiAgICAgIGVsZW1lbnQuaW5uZXJIVE1MID0gaW5jbHVkZXNDYWNoZVtpZF1cclxuICAgIH0pXHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBhZGRMYWJlbChlbGVtZW50KSB7XHJcbiAgICAgIGNvbnN0IHBhcmVudE5vZGUgPSBlbGVtZW50LnBhcmVudE5vZGUsXHJcbiAgICAgICAgICAgIG5hbWUgPSBlbGVtZW50LmdldEF0dHJpYnV0ZSgnbmFtZScpO1xyXG4gICAgaWYoZWxlbWVudC52YWx1ZSkge1xyXG4gICAgaWYoJCQoYFtmb3I9JHtuYW1lfV1gKS5sZW5ndGgpIHJldHVybiBmYWxzZTsgLy8gaWYgZXhpc3RcclxuICAgICAgICBjb25zdCBsYWJlbFRleHQgPSBlbGVtZW50LmdldEF0dHJpYnV0ZSgncGxhY2Vob2xkZXInKSxcclxuICAgICAgICAgICAgICBsYWJlbEVsZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsYWJlbCcpO1xyXG4gICAgICAgICAgICAgIGxhYmVsRWxlbS5pbm5lckhUTUwgPSBsYWJlbFRleHQ7XHJcbiAgICAgICAgICAgICAgbGFiZWxFbGVtLnNldEF0dHJpYnV0ZSgnZm9yJywgbmFtZSlcclxuICAgICAgICAgICAgICAvL3ByZXBlbmQgaXRcclxuICAgICAgICAgICAgICBwYXJlbnROb2RlLmluc2VydEJlZm9yZShsYWJlbEVsZW0sIHBhcmVudE5vZGUuY2hpbGROb2Rlc1swXSlcclxuICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICQkKGBbZm9yPSR7bmFtZX1dYClbMF0uY2xhc3NMaXN0LmFkZCgnYW5pbWF0aW9uJylcclxuICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAkJChgW2Zvcj0ke25hbWV9XWApWzBdLmxlbmd0aCA/ICQkKGBbZm9yPSR7bmFtZX1dYClbMF0ucmVtb3ZlKCkgOiAnJztcclxuICAgIH1cclxuICB9XHJcbiAgICAvKiBpbml0ICovXHJcbiAgICBmb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIG9uU3VibWl0LCBmYWxzZSk7XHJcblxyXG4gICAgZm9ybS5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBmdW5jdGlvbihldmVudCkge1xyXG4gICAgICBjb25zdCB0YXJnZXQgPSBldmVudC50YXJnZXRcclxuXHJcbiAgICAgIHNldFN0YXRlKHRhcmdldCwgJ2NoYW5nZWQnLCB0cnVlKVxyXG4gICAgICB2YWxpZGF0ZSh0YXJnZXQpXHJcbiAgICAgIFxyXG4gICAgfSwgZmFsc2UpXHJcblxyXG4gICAgZm9ybS5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgIGNvbnN0IHRhcmdldCA9IGV2ZW50LnRhcmdldFxyXG4gICAgICBhZGRMYWJlbCh0YXJnZXQpXHJcbiAgICB9LCBmYWxzZSlcclxuXHJcbiAgICBcclxuICAgICQkKCdbZGF0YS1lcnJvcnMtd2hlbl0nKS5mb3JFYWNoKGhpZGUpXHJcbiAgICBcclxuICAgIHVwZGF0ZUluY2x1ZGVzKClcclxuICAgICQkKCdbZGF0YS1lcnJvcnMtd2hlbl0nKS5mb3JFYWNoKGhpZGUpXHJcbiAgICByZXR1cm4gcHJvcHM7XHJcbiAgfVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBGb3JtVmFsaWRhdGlvbjtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9qcy92YWxpZGF0aW9uLmpzIiwiLypcclxuXHREZXNjOiBhZGQgY3VzdG9tIHZhbGlkYXRpb25cclxuKi9cclxuXHJcbmNvbnN0IHJvdXRpbmVzID0ge1xyXG4gIGNoZWNrR3JlYXRlclRoYW46IHJlcXVpcmUoJy4vcm91dGluZXMvZ3JlYXRlcnRoYW4nKVxyXG59XHJcblxyXG47W0hUTUxJbnB1dEVsZW1lbnRdLmZvckVhY2goZnVuY3Rpb24gKGNvbnN0cnVjdG9yKSB7XHJcblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGNvbnN0cnVjdG9yLnByb3RvdHlwZSwgJ2N1c3RvbVZhbGlkaXR5Jywge1xyXG5cdFx0Z2V0KCkge1xyXG5cdFx0XHRjb25zdCBjdXN0b21WYWxpZGl0eSA9IHsgdmFsaWQ6IHRydWUgfVxyXG5cclxuXHRcdFx0Zm9yKGxldCBuYW1lIGluIHJvdXRpbmVzKSB7XHJcblx0XHRcdFx0aWYoIXJvdXRpbmVzLmhhc093blByb3BlcnR5KG5hbWUpKSBjb250aW51ZVxyXG5cclxuXHRcdFx0XHRjdXN0b21WYWxpZGl0eVtuYW1lXSA9IHJvdXRpbmVzW25hbWVdKHRoaXMpXHJcblx0XHRcdFx0aWYgKGN1c3RvbVZhbGlkaXR5W25hbWVdID09PSB0cnVlKSBjdXN0b21WYWxpZGl0eS52YWxpZCA9IGZhbHNlXHJcblx0XHRcdH1cclxuXHRcdHJldHVybiBjdXN0b21WYWxpZGl0eVxyXG5cdFx0fSxcclxuXHRcdGNvbmZpZ3VyYWJsZTogdHJ1ZVxyXG5cdH0pXHJcbn0pXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vanMvYWRkY3VzdG9tLXZhbGlkYXRpb24uanMiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpbnB1dCkge1xyXG5cdGlmKCFpbnB1dC5oYXNBdHRyaWJ1dGUoJ2dyZWF0ZXJUaGFuJykpIHJldHVybiBmYWxzZVxyXG5cdFx0Y29uc29sZS5sb2coJ25vdCBncmVhdGVyIHRoYW4nKVxyXG5cdGNvbnN0IHR5cGUgPSBpbnB1dC5nZXRBdHRyaWJ1dGUoJ3R5cGUnKSB8fCBpbnB1dC50YWdOYW1lLnRvTG93ZXJDYXNlKClcclxuXHJcblx0aWYodHlwZSA9PT0gJ2NoZWNrYm94JykgcmV0dXJuIGlucHV0LmNoZWNrZWQgIT09IHRydWVcclxuXHRpZih0eXBlICE9PSAncmFkaW8nICYmIHR5cGUgIT09ICdyYW5nZScpIHtcclxuXHJcblx0XHRjb25zdCB2YWx1ZTEgPSBOdW1iZXIoaW5wdXQudmFsdWUpIC8vIHZhbHVlMVxyXG5cdFx0Y29uc3QgY29tcGFyZXd0aWhFbG0gPSBpbnB1dC5nZXRBdHRyaWJ1dGUoJ2dyZWF0ZXJUaGFuJylcclxuXHRcdGNvbnN0IHZhbHVlMiA9IE51bWJlcihkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBbbmFtZT1cIiR7Y29tcGFyZXd0aWhFbG19XCJdYCkudmFsdWUpIC8vIHZhbHVlMlxyXG5cdFx0Y29uc29sZS5sb2coJ2NvbXBhcmUnLCB2YWx1ZTEgPiB2YWx1ZTIpXHJcblxyXG5cdFx0cmV0dXJuICh2YWx1ZTEgPCB2YWx1ZTIpXHJcblx0fVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2pzL3JvdXRpbmVzL2dyZWF0ZXJ0aGFuLmpzIiwiLypcclxuXHREZXNjOiBNQ0EgQVBSIENhbGN1bGF0b3JcclxuKi9cclxuXHJcbmZ1bmN0aW9uIEFQUkNhbGN1bGF0b3IoZm9ybSkge1xyXG5cdGNvbnNvbGUubG9nKCdtY2FDYWxjdWxhdG9yJylcclxuXHRjb25zdCBmb3JtVmFsaWRhdGlvbkZ1bmN0aW9ucyA9IG5ldyBGb3JtVmFsaWRhdGlvbigpO1xyXG5cclxuXHRjb25zdCBwcm9wcyA9IHtcclxuXHRcdGdldFZhbHVlczogZ2V0VmFsdWVzLFxyXG5cdFx0Zm9ybVZhbHVlczogY3JlYXRlRm9ybVZhbHVlc09iamVjdCgpXHJcblx0fVxyXG5cdFxyXG5cdGZ1bmN0aW9uICQkIChzZWxlY3Rvcikge1xyXG4gICAgICByZXR1cm4gW10uc2xpY2UuY2FsbChmb3JtLnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpKVxyXG4gICAgfVxyXG5cclxuXHRmdW5jdGlvbiBnZXRWYWx1ZXMoZWxlbWVudE5hbWUpIHtcclxuXHRcdHJldHVybiAkJChgW25hbWU9JHtlbGVtZW50TmFtZX1dYClbMF0udmFsdWU7XHJcblx0fVxyXG5cdFxyXG5cdGZ1bmN0aW9uIGNyZWF0ZUZvcm1WYWx1ZXNPYmplY3QoKSB7XHJcblx0XHRjb25zb2xlLmxvZyhmb3JtVmFsaWRhdGlvbkZ1bmN0aW9ucy5nZXRGb3JtQ2hpbGRyZW4oKSlcclxuXHR9XHJcblxyXG5cdHJldHVybiBwcm9wcztcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBBUFJDYWxjdWxhdG9yO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2pzL21jYUNhbGN1bGF0b3IuanMiXSwic291cmNlUm9vdCI6IiJ9