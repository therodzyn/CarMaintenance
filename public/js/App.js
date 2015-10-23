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

	    cropImage: function() {

	    	var img = new Image();
	    	var avatarUpload = $(".content.car .drop").length > 0 ? false : true;
	    	var fileTracker = new FileReader();
	    	var previewHeight = !avatarUpload ? $(".content.car .drop").height() : 64;
	    	var previewWidth = !avatarUpload ? $(".content.car .drop").width() : 64;
	    	var that = this;

	        fileTracker.onloadend = function() {

	        	img.src = fileTracker.result;
	        	img.style.maxHeight = "70vh";
	        	img.style.maxWidth = ($(window).width() - previewWidth - 120) + "px";
	        	img.style.display = "block";

		        swal(
	    			{
	    				title: "Przycinanie obrazka",
	    				confirmButtonColor: "#27B6AF",
	    				confirmButtonText: "Przytnij",
	    				text: img.outerHTML,
	    				html: true,
	    				customClass: "imgModal"
	    			}
	    		);

	    		var p = document.querySelector("body > div.sweet-alert.imgModal > p");
	        	p.style.maxWidth = "50%";
	        	p.style.minWidth = "45%";
	        	p.style.float = "left";

	        	var preview = $("<div style='float: right; min-width: 50%; position: relative;'><h2 style='font-size: 1.7em; line-height: normal; margin-top: 0; margin-bottom: 5px; text-align: center;'>Podgląd</h2><div style='width: "+previewWidth+"px; height: "+previewHeight+"px; border: 1px solid #000; overflow: hidden; position:absolute; left: 50%; margin-bottom: 15px; margin-left: -"+ previewWidth/2 +"px' class='img-preview'></div></div><div class='clear'></div>");
	        	$(p).after(preview);
	        	if(avatarUpload === true) {
	        		$(".img-preview").css({"border-radius": "50%"});
	        	}

	        	var $cropBtn = $("body > div.sweet-alert.showSweetAlert > div.sa-button-container > div > button");
        		$cropBtn[0].classList.add("cropBtn");
        		$(".cropBtn").css({"postion": "absolute", "bottom": 0, "margin-top": "20px"});

	        	var $croppedImage = $(".sweet-alert.imgModal > p > img");

	    		$croppedImage.cropper({
	    			built: function() {
	    				var sizes = $(this).cropper("getImageData");
	    				if(avatarUpload === true) {
	    					$(this).cropper("setCropBoxData", {"width": 64, "height": 64});
	    				}
	    				if(sizes.naturalWidth < sizes.width && sizes.naturalHeight < sizes.height) {
    						$(this).cropper("setCanvasData", {"width": sizes.naturalWidth, "height": sizes.naturalHeight});
    					}
	    			},
	    			aspectRatio: avatarUpload ? 1 / 1 : previewWidth / previewHeight,
					preview: ".img-preview",
					movable: false,
					zoomable: false,
					rotatable: false,
					scalable: false,
					background: false,
					cropBoxResizable: avatarUpload ? false : true
				});

				$("body").one("click", ".sa-button-container button.cropBtn", function(e) {
					$croppedImage.cropper("getCroppedCanvas").toBlob(function(blob) {
						that.formData = new FormData();
						that.file = blob;
						that.addToUploadList();
		       			that.removeHover();
		       			p.style.maxWidth = "";
		       			p.style.float = "";
		       			preview.remove();
		       			swal.close();
		       			that.sendFiles();
					}, 'image/jpeg');
				});

			};

	        fileTracker.readAsDataURL(this.file);

	    },

	    handleDrop: function(e) {

	        e.preventDefault();
	        e.stopPropagation();

	        this.dropZone.ondrop = null;

	        this.file = e.dataTransfer.files[0];

            if(this.file.type.match("image.*")) {
            	this.cropImage();
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
	    	$("p.desc").remove();

	    },

	    setNewCarImageLinks: function(res) {

	    	$("body > div.content.car > div.container > div:nth-child(1) > div.col-sm-6.hidden-xs.text-center > div").css({
	    		"background": "url(img/carImages/" + res.link + ") no-repeat left top",
	    		"background-size": "cover"
	    	});
	    	var deleteL = $("<i class='fa fa-times'></i>");
	    	$("body > div.content.car > div.container > div:nth-child(1) > div.col-sm-6.hidden-xs.text-center > div").append(deleteL);
	    	$("p.desc").remove();

	    },

	    deleteAvatarLinks: function() {

    		$("body > div:nth-child(2) > div > div.avatar").css({
	    		"background": "url(img/avatar64.png) no-repeat center center"
	    	});
	    	$("body > div.content.add-car > div.container > form > div.form-group.hidden-xs > div > div").css({
	    		"background": ""
	    	});
	    	$(".fa.fa-times").remove();
	    	$("<p class='desc'>Upuść tutaj zdjęcie</p>").appendTo($("body > div.content.add-car > div.container > form > div.form-group.hidden-xs > div > div"));

	    },

	    deleteCarImageLinks: function() {

	    	$("body > div.content.car > div.container > div:nth-child(1) > div.col-sm-6.hidden-xs.text-center > div").css({
	    		"background": ""
	    	});
	    	$("body > div.content.car > div.container > div:nth-child(1) > div.col-sm-6.hidden-xs.text-center > div > i").remove();
	    	$("<p class='desc'>Upuść tutaj zdjęcie</p>").appendTo($("body > div.content.car > div.container > div:nth-child(1) > div.col-sm-6.hidden-xs.text-center > div"));

	    },

	    sendFiles: function() {

	        if(this.filesAdded == 0) return;

	        var that = this;

	        console.log(APP.ViewsInstances);

	        $.ajax({

	        	type: "POST",
	        	url: this.link,
	        	data: this.formData,
	        	processData: false,
  				contentType: false,
	        	success: function(res) {

	        		setTimeout(
	        			function() {
	        				swal(
				    			{
				    				title: that.mainMSG,
				    				text: that.secondMSG,
				    				type: "success",
				    				confirmButtonColor: "#27B6AF"
				    			}
				    		);
			        		var $cropBtn = $("body > div.sweet-alert.showSweetAlert > div.sa-button-container > div > button");
				    		$cropBtn[0].classList.remove("cropBtn");
				    		if(res.drop === "avatar") {
				    			that.setNewAvatarLinks(res);
				    		} else {
				    			that.setNewCarImageLinks(res);
				    		}
		        			that.init(that.link, that.mainMSG, that.secondMSG, that.deleteLink, that.deleteEl);
		        	}, 100);

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

	        if(this.dropZone.style.backgroundImage === "") {
	        	this.dropZone.ondrop = this.handleDrop.bind(this);
	        	this.dropZone.ondragenter = this.addHover.bind(this);
	        	this.dropZone.ondragleave = this.removeHover.bind(this);
	    	} else {
	    		this.dropZone.ondragenter = null;
	        	this.dropZone.ondragleave = null;
	    		this.dropZone.ondrop = function(e) { e.preventDefault(); };
	    	}

	        if(this.deleteImg) {
	        	this.deleteImg.onclick = this.handleDeleteImg.bind(this);
	        }

	    }

	};

	APP.SetTop = function(h2, h3, height) {

		this.topPanel = $("body > div.content > div.info > div > div > div > div");
		this.topPanel.empty();
		this.topPanel.append("<h2>" + h2 + "</h2>");
		this.topPanel.append(h3);
		this.topPanel.height(height);

	},

	APP.Scripts = function() {

		var height = $("body > div.content").height() + $("header").height() + 2;
		if(height < $(window).height() && $("body > div.content.one-news-site").length === 0) {
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