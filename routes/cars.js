module.exports = function(app, fns) {

	var getCar = fns.database.getCar,
		addUserCar = fns.database.addUserCar,
		getUserCars = fns.database.getUserCars,
		editUserCar = fns.database.editUserCar,
		deleteUserCar = fns.database.deleteUserCar;

	// Pobranie samochodów użytkownika
	app.get("/garage/cars", getUserCars);

	// Pobranie konkretnego pojazdu
	app.get("/garage/car/:id", getCar);

	// Dodanie pojazdu użytkownika
	app.post("/garage/cars/", addUserCar);

	// Edycja pojazdu użytkownika
	app.put("/garage/car/:id", editUserCar);

	// Usunięcie pojazdu użytkownika
	app.delete("/garage/car/:id", deleteUserCar);

};