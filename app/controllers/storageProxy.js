/**
 * Generic IndexedDB proxy for performing basic actions against a database.
 */
module.exports = (function() {
	// https://developer.mozilla.org/en/IndexedDB/Using_IndexedDB
	// save global indexedDB methods based on browser availability.
	var indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.msIndexedDB;
	var IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction;
	var IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange;
	// database information
	var db;
	var dbName;
	var objectStores;
	var revision;
	/**
	 * Accept schema object and save core database information
	 * @param  {Object} model
	 */
	function initialize(model) {
		dbName = model.name;
		revision = model.revision;
		// save array of object stores for use with createTable
		objectStores = model.objectStores;
	}
	/**
	 * Open a indexedDB database, and set fallback event listeners
	 * @return {IDBOpenDBRequest} Request object used to perform transactions with.
	 */
	function open() {
		
		var request = indexedDB.open(dbName, revision);
		request.onerror = onError;
		// When theres a version mismatch or db undefined
		request.onupgradeneeded = updateSchema;
		return request;
	}
	/**
	 * Generic readOnly dataStore transaction with onsuccess function call
	 * @param  {String} store_name
	 * @param  {String} key
	 */
	function readData(store_name, key) {

		var request = open();

		request.onsuccess = function(event) {
			db = event.target.result;
			// onSuccess handler when successfully reading objectStore
			var store = getObjectStore(store_name, "readonly").get(key).onsuccess = function(event) {
				console.log(key, event.target.result);
			}
		}
	}
	/**
	 * find database data with a cursor, to retrieve multiple results.
	 * @param  {String}   store_name
	 * @param  {Function} callback
	 */
	function findData(store_name, callback) {

		var request = open();
		var recipes = [];

		request.onsuccess = function(event) {
			db = event.target.result;
			// use a cursor to retrieve multiple results
			// https://developer.mozilla.org/en-US/docs/IndexedDB/Using_IndexedDB#Using_an_index
			var store = getObjectStore(store_name, "readwrite").openCursor().onsuccess = function(event) {
				var cursor = event.target.result;

				if (cursor) {
					recipes.push(cursor.value);
					cursor.continue();
				} else {
					// when cursor has gone through all results, invoke the callback.
					callback(recipes);
				}
			}
		}
	}
	/**
	 * Generic readwrite dataStore transaction with onsuccess function call
	 * @param  {String} store_name
	 * @param  {String} value
	 */
	function saveData(store_name, value) {
		var request = open();

		request.onsuccess = function(event) {
			db = event.target.result;
			// onSuccess handler when successfully reading objectStore
			var store = getObjectStore(store_name, "readwrite").add(value).onsuccess = function(event) {

				console.log(value, event.target.result);
			}
		}
			
	}
	/**
	 * Generic onError listener
	 * @param  {Object} event
	 */
	function onError(event) {
		console.log('error retrieving db', event);

	}
	/**
	 * Iterates through objectStores array to create objectStores within the current database
	 * @param  {Object} event
	 */
	function updateSchema(event) {

		db = event.target.result;
		
		for(var i in objectStores) {
			var store = objectStores[i];
			// create datastore in current database
			var objectStore = db.createObjectStore(store.name, { keyPath: store.id, autoIncrement: store.autoIncrement });
			
			for(var j in store.index) {
				// create object store index for searching
				objectStore.createIndex(store.index[j].name, store.index[j].keyPath, { unique: store.index[j].unique });
			}
		}
	}

	/**
	 * Get transaction object and find an objectStore based on passed name
	 * @param  {String} name
	 * @param  {String} mode : "readonly" or "readwrite"
	 * @return {objectStore}
	 */
	function getObjectStore(name, mode) {
		var transaction = db.transaction(name, mode);
		return transaction.objectStore(name);
	}

	return {
		init: function(model, callback) {
			initialize(model);
		},
		read: function(storeName, key) {
			readData.apply(this, [storeName, key]);
		},
		find: function(storeName, callback) {
			findData.apply(this, [storeName, callback]);
		},
		save: function(storeName, value) {

			saveData.apply(this, [storeName, value]);
		}
	}
})();