(function() {

	window.APP = {

		Models: {},
		Collections: {},
		Views: {},
		Routers: {},

		Regions: {},

		ViewsInstances: {},

		Vent: {}

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

		console.log("Aplikacja uruchomiona.");
		APP.initConfig();

	};

})();