var helpers = require("./functions.js"),
    dbConnect = helpers.dbConnect,
    handleError = helpers.handleError,
    createObjectId = helpers.createObjectId,
    createEmptyObjectId = helpers.createEmptyObjectId,
    isValidId = helpers.isValidId,
    bcrypt = require("bcrypt-nodejs");

routes = {
    "/user": "users",
    "/user/:id": "users"
};

module.exports = {

    addUserCar: function(req, res) {

        dbConnect(req, res, function(req, res, db) {

            delete req.body._id;
            delete req.body.email;
            delete req.body.password;
            delete req.body.emptyGarage;
            delete req.body.cars;
            delete req.body.newItem;
            req.body._idCar = createEmptyObjectId();

            db.collection("users").findAndModify({email: req.session.user}, {}, {$push: {cars: req.body}, $unset: {emptyGarage: ""}}, {new: true}, function(err, doc) {

                if(err) return handleError(res);

                res.json(doc);

                db.close();

            });

       });

    },

    editUserCar : function(req, res) {

    	var id = req.params.id;

        dbConnect(req, res, function(req, res, db) {

            delete req.body.newItem;
            req.body._idCar = createObjectId(req.body._idCar);

            db.collection("users").findAndModify({email: req.session.user, "cars._idCar": createObjectId(id)}, {}, {$set: {"cars.$": req.body}}, {new: true}, function(err, car) {

                if(err) return handleError(res);

                res.json(car);

                db.close();

            });

       });

    },

    deleteUserCar: function(req, res) {

    	var id = req.params.id;

        dbConnect(req, res, function(req, res, db) {

            delete req.body.newItem;
            req.body._idCar = createObjectId(req.body._idCar);

            db.collection("users").findAndModify({email: req.session.user}, {}, { $pull: { "cars": { "_idCar": createObjectId(id) } } }, {new: true}, function(err, user) {

                if(err) return handleError(res);

                if(user.value.cars.length === 0) {

                	db.collection("users").findAndModify({email: req.session.user}, {}, { $set: {emptyGarage: true} }, {new: true}, function(err, user2) {

                			console.log(user2);

                			res.json({deletedAll: true});

                			db.close();

                		}

                	);

                	return;

                }

                res.json({deletedOne: true});

                db.close();

            });

       });

    },

    getUserCars: function(req, res) {

		var id = req.params.id;

		dbConnect(req, res, function(req, res, db) {

			db.collection("users").findOne({email: req.session.user}, {_id: 0, cars: 1, emptyGarage: 1}, function(err, cars) {

				// błąd serwera
				if(err) {
					req.session.reset();
					return handleError(res);
				}

				return res.json(cars);

			});

		});

	},

    getCar: function(req, res) {

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

					if(car._idCar == id) {
						carObj = car;
					}

				});

				return res.json(carObj);

			});

		});

	},

	login: function(req, res) {

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

	},

	logout: function(req, res) {

		req.session.reset();

		res.redirect("/");

	},

	registration: function(req, res) {

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

					req.body.emptyGarage = true;

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

	}

};