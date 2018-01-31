/*
	desc: common finctionalities
*/
var Utils = (function () {

		function $$ (selector, parentSelector) {
	      return [].slice.call(parentSelector.querySelectorAll(selector))
	    }

	    function getFormChildren (form) {
	      return $$('input', form)
	          .filter(function(child) {
	            const type = child.getAttribute('name')
	            const notValidableElements = ["button", "submit", "reset", "file"]
	            return notValidableElements.indexOf(type) === -1
	          })
	          .concat($$('textarea, select', form))
	    }
	    
	    function addCommas(number) {
			return number.toFixed(0).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
		}
	    return {
	    	$$: $$,
	    	getFormChildren: getFormChildren
	    }
})()

module.exports = Utils