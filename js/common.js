/*
	desc: common finctionalities
*/

function Utils() {

	return {

		$$: function (selector) {
	      return [].slice.call(document.querySelectorAll(selector))
	    },

	    getFormChildren: function () {
	      return $$('input')
	          .filter(function(child) {
	            const type = child.getAttribute('name')
	            const notValidableElements = ["button", "submit", "reset", "file"]
	            return notValidableElements.indexOf(type) === -1
	          })
	          .concat($$('textarea, select'))
	    }
	}

}



module.exports = Utils