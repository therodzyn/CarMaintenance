$(function() {

	$(".second-panel, .third-panel").height($(window).height());
	$(".content").height($(window).height() - $("header").height());

	var handleResize = function(e) {
		e.preventDefault();
		$(".second-panel, .third-panel").height($(this).height());
		$(".content").height($(this).height() - $("header").height());
	}

	var handleArrow = function(e) {
		e.preventDefault();
		$.scrollify("move",$(this).attr("href"));
	}

	$.scrollify({
        section : ".panel",
        easing: "jswing",
		scrollSpeed: 1500,
		offset : 0,
		scrollbars: true,
		before:function() {},
		after:function() {}
    });

    $(window).on("resize", handleResize);
    $(".arrow").on("click", handleArrow);

})