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

(0, _validation.sayHello)('testing'); /*
                                      	Desc: Form validation
                                      */
/*import {formValidation} from './validation';
import {APRCalculator} from './mcaCalculator';

var form = document.getElementById('aprCalc');
	
	formValidation(form, function onSubmit(event) {
		event.preventDefault();
		APRCalculator();
		
	});*/

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*function Test() {

}

export {sayHello}*/
// require('./html5validation');
__webpack_require__(2);
function formValidation(form) {
  var onSubmitCallback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};


  /* props */

  var props = {};

  /* function */
  function onSubmit() {
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

  function $$(selector) {
    return [].slice.call(form.querySelectorAll(selector));
  }

  function getFormChildren() {
    return $$('input').filter(function (child) {
      var type = child.getAttribute('name');
      var notValidableElements = ["button", "submit", "reset", "file"];
      return notValidableElements.indexOf(type) === -1;
    }).concat($$('textarea, select'));
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
    updateMessageFor(element);
  }

  function updateMessageFor(element) {
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

module.exports = formValidation;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
	Desc: add custom validation
*/

var routines = {
	checkGreaterThan: __webpack_require__(3)
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
/* 3 */
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

/***/ })
/******/ ]);
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA2MmJhMjRhNWYxMjE5OTMzMjJkMyIsIndlYnBhY2s6Ly8vLi9qcy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9qcy92YWxpZGF0aW9uLmpzIiwid2VicGFjazovLy8uL2pzL2FkZGN1c3RvbS12YWxpZGF0aW9uLmpzIiwid2VicGFjazovLy8uL2pzL3JvdXRpbmVzL2dyZWF0ZXJ0aGFuLmpzIl0sIm5hbWVzIjpbInJlcXVpcmUiLCJmb3JtVmFsaWRhdGlvbiIsImZvcm0iLCJvblN1Ym1pdENhbGxiYWNrIiwicHJvcHMiLCJvblN1Ym1pdCIsImNvbnNvbGUiLCJsb2ciLCJzZXRTdGF0ZSIsInZhbGlkYXRlIiwiZ2V0Rm9ybUNoaWxkcmVuIiwiZm9yRWFjaCIsImFyZ3MiLCJhcHBseSIsInRhcmdldCIsInN0YXRlIiwidmFsdWUiLCJuYW1lIiwiZ2V0QXR0cmlidXRlIiwic3RhdGVzRm9yRWxlbWVudHMiLCIkJCIsImVsZW1lbnRzIiwiY29uY2F0IiwiY2xhc3NOYW1lIiwiZWxlbWVudCIsImNsYXNzTGlzdCIsImFkZCIsInJlbW92ZSIsInNlbGVjdG9yIiwic2xpY2UiLCJjYWxsIiwicXVlcnlTZWxlY3RvckFsbCIsImZpbHRlciIsImNoaWxkIiwidHlwZSIsIm5vdFZhbGlkYWJsZUVsZW1lbnRzIiwiaW5kZXhPZiIsImNoZWNrVmFsaWRpdHkiLCJyZW1vdmVBdHRyaWJ1dGUiLCJzZXRBdHRyaWJ1dGUiLCJ1cGRhdGVNZXNzYWdlRm9yIiwidmFsaWRpdHkiLCJjdXN0b21WYWxpZGl0eSIsImFkZE1lc3NhZ2VGb3JWYWxpZGF0aW9uIiwidmFsaWRpdHlPYmplY3QiLCJrZXkiLCJpc1ZhbGlkIiwibWVzc2FnZXMiLCJtZXNzYWdlIiwiaGlkZSIsInNob3ciLCJzdHlsZSIsImRpc3BsYXkiLCJpbmNsdWRlc0NhY2hlIiwidXBkYXRlSW5jbHVkZXMiLCJpZCIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJpbm5lckhUTUwiLCJhZGRMYWJlbCIsInBhcmVudE5vZGUiLCJsZW5ndGgiLCJsYWJlbFRleHQiLCJsYWJlbEVsZW0iLCJjcmVhdGVFbGVtZW50IiwiaW5zZXJ0QmVmb3JlIiwiY2hpbGROb2RlcyIsImFkZEV2ZW50TGlzdGVuZXIiLCJldmVudCIsIm1vZHVsZSIsImV4cG9ydHMiLCJyb3V0aW5lcyIsImNoZWNrR3JlYXRlclRoYW4iLCJIVE1MSW5wdXRFbGVtZW50IiwiY29uc3RydWN0b3IiLCJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsInByb3RvdHlwZSIsImdldCIsInZhbGlkIiwiaGFzT3duUHJvcGVydHkiLCJjb25maWd1cmFibGUiLCJpbnB1dCIsImhhc0F0dHJpYnV0ZSIsInRhZ05hbWUiLCJ0b0xvd2VyQ2FzZSIsImNoZWNrZWQiLCJ2YWx1ZTEiLCJOdW1iZXIiLCJjb21wYXJld3RpaEVsbSIsInZhbHVlMiIsInF1ZXJ5U2VsZWN0b3IiXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO0FDVkE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7QUM5Q0E7O0FBRUEsMEJBQVMsU0FBVCxFLENBakJBOzs7QUFHQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDSEE7Ozs7O0FBS0E7QUFDQSxtQkFBQUEsQ0FBUSxDQUFSO0FBQ0UsU0FBU0MsY0FBVCxDQUF3QkMsSUFBeEIsRUFBaUU7QUFBQSxNQUFuQ0MsZ0JBQW1DLHVFQUFoQixZQUFZLENBQUUsQ0FBRTs7O0FBRS9EOztBQUVBLE1BQU1DLFFBQVEsRUFBZDs7QUFJQTtBQUNBLFdBQVNDLFFBQVQsR0FBMkI7QUFDekJDLFlBQVFDLEdBQVIsQ0FBWSxnQkFBWjtBQUNBQyxhQUFTTixJQUFULEVBQWUsV0FBZixFQUE0QixJQUE1QjtBQUNBTyxhQUFTUCxJQUFUO0FBQ0FRLHNCQUFrQkMsT0FBbEIsQ0FBMEJGLFFBQTFCOztBQUp5QixzQ0FBTkcsSUFBTTtBQUFOQSxVQUFNO0FBQUE7O0FBS3pCVCxxQkFBaUJVLEtBQWpCLENBQXVCVCxLQUF2QixFQUE4QlEsSUFBOUI7QUFDRDs7QUFFRCxXQUFTSixRQUFULENBQWtCTSxNQUFsQixFQUEwQkMsS0FBMUIsRUFBaUNDLEtBQWpDLEVBQXdDO0FBQ3RDLFFBQU1DLE9BQU9ILE9BQU9JLFlBQVAsQ0FBb0IsTUFBcEIsQ0FBYjtBQUNBLFFBQU1DLG9CQUFvQkMsMEJBQXdCSCxJQUF4QixRQUExQjtBQUNBLFFBQU1JLFdBQVcsQ0FBQ1AsTUFBRCxFQUFTUSxNQUFULENBQWdCSCxpQkFBaEIsQ0FBakI7QUFDQSxRQUFNSSxvQkFBa0JSLEtBQXhCOztBQUVBLFFBQUdDLEtBQUgsRUFBVUssU0FBU1YsT0FBVCxDQUFpQjtBQUFBLGFBQVdhLFFBQVFDLFNBQVIsQ0FBa0JDLEdBQWxCLENBQXNCSCxTQUF0QixDQUFYO0FBQUEsS0FBakIsRUFBVixLQUNLRixTQUFTVixPQUFULENBQWlCO0FBQUEsYUFBV2EsUUFBUUMsU0FBUixDQUFrQkUsTUFBbEIsQ0FBeUJKLFNBQXpCLENBQVg7QUFBQSxLQUFqQjtBQUNOOztBQUVELFdBQVNILEVBQVQsQ0FBYVEsUUFBYixFQUF1QjtBQUNyQixXQUFPLEdBQUdDLEtBQUgsQ0FBU0MsSUFBVCxDQUFjNUIsS0FBSzZCLGdCQUFMLENBQXNCSCxRQUF0QixDQUFkLENBQVA7QUFDRDs7QUFFRCxXQUFTbEIsZUFBVCxHQUE0QjtBQUMxQixXQUFPVSxHQUFHLE9BQUgsRUFDRlksTUFERSxDQUNLLFVBQVNDLEtBQVQsRUFBZ0I7QUFDdEIsVUFBTUMsT0FBT0QsTUFBTWYsWUFBTixDQUFtQixNQUFuQixDQUFiO0FBQ0EsVUFBTWlCLHVCQUF1QixDQUFDLFFBQUQsRUFBVyxRQUFYLEVBQXFCLE9BQXJCLEVBQThCLE1BQTlCLENBQTdCO0FBQ0EsYUFBT0EscUJBQXFCQyxPQUFyQixDQUE2QkYsSUFBN0IsTUFBdUMsQ0FBQyxDQUEvQztBQUNELEtBTEUsRUFNRlosTUFORSxDQU1LRixHQUFHLGtCQUFILENBTkwsQ0FBUDtBQU9EOztBQUVELFdBQVNYLFFBQVQsQ0FBbUJlLE9BQW5CLEVBQTRCO0FBQzFCLFFBQUdBLFFBQVFhLGFBQVIsRUFBSCxFQUE0QjtBQUMxQmIsY0FBUWMsZUFBUixDQUF3QixjQUF4QjtBQUNBOUIsZUFBU2dCLE9BQVQsRUFBa0IsT0FBbEIsRUFBMkIsSUFBM0IsRUFGMEIsQ0FFTztBQUNqQ2hCLGVBQVNnQixPQUFULEVBQWtCLFNBQWxCLEVBQTZCLEtBQTdCLEVBSDBCLENBR1U7QUFDckMsS0FKRCxNQUlPO0FBQ0xsQixjQUFRQyxHQUFSLENBQVksU0FBWjtBQUNBaUIsY0FBUWUsWUFBUixDQUFxQixjQUFyQixFQUFxQyxNQUFyQztBQUNBL0IsZUFBU2dCLE9BQVQsRUFBa0IsT0FBbEIsRUFBMkIsS0FBM0IsRUFISyxDQUc2QjtBQUNsQ2hCLGVBQVNnQixPQUFULEVBQWtCLFNBQWxCLEVBQTZCLElBQTdCLEVBSkssQ0FJOEI7QUFDcEM7O0FBRUQ7QUFDQWdCLHFCQUFpQmhCLE9BQWpCO0FBQ0Q7O0FBRUQsV0FBU2dCLGdCQUFULENBQTJCaEIsT0FBM0IsRUFBb0M7QUFDbEMsUUFBTVAsT0FBT08sUUFBUU4sWUFBUixDQUFxQixNQUFyQixDQUFiO0FBQ0EsUUFBTXVCLFdBQVdqQixRQUFRaUIsUUFBekI7QUFDQSxRQUFNQyxpQkFBaUJsQixRQUFRa0IsY0FBL0I7QUFDREMsNEJBQXdCMUIsSUFBeEIsRUFBOEJ3QixRQUE5QixFQUptQyxDQUlLO0FBQ3hDRSw0QkFBd0IxQixJQUF4QixFQUE4QnlCLGNBQTlCLEVBTG1DLENBS1c7QUFFOUM7O0FBRUQsV0FBU0MsdUJBQVQsQ0FBaUMxQixJQUFqQyxFQUF1QzJCLGNBQXZDLEVBQXVEO0FBQUEsK0JBQzNDQyxHQUQyQztBQUVuRDs7Ozs7OztBQVFBLFVBQUdBLFFBQVEsT0FBWCxFQUFvQjs7QUFFcEI7Ozs7QUFJQSxVQUFNQyxVQUFVRixlQUFlQyxHQUFmLE1BQXdCLEtBQXhDOztBQUVBLFVBQU1FLFdBQVczQiwwQkFBd0JILElBQXhCLDhCQUFxRDRCLEdBQXJELFFBQWpCOztBQUVBRSxlQUFTcEMsT0FBVCxDQUFpQixVQUFVcUMsT0FBVixFQUFtQjtBQUNsQyxZQUFHRixPQUFILEVBQVlHLEtBQUtELE9BQUwsRUFBWixLQUNLRSxLQUFLRixPQUFMO0FBQ04sT0FIRDtBQXBCbUQ7O0FBQ3JELFNBQU0sSUFBSUgsR0FBVixJQUFpQkQsY0FBakIsRUFBa0M7QUFBQSx1QkFBeEJDLEdBQXdCOztBQUFBLCtCQVNaO0FBY3JCO0FBQ0Y7QUFDRCxXQUFTSyxJQUFULENBQWMxQixPQUFkLEVBQXVCO0FBQ3JCQSxZQUFRMkIsS0FBUixDQUFjQyxPQUFkLEdBQXdCLEVBQXhCO0FBQ0E1QixZQUFRYyxlQUFSLENBQXdCLGFBQXhCO0FBQ0Q7O0FBRUQsV0FBU1csSUFBVCxDQUFjekIsT0FBZCxFQUF1QjtBQUNyQkEsWUFBUTJCLEtBQVIsQ0FBY0MsT0FBZCxHQUF3QixNQUF4QjtBQUNBNUIsWUFBUWUsWUFBUixDQUFxQixhQUFyQixFQUFvQyxNQUFwQztBQUNEOztBQUVELE1BQU1jLGdCQUFnQixFQUF0Qjs7QUFFRixXQUFTQyxjQUFULEdBQTJCO0FBQ3pCbEMsT0FBRyxnQkFBSCxFQUFxQlQsT0FBckIsQ0FBNkIsVUFBVWEsT0FBVixFQUFtQjtBQUM5QyxVQUFNK0IsS0FBSy9CLFFBQVFOLFlBQVIsQ0FBcUIsY0FBckIsQ0FBWDtBQUNBLFVBQUltQyxjQUFjRSxFQUFkLEtBQXFCLElBQXpCLEVBQStCRixjQUFjRSxFQUFkLElBQW9CQyxTQUFTQyxjQUFULENBQXdCRixFQUF4QixFQUE0QkcsU0FBaEQ7QUFDL0JsQyxjQUFRa0MsU0FBUixHQUFvQkwsY0FBY0UsRUFBZCxDQUFwQjtBQUNELEtBSkQ7QUFLRDs7QUFFRCxXQUFTSSxRQUFULENBQWtCbkMsT0FBbEIsRUFBMkI7QUFDdkIsUUFBTW9DLGFBQWFwQyxRQUFRb0MsVUFBM0I7QUFBQSxRQUNNM0MsT0FBT08sUUFBUU4sWUFBUixDQUFxQixNQUFyQixDQURiO0FBRUYsUUFBR00sUUFBUVIsS0FBWCxFQUFrQjtBQUNsQixVQUFHSSxhQUFXSCxJQUFYLFFBQW9CNEMsTUFBdkIsRUFBK0IsT0FBTyxLQUFQLENBRGIsQ0FDMkI7QUFDekMsVUFBTUMsWUFBWXRDLFFBQVFOLFlBQVIsQ0FBcUIsYUFBckIsQ0FBbEI7QUFBQSxVQUNNNkMsWUFBWVAsU0FBU1EsYUFBVCxDQUF1QixPQUF2QixDQURsQjtBQUVNRCxnQkFBVUwsU0FBVixHQUFzQkksU0FBdEI7QUFDQUMsZ0JBQVV4QixZQUFWLENBQXVCLEtBQXZCLEVBQThCdEIsSUFBOUI7QUFDQTtBQUNBMkMsaUJBQVdLLFlBQVgsQ0FBd0JGLFNBQXhCLEVBQW1DSCxXQUFXTSxVQUFYLENBQXNCLENBQXRCLENBQW5DOztBQUVFOUMsbUJBQVdILElBQVgsUUFBb0IsQ0FBcEIsRUFBdUJRLFNBQXZCLENBQWlDQyxHQUFqQyxDQUFxQyxXQUFyQztBQUNYLEtBVkQsTUFVTzs7QUFFTE4sbUJBQVdILElBQVgsUUFBb0IsQ0FBcEIsRUFBdUI0QyxNQUF2QixHQUFnQ3pDLGFBQVdILElBQVgsUUFBb0IsQ0FBcEIsRUFBdUJVLE1BQXZCLEVBQWhDLEdBQWtFLEVBQWxFO0FBQ0Q7QUFDRjtBQUNDO0FBQ0F6QixPQUFLaUUsZ0JBQUwsQ0FBc0IsUUFBdEIsRUFBZ0M5RCxRQUFoQyxFQUEwQyxLQUExQzs7QUFFQUgsT0FBS2lFLGdCQUFMLENBQXNCLFFBQXRCLEVBQWdDLFVBQVNDLEtBQVQsRUFBZ0I7QUFDOUMsUUFBTXRELFNBQVNzRCxNQUFNdEQsTUFBckI7O0FBRUFOLGFBQVNNLE1BQVQsRUFBaUIsU0FBakIsRUFBNEIsSUFBNUI7QUFDQUwsYUFBU0ssTUFBVDtBQUVELEdBTkQsRUFNRyxLQU5IOztBQVFBWixPQUFLaUUsZ0JBQUwsQ0FBc0IsT0FBdEIsRUFBK0IsVUFBU0MsS0FBVCxFQUFnQjtBQUM3QyxRQUFNdEQsU0FBU3NELE1BQU10RCxNQUFyQjtBQUNBNkMsYUFBUzdDLE1BQVQ7QUFDRCxHQUhELEVBR0csS0FISDs7QUFNQU0sS0FBRyxvQkFBSCxFQUF5QlQsT0FBekIsQ0FBaUNzQyxJQUFqQzs7QUFFQUs7QUFDQWxDLEtBQUcsb0JBQUgsRUFBeUJULE9BQXpCLENBQWlDc0MsSUFBakM7QUFDQSxTQUFPN0MsS0FBUDtBQUNEOztBQUVIaUUsT0FBT0MsT0FBUCxHQUFpQnJFLGNBQWpCLEM7Ozs7Ozs7OztBQ2pLQTs7OztBQUlBLElBQU1zRSxXQUFXO0FBQ2ZDLG1CQUFrQixtQkFBQXhFLENBQVEsQ0FBUjtBQURILENBQWpCLENBSUMsQ0FBQ3lFLGdCQUFELEVBQW1COUQsT0FBbkIsQ0FBMkIsVUFBVStELFdBQVYsRUFBdUI7QUFDbERDLFFBQU9DLGNBQVAsQ0FBc0JGLFlBQVlHLFNBQWxDLEVBQTZDLGdCQUE3QyxFQUErRDtBQUM5REMsS0FEOEQsaUJBQ3hEO0FBQ0wsT0FBTXBDLGlCQUFpQixFQUFFcUMsT0FBTyxJQUFULEVBQXZCOztBQUVBLFFBQUksSUFBSTlELElBQVIsSUFBZ0JzRCxRQUFoQixFQUEwQjtBQUN6QixRQUFHLENBQUNBLFNBQVNTLGNBQVQsQ0FBd0IvRCxJQUF4QixDQUFKLEVBQW1DOztBQUVuQ3lCLG1CQUFlekIsSUFBZixJQUF1QnNELFNBQVN0RCxJQUFULEVBQWUsSUFBZixDQUF2QjtBQUNBLFFBQUl5QixlQUFlekIsSUFBZixNQUF5QixJQUE3QixFQUFtQ3lCLGVBQWVxQyxLQUFmLEdBQXVCLEtBQXZCO0FBQ25DO0FBQ0YsVUFBT3JDLGNBQVA7QUFDQyxHQVg2RDs7QUFZOUR1QyxnQkFBYztBQVpnRCxFQUEvRDtBQWNBLENBZkEsRTs7Ozs7Ozs7O0FDUkRaLE9BQU9DLE9BQVAsR0FBaUIsVUFBVVksS0FBVixFQUFpQjtBQUNqQyxLQUFHLENBQUNBLE1BQU1DLFlBQU4sQ0FBbUIsYUFBbkIsQ0FBSixFQUF1QyxPQUFPLEtBQVA7QUFDdEM3RSxTQUFRQyxHQUFSLENBQVksa0JBQVo7QUFDRCxLQUFNMkIsT0FBT2dELE1BQU1oRSxZQUFOLENBQW1CLE1BQW5CLEtBQThCZ0UsTUFBTUUsT0FBTixDQUFjQyxXQUFkLEVBQTNDOztBQUVBLEtBQUduRCxTQUFTLFVBQVosRUFBd0IsT0FBT2dELE1BQU1JLE9BQU4sS0FBa0IsSUFBekI7QUFDeEIsS0FBR3BELFNBQVMsT0FBVCxJQUFvQkEsU0FBUyxPQUFoQyxFQUF5Qzs7QUFFeEMsTUFBTXFELFNBQVNDLE9BQU9OLE1BQU1sRSxLQUFiLENBQWYsQ0FGd0MsQ0FFTDtBQUNuQyxNQUFNeUUsaUJBQWlCUCxNQUFNaEUsWUFBTixDQUFtQixhQUFuQixDQUF2QjtBQUNBLE1BQU13RSxTQUFTRixPQUFPaEMsU0FBU21DLGFBQVQsYUFBaUNGLGNBQWpDLFNBQXFEekUsS0FBNUQsQ0FBZixDQUp3QyxDQUkwQztBQUNsRlYsVUFBUUMsR0FBUixDQUFZLFNBQVosRUFBdUJnRixTQUFTRyxNQUFoQzs7QUFFQSxTQUFRSCxTQUFTRyxNQUFqQjtBQUNBO0FBQ0QsQ0FmRCxDIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcImZvcm1WYWxpZGF0aW9uXCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcImZvcm1WYWxpZGF0aW9uXCJdID0gZmFjdG9yeSgpO1xufSkodHlwZW9mIHNlbGYgIT09ICd1bmRlZmluZWQnID8gc2VsZiA6IHRoaXMsIGZ1bmN0aW9uKCkge1xucmV0dXJuIFxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvYXNzZXRzL1wiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDYyYmEyNGE1ZjEyMTk5MzMyMmQzIiwiLypcclxuXHREZXNjOiBGb3JtIHZhbGlkYXRpb25cclxuKi9cclxuLyppbXBvcnQge2Zvcm1WYWxpZGF0aW9ufSBmcm9tICcuL3ZhbGlkYXRpb24nO1xyXG5pbXBvcnQge0FQUkNhbGN1bGF0b3J9IGZyb20gJy4vbWNhQ2FsY3VsYXRvcic7XHJcblxyXG52YXIgZm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhcHJDYWxjJyk7XHJcblx0XHJcblx0Zm9ybVZhbGlkYXRpb24oZm9ybSwgZnVuY3Rpb24gb25TdWJtaXQoZXZlbnQpIHtcclxuXHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRBUFJDYWxjdWxhdG9yKCk7XHJcblx0XHRcclxuXHR9KTsqL1xyXG5cclxuXHJcbmltcG9ydCB7c2F5SGVsbG99IGZyb20gJy4vdmFsaWRhdGlvbic7XHJcblxyXG5zYXlIZWxsbygndGVzdGluZycpXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vanMvaW5kZXguanMiLCIvKmZ1bmN0aW9uIFRlc3QoKSB7XHJcblxyXG59XHJcblxyXG5leHBvcnQge3NheUhlbGxvfSovXHJcbi8vIHJlcXVpcmUoJy4vaHRtbDV2YWxpZGF0aW9uJyk7XHJcbnJlcXVpcmUoJy4vYWRkY3VzdG9tLXZhbGlkYXRpb24nKTtcclxuICBmdW5jdGlvbiBmb3JtVmFsaWRhdGlvbihmb3JtLCBvblN1Ym1pdENhbGxiYWNrID0gZnVuY3Rpb24gKCkge30pIHtcclxuXHJcbiAgICAvKiBwcm9wcyAqL1xyXG5cclxuICAgIGNvbnN0IHByb3BzID0ge1xyXG4gICAgICBcclxuICAgIH1cclxuXHJcbiAgICAvKiBmdW5jdGlvbiAqL1xyXG4gICAgZnVuY3Rpb24gb25TdWJtaXQoLi4uYXJncykge1xyXG4gICAgICBjb25zb2xlLmxvZygnZm9ybSBzdWJtaXR0ZWQnKTtcclxuICAgICAgc2V0U3RhdGUoZm9ybSwgJ3N1Ym1pdHRlZCcsIHRydWUpO1xyXG4gICAgICB2YWxpZGF0ZShmb3JtKVxyXG4gICAgICBnZXRGb3JtQ2hpbGRyZW4oKS5mb3JFYWNoKHZhbGlkYXRlKVxyXG4gICAgICBvblN1Ym1pdENhbGxiYWNrLmFwcGx5KHByb3BzLCBhcmdzKVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHNldFN0YXRlKHRhcmdldCwgc3RhdGUsIHZhbHVlKSB7XHJcbiAgICAgIGNvbnN0IG5hbWUgPSB0YXJnZXQuZ2V0QXR0cmlidXRlKCduYW1lJyk7XHJcbiAgICAgIGNvbnN0IHN0YXRlc0ZvckVsZW1lbnRzID0gJCQoYFtkYXRhLXN0YXRlcy1mb3I9XCIke25hbWV9XCJdYCk7XHJcbiAgICAgIGNvbnN0IGVsZW1lbnRzID0gW3RhcmdldF0uY29uY2F0KHN0YXRlc0ZvckVsZW1lbnRzKVxyXG4gICAgICBjb25zdCBjbGFzc05hbWUgPSBgaXMtJHtzdGF0ZX1gXHJcblxyXG4gICAgICBpZih2YWx1ZSkgZWxlbWVudHMuZm9yRWFjaChlbGVtZW50ID0+IGVsZW1lbnQuY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpKVxyXG4gICAgICBlbHNlIGVsZW1lbnRzLmZvckVhY2goZWxlbWVudCA9PiBlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NOYW1lKSlcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiAkJCAoc2VsZWN0b3IpIHtcclxuICAgICAgcmV0dXJuIFtdLnNsaWNlLmNhbGwoZm9ybS5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKSlcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBnZXRGb3JtQ2hpbGRyZW4gKCkge1xyXG4gICAgICByZXR1cm4gJCQoJ2lucHV0JylcclxuICAgICAgICAgIC5maWx0ZXIoZnVuY3Rpb24oY2hpbGQpIHtcclxuICAgICAgICAgICAgY29uc3QgdHlwZSA9IGNoaWxkLmdldEF0dHJpYnV0ZSgnbmFtZScpXHJcbiAgICAgICAgICAgIGNvbnN0IG5vdFZhbGlkYWJsZUVsZW1lbnRzID0gW1wiYnV0dG9uXCIsIFwic3VibWl0XCIsIFwicmVzZXRcIiwgXCJmaWxlXCJdXHJcbiAgICAgICAgICAgIHJldHVybiBub3RWYWxpZGFibGVFbGVtZW50cy5pbmRleE9mKHR5cGUpID09PSAtMVxyXG4gICAgICAgICAgfSlcclxuICAgICAgICAgIC5jb25jYXQoJCQoJ3RleHRhcmVhLCBzZWxlY3QnKSlcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiB2YWxpZGF0ZSAoZWxlbWVudCkge1xyXG4gICAgICBpZihlbGVtZW50LmNoZWNrVmFsaWRpdHkoKSkge1xyXG4gICAgICAgIGVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKCdhcmlhLWludmFsaWQnKVxyXG4gICAgICAgIHNldFN0YXRlKGVsZW1lbnQsICd2YWxpZCcsIHRydWUpIC8vIGFkZCBjbGFzcyBpcy12YWxpZFxyXG4gICAgICAgIHNldFN0YXRlKGVsZW1lbnQsICdpbnZhbGlkJywgZmFsc2UpIC8vIHJlbW92ZSBjbGFzcyBpcy1pbnZhbGlkXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJpbnZhbGlkXCIpXHJcbiAgICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2FyaWEtaW52YWxpZCcsICd0cnVlJyk7XHJcbiAgICAgICAgc2V0U3RhdGUoZWxlbWVudCwgJ3ZhbGlkJywgZmFsc2UpIC8vIHJlbW92ZSBjbGFzcyBpcy12YWxpZFxyXG4gICAgICAgIHNldFN0YXRlKGVsZW1lbnQsICdpbnZhbGlkJywgdHJ1ZSkgLy8gYWRkIGNsYXNzIGlzLWludmFsaWRcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gc2hvdyAmIGhpZGUgcmVsZXZhbnQgbWVzc2FnZXNcclxuICAgICAgdXBkYXRlTWVzc2FnZUZvcihlbGVtZW50KVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHVwZGF0ZU1lc3NhZ2VGb3IgKGVsZW1lbnQpIHtcclxuICAgICAgY29uc3QgbmFtZSA9IGVsZW1lbnQuZ2V0QXR0cmlidXRlKCduYW1lJylcclxuICAgICAgY29uc3QgdmFsaWRpdHkgPSBlbGVtZW50LnZhbGlkaXR5IFxyXG4gICAgICBjb25zdCBjdXN0b21WYWxpZGl0eSA9IGVsZW1lbnQuY3VzdG9tVmFsaWRpdHkgXHJcbiAgICAgYWRkTWVzc2FnZUZvclZhbGlkYXRpb24obmFtZSwgdmFsaWRpdHkpIC8vIGNoZWNrIGZvciBkZWZhdWx0IHZhbGlkaXR5IG9iamVjdFxyXG4gICAgIGFkZE1lc3NhZ2VGb3JWYWxpZGF0aW9uKG5hbWUsIGN1c3RvbVZhbGlkaXR5KSAvLyBjaGVjayBmb3IgY3VzdG9tIHZhbGlkaXR5IG9iamVjdFxyXG5cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBhZGRNZXNzYWdlRm9yVmFsaWRhdGlvbihuYW1lLCB2YWxpZGl0eU9iamVjdCkge1xyXG4gICAgICBmb3IgKCBsZXQga2V5IGluIHZhbGlkaXR5T2JqZWN0ICkge1xyXG4gICAgICAgIC8qXHJcbiAgICAgICAgICB0aGUgdmFsaWRpdHlTdGF0ZSBvYmplY3QncyBwcm9wZXRpZXMgYXJlIG5vdCBpdHMgb3duXHJcbiAgICAgICAgICBzbyB3ZSBtdXN0IG5vdCB1c2UgdGhlIC5oYXNPd25Qcm9wZXJ0eSBmaWx0ZXJcclxuXHJcbiAgICAgICAgICB0aGUgdmFsaWRpdHlTdGF0ZSBvYmplY3QgaGFzIGEgXCJ2YWxpZFwiIHByb3BlcnR5XHJcbiAgICAgICAgICB0aGF0IGlzIHRydWUgd2hlbiB0aGUgaW5wdXQgaXMgdmFsaWQgYW5kIGZhbHNlIG90aGVyd2lzZVxyXG4gICAgICAgICAgaXQncyBub3QgcmVhbGx5IGFuIGVycm9yLXJlbGF0ZWQgcHJvcGVydHkgc28gd2UgaWdub3JlIGl0XHJcbiAgICAgICAgKi9cclxuICAgICAgICBpZihrZXkgPT09ICd2YWxpZCcpIGNvbnRpbnVlXHJcblxyXG4gICAgICAgIC8qXHJcbiAgICAgICAgICB0aGUgcHJvcGVydHkgaXMgc2V0IHRvIHRydWUgd2hlbiB0aGUgY29uZGl0aW9uIGlzIG5vdCBtZXRcclxuICAgICAgICAgIGUuZyBhbiBlbXB0eSByZXF1aXJlZCBmaWVsZCBoYXMgdGhlIHZhbHVlTWlzc2luZyBwcm9wZXJ0eSBzZXQgdG8gdHJ1ZVxyXG4gICAgICAgICovXHJcbiAgICAgICAgY29uc3QgaXNWYWxpZCA9IHZhbGlkaXR5T2JqZWN0W2tleV0gPT09IGZhbHNlXHJcblxyXG4gICAgICAgIGNvbnN0IG1lc3NhZ2VzID0gJCQoYFtkYXRhLWVycm9ycy1mb3I9XCIke25hbWV9XCJdIFtkYXRhLWVycm9ycy13aGVuPVwiJHtrZXl9XCJdYClcclxuXHJcbiAgICAgICAgbWVzc2FnZXMuZm9yRWFjaChmdW5jdGlvbiAobWVzc2FnZSkge1xyXG4gICAgICAgICAgaWYoaXNWYWxpZCkgaGlkZShtZXNzYWdlKVxyXG4gICAgICAgICAgZWxzZSBzaG93KG1lc3NhZ2UpXHJcbiAgICAgICAgfSlcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gc2hvdyhlbGVtZW50KSB7XHJcbiAgICAgIGVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICcnXHJcbiAgICAgIGVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKCdhcmlhLWhpZGRlbicpXHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gaGlkZShlbGVtZW50KSB7XHJcbiAgICAgIGVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdub25lJ1xyXG4gICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAndHJ1ZScpXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgaW5jbHVkZXNDYWNoZSA9IHt9XHJcblxyXG4gIGZ1bmN0aW9uIHVwZGF0ZUluY2x1ZGVzICgpIHtcclxuICAgICQkKCdbZGF0YS1pbmNsdWRlXScpLmZvckVhY2goZnVuY3Rpb24gKGVsZW1lbnQpIHtcclxuICAgICAgY29uc3QgaWQgPSBlbGVtZW50LmdldEF0dHJpYnV0ZSgnZGF0YS1pbmNsdWRlJylcclxuICAgICAgaWYgKGluY2x1ZGVzQ2FjaGVbaWRdID09IG51bGwpIGluY2x1ZGVzQ2FjaGVbaWRdID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpLmlubmVySFRNTFxyXG4gICAgICBlbGVtZW50LmlubmVySFRNTCA9IGluY2x1ZGVzQ2FjaGVbaWRdXHJcbiAgICB9KVxyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gYWRkTGFiZWwoZWxlbWVudCkge1xyXG4gICAgICBjb25zdCBwYXJlbnROb2RlID0gZWxlbWVudC5wYXJlbnROb2RlLFxyXG4gICAgICAgICAgICBuYW1lID0gZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ25hbWUnKTtcclxuICAgIGlmKGVsZW1lbnQudmFsdWUpIHtcclxuICAgIGlmKCQkKGBbZm9yPSR7bmFtZX1dYCkubGVuZ3RoKSByZXR1cm4gZmFsc2U7IC8vIGlmIGV4aXN0XHJcbiAgICAgICAgY29uc3QgbGFiZWxUZXh0ID0gZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ3BsYWNlaG9sZGVyJyksXHJcbiAgICAgICAgICAgICAgbGFiZWxFbGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGFiZWwnKTtcclxuICAgICAgICAgICAgICBsYWJlbEVsZW0uaW5uZXJIVE1MID0gbGFiZWxUZXh0O1xyXG4gICAgICAgICAgICAgIGxhYmVsRWxlbS5zZXRBdHRyaWJ1dGUoJ2ZvcicsIG5hbWUpXHJcbiAgICAgICAgICAgICAgLy9wcmVwZW5kIGl0XHJcbiAgICAgICAgICAgICAgcGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUobGFiZWxFbGVtLCBwYXJlbnROb2RlLmNoaWxkTm9kZXNbMF0pXHJcbiAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAkJChgW2Zvcj0ke25hbWV9XWApWzBdLmNsYXNzTGlzdC5hZGQoJ2FuaW1hdGlvbicpXHJcbiAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgJCQoYFtmb3I9JHtuYW1lfV1gKVswXS5sZW5ndGggPyAkJChgW2Zvcj0ke25hbWV9XWApWzBdLnJlbW92ZSgpIDogJyc7XHJcbiAgICB9XHJcbiAgfVxyXG4gICAgLyogaW5pdCAqL1xyXG4gICAgZm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCBvblN1Ym1pdCwgZmFsc2UpO1xyXG5cclxuICAgIGZvcm0uYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgY29uc3QgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0XHJcblxyXG4gICAgICBzZXRTdGF0ZSh0YXJnZXQsICdjaGFuZ2VkJywgdHJ1ZSlcclxuICAgICAgdmFsaWRhdGUodGFyZ2V0KVxyXG4gICAgICBcclxuICAgIH0sIGZhbHNlKVxyXG5cclxuICAgIGZvcm0uYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBmdW5jdGlvbihldmVudCkge1xyXG4gICAgICBjb25zdCB0YXJnZXQgPSBldmVudC50YXJnZXRcclxuICAgICAgYWRkTGFiZWwodGFyZ2V0KVxyXG4gICAgfSwgZmFsc2UpXHJcblxyXG4gICAgXHJcbiAgICAkJCgnW2RhdGEtZXJyb3JzLXdoZW5dJykuZm9yRWFjaChoaWRlKVxyXG4gICAgXHJcbiAgICB1cGRhdGVJbmNsdWRlcygpXHJcbiAgICAkJCgnW2RhdGEtZXJyb3JzLXdoZW5dJykuZm9yRWFjaChoaWRlKVxyXG4gICAgcmV0dXJuIHByb3BzO1xyXG4gIH1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZm9ybVZhbGlkYXRpb247XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vanMvdmFsaWRhdGlvbi5qcyIsIi8qXHJcblx0RGVzYzogYWRkIGN1c3RvbSB2YWxpZGF0aW9uXHJcbiovXHJcblxyXG5jb25zdCByb3V0aW5lcyA9IHtcclxuICBjaGVja0dyZWF0ZXJUaGFuOiByZXF1aXJlKCcuL3JvdXRpbmVzL2dyZWF0ZXJ0aGFuJylcclxufVxyXG5cclxuO1tIVE1MSW5wdXRFbGVtZW50XS5mb3JFYWNoKGZ1bmN0aW9uIChjb25zdHJ1Y3Rvcikge1xyXG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjb25zdHJ1Y3Rvci5wcm90b3R5cGUsICdjdXN0b21WYWxpZGl0eScsIHtcclxuXHRcdGdldCgpIHtcclxuXHRcdFx0Y29uc3QgY3VzdG9tVmFsaWRpdHkgPSB7IHZhbGlkOiB0cnVlIH1cclxuXHJcblx0XHRcdGZvcihsZXQgbmFtZSBpbiByb3V0aW5lcykge1xyXG5cdFx0XHRcdGlmKCFyb3V0aW5lcy5oYXNPd25Qcm9wZXJ0eShuYW1lKSkgY29udGludWVcclxuXHJcblx0XHRcdFx0Y3VzdG9tVmFsaWRpdHlbbmFtZV0gPSByb3V0aW5lc1tuYW1lXSh0aGlzKVxyXG5cdFx0XHRcdGlmIChjdXN0b21WYWxpZGl0eVtuYW1lXSA9PT0gdHJ1ZSkgY3VzdG9tVmFsaWRpdHkudmFsaWQgPSBmYWxzZVxyXG5cdFx0XHR9XHJcblx0XHRyZXR1cm4gY3VzdG9tVmFsaWRpdHlcclxuXHRcdH0sXHJcblx0XHRjb25maWd1cmFibGU6IHRydWVcclxuXHR9KVxyXG59KVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2pzL2FkZGN1c3RvbS12YWxpZGF0aW9uLmpzIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaW5wdXQpIHtcclxuXHRpZighaW5wdXQuaGFzQXR0cmlidXRlKCdncmVhdGVyVGhhbicpKSByZXR1cm4gZmFsc2VcclxuXHRcdGNvbnNvbGUubG9nKCdub3QgZ3JlYXRlciB0aGFuJylcclxuXHRjb25zdCB0eXBlID0gaW5wdXQuZ2V0QXR0cmlidXRlKCd0eXBlJykgfHwgaW5wdXQudGFnTmFtZS50b0xvd2VyQ2FzZSgpXHJcblxyXG5cdGlmKHR5cGUgPT09ICdjaGVja2JveCcpIHJldHVybiBpbnB1dC5jaGVja2VkICE9PSB0cnVlXHJcblx0aWYodHlwZSAhPT0gJ3JhZGlvJyAmJiB0eXBlICE9PSAncmFuZ2UnKSB7XHJcblxyXG5cdFx0Y29uc3QgdmFsdWUxID0gTnVtYmVyKGlucHV0LnZhbHVlKSAvLyB2YWx1ZTFcclxuXHRcdGNvbnN0IGNvbXBhcmV3dGloRWxtID0gaW5wdXQuZ2V0QXR0cmlidXRlKCdncmVhdGVyVGhhbicpXHJcblx0XHRjb25zdCB2YWx1ZTIgPSBOdW1iZXIoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgW25hbWU9XCIke2NvbXBhcmV3dGloRWxtfVwiXWApLnZhbHVlKSAvLyB2YWx1ZTJcclxuXHRcdGNvbnNvbGUubG9nKCdjb21wYXJlJywgdmFsdWUxID4gdmFsdWUyKVxyXG5cclxuXHRcdHJldHVybiAodmFsdWUxIDwgdmFsdWUyKVxyXG5cdH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9qcy9yb3V0aW5lcy9ncmVhdGVydGhhbi5qcyJdLCJzb3VyY2VSb290IjoiIn0=