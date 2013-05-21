var formTemplate = require('templates/form');
/**
 * formProxy.js : Provides a generic set of utility functions for form events to avoid adding 
 * unnecessary logic in view code.
 * TODO: add validation approach
 */
module.exports = (function(){
	// formProxy variables
	var form; // jquery Object representing form
	/**
	 * Iterates through inputs in provided jquery object, to build object of key value pairs.
	 * @param  {jQuery object} target
	 * @return {object}
	 */
	function parseForm(target){
		// find all inputs in the jQuery object, except submit buttons
		var inputs = target.children('input, textarea').not('input[type="submit"]');
		var data = {};
		// iterate through each input, and save id, values into data object;
		for (var i = 0; i < inputs.length; i++){
			var input = inputs[i];
			var id = input.getAttribute('id');
			var value = input.value;
			data[id] = value;
		}
		return data;
	}
	/**
	 * Create form from handlebars template. Empty wrapper 
	 * and append template populated with model
	 * @param  {String}   wrapper  id or class of wrapper dom element
	 * @param  {Object}   model    Object representation of form data
	 * @param  {Function} callback view provided function to call when submit clicked
	 */
	function createForm(wrapper, model, callback) {
		// populate form with model data;
		form = $(formTemplate(model));

		// remove wrapper contents and append form
		$(wrapper).empty().append(form);

		// attach form listener
		registerSubmitListener(form, callback);
	}
	/**
	 * Add a click listener to the submit button, and call provided
	 * callback when submit button clicked
	 * @param {String}   form
	 * @param {Function} callback
	 */
	function registerSubmitListener(form, callback) {
		try {
			// search form for submit.
			form.children('input[type="submit"]').on("click", function(event) {
				event.preventDefault();
				// parse form values from the target form
				var data = parseForm(form);
				// pass data to callback specified from view
				callback(data);
			});
		} catch(e) {
			console.log("Error: Submit button not found.");
		}
	}

	return {
		/**
		 * Bootstrap function that gets callled to initialize form actions
		 * @param  {String} formId
		 * @param  {Function} submitCallback
		 */
		init : function(wrapper, model, submitCallback){
			createForm(wrapper, model, submitCallback);
		}
	}

})();
