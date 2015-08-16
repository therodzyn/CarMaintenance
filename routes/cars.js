module.exports = function(app, fns) {

	var helpers = require("../helpers/functions.js"),
		dbConnect = fns.helpers.dbConnect,
		handleError = fns.helpers.handleError,
		updateItem = fns.crud.updateItem,
    	createObjectId = helpers.createObjectId;

	app.get("/cars", function(req, res) {

		dbConnect(req, res, function(req, res, db) {

			db.collection("users").findOne({email: req.session.user}, {cars: 1}, function(err, cars) {

				// błąd serwera
				if(err) {
					req.session.reset();
					return handleError(res);
				}

				if(!cars.cars) {
					cars.emptyGarage = true;
				}

				return res.json(cars);

			});

		});

	});

	app.get("/car/:id", function(req, res) {

		var id = req.params.id;

		dbConnect(req, res, function(req, res, db) {

			db.collection("users").findOne({email: req.session.user}, {_id: 0, cars: 1}, function(err, cars) {

				// błąd serwera
				if(err) {
					req.session.reset();
					return handleError(res);
				}

				carObj = {};
				cars.cars.forEach(function(car) {

					console.log(car);

					if(car._idCar == id) {
						carObj = car;
					}

				});

				return res.json(carObj);

			});

		});

	});

};