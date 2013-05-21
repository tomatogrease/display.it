var schema  = require('models/schema');
var storage = require('controllers/storageProxy');
var router  = require('router');
$(document).ready(function(){
	// initialize database
	storage.init(schema);

	// init router, which will initialize the appropriate view based on the url.
	router.init();
});