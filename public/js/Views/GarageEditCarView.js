(function() {

APP.Views.GarageEditCar = Backbone.View.extend({

    tagName: "div",
    className: "container",

    template: JST["GarageAddEditCarTemplate"],

    events: {
    	"submit form": "editUserCar",
    	"click .delete-btn": "showDeleteMessage",
    	"click .delete-car-btn": "deleteUserCar",
    	"blur form input, form select": "checkInputValue"
    },

    initialize: function() {

    	Backbone.Validation.bind(this);
    	this.listenToOnce(this.model, "change", this.render);
    	this.listenToOnce(this.model, "destroy", this.redirectToGarage);
    	this.listenTo(this.model, "update", this.redirectToGarage);

    },

    render: function() {

    	var model = this.model;

    	if(this.model.attributes.check) {
    		this.checkDate = this.model.attributes.check;
    	}

    	if(this.model.attributes.insurance) {
    		this.insuranceDate = this.model.attributes.insurance;
    	}

        this.model.set("newItem", false);

        var html = this.template( this.model.toJSON() );

        this.$el.html(html);

        this.changeContentClass("add-car");

        $(".content > .container").remove();

        APP.Regions.infoDiv.after(this.$el);

		var opts = {
		    format: 'dd-mm-yyyy',
			autoclose: true,
			language: "pl",
			orientation: "top left",
			todayHighlight: true
		};

		$("#check").datepicker(opts).on("changeDate", function(e) {
			model.set("check", e.currentTarget.value);
		});

		$("#insurance").datepicker(opts).on("changeDate", function(e) {
			model.set("insurance", e.currentTarget.value);
		});

		APP.SetTop("Edytuj pojazd", "", 70);

        APP.Scripts.init();

       	$("body > div:nth-child(2) > nav > ul > li > a").removeAttr('class');
        $("body > div:nth-child(2) > nav > ul > li:nth-child(1) > a").attr("class", "active");


        $("body > div.left-aside.small-nav > nav > ul > li > a").removeAttr('class');
        $("body > div.left-aside.small-nav > nav > ul > li:nth-child(1) > a").attr("class", "active");

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

    checkInputValue: function(e) {

    	var id = e.currentTarget.id;
    	if($(e.currentTarget).attr("type") === "radio") {
    		id = e.currentTarget.classList[0];
    	}

    	var invalidFields = this.model.validate();

    	if(invalidFields !== null && invalidFields !== undefined && Object.keys(invalidFields).length > 0) {

    		var err = false;
	    	Object.keys(invalidFields).forEach(function(key) {

    			if(key === id) {
    				err = true;
    				var input = {};
    				if($(e.currentTarget).attr("type") === "radio") {
    					input = $("." + key);
    				} else {
    					input = $("#" + key);
    				}
    				input.css({"border": "2px solid #C00"});

					if(e.currentTarget.localName === "select") {
						if(input.parent().children(".error-info").length < 1) {
							input.parent().append("<p style='clear: both;'></p><p class='error-info' style='color: #C00; font-size: 1.6em; font-weight: bold; padding-left: 15px;'>" + invalidFields[key] + "</p>");
						}
					} else if($(e.currentTarget).attr("type") === "radio") {
						if(input.parent().children(".error-info").length === 0) {
							input.parent().append("<p class='error-info' style='color: #C00; font-size: 1.6em; font-weight: bold;'>" + invalidFields[key] + "</p>");
						}

					} else {
						if(input.next(".error-info").length === 0) {
    						input.after("<p class='error-info' style='color: #C00; font-size: 1.6em; font-weight: bold;'>" + invalidFields[key] + "</p>");
    					}
					}

    			}
    		});

    		if(err === false) {
				if($(e.currentTarget).attr("type") === "radio") {
					input = $("." + id);
					if(input.siblings(".error-info").length > 0)
						input.siblings(".error-info").remove();
				} else if(e.currentTarget.localName === "select") {
					input = $("#" + id);
					input.css({"border": ""});
					if(input.parent().children(".error-info").length > 0)
						if(/^.+width.+$/.test(id)) {
							input.parent().children(".error-info:nth-child(7)").remove();
						}
						else {
							input.parent().children(".error-info:nth-child(9)").remove();
						}
				} else {
					input = $("#" + id);
					input.css({"border": ""});
					if(input.next(".error-info").length > 0)
						input.next(".error-info").remove();
				}

    		}

    	}

    },

    editUserCar: function(e) {

		e.preventDefault();

		var invalidFields = this.model.validate();

		if(invalidFields !== null && invalidFields !== undefined && Object.keys(invalidFields).length > 0) {

			$(".error-info").remove();
			$(".add-car > .container > form input, .add-car > .container > form select").css({"border": ""});

			for(var field in invalidFields) {
				var input = {};
				if(field === "tire-kind") {
					input = $("." + field);
				} else {
					input = $("#" + field);
				}

				if(input.is("select")) {
					input.css({"border": "2px solid #C00"});
					input.parent().append("<p style='clear: both;'></p><p class='error-info' style='color: #C00; font-size: 1.6em; font-weight: bold; padding-left: 15px;'>" + invalidFields[field] + "</p>");
				} else if(input.attr("name") === "tire-kind") {
					input.parent().append("<p class='error-info' style='color: #C00; font-size: 1.6em; font-weight: bold;'>" + invalidFields[field] + "</p>");
				} else {
					input.css({"border": "2px solid #C00"});
					input.after("<p class='error-info' style='color: #C00; font-size: 1.6em; font-weight: bold;'>" + invalidFields[field] + "</p>");
				}
			}

			return;
		}

		if(this.checkDate != this.model.attributes.check) {
			this.model.attributes.checkEmail = 0;
		}

		if(this.insuranceDate != this.model.attributes.insurance) {
			this.model.attributes.insuranceEmail = 0;
		}

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

	redirectToGarage: function() {

		APP.router.navigate("/garage", {trigger: true});

	}

});

})();