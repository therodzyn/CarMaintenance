$(function() {
	// var height = $(".content").height() + $("header").height() + $(".info").height() + 2;
	// if(height < $(window).height()) {
	// 	$(".content").height($(window).height() - $("header").height() - $(".info").height() - 42);
	// }

	var small = true;

	function enableSmallNav(bool) {

		var nav = bool === true ? 65 : 250;

		if(bool === true) {
			$(".left-aside").hide();
			$(".left-aside.small-nav").show().width(nav);
			$(".page-header > a").text("cm");
		} else {
			$(".left-aside").show();
			$(".left-aside.small-nav").hide();
			$(".page-header > a").text("car maintenance");
		}

		$(".small-nav i").css({"margin": 0});
		$(".content").css({"margin-left": nav});
		$(".top .container").css({"margin-left": nav});
		$(".page-header").width(nav);

		if($(window).width() < 1200) {
			$(".mini-menu-btn").hide();
		}

	}

	if($(window).width() < 1200) {
		enableSmallNav(small);
	}

	$(".mini-menu-btn").on("click", function(e) {
		e.preventDefault();
		enableSmallNav(small);
		small = !small;
	});

});