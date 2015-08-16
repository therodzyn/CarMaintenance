var bcrypt = require("bcrypt-nodejs");

module.exports = function(app, fns) {

	var dbConnect = fns.helpers.dbConnect,
		handleError = fns.helpers.handleError;

	app.post("/login", function(req, res) {

		if(req.body.email && req.body.password) {

			dbConnect(req, res, function(req, res, db) {

				db.collection("users").findOne({email: req.body.email}, function(err, user) {

					// błąd serwera
					if(err) {
						req.session.reset();
						return handleError(res);
					}

					// nie znaleziono usera o podanym mailu, lub hasła nie pasują do siebie
					if(!user || !bcrypt.compareSync(req.body.password, user.password)) {
						req.session.reset();
						return res.json({"error": "Podałeś złe dane logowania."});
					}

					req.session.user = user.email;
					return res.json({"error": "no-errors"});

				});

			});

		} else {

			return res.json({"error": "Nie podałeś adresu email i hasła."});

		}

	});

	app.get("/logout", function(req, res) {

		req.session.reset();

		res.redirect("/");

	});

};