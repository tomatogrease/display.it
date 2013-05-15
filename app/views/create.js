// Recipe model object. Create new version and populate data to serve as representation of a row of data.
var Recipe  = require('models/recipe');

var schema  = require('models/schema');
var storage = require('controllers/storageProxy');
var form    = require('controllers/formProxy');

/**
 * Bootstraps the recipe form by calling external code necessary to setup form event listeners, and 
 * registering callbacks to keep recipe specific logic away from event listeners and indexedDB manipulation.
 */
module.exports = (function(){
	/**
	 * Callback invoked when submit button of form is pressed.
	 * @param  {Object} data Object passed from formProxy, to use for storage actions.
	 */
	function onFormSubmit(data) {
		// initialize a recipe object based on data received from callback
		// TODO: generate forms through js template, to avoid having form ids and model object possibly being out of sync.
		var entry = new Recipe(data);

		storage.save("recipes", entry);
	}

	return {
		/**
		 * initialize recipe form 
		 * @param  {String} formId 
		 */
		init : function(formId){
			storage.init(schema);
			// need to consider creating form through js, and building dom elements based on the model file
			// so ids match expected model. Provides single reference point to key, value pairs.
			form.init(formId, onFormSubmit);
		}
	}

})();
