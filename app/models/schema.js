/**
 * Object representing the objectStore schema for the display.it database.
 * @return {Object}
 */

// TODO: Update objectStores with non placeholder data
module.exports = (function() {
	return {
			// top level database information
			name: "displayIt",
			revision: 1,
			// objectStore definitions within the database
			objectStores: [
				{
					name:"recipes",
					keypath: "id", 
					autoIncrement: true, 
					index: [
						{ name: "name", keyPath: "name", unique: false },
						{ name: "tags", keyPath: "tags", unique: true }
					]
				},
				{
					name:"user",
					keypath: "id", 
					autoIncrement: true, 
					index: [
						{ name: "name", keyPath: "name", unique: false },
						{ name: "email", keyPath: "email", unique: true }
					]
				}
			]
	}
})();