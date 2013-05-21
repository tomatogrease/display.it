var create = require('views/create');
var browse = require('views/browse');

module.exports = (function() {
	var hashPrefix = "#!/";
	var hash = "";
	var contentWrapper = '.content';
	/**
	 * Listen to any hashchanges in the url
	 * @param  {Object} event 
	 */
	function onHashChange(event) {
		// TODO: call unbootstrapper of previous hash?
		updateContent(getCurrentHash());
	}
	/**
	 * Parse string from hash to derive target destination
	 * @return {String}
	 */
	function getCurrentHash() {
		hash = (window.location.hash).replace(hashPrefix, '');
		return hash;
	}
	/**
	 * Call the appropriate init view function based on provided hash
	 * @param  {String} destination
	 */
	function updateContent(destination) {
		// default view
		if (destination === "") {
			browse.init(contentWrapper);
		}
		// create recipe view
		else if (destination === "create") {
			create.init(contentWrapper);
		}

		updateMenu(destination);
	}
	/**
	 * Change active position of menu based on passed url
	 * @param  {String} destination 
	 */
	function updateMenu(url) {
		$('.nav li').removeClass('active');
		// TODO: Build menu through handlebars. Binding?
	}

	return {
		init: function() {
			// add listener for any hash change
			window.onhashchange = onHashChange;
			// match hash against possible UI route.
			updateContent(getCurrentHash());
		}
	};
})();