(function() {

	APP.Views.NewsListItem = Backbone.View.extend({

		tagName: "div",
		className: "col-sm-8 col-sm-offset-2 text-center",

		template: JST["NewsTemplate"],

		render: function() {

			var html = this.template( this.model.toJSON() );

			this.$el.html(html);

			return this;

		},

	});

})();