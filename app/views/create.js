// Recipe model object. Create new version and populate data to serve as representation of a row of data.
var Recipe  = require('models/recipe');

var storage = require('controllers/storageProxy');
var form    = require('controllers/formProxy');

/**
 * Bootstraps the recipe form by calling external code necessary to setup form event listeners, and 
 * registering callbacks to keep recipe specific logic away from event listeners and indexedDB manipulation.
 */
module.exports = (function(){
	var model = new Recipe();
	var name = model.id;
	/**
	 * Callback invoked when submit button of form is pressed.
	 * @param  {Object} data Object passed from formProxy, to use for storage actions.
	 */
	function onFormSubmit(data) {
		// save key value data from parsing form
		storage.save(name, data);
	}

	return {
		/**
		 * initialize recipe form 
		 * @param  {String} formId 
		 */
		init : function(wrapper){
			form.init(wrapper, model, onFormSubmit);
		}
	}

})();
