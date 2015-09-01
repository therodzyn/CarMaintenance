(function() {

	APP.Models.DatabaseItem = Backbone.Model.extend({

		idAttribute: "_id",

		url: function() {

			if(this.isNew()) {
				return "/database/items";
			} else {
				return "/database/item/" + this.get("_id");
			}

		}

	});

})();