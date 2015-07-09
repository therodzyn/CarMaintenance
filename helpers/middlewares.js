var express = require("express"),
    bodyParser = require("body-parser"),
    helpers = require("./functions.js");

module.exports = function(app) {

    app.use(express.static("public"));
    app.use(bodyParser.json());

};