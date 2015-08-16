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

        return this;

    },

    changeContentClass: function(name) {

    	var content = $(".content")[0];
        content.classList.remove(content.classList.item(1));
        content.classList.add(name);

    }

});

})();