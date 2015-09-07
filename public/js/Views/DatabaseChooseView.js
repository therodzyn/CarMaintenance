(function() {

	APP.Views.DatabaseChoose = Backbone.View.extend({

		tagName: "div",
		className: "col-md-4 col-xs-12",

		template: JST['DatabaseChooseTemplate'],

		initialize: function() {

			var that = this;
			this.brands = [];

			$.ajax({
				url: "/database/brands/"
			}).done(function(brands) {

				brands.forEach(function(brand) {
					var newBrandOption = $("<option value='" + brand + "'>" + brand + "</option>");
					that.brands.push(newBrandOption);
				});

				that.render();

			});

		},

		render: function() {

			var containerDiv = $("<div class='container'>");
			var rowDiv = $("<div class='row'>");

			var html = this.template();

        	this.$el.html(html);

        	this.changeContentClass("database");

	        $(".content > .container").remove();

	        APP.Regions.infoDiv.after(containerDiv.append(rowDiv.append(this.$el)));

	        this.brands.forEach(function(brand) {

        		$("#brand-select option:last-child").after(brand);

        	});

        	APP.SetTop("Baza wiedzy", "", 70);

	        APP.Scripts();

	       	$("body > div:nth-child(2) > nav > ul > li > a").removeAttr('class');
	        $("body > div:nth-child(2) > nav > ul > li:nth-child(3) > a").attr("class", "active");

	        $("body > div.left-aside.small-nav > nav > ul > li > a").removeAttr('class');
	        $("body > div.left-aside.small-nav > nav > ul > li:nth-child(3) > a").attr("class", "active");

	        return this;

		},

		changeContentClass: function(name) {

	    	var content = $(".content")[0];
	        content.classList.remove(content.classList.item(1));
	        content.classList.add(name);

    	},

		events: {
			"change #brand-select": "loadModels",
			"change #model-select": "loadEngines",
			"change #engine-select": "showDatabaseItem"
		},

		loadModels: function(e) {

			e.preventDefault();

			$("#model-select option:not(:first-child)").remove();
			$("#engine-select option:not(:first-child)").remove();

			var that = this;
			var brand = $("#brand-select").val();
			this.models = [];

			$.ajax({
				url: "/database/models/" + brand
			}).done(function(modelsNames) {

				modelsNames.forEach(function(model) {
					var newModelOption = $("<option value='" + model + "'>" + model + "</option>");
					that.models.push(newModelOption);
				});

				that.models.forEach(function(model) {

	        		$("#model-select option:last-child").after(model);

	        	});

			});

		},

		loadEngines: function(e) {

			e.preventDefault();

			$("#engine-select option:not(:first-child)").remove();

			var that = this;
			var brand = $("#brand-select").val();
			var model = $("#model-select").val();
			this.engines = [];

			$.ajax({
				url: "/database/engines/" + brand + "/" + model
			}).done(function(engines) {

				engines.forEach(function(engine) {
					var newEngineOption = $("<option data-engine-id='" + engine.id + "' value='" + engine.name + "'>" + engine.name + "</option>");
					that.engines.push(newEngineOption);
				});

				that.engines.forEach(function(engine) {

	        		$("#engine-select option:last-child").after(engine);

	        	});

			});

		},

		showDatabaseItem: function(e) {

			e.preventDefault();

			var itemID = $("#engine-select option:checked").data("engine-id");

			var model = new APP.Models.DatabaseItem({"_id": itemID});
			APP.ViewsInstances.databaseItem.remove();
			var itemView = new APP.Views.DatabaseItem({model: model});
			model.fetch();

		}

	});

})();