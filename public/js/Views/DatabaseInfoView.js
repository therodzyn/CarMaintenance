(function() {

	APP.Views.DatabaseItem = Backbone.View.extend({

		tagName: "div",
		className: "col-md-8 col-xs-12",

		template: JST['DatabaseInfoTemplate'],

		initialize: function() {

			this.listenTo(this.model, "change", this.render);

		},

		render: function() {

			var html = this.template( this.model.toJSON() );

        	this.$el.html(html);

	        $("body > div.content.database > div.container > div").append(this.$el);

	        APP.ViewsInstances.databaseItem = this;

	        return this;

		}

	});

})();