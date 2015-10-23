(function() {

	APP.Models.User = Backbone.Model.extend({

		// Właściwość, która ustala, że id modelu będzie miało nazwę "_id", bo w takiej formie MongoDB nadaje id
		idAttribute: "_id",

		validation: {

			"birth-year": {
				required: false,
				pattern: /^(\d{4})$/,
				msg: "Należy podać poprawny rok urodzenia."
			},

			"license-year": {
				required: false,
				pattern: /^(\d{4})$/,
				msg: "Należy podać poprawny rok uzyskania prawa jazdy."
			},

			phone: {
				required: false,
				pattern: /^(\+?\d{9,12})$/,
				msg: "Należy podać poprawny format numeru telefonu."
			}

		},

		url: "/account"

	});

})();