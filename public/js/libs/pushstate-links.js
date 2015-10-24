/*
    W oparciu o:

    https://gist.github.com/tbranyen/1142129
    @tbranyen
*/
(function($) {

$.fn.pushStateLink = function() {

    if( !(Backbone.history && Backbone.history._hasPushState) ) {
        return this;
    }

    return this.on("click", "a[pushstate-link]", function(e) {
    	e.preventDefault();
        var link = $(this),
            href = link.attr("href"),
            protocol = this.protocol + "//";

        if(href.slice(protocol.length) !== protocol) {
            e.preventDefault();

            Backbone.history.navigate(href, true);
            if($(".mini-menu-btn").parent().css("display") === "block") {
            	APP.Scripts.showNav(false);
            }
        }

    });

};

$(function() {

    $(document).pushStateLink();

});

})(jQuery);