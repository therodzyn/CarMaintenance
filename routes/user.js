module.exports = function(app, fns) {

	var dbConnect = fns.helpers.dbConnect,
		handleError = fns.helpers.handleError,
		updateItem = fns.crud.updateItem;

	app.get("/user", function(req, res) {

		dbConnect(req, res, function(req, res, db) {

			db.collection("users").findOne({email: req.session.user}, function(err, user) {

				// błąd serwera
				if(err) {
					req.session.reset();
					return handleError(res);
				}

				if(!user.cars) {
					user.emptyGarage = true;
				}

				return res.json(user);

			});

		});

	});

	app.put("/user/:id", updateItem);

};