(function() {

APP.Views.Garage = Backbone.View.extend({

    tagName: "div",
    className: "container",

    template: JST["GarageTemplate"],

    initialize: function() {

    	this.listenToOnce(this.model, "change", this.render);

    },

    render: function() {

        var html = this.template( this.model.toJSON() );

        this.$el.html(html);

        var className = this.model.toJSON().emptyGarage ? "empty-garage" : "garage";
        this.changeContentClass(className);

        $(".content > .container").remove();

        APP.Regions.infoDiv.after(this.$el);

       	APP.Scripts();

       	$("body > div:nth-child(2) > nav > ul > li > a").removeAttr('class');
        $("body > div:nth-child(2) > nav > ul > li:nth-child(1) > a").attr("class", "active");

        return this;

    },

    changeContentClass: function(name) {

    	var content = $(".content")[0];
        content.classList.remove(content.classList.item(1));
        content.classList.add(name);

    }

});

})();