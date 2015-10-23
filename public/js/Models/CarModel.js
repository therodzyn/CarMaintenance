(function() {

	APP.Models.Car = Backbone.Model.extend({

		// Właściwość, która ustala, że id modelu będzie miało nazwę "_id", bo w takiej formie MongoDB nadaje id
		idAttribute: "_idCar",

		validation: {

			country: {
				required: true,
				pattern: /^([A-Za-ząćęłńóśźżĄĆĘŁŃÓŚŹŻ])+$/,
				msg: "Należy podać kraj produkcji."
			},

			year: {
				required: true,
				pattern: /^(\d{4})$/,
				msg: "Należy podać poprawny rok produkcji."
			},

			brand: {
				required: true,
				msg: "Należy podać markę."
			},

			model: {
				required: true,
				msg: "Należy podać model."
			},

			reg: {
				required: true,
				pattern: /^[A-Z][A-Z] [A-Z0-9][A-Z0-9][A-Z0-9][A-Z0-9][A-Z0-9]$|^[A-Z][A-Z][A-Z] [A-Z0-9][A-Z0-9][A-Z0-9][A-Z0-9]$|^[A-Z][A-Z][A-Z] [A-Z0-9][A-Z0-9][A-Z0-9][A-Z0-9][A-Z0-9]$/,
				msg: "Należy podać prawidłowy format numeru rejestracyjnego."
			},

			check: {
				required: true,
				pattern: /^(\d{2}-\d{2}-\d{4})$/,
				msg: "Należy podać poprawną datę przeglądu."
			},

			insurance: {
				required: true,
				pattern: /^(\d{2}-\d{2}-\d{4})$/,
				msg: "Należy podać poprawną datę ubezpieczenia."
			},

			"act-km": function(val) {
				if(parseInt(val) < 0 || isNaN(val)) {
					return "Należy podać poprawny przebieg.";
				}
			},

			"avg-km": function(val) {
				if(parseInt(val) < 0 || isNaN(val)) {
					return "Należy podać poprawny średni przebieg.";
				}
			},

			vin: {
				required: true,
				pattern: /^([A-HJ-NPR-Za-hj-npr-z\d]{17})$/,
				msg: "Należy podać poprawny format numeru VIN (17 znaków)."
			},

			"tire-kind": {
				required: true,
				msg: "Należy wybrać rodzaj opon."
			},

			"tire-width-front": function(val) {
				if(parseInt(val) < 125 || parseInt(val) > 355 || isNaN(parseInt(val))) {
					return "Należy wybrać poprawny rozmiar przednich opon.";
				}
			},

			"tire-width-back": function(val) {
				if(parseInt(val) < 125 || parseInt(val) > 355 || isNaN(parseInt(val))) {
					return "Należy wybrać poprawny rozmiar tylnich opon.";
				}
			},

			"tire-inch-front": function(val) {
				if(parseInt(val) < 10 || parseInt(val) > 24 || isNaN(parseInt(val))) {
					return "Należy wybrać poprawną przekątną przednich opon.";
				}
			},

			"tire-inch-back": function(val) {
				if(parseInt(val) < 10 || parseInt(val) > 24 || isNaN(parseInt(val))) {
					return "Należy wybrać poprawną przekątną tylnich opon.";
				}
			}

		},

		url: function() {

			if(this.isNew()) {
				return "/garage/cars/";
			} else {
				return "/garage/car/" + this.get("_idCar");
			}

		}

	});

})();