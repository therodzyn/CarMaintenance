(function() {

	APP.Models.User = Backbone.Model.extend({

		// Właściwość, która ustala, że id modelu będzie miało nazwę "_id", bo w takiej formie MongoDB nadaje id
		idAttribute: "_id",

		url: function() {

			if(this.isNew()) {
				return "/user/";
			} else {
				return "/user/" + this.get("_id");
			}

		}

	});

})();