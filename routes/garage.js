module.exports = function(app) {

	app.get("/garage", function(req, res) {

		res.render("app", {username: req.session.user});

	});

};