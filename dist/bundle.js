(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["TestClass"] = factory();
	else
		root["TestClass"] = factory();
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


// require('./html5validation');
__webpack_require__(1);

function TestClass(form) {
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

      $$('[for=' + name + ']')[0].remove();
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

module.exports = TestClass;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
	Desc: add custom validation
*/

var routines = {
	checkGreaterThan: __webpack_require__(2)
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
/* 2 */
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCAwODdlMTMyMTdhYjI1MWQ3ZjFiNyIsIndlYnBhY2s6Ly8vLi9qcy9UZXN0Q2xhc3MuanMiLCJ3ZWJwYWNrOi8vLy4vanMvYWRkY3VzdG9tLXZhbGlkYXRpb24uanMiLCJ3ZWJwYWNrOi8vLy4vanMvcm91dGluZXMvZ3JlYXRlcnRoYW4uanMiXSwibmFtZXMiOlsicmVxdWlyZSIsIlRlc3RDbGFzcyIsImZvcm0iLCJvblN1Ym1pdENhbGxiYWNrIiwicHJvcHMiLCJvblN1Ym1pdCIsImNvbnNvbGUiLCJsb2ciLCJzZXRTdGF0ZSIsInZhbGlkYXRlIiwiZ2V0Rm9ybUNoaWxkcmVuIiwiZm9yRWFjaCIsImFyZ3MiLCJhcHBseSIsInRhcmdldCIsInN0YXRlIiwidmFsdWUiLCJuYW1lIiwiZ2V0QXR0cmlidXRlIiwic3RhdGVzRm9yRWxlbWVudHMiLCIkJCIsImVsZW1lbnRzIiwiY29uY2F0IiwiY2xhc3NOYW1lIiwiZWxlbWVudCIsImNsYXNzTGlzdCIsImFkZCIsInJlbW92ZSIsInNlbGVjdG9yIiwic2xpY2UiLCJjYWxsIiwicXVlcnlTZWxlY3RvckFsbCIsImZpbHRlciIsImNoaWxkIiwidHlwZSIsIm5vdFZhbGlkYWJsZUVsZW1lbnRzIiwiaW5kZXhPZiIsImNoZWNrVmFsaWRpdHkiLCJyZW1vdmVBdHRyaWJ1dGUiLCJzZXRBdHRyaWJ1dGUiLCJ1cGRhdGVNZXNzYWdlRm9yIiwidmFsaWRpdHkiLCJjdXN0b21WYWxpZGl0eSIsImFkZE1lc3NhZ2VGb3JWYWxpZGF0aW9uIiwidmFsaWRpdHlPYmplY3QiLCJrZXkiLCJpc1ZhbGlkIiwibWVzc2FnZXMiLCJtZXNzYWdlIiwiaGlkZSIsInNob3ciLCJzdHlsZSIsImRpc3BsYXkiLCJpbmNsdWRlc0NhY2hlIiwidXBkYXRlSW5jbHVkZXMiLCJpZCIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJpbm5lckhUTUwiLCJhZGRMYWJlbCIsInBhcmVudE5vZGUiLCJsZW5ndGgiLCJsYWJlbFRleHQiLCJsYWJlbEVsZW0iLCJjcmVhdGVFbGVtZW50IiwiaW5zZXJ0QmVmb3JlIiwiY2hpbGROb2RlcyIsImFkZEV2ZW50TGlzdGVuZXIiLCJldmVudCIsIm1vZHVsZSIsImV4cG9ydHMiLCJyb3V0aW5lcyIsImNoZWNrR3JlYXRlclRoYW4iLCJIVE1MSW5wdXRFbGVtZW50IiwiY29uc3RydWN0b3IiLCJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsInByb3RvdHlwZSIsImdldCIsInZhbGlkIiwiaGFzT3duUHJvcGVydHkiLCJjb25maWd1cmFibGUiLCJpbnB1dCIsImhhc0F0dHJpYnV0ZSIsInRhZ05hbWUiLCJ0b0xvd2VyQ2FzZSIsImNoZWNrZWQiLCJ2YWx1ZTEiLCJOdW1iZXIiLCJjb21wYXJld3RpaEVsbSIsInZhbHVlMiIsInF1ZXJ5U2VsZWN0b3IiXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO0FDVkE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7QUM3REE7QUFDQSxtQkFBQUEsQ0FBUSxDQUFSOztBQUVFLFNBQVNDLFNBQVQsQ0FBbUJDLElBQW5CLEVBQTREO0FBQUEs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RyxDQUFDQSxNQUFNQyxZQUFOLENBQW1CLGFBQW5CLENBQUosRUFBdUMsT0FBTyxLQUFQO0FBQ3RDN0UsU0FBUUMsR0FBUixDQUFZLGtCQUFaO0FBQ0QsS0FBTTJCLE9BQU9nRCxNQUFNaEUsWUFBTixDQUFtQixNQUFuQixLQUE4QmdFLE1BQU1FLE9BQU4sQ0FBY0MsV0FBZCxFQUEzQzs7QUFFQSxLQUFHbkQsU0FBUyxVQUFaLEVBQXdCLE9BQU9nRCxNQUFNSSxPQUFOLEtBQWtCLElBQXpCO0FBQ3hCLEtBQUdwRCxTQUFTLE9BQVQsSUFBb0JBLFNBQVMsT0FBaEMsRUFBeUM7O0FBRXhDLE1BQU1xRCxTQUFTQyxPQUFPTixNQUFNbEUsS0FBYixDQUFmLENBRndDLENBRUw7QUFDbkMsTUFBTXlFLGlCQUFpQlAsTUFBTWhFLFlBQU4sQ0FBbUIsYUFBbkIsQ0FBdkI7QUFDQSxNQUFNd0UsU0FBU0YsT0FBT2hDLFNBQVNtQyxhQUFULGFBQWlDRixjQUFqQyxTQUFxRHpFLEtBQTVELENBQWYsQ0FKd0MsQ0FJMEM7QUFDbEZWLFVBQVFDLEdBQVIsQ0FBWSxTQUFaLEVBQXVCZ0YsU0FBU0csTUFBaEM7O0FBRUEsU0FBUUgsU0FBU0csTUFBakI7QUFDQTtBQUNELENBZkQsQyIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJUZXN0Q2xhc3NcIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wiVGVzdENsYXNzXCJdID0gZmFjdG9yeSgpO1xufSkodHlwZW9mIHNlbGYgIT09ICd1bmRlZmluZWQnID8gc2VsZiA6IHRoaXMsIGZ1bmN0aW9uKCkge1xucmV0dXJuIFxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvYXNzZXRzL1wiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDA4N2UxMzIxN2FiMjUxZDdmMWI3IiwiLy8gcmVxdWlyZSgnLi9odG1sNXZhbGlkYXRpb24nKTtcclxucmVxdWlyZSgnLi9hZGRjdXN0b20tdmFsaWRhdGlvbicpO1xyXG5cclxuICBmdW5jdGlvbiBUZXN0Q2xhc3MoZm9ybSwgb25TdWJtaXRDYWxsYmFjayA9IGZ1bmN0aW9uICgpIHt9KSB7XHJcblxyXG4gIFx0LyogcHJvcHMgKi9cclxuXHJcbiAgXHRjb25zdCBwcm9wcyA9IHtcclxuICBcdFx0XHJcbiAgXHR9XHJcblxyXG4gIFx0LyogZnVuY3Rpb24gKi9cclxuICBcdGZ1bmN0aW9uIG9uU3VibWl0KC4uLmFyZ3MpIHtcclxuICBcdFx0Y29uc29sZS5sb2coJ2Zvcm0gc3VibWl0dGVkJyk7XHJcbiAgXHRcdHNldFN0YXRlKGZvcm0sICdzdWJtaXR0ZWQnLCB0cnVlKTtcclxuICBcdFx0dmFsaWRhdGUoZm9ybSlcclxuICAgICAgZ2V0Rm9ybUNoaWxkcmVuKCkuZm9yRWFjaCh2YWxpZGF0ZSlcclxuICBcdFx0b25TdWJtaXRDYWxsYmFjay5hcHBseShwcm9wcywgYXJncylcclxuICBcdH1cclxuXHJcbiAgXHRmdW5jdGlvbiBzZXRTdGF0ZSh0YXJnZXQsIHN0YXRlLCB2YWx1ZSkge1xyXG4gIFx0XHRjb25zdCBuYW1lID0gdGFyZ2V0LmdldEF0dHJpYnV0ZSgnbmFtZScpO1xyXG4gIFx0XHRjb25zdCBzdGF0ZXNGb3JFbGVtZW50cyA9ICQkKGBbZGF0YS1zdGF0ZXMtZm9yPVwiJHtuYW1lfVwiXWApO1xyXG4gIFx0XHRjb25zdCBlbGVtZW50cyA9IFt0YXJnZXRdLmNvbmNhdChzdGF0ZXNGb3JFbGVtZW50cylcclxuICBcdFx0Y29uc3QgY2xhc3NOYW1lID0gYGlzLSR7c3RhdGV9YFxyXG5cclxuICBcdFx0aWYodmFsdWUpIGVsZW1lbnRzLmZvckVhY2goZWxlbWVudCA9PiBlbGVtZW50LmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKSlcclxuICBcdCBcdGVsc2UgZWxlbWVudHMuZm9yRWFjaChlbGVtZW50ID0+IGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShjbGFzc05hbWUpKVxyXG4gIFx0fVxyXG5cclxuICBcdGZ1bmN0aW9uICQkIChzZWxlY3Rvcikge1xyXG4gIFx0XHRyZXR1cm4gW10uc2xpY2UuY2FsbChmb3JtLnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpKVxyXG4gIFx0fVxyXG5cclxuICAgIGZ1bmN0aW9uIGdldEZvcm1DaGlsZHJlbiAoKSB7XHJcbiAgICAgIHJldHVybiAkJCgnaW5wdXQnKVxyXG4gICAgICAgICAgLmZpbHRlcihmdW5jdGlvbihjaGlsZCkge1xyXG4gICAgICAgICAgICBjb25zdCB0eXBlID0gY2hpbGQuZ2V0QXR0cmlidXRlKCduYW1lJylcclxuICAgICAgICAgICAgY29uc3Qgbm90VmFsaWRhYmxlRWxlbWVudHMgPSBbXCJidXR0b25cIiwgXCJzdWJtaXRcIiwgXCJyZXNldFwiLCBcImZpbGVcIl1cclxuICAgICAgICAgICAgcmV0dXJuIG5vdFZhbGlkYWJsZUVsZW1lbnRzLmluZGV4T2YodHlwZSkgPT09IC0xXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgICAgLmNvbmNhdCgkJCgndGV4dGFyZWEsIHNlbGVjdCcpKVxyXG4gICAgfVxyXG5cclxuICBcdGZ1bmN0aW9uIHZhbGlkYXRlIChlbGVtZW50KSB7XHJcbiAgXHRcdGlmKGVsZW1lbnQuY2hlY2tWYWxpZGl0eSgpKSB7XHJcbiAgXHRcdFx0ZWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoJ2FyaWEtaW52YWxpZCcpXHJcbiAgICAgICAgc2V0U3RhdGUoZWxlbWVudCwgJ3ZhbGlkJywgdHJ1ZSkgLy8gYWRkIGNsYXNzIGlzLXZhbGlkXHJcbiAgICAgICAgc2V0U3RhdGUoZWxlbWVudCwgJ2ludmFsaWQnLCBmYWxzZSkgLy8gcmVtb3ZlIGNsYXNzIGlzLWludmFsaWRcclxuICBcdFx0fSBlbHNlIHtcclxuICBcdFx0XHRjb25zb2xlLmxvZyhcImludmFsaWRcIilcclxuICBcdFx0XHRlbGVtZW50LnNldEF0dHJpYnV0ZSgnYXJpYS1pbnZhbGlkJywgJ3RydWUnKTtcclxuICBcdFx0XHRzZXRTdGF0ZShlbGVtZW50LCAndmFsaWQnLCBmYWxzZSkgLy8gcmVtb3ZlIGNsYXNzIGlzLXZhbGlkXHJcbiAgXHRcdFx0c2V0U3RhdGUoZWxlbWVudCwgJ2ludmFsaWQnLCB0cnVlKSAvLyBhZGQgY2xhc3MgaXMtaW52YWxpZFxyXG4gIFx0XHR9XHJcblxyXG4gICAgICAvLyBzaG93ICYgaGlkZSByZWxldmFudCBtZXNzYWdlc1xyXG4gICAgICB1cGRhdGVNZXNzYWdlRm9yKGVsZW1lbnQpXHJcbiAgXHR9XHJcblxyXG4gICAgZnVuY3Rpb24gdXBkYXRlTWVzc2FnZUZvciAoZWxlbWVudCkge1xyXG4gICAgICBjb25zdCBuYW1lID0gZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ25hbWUnKVxyXG4gICAgICBjb25zdCB2YWxpZGl0eSA9IGVsZW1lbnQudmFsaWRpdHkgXHJcbiAgICAgIGNvbnN0IGN1c3RvbVZhbGlkaXR5ID0gZWxlbWVudC5jdXN0b21WYWxpZGl0eSBcclxuICAgICBhZGRNZXNzYWdlRm9yVmFsaWRhdGlvbihuYW1lLCB2YWxpZGl0eSkgLy8gY2hlY2sgZm9yIGRlZmF1bHQgdmFsaWRpdHkgb2JqZWN0XHJcbiAgICAgYWRkTWVzc2FnZUZvclZhbGlkYXRpb24obmFtZSwgY3VzdG9tVmFsaWRpdHkpIC8vIGNoZWNrIGZvciBjdXN0b20gdmFsaWRpdHkgb2JqZWN0XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGFkZE1lc3NhZ2VGb3JWYWxpZGF0aW9uKG5hbWUsIHZhbGlkaXR5T2JqZWN0KSB7XHJcbiAgICAgIGZvciAoIGxldCBrZXkgaW4gdmFsaWRpdHlPYmplY3QgKSB7XHJcbiAgICAgICAgLypcclxuICAgICAgICAgIHRoZSB2YWxpZGl0eVN0YXRlIG9iamVjdCdzIHByb3BldGllcyBhcmUgbm90IGl0cyBvd25cclxuICAgICAgICAgIHNvIHdlIG11c3Qgbm90IHVzZSB0aGUgLmhhc093blByb3BlcnR5IGZpbHRlclxyXG5cclxuICAgICAgICAgIHRoZSB2YWxpZGl0eVN0YXRlIG9iamVjdCBoYXMgYSBcInZhbGlkXCIgcHJvcGVydHlcclxuICAgICAgICAgIHRoYXQgaXMgdHJ1ZSB3aGVuIHRoZSBpbnB1dCBpcyB2YWxpZCBhbmQgZmFsc2Ugb3RoZXJ3aXNlXHJcbiAgICAgICAgICBpdCdzIG5vdCByZWFsbHkgYW4gZXJyb3ItcmVsYXRlZCBwcm9wZXJ0eSBzbyB3ZSBpZ25vcmUgaXRcclxuICAgICAgICAqL1xyXG4gICAgICAgIGlmKGtleSA9PT0gJ3ZhbGlkJykgY29udGludWVcclxuXHJcbiAgICAgICAgLypcclxuICAgICAgICAgIHRoZSBwcm9wZXJ0eSBpcyBzZXQgdG8gdHJ1ZSB3aGVuIHRoZSBjb25kaXRpb24gaXMgbm90IG1ldFxyXG4gICAgICAgICAgZS5nIGFuIGVtcHR5IHJlcXVpcmVkIGZpZWxkIGhhcyB0aGUgdmFsdWVNaXNzaW5nIHByb3BlcnR5IHNldCB0byB0cnVlXHJcbiAgICAgICAgKi9cclxuICAgICAgICBjb25zdCBpc1ZhbGlkID0gdmFsaWRpdHlPYmplY3Rba2V5XSA9PT0gZmFsc2VcclxuXHJcbiAgICAgICAgY29uc3QgbWVzc2FnZXMgPSAkJChgW2RhdGEtZXJyb3JzLWZvcj1cIiR7bmFtZX1cIl0gW2RhdGEtZXJyb3JzLXdoZW49XCIke2tleX1cIl1gKVxyXG5cclxuICAgICAgICBtZXNzYWdlcy5mb3JFYWNoKGZ1bmN0aW9uIChtZXNzYWdlKSB7XHJcbiAgICAgICAgICBpZihpc1ZhbGlkKSBoaWRlKG1lc3NhZ2UpXHJcbiAgICAgICAgICBlbHNlIHNob3cobWVzc2FnZSlcclxuICAgICAgICB9KVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBzaG93KGVsZW1lbnQpIHtcclxuICAgICAgZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJydcclxuICAgICAgZWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJylcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBoaWRlKGVsZW1lbnQpIHtcclxuICAgICAgZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXHJcbiAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICd0cnVlJylcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBpbmNsdWRlc0NhY2hlID0ge31cclxuXHJcbiAgZnVuY3Rpb24gdXBkYXRlSW5jbHVkZXMgKCkge1xyXG4gICAgJCQoJ1tkYXRhLWluY2x1ZGVdJykuZm9yRWFjaChmdW5jdGlvbiAoZWxlbWVudCkge1xyXG4gICAgICBjb25zdCBpZCA9IGVsZW1lbnQuZ2V0QXR0cmlidXRlKCdkYXRhLWluY2x1ZGUnKVxyXG4gICAgICBpZiAoaW5jbHVkZXNDYWNoZVtpZF0gPT0gbnVsbCkgaW5jbHVkZXNDYWNoZVtpZF0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCkuaW5uZXJIVE1MXHJcbiAgICAgIGVsZW1lbnQuaW5uZXJIVE1MID0gaW5jbHVkZXNDYWNoZVtpZF1cclxuICAgIH0pXHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBhZGRMYWJlbChlbGVtZW50KSB7XHJcbiAgICAgIGNvbnN0IHBhcmVudE5vZGUgPSBlbGVtZW50LnBhcmVudE5vZGUsXHJcbiAgICAgICAgICAgIG5hbWUgPSBlbGVtZW50LmdldEF0dHJpYnV0ZSgnbmFtZScpO1xyXG4gICAgaWYoZWxlbWVudC52YWx1ZSkge1xyXG4gICAgaWYoJCQoYFtmb3I9JHtuYW1lfV1gKS5sZW5ndGgpIHJldHVybiBmYWxzZTsgLy8gaWYgZXhpc3RcclxuICAgICAgICBjb25zdCBsYWJlbFRleHQgPSBlbGVtZW50LmdldEF0dHJpYnV0ZSgncGxhY2Vob2xkZXInKSxcclxuICAgICAgICAgICAgICBsYWJlbEVsZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsYWJlbCcpO1xyXG4gICAgICAgICAgICAgIGxhYmVsRWxlbS5pbm5lckhUTUwgPSBsYWJlbFRleHQ7XHJcbiAgICAgICAgICAgICAgbGFiZWxFbGVtLnNldEF0dHJpYnV0ZSgnZm9yJywgbmFtZSlcclxuICAgICAgICAgICAgICAvL3ByZXBlbmQgaXRcclxuICAgICAgICAgICAgICBwYXJlbnROb2RlLmluc2VydEJlZm9yZShsYWJlbEVsZW0sIHBhcmVudE5vZGUuY2hpbGROb2Rlc1swXSlcclxuICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICQkKGBbZm9yPSR7bmFtZX1dYClbMF0uY2xhc3NMaXN0LmFkZCgnYW5pbWF0aW9uJylcclxuICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAkJChgW2Zvcj0ke25hbWV9XWApWzBdLnJlbW92ZSgpXHJcbiAgICB9XHJcbiAgfVxyXG4gIFx0LyogaW5pdCAqL1xyXG4gIFx0Zm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCBvblN1Ym1pdCwgZmFsc2UpO1xyXG5cclxuICAgIGZvcm0uYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgY29uc3QgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0XHJcblxyXG4gICAgICBzZXRTdGF0ZSh0YXJnZXQsICdjaGFuZ2VkJywgdHJ1ZSlcclxuICAgICAgdmFsaWRhdGUodGFyZ2V0KVxyXG4gICAgICBcclxuICAgIH0sIGZhbHNlKVxyXG5cclxuICAgIGZvcm0uYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBmdW5jdGlvbihldmVudCkge1xyXG4gICAgICBjb25zdCB0YXJnZXQgPSBldmVudC50YXJnZXRcclxuICAgICAgYWRkTGFiZWwodGFyZ2V0KVxyXG4gICAgfSwgZmFsc2UpXHJcblxyXG4gICAgXHJcbiAgICAkJCgnW2RhdGEtZXJyb3JzLXdoZW5dJykuZm9yRWFjaChoaWRlKVxyXG4gICAgXHJcbiAgICB1cGRhdGVJbmNsdWRlcygpXHJcbiAgICAkJCgnW2RhdGEtZXJyb3JzLXdoZW5dJykuZm9yRWFjaChoaWRlKVxyXG4gIFx0cmV0dXJuIHByb3BzO1xyXG4gIH1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gVGVzdENsYXNzO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2pzL1Rlc3RDbGFzcy5qcyIsIi8qXHJcblx0RGVzYzogYWRkIGN1c3RvbSB2YWxpZGF0aW9uXHJcbiovXHJcblxyXG5jb25zdCByb3V0aW5lcyA9IHtcclxuICBjaGVja0dyZWF0ZXJUaGFuOiByZXF1aXJlKCcuL3JvdXRpbmVzL2dyZWF0ZXJ0aGFuJylcclxufVxyXG5cclxuO1tIVE1MSW5wdXRFbGVtZW50XS5mb3JFYWNoKGZ1bmN0aW9uIChjb25zdHJ1Y3Rvcikge1xyXG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjb25zdHJ1Y3Rvci5wcm90b3R5cGUsICdjdXN0b21WYWxpZGl0eScsIHtcclxuXHRcdGdldCgpIHtcclxuXHRcdFx0Y29uc3QgY3VzdG9tVmFsaWRpdHkgPSB7IHZhbGlkOiB0cnVlIH1cclxuXHJcblx0XHRcdGZvcihsZXQgbmFtZSBpbiByb3V0aW5lcykge1xyXG5cdFx0XHRcdGlmKCFyb3V0aW5lcy5oYXNPd25Qcm9wZXJ0eShuYW1lKSkgY29udGludWVcclxuXHJcblx0XHRcdFx0Y3VzdG9tVmFsaWRpdHlbbmFtZV0gPSByb3V0aW5lc1tuYW1lXSh0aGlzKVxyXG5cdFx0XHRcdGlmIChjdXN0b21WYWxpZGl0eVtuYW1lXSA9PT0gdHJ1ZSkgY3VzdG9tVmFsaWRpdHkudmFsaWQgPSBmYWxzZVxyXG5cdFx0XHR9XHJcblx0XHRyZXR1cm4gY3VzdG9tVmFsaWRpdHlcclxuXHRcdH0sXHJcblx0XHRjb25maWd1cmFibGU6IHRydWVcclxuXHR9KVxyXG59KVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2pzL2FkZGN1c3RvbS12YWxpZGF0aW9uLmpzIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaW5wdXQpIHtcclxuXHRpZighaW5wdXQuaGFzQXR0cmlidXRlKCdncmVhdGVyVGhhbicpKSByZXR1cm4gZmFsc2VcclxuXHRcdGNvbnNvbGUubG9nKCdub3QgZ3JlYXRlciB0aGFuJylcclxuXHRjb25zdCB0eXBlID0gaW5wdXQuZ2V0QXR0cmlidXRlKCd0eXBlJykgfHwgaW5wdXQudGFnTmFtZS50b0xvd2VyQ2FzZSgpXHJcblxyXG5cdGlmKHR5cGUgPT09ICdjaGVja2JveCcpIHJldHVybiBpbnB1dC5jaGVja2VkICE9PSB0cnVlXHJcblx0aWYodHlwZSAhPT0gJ3JhZGlvJyAmJiB0eXBlICE9PSAncmFuZ2UnKSB7XHJcblxyXG5cdFx0Y29uc3QgdmFsdWUxID0gTnVtYmVyKGlucHV0LnZhbHVlKSAvLyB2YWx1ZTFcclxuXHRcdGNvbnN0IGNvbXBhcmV3dGloRWxtID0gaW5wdXQuZ2V0QXR0cmlidXRlKCdncmVhdGVyVGhhbicpXHJcblx0XHRjb25zdCB2YWx1ZTIgPSBOdW1iZXIoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgW25hbWU9XCIke2NvbXBhcmV3dGloRWxtfVwiXWApLnZhbHVlKSAvLyB2YWx1ZTJcclxuXHRcdGNvbnNvbGUubG9nKCdjb21wYXJlJywgdmFsdWUxID4gdmFsdWUyKVxyXG5cclxuXHRcdHJldHVybiAodmFsdWUxIDwgdmFsdWUyKVxyXG5cdH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9qcy9yb3V0aW5lcy9ncmVhdGVydGhhbi5qcyJdLCJzb3VyY2VSb290IjoiIn0=