module.exports = function(app) {

	app.get("/garage.html", function(req, res) {

		res.sendFile(__dirname + '/htmls/garage.html');

	});

	app.get("/empty-garage.html", function(req, res) {

		res.sendFile(__dirname + '/htmls/empty-garage.html');

	});

	app.get("/add-car.html", function(req, res) {

		res.sendFile(__dirname + '/htmls/add-car.html');

	});

	app.get("/edit-car.html", function(req, res) {

		res.sendFile(__dirname + '/htmls/edit-car.html');

	});

	app.get("/car.html", function(req, res) {

		res.sendFile(__dirname + '/htmls/car.html');

	});

	app.get("/map.html", function(req, res) {

		res.sendFile(__dirname + '/htmls/map.html');

	});

};