$(function() {

	$(".second-panel, .third-panel").height($(window).height());
	$(".content").height($(window).height() - $("header").height());

	var handleResize = function(e) {
		e.preventDefault();
		$(".second-panel, .third-panel").height($(this).height());
		$(".content").height($(this).height() - $("header").height());
	};

	var handleArrow = function(e) {
		e.preventDefault();

		var link = $(this).attr("href");
		$.scrollify("move", link);

		// Btn UTWÓRZ KONTO na ostatniej stronie
		if(link == "#first") {

			if($(".login-form").css("display") != "none") {

				console.log("jest");
				var rightBox = $(".right-box");
				rightBox.children("h2").html("<span>Zarejestruj się</span> już teraz:");
				rightBox.children("p").html("Masz już konto? <a class='sign-in-link'>Zaloguj się</a>");

				$(".login-form").css("display", "none");

				$(".registry-form").css({
					display: "-webkit-flex",
					display: "-moz-flex",
					display: "-ms-flex",
					display: "-o-flex",
					display: "flex"
				});

			}

			$(".email-reg-input").focus();
		}
	};

	var mouseIn = function(e) {
		e.preventDefault();
		$(this).css({
			"-webkit-animation": "arrow-anim2 2s infinite",
			"-moz-animation": "arrow-anim2 2s infinite",
			"-ms-animation": "arrow-anim2 2s infinite",
			"-o-animation": "arrow-anim2 2s infinite",
			animation: "arrow-anim2 2s infinite"
		});
	};

	var mouseOut = function(e) {
		e.preventDefault();
		$(this).css({
			"-webkit-animation": "arrow-anim 2s infinite",
			"-moz-animation": "arrow-anim 2s infinite",
			"-ms-animation": "arrow-anim 2s infinite",
			"-o-animation": "arrow-anim 2s infinite",
			animation: "arrow-anim 2s infinite"
		});
	};

	var handleFormLink = function(e) {
		e.preventDefault();

		var rightBox = $(".right-box");
		rightBox.hide();

		var showForm = {};
		var hideForm = {};
		if(this.className == "sign-in-link") {
			showForm = $(".login-form");
			hideForm = $(".registry-form");
			rightBox.children("h2").text("Zaloguj się:");
			rightBox.children("p").html("Nie masz jeszcze konta? <a class='sign-up-link'>Zarejestuj się</a>");
		} else {
			showForm = $(".registry-form");
			hideForm = $(".login-form");
			rightBox.children("h2").html("<span>Zarejestruj się</span> już teraz:");
			rightBox.children("p").html("Masz już konto? <a class='sign-in-link'>Zaloguj się</a>");
		}

		hideForm.css("display", "none");

		showForm.css({
			display: "-webkit-flex",
			display: "-moz-flex",
			display: "-ms-flex",
			display: "-o-flex",
			display: "flex"
		});

		rightBox.fadeIn(300);

		showForm.children("input:first-child").focus();

	};

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
    $(".back-registry").on("click", handleArrow);
    $(".arrow").hover(mouseIn, mouseOut);
    $(".right-box").on("click", "p > a", handleFormLink);
})