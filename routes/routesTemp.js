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

	app.get("/news.html", function(req, res) {

		res.sendFile(__dirname + '/htmls/news.html');

	});

	app.get("/one-news.html", function(req, res) {

		res.sendFile(__dirname + '/htmls/one-news.html');

	});

	app.get("/database.html", function(req, res) {

		res.sendFile(__dirname + '/htmls/database.html');

	});

	app.get("/account.html", function(req, res) {

		res.sendFile(__dirname + '/htmls/account.html');

	});


};