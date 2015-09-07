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
	    		this.init(this.link, this.mainMSG, this.secondMSG, this.deleteLink, this.deleteEl);
	    		return false;
            }

	    },

	    addToUploadList: function() {

	        this.formData.append("image", this.file);
	        this.filesAdded++;

	    },

	    setNewAvatarLinks: function(res) {

	    	$("body > div:nth-child(2) > div > div.avatar").css({
	    		"background": "url(img/avatars/" + res.link + ") no-repeat center center"
	    	});
	    	$("body > div.content.add-car > div.container > form > div.form-group.hidden-xs > div > div").css({
	    		"background": "url(img/avatars/" + res.link + ") no-repeat left top"
	    	});
	    	var deleteL = $("<i class='fa fa-times'></i>");
	    	$("body > div.content.add-car > div.container > form > div.form-group.hidden-xs > div > div").append(deleteL);

	    },

	    setNewCarImageLinks: function(res) {

	    	$("body > div.content.car > div.container > div:nth-child(1) > div.col-sm-6.hidden-xs.text-center > div").css({
	    		"background": "url(img/carImages/" + res.link + ") no-repeat left top",
	    		"background-size": "cover"
	    	});
	    	var deleteL = $("<i class='fa fa-times'></i>");
	    	$("body > div.content.car > div.container > div:nth-child(1) > div.col-sm-6.hidden-xs.text-center > div").append(deleteL);

	    },

	    deleteAvatarLinks: function() {

    		$("body > div:nth-child(2) > div > div.avatar").css({
	    		"background": "url(img/avatar64.png) no-repeat center center"
	    	});
	    	$("body > div.content.add-car > div.container > form > div.form-group.hidden-xs > div > div").css({
	    		"background": ""
	    	});
	    	$(".fa.fa-times").remove();

	    },

	    deleteCarImageLinks: function() {

	    	$("body > div.content.car > div.container > div:nth-child(1) > div.col-sm-6.hidden-xs.text-center > div").css({
	    		"background": "none"
	    	});
	    	$("body > div.content.car > div.container > div:nth-child(1) > div.col-sm-6.hidden-xs.text-center > div > i").remove();

	    },

	    sendFiles: function() {

	        if(this.filesAdded == 0) return;

	        var that = this;

	        $.ajax({

	        	type: "POST",
	        	url: this.link,
	        	data: this.formData,
	        	processData: false,
  				contentType: false,
	        	success: function(res) {
	        		swal(
		    			{
		    				title: that.mainMSG,
		    				text: that.secondMSG,
		    				type: "success",
		    				confirmButtonColor: "#27B6AF"
		    			}
		    		);
		    		if(res.drop === "avatar") {
		    			that.setNewAvatarLinks(res);
		    		} else {
		    			that.setNewCarImageLinks(res);
		    		}
	        		that.init(that.link, that.mainMSG, that.secondMSG, that.deleteLink, that.deleteEl);
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
		    		that.init(that.link, that.mainMSG, that.secondMSG, that.deleteLink, that.deleteEl);
	        	}

	        });

	    },

	    handleDeleteImg: function(e) {

	    	e.preventDefault();

	        var that = this;

	    	swal(
		    	{
		    		title: "Czy na pewno chcesz usunąć " + that.deleteEl + "?",
		    		text: "Nie będzie można już odzyskać danych!",
		    		type: "warning",
		    		showCancelButton: true,
		    		confirmButtonColor: "#d9534f",
		    		confirmButtonText: "Tak, usuń " + that.deleteEl + "!",
		    		cancelButtonText: "Anuluj",
		    		closeOnConfirm: false,
		    		customClass: "no-hover"
	    	}, function() {

	    		$.ajax({

		        	type: "POST",
		        	url: that.deleteLink,
		        	data: {delete: true},
		        	processData: false,
	  				contentType: false,
		        	success: function(res) {

			    		swal(
			    			{
			    				title: "Usunięto!",
			    				text: that.deleteEl.charAt(0).toUpperCase() + that.deleteEl.slice(1) + " został usunięty.",
			    				type: "success",
			    				confirmButtonColor: "#27B6AF"
			    			}
			    		);

			    		if(res.drop === "avatar") {
			    			that.deleteAvatarLinks();
			    		} else {
			    			that.deleteCarImageLinks();
			    		}
			    		that.init(that.link, that.mainMSG, that.secondMSG, that.deleteLink, that.deleteEl);

		        	},
		        	error: function() {

			    		swal(
			    			{
			    				title: "Błąd!",
			    				text: "Wystąpił błąd po stronie serwera.",
			    				type: "error"
			    			}
			    		);

		        	}

		        });

	    	});

	    },

	    init: function(link, mainMSG, secondMSG, deleteLink, deleteEl) {

	        if(!("draggable" in document.createElement("span")) || !window.FileReader) {
	            return;
	        }

	        this.dropZone = document.querySelector(".drop");

	        if(document.querySelector(".fa.fa-times")) {
	        	this.deleteImg = document.querySelector(".fa.fa-times");
	        }

	        this.filesAdded = 0;
	        this.formData = new FormData();
	        this.counter = 0;
	        this.link = link;
	        this.mainMSG = mainMSG;
	        this.secondMSG = secondMSG;
	        this.deleteLink = deleteLink;
	        this.deleteEl = deleteEl;

	        this.dropZone.ondragover = this.cancelDefault;
	        this.dropZone.ondragenter = this.addHover.bind(this);
	        this.dropZone.ondragleave = this.removeHover.bind(this);
	        this.dropZone.ondrop = this.handleDrop.bind(this);

	        if(this.deleteImg) {
	        	this.deleteImg.onclick = this.handleDeleteImg.bind(this);
	        }

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
			showNav(show);
			show = !show;
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