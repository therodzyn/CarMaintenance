var express = require("express"),
	mongo = require("mongodb"),
	bodyParser = require("body-parser"),
	MongoClient = mongo.MongoClient,
	app = express(),
	dbUrl = "mongodb://localhost:27017/carmaintenance";

app.use(express.static(__dirname));
app.use(bodyParser.json());

app.get("/", function(req, res) {
	res.sendfile("index.html");
});

app.listen("3000", function() {
	console.log("Serwer aktywny!");
});