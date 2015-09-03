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

	APP.imageUploader = {

	    addHover: function(e) {

	    	e.preventDefault();
	    	this.counter++;
	        this.dropZone.classList.add("dragOver");

	    },

	    removeHover: function(e) {

	    	this.counter--;
	    	if(this.counter === 0) {
	        	this.dropZone.classList.remove("dragOver");
	    	}

	    },

	    cancelDefault: function(e) {

	        e.preventDefault();
	        return false;

	    },

	    handleDrop: function(e) {

	        e.preventDefault();
	        e.stopPropagation();

	        this.dropZone.ondrop = null;

	        this.file = e.dataTransfer.files[0];

            if(this.file.type.match("image.*")) {
                this.addToUploadList();
       			this.removeHover();
       			this.sendFiles();
            } else {
            	swal(
	    			{
	    				title: "Błąd!",
	    				text: "Próbujesz wysłać niepoprawny format pliku.",
	    				type: "error",
	    				confirmButtonColor: "#27B6AF"
	    			}
	    		);
	    		this.removeHover();
	    		this.init();
	    		return false;
            }

	    },

	    addToUploadList: function() {

	        this.formData.append("image", this.file);
	        this.filesAdded++;

	    },

	    sendFiles: function() {

	        if(this.filesAdded == 0) return;

	        var that = this;

	        $.ajax({

	        	type: "POST",
	        	url: "account/addAvatar",
	        	data: this.formData,
	        	processData: false,
  				contentType: false,
	        	success: function(res) {
	        		swal(
		    			{
		    				title: "Dodano avatar!",
		    				text: "Avatar został dodany.",
		    				type: "success",
		    				confirmButtonColor: "#27B6AF"
		    			}
		    		);
	        		that.init();
	        	},
	        	error: function(res) {
	        		swal(
		    			{
		    				title: "Błąd!",
		    				text: "Próbujesz wysłać niepoprawny format pliku.",
		    				type: "error",
		    				confirmButtonColor: "#27B6AF"
		    			}
		    		);
		    		that.init();
	        	}

	        });

	    },

	    init: function() {

	        if(!("draggable" in document.createElement("span")) || !window.FileReader) {
	            return;
	        }

	        this.dropZone = document.querySelector(".drop");

	        // informacja po wysłaniu (powodzenie/niepowodzenie)
	        // this.status = document.querySelector("#status");

	        this.filesAdded = 0;
	        this.formData = new FormData();
	        this.counter = 0;

	        this.dropZone.ondragover = this.cancelDefault;
	        this.dropZone.ondragenter = this.addHover.bind(this);
	        this.dropZone.ondragleave = this.removeHover.bind(this);
	        this.dropZone.ondrop = this.handleDrop.bind(this);

	    }

	};

	APP.Scripts = function() {

		var height = $(".content").height() + $("header").height() + 2;
		if(height < $(window).height()) {
			if($(window).width() > 767) {
				$(".content > .container").height( $(window).height() - $("header").height() - $(".info").height() - 42);
			} else {
				$(".content > .container").height( $(window).height() - $("header").height() - $(".info").height() - 11);
			}
		}

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

	    if(APP.ViewsInstances.databaseItem) {
	    	APP.ViewsInstances.databaseItem.remove();
		}

	    APP.ViewsInstances.mainView = view;

	},

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