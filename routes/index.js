module.exports = function(app) {

	// Wyrenderowanie strony głównej index
	app.get("/", function(req, res) {

		res.render("index", {message: app.locals.message, layout: "index-layout"});
		delete app.locals.message;

	});

};