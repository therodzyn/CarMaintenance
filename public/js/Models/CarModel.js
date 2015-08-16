(function() {

	APP.Models.Car = Backbone.Model.extend({

		// Właściwość, która ustala, że id modelu będzie miało nazwę "_id", bo w takiej formie MongoDB nadaje id
		idAttribute: "_idCar",

		url: function() {

			if(this.isNew()) {
				return "/cars/";
			} else {
				return "/car/" + this.get("_idCar");
			}

		}

	});

})();