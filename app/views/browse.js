var storage = require('controllers/storageProxy');
var recipe  = require('templates/recipe');

/**
 * Bootstraps the recipe form by calling external code necessary to setup form event listeners, and 
 * registering callbacks to keep recipe specific logic away from event listeners and indexedDB manipulation.
 */
module.exports = (function(){
	var currentData;
	// jQuery object
	var wrapper;
	/**
	 * callback invoked when find query is complete.
	 * @param  {Array} data
	 */
	function onFindComplete(data) {
		var currentData = data;
		// clear out Dom
		wrapper.empty();

		// iterate through DB results and add to dom
		for( var i in currentData) {
			// populated template
			var template = recipe(currentData[i]);
			// append to dom
			wrapper.append(template);
		}
		

	}

	return {
		/**
		 * initialize browse data page
		 * @param  {String} formId 
		 */
		init : function(selector){
			wrapper = $(selector);
			// find all entries in recipes objectstore
			storage.find("recipes", onFindComplete);
		}
	}

})();
