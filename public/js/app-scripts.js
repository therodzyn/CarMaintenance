$(function() {
	var height = $(".content").height() + $("header").height() + 2;
	if(height < $(window).height()) {
		if($(window).width() > 767) {
			$(".content > .container").height( $(window).height() - $("header").height() - $(".info").height() - 42);
		} else {
			$(".content > .container").height( $(window).height() - $("header").height() - $(".info").height() - 11);
		}
	}

	var small = true;
	var show = true;

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
		$(".top").css({"padding-left": nav});
		$(".page-header").width(nav);

		if($(window).width() < 1200 && $(window).width() > 767) {
			$(".mini-menu-btn").hide();
		}

	}

	function showNav(bool) {

		var display = bool === true ? "block" : "none";
		$(".left-aside").not(".small-nav").css({"display": display});

	}

	if($(window).width() < 1200 && $(window).width() > 767) {
		enableSmallNav(small);
	}

	$(".mini-menu-btn").on("click", function(e) {
		if($(window).width() > 1199) {
			e.preventDefault();
			enableSmallNav(small);
			small = !small;
		} else {
			showNav(show);
			show = !show;
		}
	});

});