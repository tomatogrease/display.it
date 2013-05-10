/**
 * formProxy.js : Provides a generic set of utility functions for form events to avoid adding 
 * unnecessary logic in view code.
 * TODO: add validation approach
 */
module.exports = (function(){
	// formProxy variables
	var form = null; // jquery Object representing form
	/**
	 * Iterates through inputs in provided jquery object, to build object of key value pairs.
	 * @param  {jQuery object} target
	 * @return {object}
	 */
	function parseForm(target){
		// find all inputs in the jQuery object, except submit buttons
		var inputs = target.children('input').not('input[type="submit"]');
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
	 * Add a click listener to the submit button, and call provided
	 * callback when submit button clicked
	 * @param {String}   formId
	 * @param {Function} callback
	 */
	function addSubmitListener(formId, callback) {
		var form = getForm(formId);

		form.children('input[type="submit"]').on("click", function(event) {
			event.preventDefault();
			// parse form values from the target form
			var data = parseForm(form);
			// pass data to callback specified from view
			callback(data);
		});
	}
	/**
	 * Use passed String to get jquery object
	 * @param  {String} formId
	 * @return {Object} jQuery object
	 */
	function getForm(formId) {
		form = form || $(formId);
		return form;
	}

	return {
		/**
		 * Bootstrap function that gets callled to initialize form actions
		 * @param  {String} formId
		 * @param  {Function} submitCallback
		 */
		init : function(formId, submitCallback){
			addSubmitListener(formId, submitCallback);
		}
	}

})();
