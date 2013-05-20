var schema  = require('models/schema');
var storage = require('controllers/storageProxy');
var recipeView = require('views/create');

$(document).ready(function(){
	// initialize database
	storage.init(schema);
	// initialize recipe form
	recipeView.init('.content');
});