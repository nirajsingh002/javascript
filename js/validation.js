// require('./html5validation');

import Utils from './common'

require('./addcustom-validation');
  const UtilsObj = new Utils();
  const $$ = UtilsObj.$$;
  const getFormChildren = UtilsObj.getFormChildren;

  function FormValidation(form, onSubmitCallback = function () {}) {

    /* props */

    const props = {
      updateMessage,
      updateIncludes,
      isValid: form.checkValidity.bind(form)
    }

    /* function */
    function onSubmit(...args) {
      console.log('form submitted');
      setState(form, 'submitted', true);
      validate(form)
      getFormChildren().forEach(validate)
      onSubmitCallback.apply(props, args)
    }

    function setState(target, state, value) {
      const name = target.getAttribute('name');
      const statesForElements = $$(`[data-states-for="${name}"]`);
      const elements = [target].concat(statesForElements)
      const className = `is-${state}`

      if(value) elements.forEach(element => element.classList.add(className))
      else elements.forEach(element => element.classList.remove(className))
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

    function validate (element) {
      if(element.checkValidity()) {
        element.removeAttribute('aria-invalid')
        setState(element, 'valid', true) // add class is-valid
        setState(element, 'invalid', false) // remove class is-invalid
      } else {
        console.log("invalid")
        element.setAttribute('aria-invalid', 'true');
        setState(element, 'valid', false) // remove class is-valid
        setState(element, 'invalid', true) // add class is-invalid
      }

      // show & hide relevant messages
      updateMessage(element)
    }

    function updateMessage (element) {
      const name = element.getAttribute('name')
      const validity = element.validity 
      const customValidity = element.customValidity 
     addMessageForValidation(name, validity) // check for default validity object
     addMessageForValidation(name, customValidity) // check for custom validity object

    }

    function addMessageForValidation(name, validityObject) {
      for ( let key in validityObject ) {
        /*
          the validityState object's propeties are not its own
          so we must not use the .hasOwnProperty filter

          the validityState object has a "valid" property
          that is true when the input is valid and false otherwise
          it's not really an error-related property so we ignore it
        */
        if(key === 'valid') continue

        /*
          the property is set to true when the condition is not met
          e.g an empty required field has the valueMissing property set to true
        */
        const isValid = validityObject[key] === false

        const messages = $$(`[data-errors-for="${name}"] [data-errors-when="${key}"]`)

        messages.forEach(function (message) {
          if(isValid) hide(message)
          else show(message)
        })
      }
    }
    function show(element) {
      element.style.display = ''
      element.removeAttribute('aria-hidden')
    }

    function hide(element) {
      element.style.display = 'none'
      element.setAttribute('aria-hidden', 'true')
    }

    const includesCache = {}

  function updateIncludes () {
    $$('[data-include]').forEach(function (element) {
      const id = element.getAttribute('data-include')
      if (includesCache[id] == null) includesCache[id] = document.getElementById(id).innerHTML
      element.innerHTML = includesCache[id]
    })
  }

  function addLabel(element) {
      const parentNode = element.parentNode,
            name = element.getAttribute('name');
    if(element.value) {
    if($$(`[for=${name}]`).length) return false; // if exist
        const labelText = element.getAttribute('placeholder'),
              labelElem = document.createElement('label');
              labelElem.innerHTML = labelText;
              labelElem.setAttribute('for', name)
              //prepend it
              parentNode.insertBefore(labelElem, parentNode.childNodes[0])
              
                $$(`[for=${name}]`)[0].classList.add('animation')
    } else {

      $$(`[for=${name}]`)[0].length ? $$(`[for=${name}]`)[0].remove() : '';
    }
  }
    /* init */
    form.addEventListener('submit', onSubmit, false);

    form.addEventListener('change', function(event) {
      const target = event.target

      setState(target, 'changed', true)
      validate(target)
      
    }, false)

    form.addEventListener('keyup', function(event) {
      const target = event.target
      addLabel(target)
    }, false)

    
    $$('[data-errors-when]').forEach(hide)
    
    updateIncludes()
    $$('[data-errors-when]').forEach(hide)
    return props;
  }

module.exports = FormValidation;