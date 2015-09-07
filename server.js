var express = require("express"),
	hbs = require("express-handlebars"),
	app = express();

// CONFIG
app.engine("handlebars", hbs({defaultLayout: "app-layout"}));
app.set("view engine", "handlebars");

// MIDDLEWARES
require("./helpers/middlewares.js")(app);

// ROUTES
require("./routes/routes.js")(app);

// TURN ON MAILER
require("./helpers/mailer.js")(app);

// START
app.listen("3000", function() {
	console.log("Serwer aktywny!");
});