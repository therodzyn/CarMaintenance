$(function() {
	var height = $(".container").height() + $("header").height() + $(".info").height() + 2;
	if(height < $(window).height()) {
		$(".container").height($(window).height() - $("header").height() - $(".info").height() - 2);
	}

	var small = true;

	function enableSmallNav(bool) {

		var nav = bool === true ? 65 : 250;

		if(bool === true) {
			$(".left-aside").hide();
			$(".left-aside.small-nav").show().width(nav);
			$("header > a > p").text("cm");
		} else {
			$(".left-aside").show();
			$(".left-aside.small-nav").hide();
			$("header > a > p").text("car maintenance");
		}

		$("header > .top > i").css({"margin-left": nav});
		$(".content").css({"margin-left": nav});
		$("header > a").width(nav);

		if($(window).width() < 1200) {
			$("header > .top > i").hide();
		}

	}

	if($(window).width() < 1200) {
		enableSmallNav(small);
	}

	$("body > header > div.top > i").on("click", function(e) {
		e.preventDefault();
		enableSmallNav(small);
		small = !small;
	});

});