(function() {

	APP.Models.News = Backbone.Model.extend({

		idAttribute: "_id",

		url: function() {

			if(this.isNew()) {
				return "/news";
			} else {
				return "/news/" + this.get("_id");
			}

		}

	});

})();