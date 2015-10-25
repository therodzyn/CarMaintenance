(function() {

APP.Views.Map = Backbone.View.extend({

    tagName: "div",
    className: "container",

    template: JST["MapTemplate"],

    events: {
    	"submit form": "searchInMap"
    },

    render: function() {

        var html = this.template();

        this.$el.html(html);

        this.changeContentClass("map");

        $(".content > .container").remove();

        APP.Regions.infoDiv.after(this.$el);

        APP.SetTop("Mapa", "", 70);

        // if($(window).width() < 769) {
        // 	$("#map-container").html("<h1 style='font-size: 20px; font-weight: bold; margin-top: 20px; text-align: center;'>Proszę korzystać z mapy na urządzeniu z większym ekranem.</h1>");
        // } else {
        	this.getGeoData();
        // }


        APP.Scripts.init();

        $("#search-input").focus();

        $("body > div:nth-child(2) > nav > ul > li > a").removeAttr('class');
        $("body > div:nth-child(2) > nav > ul > li:nth-child(2) > a").attr("class", "active");

        $("body > div.left-aside.small-nav > nav > ul > li > a").removeAttr('class');
        $("body > div.left-aside.small-nav > nav > ul > li:nth-child(2) > a").attr("class", "active");

        var mapHeight = $("header").height() + $(".info").height() + $("body > div.content.map > div.container > div:nth-child(1)").height() + 70;

        $("#map-container").height($(window).height() - mapHeight);

        return this;

    },

    searchInMap: function(e) {

    	e.preventDefault();
		google.maps.event.trigger( this.formInput, 'focus');
		google.maps.event.trigger( this.formInput, 'keydown', {keyCode:13});

    },

    findPlaces: function() {

		var that = this;

		$("body > div.content.map > div.container > div:nth-child(3)").empty();

		this.places = this.searchBox.getPlaces();

		if (this.places.length == 0) {
			return;
		}

		this.markers.forEach(function(marker) {
			marker.setMap(null);
		});
		this.markers = [];

		this.bounds = new google.maps.LatLngBounds();

		var infoWindows = [];

		this.places.forEach(function(place) {

	        that.findClose(place.geometry.location);

			if (place.geometry.viewport) {
				that.bounds.union(place.geometry.viewport);
			} else {
				that.bounds.extend(place.geometry.location);
			}

		});

		this.map.fitBounds(this.bounds);

		this.map.setZoom(14);

	},

    makeMap: function(options) {

    	this.form = document.getElementById("form-map-search");
		this.formInput = document.getElementById("search-input");

    	this.map = new google.maps.Map(document.getElementById('map-container'), options);
    	this.searchBox = new google.maps.places.SearchBox(this.formInput);
    	this.infoWindow = new google.maps.InfoWindow();

    	this.markers = [];

		this.searchBox.addListener('places_changed', this.findPlaces.bind(this));

    },

    createMarker: function(place) {
		var that = this;

		var image = {
			url: place.icon,
			size: new google.maps.Size(71, 71),
			origin: new google.maps.Point(0, 0),
			anchor: new google.maps.Point(17, 34),
			scaledSize: new google.maps.Size(30, 30)
		};

		var placeLoc = place.geometry.location;
		var marker = new google.maps.Marker({
			map: this.map,
			position: place.geometry.location,
			icon: image
		});
		this.markers.push(marker);

		var request =  {
			reference: place.reference
		};



		google.maps.event.addListener(marker, 'click', function() {

			var photo = place.photos && place.photos.length > 0 ? "<img style='display: block; margin: 0 auto;' src='" + place.photos[0].getUrl({'maxWidth': 300, 'maxHeight': 150}) + "'>" : "";

			var it = this;

			var content = "";
			that.service.getDetails(request, function(place, status) {
				console.log(place);
				content = "<div style=\"font-family: 'Open Sans'; font-size: 1.3em;\">" +
					(photo) +
					(place.name ? "<strong style=\"font-weight: bold;\">" +  place.name + "</strong>" + "<br>" : "") +
					(place.formatted_address ? "<strong style=\"font-weight: bold;\">Adres:</strong> " + place.formatted_address + "<br>" : "") +
					(place.formatted_phone_number ? "<strong style=\"font-weight: bold;\">Telefon:</strong> " + place.formatted_phone_number + "<br>" : "") +
					(place.website ? "<strong style=\"font-weight: bold;\">WWW:</strong> <a target='_blank' href='" + place.website + "'>" + place.website + "</a>" : "") +
					"</div>";

				that.infoWindow.setContent(content);
				that.infoWindow.open(that.map, it);

			});


		});
    },

    findClose: function(loc) {

    	var that = this;

    	var request = {
			location: loc,
			// radius: '2000',
			types: ['car_repair', 'car_dealer', 'car_rental'],
			rankBy: google.maps.places.RankBy.DISTANCE
		};

		var $loadBar = $("body > div.content.map > div.container > div:nth-child(2) > div > p");
		$loadBar.fadeIn(500);

		this.service = new google.maps.places.PlacesService(that.map);
		this.service.nearbySearch(request, function(results, status, pagination) {
			if (status == google.maps.places.PlacesServiceStatus.OK) {

				for (var i = 0; i < results.length; i++) {
					that.createMarker(results[i]);
				}
				if(pagination.hasNextPage) {
					pagination.nextPage();
				} else {
					$loadBar.fadeOut(1000);
				}
			}
		});

    },

    getGeoData: function() {

    	var that = this;

        navigator.geolocation.getCurrentPosition(
            function(position) {
	            that.makeMap({
		        	center: {
		        		lat: position.coords.latitude,
		        		lng: position.coords.longitude
		        	},
		        	panControl: false,
					zoom: 14
		        });

		        that.findClose({
	        		lat: position.coords.latitude,
	        		lng: position.coords.longitude
	        	});

            }.bind(this),
            function(errorObj) {
            	that.makeMap({
		        	center: {
		        		lat: 52.16167,
		        		lng: 19.25041
		        	},
		        	panControl: false,
					zoom: 6
		        });
            },
            {
                enableHighAccuracy: true
            }
        );

    },

    changeContentClass: function(name) {

    	var content = $(".content")[0];
        content.classList.remove(content.classList.item(1));
        content.classList.add(name);

    }

});

})();