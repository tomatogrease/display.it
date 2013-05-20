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
	 * callback invoked when find query is complete.
	 * @param  {Array} data
	 */
	function onFindComplete(data) {
		console.log("All data within recipes", data);
	}

	return {
		/**
		 * initialize browse data page
		 * @param  {String} formId 
		 */
		init : function(wrapper){
			// find all entries in recipes objectstore
			storage.find("recipes", onFindComplete);

		}
	}

})();
