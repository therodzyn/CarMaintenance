(function() {

APP.Views.GarageEditCar = Backbone.View.extend({

    tagName: "div",
    className: "container",

    template: JST["GarageAddEditCarTemplate"],

    events: {
    	"submit form": "editUserCar",
    	"click .delete-btn": "showDeleteMessage",
    	"click .delete-car-btn": "deleteUserCar"
    },

    initialize: function() {

    	this.listenToOnce(this.model, "change", this.render);
    	this.listenToOnce(this.model, "destroy", this.redirectToGarage);
    	this.listenTo(this.model, "update", this.redirectToGarage);

    },

    render: function() {

    	var model = this.model;

        this.model.set("newItem", false);

        var html = this.template( this.model.toJSON() );

        this.$el.html(html);

        this.changeContentClass("add-car");

        $(".content > .container").remove();

        APP.Regions.infoDiv.after(this.$el);

        var options = {
        	dateInputNode: this.$("#check"),
        	modules: {
        		footer: false,
				icon: false,
        		clear: false
        	},
        	dateFormat: {
			    separator: "-",
			    format: ["DD" , "MM" , "YYYY"]
        	}
        };

         var options2 = {
        	dateInputNode: this.$("#insurance"),
        	modules: {
        		footer: false,
				icon: false,
        		clear: false
        	},
        	dateFormat: {
			    separator: "-",
			    format: ["DD" , "MM" , "YYYY"]
        	}
        };
		var instance = new BeatPicker(options);
		var instance2 = new BeatPicker(options2);

		instance.on("change", function(o) {

			model.set("check", o.string);

		});

		instance2.on("change", function(o) {

			model.set("insurance", o.string);

		});

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
				swal(
	    			{
	    				title: "Zapisano!",
	    				text: "Pojazd został zapisany.",
	    				type: "success",
	    				confirmButtonColor: "#27B6AF"
	    			}
	    		);
				// Zdarzenie update w Backbone nie istnieje, ale za pomoca trigger, samodzielnie je wywołujemy i możemy na nie nasłuchiwać.
				model.trigger("update");
			}
		});

    },

    showDeleteMessage: function(e) {

    	e.preventDefault();

    	var model = this.model;

    	swal(
	    	{
	    		title: "Czy na pewno chcesz usunąć pojazd?",
	    		text: "Nie będzie można już odzyskać danych!",
	    		type: "warning",
	    		showCancelButton: true,
	    		confirmButtonColor: "#d9534f",
	    		confirmButtonText: "Tak, usuń pojazd!",
	    		cancelButtonText: "Anuluj",
	    		closeOnConfirm: false,
	    		customClass: "no-hover"
    	}, function() {
    		swal(
    			{
    				title: "Usunięto!",
    				text: "Pojazd został usunięty.",
    				type: "success",
    				confirmButtonColor: "#27B6AF"
    			}
    		);
    		model.destroy({wait: true});
    	});

    },

    deleteUserCar: function(e) {

		// this.model.destroy({wait: true});

    },

	redirectToGarage: function() {

		APP.router.navigate("/garage", {trigger: true});

	}

});

})();