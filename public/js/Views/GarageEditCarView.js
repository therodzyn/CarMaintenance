(function() {

APP.Views.GarageEditCar = Backbone.View.extend({

    tagName: "div",
    className: "container",

    template: JST["GarageAddEditCarTemplate"],

    events: {
    	"submit form": "editUserCar"
    },

    initialize: function() {

    	this.listenToOnce(this.model, "change", this.render);
    	this.listenTo(this.model, "update", this.redirectToGarage);

    },

    render: function() {

        this.model.set("newItem", false);

        var html = this.template( this.model.toJSON() );

        this.$el.html(html);

        this.changeContentClass("add-car");

        $(".content > .container").remove();

        APP.Regions.infoDiv.after(this.$el);

        APP.Scripts();

        this.stickit();

        return this;

    },

    bindings: {

    	"#country": "country",
    	"#year": "year",
    	"#brand": "brand",
    	"#model": "model",
    	"#reg": "reg",
    	"#check": "check",
    	"#insurance": "insurance",
    	"#act-km": "act-km",
    	"#avg-km": "avg-km",
    	"#vin": "vin",
    	".tire-kind": "tire-kind",
    	"#tire-width-front": "tire-width-front",
    	"#tire-inch-front": "tire-inch-front",
    	"#tire-width-back": "tire-width-back",
    	"#tire-inch-back": "tire-inch-back"

    },

    changeContentClass: function(name) {

    	var content = $(".content")[0];
        content.classList.remove(content.classList.item(1));
        content.classList.add(name);

    },

    editUserCar: function(e) {

		e.preventDefault();

		var model = this.model;

		this.model.save({}, {
			wait: true,
			success: function() {
				// Zdarzenie update w Backbone nie istnieje, ale za pomoca trigger, samodzielnie je wywołujemy i możemy na nie nasłuchiwać.
				model.trigger("update");
			}
		});

    },

	redirectToGarage: function() {

		APP.router.navigate("/garage", {trigger: true});

	}

});

})();