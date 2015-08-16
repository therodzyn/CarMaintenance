(function() {

	window.APP = {

		Models: {},
		Collections: {},
		Views: {},
		Routers: {},

		Regions: {
			infoDiv: $(".info")
		},

		ViewsInstances: {},

		Vent: _.extend({}, Backbone.Events)

	};

	APP.Scripts = function() {

		// var height = $(".content").height() + $("header").height() + 2;
		// if(height < $(window).height()) {
		// 	if($(window).width() > 767) {
		// 		$(".content > .container").height( $(window).height() - $("header").height() - $(".info").height() - 42);
		// 	} else {
		// 		$(".content > .container").height( $(window).height() - $("header").height() - $(".info").height() - 11);
		// 	}
		// }

		var small = true;
		var show = true;

		// USTAWIĆ RESPONSYWNOŚĆ
		function enableSmallNav(bool) {

			var nav = bool === true ? 65 : 250;

			if(bool === true) {
				$(".left-aside").hide();
				$(".left-aside.small-nav").show().width(nav);
				$(".page-header > a").text("cm");
			} else {
				$(".left-aside").show();
				$(".left-aside.small-nav").hide();
				$(".page-header > a").text("car maintenance");
			}

			$(".small-nav i").css({"margin": 0});
			$(".content").css({"margin-left": nav});
			$(".top").css({"padding-left": nav});
			$(".page-header").width(nav);

		}

		function showNav(bool) {

			var display = bool === true ? "block" : "none";
			$(".left-aside").not(".small-nav").css({"display": display});

		}

		if($(window).width() < 1200 && $(window).width() > 767) {
			enableSmallNav(small);
		}

		$(".mini-menu-btn").on("click", function(e) {
			if($(window).width() > 1199) {
				e.preventDefault();
				enableSmallNav(small);
				small = !small;
			} else {
				showNav(show);
				show = !show;
			}
		});

	},

	APP.showMainView = function(view) {

	    if(APP.ViewsInstances.mainView) {

	        var childViews = APP.ViewsInstances.mainView.childViews;

	        if(childViews) {

	            _.each(childViews, function(childView) {

	                childView.remove();

	            });

	        }

	        APP.ViewsInstances.mainView.remove();
	    }

	    APP.ViewsInstances.mainView = view;

	};

	APP.Messages = {

		displayDialog: function(msg, fn) {

			alert(msg);
			return fn();

		},

		showLogoutInfo: function() {

			APP.Messages.displayDialog("Brak dostępu. Zostałeś wylogowany.", function() {
				window.location.href = "/";
			});

		}

	};

	APP.initConfig = function() {

		$.ajaxSetup({
			statusCode: {
				401: function(xhr) {
					if(xhr.responseJSON.error === "logout") {
						APP.Messages.showLogoutInfo();
					}
				}
			}
		});

	};

	APP.init = function() {

		APP.initConfig();
		APP.router = new APP.Routers.Router();

		var model = new APP.Models.Car();
		var view = new APP.Views.Garage({model: model});
    	APP.showMainView(view);

    	model.fetch();

    	Backbone.history.start({pushState: true});

	};

})();