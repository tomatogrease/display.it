/**
 * Object representing a recipe entry
 * @return {Object}
 */
module.exports = function(data){
	this.title = data.title || "n/a";
	this.ingredients = data.ingredients || "n/a";
	this.instructions = data.instructions || "n/a";
}