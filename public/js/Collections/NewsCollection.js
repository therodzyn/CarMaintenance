(function() {

	APP.Collections.NewsList = Backbone.Collection.extend({

		model: APP.Models.News,

		url: "/news"

	});

})();