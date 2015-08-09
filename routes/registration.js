var bcrypt = require("bcrypt-nodejs");

module.exports = function(app, fns) {

	var dbConnect = fns.helpers.dbConnect,
		handleError = fns.helpers.handleError;

	app.post("/registration", function(req, res) {

		if(req.body.email && req.body.password && req.body.confirm) {

			if(req.body.password !== req.body.confirm) {
				return res.json({"error": "Podane hasła nie zgadzają się."});
			}

			dbConnect(req, res, function(req, res, db) {

				db.collection("users").findOne({email: req.body.email}, function(err, user) {

					if(err) {
						return handleError(res);
					}

					// nie znaleziono usera o podanym mailu, lub hasła nie pasują do siebie
					if(user) {
						return res.json({"error": "Użytkownik o podanym adresie e-mail jest już w bazie danych."});
					}

					req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
					delete req.body.confirm;

					db.collection("users").insert(req.body, function(err, user) {

						// błąd serwera
						if(err) {
							return handleError(res);
						}

						return res.json({"error": "no-errors"});

					});

				});

			});

		} else {

			return res.json({"error": "Nie podałeś wszystkich danych."});

		}

	});

};