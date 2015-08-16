module.exports = function(app, fns) {

	var getCar = fns.database.getCar,
		addUserCar = fns.database.addUserCar,
		getUserCars = fns.database.getUserCars;

	// Pobranie samochodów użytkownika
	app.get("/garage/cars", getUserCars);

	// Pobranie konkretnego pojazdu
	app.get("/garage/car/:id", getCar);

	// Dodanie pojazdu użytkownika
	app.post("/garage/cars/", addUserCar);

};