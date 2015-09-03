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

	},

	getNews: function(req, res) {

		dbConnect(req, res, function(req, res, db) {

			db.collection("news").find({}, {}).toArray(function(err, news) {

				// błąd serwera
				if(err) {
					return handleError(res);
				}

				return res.json(news);

			});

		});

	},

	getNewsItem: function(req, res) {

		var id = req.params.id;

        dbConnect(req, res, function(req, res, db) {

            db.collection("news").find({_id: createObjectId(id)}).toArray( function(err, docs) {

                if(err) return handleError(res);

                res.json(docs[0]);

                db.close();

            });

       });

	},

	getAccount: function(req, res) {

		dbConnect(req, res, function(req, res, db) {

			db.collection("users").findOne({email: req.session.user}, {}, function(err, user) {

				// błąd serwera
				if(err) {
					req.session.reset();
					return handleError(res);
				}

				return res.json(user);

			});

		});

	},

	editAccount: function(req, res) {

        dbConnect(req, res, function(req, res, db) {

        	db.collection("users").findOne({email: req.body.email}, function(err, user) {

                if(err) return handleError(res);

                if(user && user.email !== req.session.user) {
                	return res.json({"error": "Istnieje już użytkownik o podanym adresie e-mail."});
                }

				if(req.body.new_pass) {

					if(!req.body.old_pass) {
						return res.json({"error": "Należy podać stare hasło."});
					}

					if(req.body.new_pass !== req.body.new_pass_confirm) {
						return res.json({"error": "Podane hasła nie zgadzają się."});
					}

				}

					db.collection("users").findOne({email: req.session.user}, function(err, user) {

						if(err) return handleError(res);

						if(req.body.new_pass) {
							if(!bcrypt.compareSync(req.body.old_pass, user.password)) {
								return res.json({"error": "Stare hasło jest niepoprawne."});
							} else {
								req.body.password = bcrypt.hashSync(req.body.new_pass, bcrypt.genSaltSync(10));
							}
						}

						delete req.body.new_pass;
						delete req.body.new_pass_confirm;
						delete req.body.old_pass;
		            	delete req.body._id;
		            	delete req.body.error;

			            db.collection("users").findAndModify({email: req.session.user}, {}, {$set: req.body}, function(err, user) {

			                if(err) return handleError(res);

		                	req.session.reset();
		                	req.session.user = req.body.email;

			                res.json({"error": "no-errors"});

			                db.close();

			            });

					});

	        });

       });

    },

	deleteAccount: function(req, res) {

		// USUNIĘCIE KONTA

        dbConnect(req, res, function(req, res, db) {

            db.collection("users").findAndRemove({email: req.session.user}, function(err, user) {

                if(err) return handleError(res);

        		req.session.reset();

                res.json({deleted: true});

                db.close();

            });

       });

    },

    addAvatar: function(req, res) {

    	res.send("gites");

    },

    getDatabaseBrands: function(req, res) {

		dbConnect(req, res, function(req, res, db) {

			db.collection("carsDatabase").find({}, {_id: 0, brand: 1}).toArray( function(err, brands) {

				// błąd serwera
				if(err) {
					return handleError(res);
				}

				var array = [];

				brands.forEach(function(brand) {

					array.push(brand.brand);

				});

				return res.json(array);

			});

		});

    },

    getDatabaseModels: function(req, res) {

    	var brand = req.params.brand;

		dbConnect(req, res, function(req, res, db) {

			db.collection("carsDatabase").find({"brand": brand}, {_id: 0, "models.name": 1}).toArray( function(err, items) {

				// błąd serwera
				if(err) {
					return handleError(res);
				}

				var modelsNames = [];

				items[0].models.forEach(function(model) {

					modelsNames.push(model.name);

				});

				return res.json(modelsNames);

			});

		});

    },

    getDatabaseEngines: function(req, res) {

    	var brand = req.params.brand;
    	var modelParam = req.params.model;

		dbConnect(req, res, function(req, res, db) {

			db.collection("carsDatabase").find({"brand": brand, "models.name": modelParam}, {_id: 0, "models.name": 1, "models.engines": 1}).toArray( function(err, items) {

				// błąd serwera
				if(err) {
					return handleError(res);
				}

				var enginesNames = [];

				items[0].models.forEach(function(model) {

					if(model.name == modelParam) {
						model.engines.forEach(function(engine) {
							var obj = {};
							obj.id = engine._id;
							obj.name = engine.name;
							enginesNames.push(obj);
						});
						return true;
					} else {
						return;
					}

				});

				return res.json(enginesNames);

			});

		});

    },

    getDatabaseItem: function(req, res) {

    	var id = req.params.id;

		dbConnect(req, res, function(req, res, db) {

			db.collection("carsDatabase").find({"models.engines._id": Number(id)}, {_id: 0, brand: 1, "models.name": 1, "models.engines": 1}).toArray( function(err, items) {

				// błąd serwera
				if(err) {
					return handleError(res);
				}

				var responseItem = {};

				items.forEach(function(item) {
					item.models.forEach(function(model) {
						model.engines.forEach(function(engine) {
							if(engine._id == id) {
								engine.brand = item.brand;
								engine.model = model.name;
								responseItem = engine;
								return true;
							} else {
								return;
							}
						});
					});
				});

				return res.json(responseItem);

			});


		});

    },

    getDatabaseItems: function(req, res) {

    	dbConnect(req, res, function(req, res, db) {

			db.collection("carsDatabase").find({}, {_id: 0, brand: 1, "models.name": 1, "models.engines": 1}).toArray( function(err, items) {

				// błąd serwera
				if(err) {
					return handleError(res);
				}

				var engines = [];

				items.forEach(function(item) {
					item.models.forEach(function(model) {
						model.engines.forEach(function(engine) {
							engine.brand = item.brand;
							engine.model = model.name;
							engines.push(engine);
						});
					});
				});

				return res.json(engines);

			});

		});

    }

};