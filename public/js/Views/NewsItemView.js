(function() {

APP.Views.NewsItem = Backbone.View.extend({

    tagName: "div",
    className: "container",

    template: JST["NewsItemTemplate"],

    initialize: function() {

    	this.listenToOnce(this.model, "change", this.render);

    },

    render: function() {

        var html = this.template( this.model.toJSON() );

        this.$el.html(html);

        this.changeContentClass("one-news-site");

        $(".content > .container").remove();

        APP.Regions.infoDiv.after(this.$el);

        $(".description").html(this.model.toJSON().long_description);

        APP.SetTop("Aktualności", "", 70);

       	APP.Scripts();

       	$("body > div:nth-child(2) > nav > ul > li > a").removeAttr('class');
        $("body > div:nth-child(2) > nav > ul > li:nth-child(4) > a").attr("class", "active");

        $("body > div.left-aside.small-nav > nav > ul > li > a").removeAttr('class');
        $("body > div.left-aside.small-nav > nav > ul > li:nth-child(4) > a").attr("class", "active");

        return this;

    },

    changeContentClass: function(name) {

    	var content = $(".content")[0];
        content.classList.remove(content.classList.item(1));
        content.classList.add(name);

    }

});

})();