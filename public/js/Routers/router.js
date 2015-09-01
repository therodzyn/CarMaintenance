(function() {

APP.Routers.Router = Backbone.Router.extend({

    routes: {
    	"garage": "showGarage",
    	"garage/add-car": "showGarageAddCar",
    	"garage/car/:id": "showGarageCar",
    	"garage/car/:id/edit": "showGarageEditCar",
    	"map": "showMap",
    	"news": "showNews",
    	"news/:id": "showNewsItem",
    	"account": "showAccount",
    	"account/edit": "editAccount",
    	"account/delete": "deleteAccount",
    	"database": "showDatabase"
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

    showMap: function() {

    	var view = new APP.Views.Map();
    	APP.showMainView(view);

    	view.render();

    },

    showNews: function() {

    	var collection = new APP.Collections.NewsList();
    	var view = new APP.Views.NewsList({collection: collection});
    	APP.showMainView(view);

    	collection.fetch({reset: true});

    },

    showNewsItem: function(id) {

    	var model = new APP.Models.News({_id: id});
    	var view = new APP.Views.NewsItem({model: model});
    	APP.showMainView(view);

    	model.fetch();

    },

    showAccount: function() {

    	var model = new APP.Models.User();
    	var view = new APP.Views.Account({model: model});
    	APP.showMainView(view);

    	model.fetch();

    },

    showDatabase: function() {

    	var chooseView = new APP.Views.DatabaseChoose();
    	APP.showMainView(chooseView);

    	var randomID = Math.floor((Math.random() * 10) + 1);

    	var model = new APP.Models.DatabaseItem({"_id": randomID});
    	var itemView = new APP.Views.DatabaseItem({model: model});

    	model.fetch();

    }

});

})();