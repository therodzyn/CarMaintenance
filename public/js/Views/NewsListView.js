(function() {

APP.Views.NewsList = Backbone.View.extend({

    tagName: "div",
    className: "row",

    initialize: function() {

    	this.listenTo(this.collection, "reset", this.render);

    },

    render: function() {

    	var containerDiv = $("<div class='container'>");

    	this.collection.each(this.addOne, this);

        this.changeContentClass("news");

        $(".content > .container").remove();

        APP.Regions.infoDiv.after(containerDiv.append(this.$el));


       	APP.Scripts();

       	$("body > div:nth-child(2) > nav > ul > li > a").removeAttr('class');
        $("body > div:nth-child(2) > nav > ul > li:nth-child(4) > a").attr("class", "active");

        $("body > div.left-aside.small-nav > nav > ul > li > a").removeAttr('class');
        $("body > div.left-aside.small-nav > nav > ul > li:nth-child(4) > a").attr("class", "active");

        return this;

    },

	addOne: function(model) {

		var view = new APP.Views.NewsListItem({model: model});

		this.$el.append(view.render().el);

	},

    changeContentClass: function(name) {

    	var content = $(".content")[0];
        content.classList.remove(content.classList.item(1));
        content.classList.add(name);

    }

});

})();