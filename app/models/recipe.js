/**
 * Object representing a recipe entry
 * @return {Object}
 */
module.exports = function(title, ingredients, instructions){
	var title = title || "Potato Soup";
	var ingredients = ingredients || "2 Russet Potatoes";
	var instructions = instructions || "1. Boil water. ";
	// form #id in dom
	this.id = "recipes";
	// value of submit button
	this.submit = "Add";
	this.elements = [
		{
			key: "title",
			name: "Title",
			value: title,
			isInput: true
		},
		{
			key: "ingredients",
			name: "Ingredients",
			value: ingredients,
			isTextArea: true
		},
		{
			key: "instructions",
			name: "Instructions",
			value: instructions,
			isTextArea: true
		}
	]
}