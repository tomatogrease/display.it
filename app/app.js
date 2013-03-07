var moduleA = require('moduleA/main');
var formReader = require('data-controller/form-read');

$(document).ready(function(){

    console.log('DOM ready');

    formReader.init($('#recipeForm'));


});

