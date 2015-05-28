$(function() {

	// ustawienie wysokości
	$(".content").height($(window).height() - $("header").height());
	// nie ustawiaj wysokości dla drugiego panela dla telefonu
	if(window.devicePixelRatio < 2) {
		$(".second-panel, .third-panel").height($(window).height());
	} else {
		$(".third-panel").height($(window).height());
	}

	var handleResize = function(e) {
		e.preventDefault();
		$(".second-panel, .third-panel").height($(this).height());
		$(".content").height($(this).height() - $("header").height());
	};

	var handleArrow = function(e) {

		// jeżeli mobilne to nie używaj scrollify, po prostu przelinkuj
		if(window.devicePixelRatio === 1) {
			e.preventDefault();
			var link = $(this).attr("href");
			$.scrollify("move", link);
		} else {
			var firstPanel = $(".first-panel");
			var link = firstPanel.data("section-name");
			firstPanel.attr("id", link);
		}

		// Btn UTWÓRZ KONTO na ostatniej stronie
		// ustaw panel rejestracji, jeśli był wcześniej wybrany panel logowania
		if(link == "#first" || link == "first") {

			if($(".login-form").css("display") !== "none") {

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
			if(window.devicePixelRatio === 1) {
				$(".email-reg-input").focus();
			}
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
		// sprawdź, który panel aktualnie jest widoczny
		if(this.className == "sign-in-link") {
			showForm = $(".login-form");
			hideForm = $(".registry-form");
			rightBox.children("h2").html("<span>Zaloguj się</span>:");
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

		if(window.devicePixelRatio === 1) {
			showForm.children("input:first-child").focus();
		}
	};

	// uruchom scrollify na komputerze
	if(window.devicePixelRatio === 1) {

		$.scrollify({
	        section : ".panel",
	        easing: "jswing",
			scrollSpeed: 1500,
			offset : 0,
			scrollbars: true,
			before:function() {},
			after:function() {}
	    });

	}

	// zdarzenie zmiany rozmiarów przeglądarki
	if(window.devicePixelRatio === 1) {
		$(window).on("resize", handleResize);
	}
	// zdarzenia kliknięcia i hovera strzałki
	if($(window).width() > 900) {
		$(".arrow").on("click", handleArrow);
		$(".arrow").hover(mouseIn, mouseOut);
	}
	// zdarzenia kliknięcia na UTWÓRZ KONTO z ostatniego panelu
    $(".back-registry").on("click", handleArrow);
    // zdarzenie kliknięcia na link Zaloguj się lub Zarejestruj się
    $(".right-box").on("click", "p > a", handleFormLink);
})