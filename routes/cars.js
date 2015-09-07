var multer = require('multer'),
    upload = multer({ dest: 'public/img/carImages' });

module.exports = function(app, fns) {

	var getCar = fns.database.getCar,
		addUserCar = fns.database.addUserCar,
		getUserCars = fns.database.getUserCars,
		editUserCar = fns.database.editUserCar,
		deleteUserCar = fns.database.deleteUserCar,
		addUserCarImage = fns.database.addUserCarImage,
		deleteUserCarImage = fns.database.deleteUserCarImage;

	// Pobranie samochodów użytkownika
	app.get("/garage/cars", getUserCars);

	// Pobranie konkretnego pojazdu
	app.get("/garage/car/:id", getCar);

	// Pobranie konkretnego pojazdu
	app.post("/garage/car/:id/addImage", upload.single("image"), addUserCarImage);

	// Pobranie konkretnego pojazdu
	app.post("/garage/car/:id/deleteImage", deleteUserCarImage);

	// Dodanie pojazdu użytkownika
	app.post("/garage/cars/", addUserCar);

	// Edycja pojazdu użytkownika
	app.put("/garage/car/:id", editUserCar);

	// Usunięcie pojazdu użytkownika
	app.delete("/garage/car/:id", deleteUserCar);

};