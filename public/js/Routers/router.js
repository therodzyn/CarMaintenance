(function() {

APP.Routers.Router = Backbone.Router.extend({

    routes: {
    	"garage": "showGarage",
    	"garage/add-car": "showGarageAddCar",
    	"garage/car/:id": "showGarageCar",
    	"garage/car/:id/edit": "showGarageEditCar"
    },

    showGarage: function() {

    	var model = new APP.Models.Car();
    	var view = new APP.Views.Garage({model: model});
    	APP.showMainView(view);

    	model.fetch();

    },

    showGarageAddCar: function() {

    	var model = new APP.Models.Car();
    	var view = new APP.Views.GarageAddCar({model: model});
    	APP.showMainView(view);

    	view.render();

    },

    showGarageCar: function(id) {

    	var model = new APP.Models.Car({_idCar: id});
    	var view = new APP.Views.GarageCar({model: model});
    	APP.showMainView(view);

    	model.fetch();

    },

    showGarageEditCar: function(id) {

    	var model = new APP.Models.Car({_idCar: id});
    	var view = new APP.Views.GarageEditCar({model: model});
    	APP.showMainView(view);

    	model.fetch();

    },

});

})();