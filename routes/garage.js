module.exports = function(app) {

	// Wyrenderowanie strony głównej garażu
	app.get("/garage", function(req, res) {

		res.render("app", {username: req.session.user});

	});

};