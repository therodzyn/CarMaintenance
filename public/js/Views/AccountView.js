(function() {

APP.Views.Account = Backbone.View.extend({

    tagName: "div",
    className: "container",

    template: JST["AccountTemplate"],

    events: {
    	"click .save-about-btn": "editUser",
    	"click .save-login-btn": "editUser",
    	"click .delete-open-modal": "showDeleteMessage"
    },

    initialize: function() {

    	this.listenToOnce(this.model, "change", this.render);
    	this.listenTo(this.model, "update", this.redirectToGarage);
    	this.listenToOnce(this.model, "destroy", this.redirectToIndex);

    },

    render: function() {

    	var model = this.model;

        var html = this.template( this.model.toJSON() );

        this.$el.html(html);

        this.changeContentClass("add-car");

        $(".content > .container").remove();

        APP.Regions.infoDiv.after(this.$el);

        APP.Scripts();

        APP.imageUploader.init("account/addAvatar", "Dodano!", "Avatar został dodany.", "account/deleteAvatar", "avatar");

       	$("body > div:nth-child(2) > nav > ul > li > a").removeAttr('class');
       	$("body > div.left-aside.small-nav > nav > ul > li > a").removeAttr('class');

        this.stickit();

        return this;

    },

    bindings: {

    	"#name": "name",
    	"#sex": "sex",
    	"#birth-year": "birth-year",
    	"#license-year": "license-year",
    	"#phone": "phone",
    	"#email": "email",
    	"#old-pass": "old_pass",
    	"#new-pass": "new_pass",
    	"#new-pass-confirm": "new_pass_confirm"

    },

    changeContentClass: function(name) {

    	var content = $(".content")[0];
        content.classList.remove(content.classList.item(1));
        content.classList.add(name);

    },

    editUser: function(e) {

		e.preventDefault();

		var emailRegEx = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

		if(!emailRegEx.test($("#email").val())) {
			swal(
    			{
    				title: "Błąd",
    				text: "Podano niepoprawny format adresu e-mail.",
    				type: "error",
    				confirmButtonColor: "#27B6AF"
    			}
    		);

    		return;
		}

		var model = this.model;

		this.model.save({}, {
			wait: true,
			success: function(model, response, options) {

				var title, text, type;

	    		if(response.error === "no-errors") {

	    			title = "Zapisano!";
	    			text = "Dane konta zostały zmienione.";
	    			type = "success";
		    		var newEmail = model.attributes.email;
		    		$("#dropdownMenu1")[0].firstChild.nodeValue = newEmail + " ";
		    		$(".profile-name > a").text(newEmail);
					// Zdarzenie update w Backbone nie istnieje, ale za pomoca trigger, samodzielnie je wywołujemy i możemy na nie nasłuchiwać.
					model.trigger("update");

	    		} else {

	    			title = "Błąd!";
	    			text = response.error;
	    			type = "error";

	    		}

	    		swal(
	    			{
	    				title: title,
	    				text: text,
	    				type: type,
	    				confirmButtonColor: "#27B6AF"
	    			}
	    		);

			}

		});

    },

    showDeleteMessage: function(e) {

    	e.preventDefault();

    	var model = this.model;

    	swal(
	    	{
	    		title: "Czy na pewno chcesz usunąć konto?",
	    		text: "Nie będzie można już odzyskać danych!",
	    		type: "warning",
	    		showCancelButton: true,
	    		confirmButtonColor: "#d9534f",
	    		confirmButtonText: "Tak, usuń konto!",
	    		cancelButtonText: "Anuluj",
	    		closeOnConfirm: false,
	    		customClass: "no-hover"
    	}, function() {
    		swal(
    			{
    				title: "Usunięto!",
    				text: "Konto zostało usunięte",
    				type: "success",
    				confirmButtonColor: "#27B6AF"
    			}
    		);
    		setTimeout(function() {
				model.destroy({wait: true});
    		}, 2000);

    	});

    },

	redirectToGarage: function() {

		APP.router.navigate("/garage", {trigger: true});

	},

	redirectToIndex: function() {

		window.location.href = "/";

	}

});

})();