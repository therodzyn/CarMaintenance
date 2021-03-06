$(function() {

// ================= USTAWIENIE STAŁEJ WYSOKOŚCI SEKCJI =================

	// jeżeli smartfon (pxrt >= 2), to nie ustawiaj stałej wysokości drugiej sekcji
	if($(window).width() > 1199 && window.devicePixelRatio === 1) {

		$(".content").height( $(window).height() - $("header").height() );
		$(".second-subsite, .third-subsite").height( $(window).height() );

	}

// ==================== ZMIANA ROZMIARU PRZEGLĄDARKI ====================

	var handleResize = {

		// automatycznie dostosuj wysokość sekcji podczas zmiany rozmiaru okna
		init: function(e) {

			var viewport = e.target;

			$(".second-subsite, .third-subsite").height( $(viewport).height() );
			$(".content").height( $(viewport).height() - $("header").height() );

		}

	};

// =============================== ARROW ================================

	var handleArrow = {

		setLink: function() {

			this.link = "";

			if($(window).width() > 1199 && window.devicePixelRatio === 1) {

				this.link = $(this.arrow).attr("href");
				$.scrollify("move", this.link);

			} else {

				$("html, body").animate({ scrollTop: 0 }, 1500);

			}

		},

		setForm: function() {

			if(this.link === "#first" || this.link === "first") {

				if( $(".login-form").css("display") !== "none" || $(".reset-form").css("display") !== "none" ) {

					var rightBox = $(".right-box");
					rightBox.children("h2").html("<span>Zarejestruj się</span> już teraz:");
					$(".change:first-of-type").html("Masz już konto? <a href='#' class='sign-in-link'>Zaloguj się</a>");

					$(".login-form").css("display", "none");
					$(".reset-form").css("display", "none");

					$(".registry-form").css("display", "block");

				}

				$(".forgot-pass").hide();

				if($(window).width() > 767 && window.devicePixelRatio === 1) {
					$(".email-reg-input").focus();
				}

			}

		},

		mouseIn: function() {

			$(this.arrow).css({
				"-webkit-animation": "arrow-anim2 2s infinite",
				"-moz-animation": "arrow-anim2 2s infinite",
				"-ms-animation": "arrow-anim2 2s infinite",
				"-o-animation": "arrow-anim2 2s infinite",
				animation: "arrow-anim2 2s infinite"
			});

		},

		mouseOut: function() {

			$(this.arrow).css({
				"-webkit-animation": "arrow-anim 2s infinite",
				"-moz-animation": "arrow-anim 2s infinite",
				"-ms-animation": "arrow-anim 2s infinite",
				"-o-animation": "arrow-anim 2s infinite",
				animation: "arrow-anim 2s infinite"
			});

		},

		init: function(e) {

			this.arrow = e.currentTarget;
			var event = e.type;

			if(event === "click") {

				this.setLink();
				this.setForm();

			} else if(event === "mouseenter") {

				this.mouseIn();

			} else if (event === "mouseleave") {

				this.mouseOut();

			}

		}

	};

// ==================== OBSŁUGA LINKU FORMULARZA ====================

	var handleFormLink = {

		setFormData: function() {

			if(this.link.className == "sign-in-link") {

				this.hiddenForm = $(".login-form");
				this.visibleForm = $(".registry-form").add($(".reset-form"));
				this.rightBox.children("h2").html("<span>Zaloguj się</span>:");
				this.rightBox.children(".row").children("p:first-of-type").html("Nie masz jeszcze konta? <a href='#' class='sign-up-link'>Zarejestuj się</a>");
				$(".forgot-pass").show();

			} else if(this.link.className == "sign-up-link") {

				this.hiddenForm = $(".registry-form");
				this.visibleForm = $(".login-form").add($(".reset-form"));
				this.rightBox.children("h2").html("<span>Zarejestruj się</span> już teraz:");
				this.rightBox.children(".row").children("p:first-of-type").html("Masz już konto? <a href='#' class='sign-in-link'>Zaloguj się</a>");
				$(".forgot-pass").hide();

			} else if(this.link.className == "reset-pass") {

				this.hiddenForm = $(".reset-form");
				this.visibleForm = $(".registry-form").add($(".login-form"));
				this.rightBox.children("h2").html("<span>Reset</span> hasła:");
				this.rightBox.children(".row").children("p:first-of-type").html("Przypomniałeś sobie hasło? <a href='#' class='sign-in-link'>Zaloguj się</a>");
				$(".forgot-pass").hide();

			}

		},

		showForm: function() {

			this.visibleForm.css("display", "none");
			this.hiddenForm.css("display", "block");

		},

		init: function(e) {

			e.preventDefault();
			this.link = e.currentTarget;
			this.rightBox = $(".right-box");
			$(".response-error").remove();

			// ukryj cały prawy box
			this.rightBox.hide();

			// ustaw odpowiedni nagłówek oraz odnośnik do innego formularza
			this.setFormData();

			// ukryj/pokaż odpowiednie formularze
			this.showForm();

			// pokaż cały prawy box
			this.rightBox.fadeIn(300);

			// ustaw focus na emailu, jeżeli komputer
			if($(window).width() > 767 && window.devicePixelRatio === 1) {
				this.hiddenForm.children("input:first-child").focus();
			}

		}

	};

// ========================= WALIDACJA FORMULARZY =========================

	var handleFormSubmit = {

		setStyles: function(el, msg) {

			$(el).css("border", "2px solid #A60404");
			$('.' + el.classList[0] + ' + .warning').css("display", "block").text(msg);

		},

		checkEmpty: function(el) {

			// this: obiekt
			var errorMsg = "Pole nie może być puste.";

			if(el.value === "") {
				this.setStyles(el, errorMsg);
				return false;
			}

			return true;

		},

		checkValid: function(elements) {

			var emailRegEx = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
			var errorMsg = "";
			var self = this;

			// this: konkretny input
			// self: obiekt
			$(elements).each(function(){

				if(this.type === "submit") {
					return;
				}

				if(self.checkEmpty(this) === false) {
					self.valid = false;
					return;
				}

				if(self.form.className.split(" ")[0] != "login-form") {

					if( this.name === "email" && !emailRegEx.test($(this).val()) ) {

						errorMsg = "Podano niepoprawny format adresu e-mail.";
						self.setStyles(this, errorMsg);
						self.valid = false;

					} else if( this.name === "password" && $(this).val().length < 8 ) {

						errorMsg = "Hasło musi mieć minimum 8 znaków.";
						self.setStyles(this, errorMsg);
						self.valid = false;

					} else if( this.name === "confirm" && $(this).val() !== $("input[name='password']").val() ) {

						errorMsg = "Hasła się nie zgadzają.";
						self.setStyles(this, errorMsg);
						self.valid = false;

					}

				}

			});

		},

		handleResponse: function(res) {

			var error = {};
			$(".right-box").hide();

			if(res.error === "no-errors") {

				if(this.form.className.split(" ")[0] === "registry-form") {

					$(this.form.elements).add($(".login-form input")).val("");
					$(".sign-in-link").click();
					$(".response-error").remove();
					error = $("<h2 class='response-error' style='color: #27b6af; font-size: 20px;'><span>" + "Rejestracja przebiegła pomyślnie. Możesz się zalogować." + "</span></h2>");
					$(".right-box h2").before(error);

				} else if(this.form.className.split(" ")[0] === "reset-form") {

					$(".sign-in-link").click();
					$(".response-error").remove();
					error = $("<h2 class='response-error' style='color: #27b6af; font-size: 20px;'><span>" + "Na podany adres e-mail wysłano wiadomość potwierdzającą reset hasła." + "</span></h2>");
					$(".right-box h2").before(error);

				} else {
					window.location.href = "/garage";
				}

			} else {

				$(".response-error").remove();
				error = $("<h2 class='response-error' style='color: #700; font-size: 20px;'><span>" + res.error + "</span></h2>");
				$(".right-box h2").before(error);

			}

			$(".right-box").fadeIn(300);

		},

		sendRequest: function(data, url) {

			var that = this;

            $.ajax({

                type: "POST",
                url: url,
                data: data,
                dataType: "json"

            }).done(function(res) {
                that.handleResponse(res);
            });

		},

		init: function(e) {

			this.form = e.target;
			e.preventDefault();
			e.stopPropagation();

			this.loginEmail = $(".email-log-input");
			this.loginPassword = $(".pass-log-input");

			this.regEmail = $(".email-reg-input");
			this.regPassword = $(".pass-reg-input");
			this.regConfirm = $(".confirm-reg-input");

			this.resEmail = $(".email-reset-input");

			// wyzerowanie ostrzeżeń oraz obramowania inputów
			$(".warning").text("");
			$(".warning").css({"display": "none"});
			$("input").css("border", "0");

			// waliduj pola formularza
			this.valid = true;
			this.checkValid(this.form.elements);

			var data = {};
			var url = "";

			if(this.valid === true) {

				if(this.form.className.split(" ")[0] === "login-form") {

					data = {
						"email": this.loginEmail.val(),
	                    "password": this.loginPassword.val()
					};
					url = "/login";
					this.sendRequest(data, url);

				}

				if(this.form.className.split(" ")[0] === "registry-form") {

					data = {
	                    "email": this.regEmail.val(),
	                    "password": this.regPassword.val(),
	                    "confirm": this.regConfirm.val()
					};
					url = "/registration";
					this.sendRequest(data, url);

				}

				if(this.form.className.split(" ")[0] === "reset-form") {

					data = {
	                    "email": this.resEmail.val()
					};
					url = "/resetPass";
					this.sendRequest(data, url);

				}

			}

		}

	};

// ========================= OBSŁUGA ZDARZEŃ =========================


	// uruchom scrollify na komputerze
	if($(window).width() > 1199 && window.devicePixelRatio === 1) {

		$.scrollify({
	        section : ".subsite",
	        easing: "jswing",
			scrollSpeed: 1200,
			offset : 0,
			scrollbars: true,
			before:function() {},
			after:function() {}
	    });

        // wyłączenie scrollify gdy focus na inpucie
	    $("input").on('keyup', function(e) {
	    	e.stopPropagation();
	    });

	}


	// zdarzenie zmiany rozmiarów przeglądarki
	// tylko na komputerze
	if($(window).width() > 1199 && window.devicePixelRatio === 1) {

		$(window).on("resize", function(e) {
    		handleResize.init(e);
    	});

	}


	// zdarzenie kliknięcia i hovera strzałki
	// oraz kliknięcia buttona w ostatniej sekcji
	$(".arrow").on("click mouseenter mouseleave", function(e) {
		handleArrow.init(e);
	});
	$(".back-registry").on("click", function(e) {
		handleArrow.init(e);
	});


    // zdarzenie kliknięcia na link Zaloguj się lub Zarejestruj się
    $(".right-box").on("click", "p > a", function(e) {
		handleFormLink.init(e);
	});


    // walidacja formularzy
    $(".registry-form, .login-form, .reset-form").on("submit", function(e) {
    	handleFormSubmit.init(e);
    });

    $(".login-form, form .warning").css({"display": "none"});

// ========================= OBSŁUGA ZDARZEŃ =========================

});