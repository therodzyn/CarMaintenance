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

        this.makeMap({
        	center: {
        		lat: 52.16167,
        		lng: 19.25041
        	},
        	panControl: false,
			zoom: 6
        });

        APP.Scripts();

        $("#search-input").focus();

        $("body > div:nth-child(2) > nav > ul > li > a").removeAttr('class');
        $("body > div:nth-child(2) > nav > ul > li:nth-child(2) > a").attr("class", "active");

        var mapHeight = $("header").height() + $(".info").height() + $("body > div.content.map > div.container > div:nth-child(1)").height() + 70;

        $("#map-container").height($(window).height() - mapHeight);

        return this;

    },

    searchInMap: function(e) {

    	e.preventDefault();
		google.maps.event.trigger( this.formInput, 'focus');
		google.maps.event.trigger( this.formInput, 'keydown', {keyCode:13});

    },

    showResult: function(place) {

    	var bootstrapDiv = document.createElement("div");
    	var wellDiv = document.createElement("div");
    	var paragraph = document.createElement("p");
    	var address = place.formatted_address.split(", ");

    	bootstrapDiv.className = "col-sm-6 col-xs-12";
    	wellDiv.className = "well";

    	$(paragraph).html(
    		place.name.substring(0, 50) + "<br>" +
    		address[0] + "<br>" +
    		address[1] + "<br>" +
    		"<small>" + "Dzisiaj otwarte: xx:xx - xx:xx" + "</small>"
      	);

    	var container = $(bootstrapDiv).append($(wellDiv).append(paragraph));

    	$(container).appendTo("body > div.content.map > div.container > div:nth-child(3)");

    	$("body > div.content.map > div.container").height("auto");

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

			var marker = new google.maps.Marker({
				map: that.map,
				title: place.name,
				position: place.geometry.location
			});

			google.maps.event.addListener(marker, 'click', function() {

				infoWindows.forEach(function(iw) {
					iw.close();
				});

				var address = place.formatted_address.split(", ");
				var content = "";

				var cityFlag = false;

				place.types.forEach(function(type) {

					if(type === "political") {
						cityFlag = true;
					}

				});

				if(cityFlag === false) {
					content = "<p class='infowindow'><span>" + place.name + "</span><br>ul. " + address[0] + "<br>" + address[1] + "<br>" + "</p>";
				} else {
					content = "<p class='infowindow'><span>" + place.name + "</span></p>";
				}

				infowindow = new google.maps.InfoWindow({
					content: content
				});

				infowindow.open(that.map, marker);

				infoWindows.push(infowindow);

				// PRZY WPISANIU MIASTA - MA ZNALEŹĆ WARSZTATY (types: political)
				// POŁĄCZENIE REZULTATÓW Z MARKERAMI
				// WYZNACZANIE DROGI
			});

			that.markers.push(marker);

			if (place.geometry.viewport) {
				that.bounds.union(place.geometry.viewport);
			} else {
				that.bounds.extend(place.geometry.location);
			}

		});

		this.map.fitBounds(this.bounds);

		var zoom = this.map.getZoom();
		this.map.setZoom(zoom > 15 ? 15 : zoom);

	},

    makeMap: function(options) {

    	this.form = document.getElementById("form-map-search");
    	this.formInput = document.getElementById("search-input");

    	this.map = new google.maps.Map(document.getElementById('map-container'), options);
    	this.searchBox = new google.maps.places.SearchBox(this.formInput);

    	this.markers = [];

		this.searchBox.addListener('places_changed', this.findPlaces.bind(this));

    },

    changeContentClass: function(name) {

    	var content = $(".content")[0];
        content.classList.remove(content.classList.item(1));
        content.classList.add(name);

    }

});

})();