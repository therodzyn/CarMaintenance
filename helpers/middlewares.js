var express = require("express"),
    bodyParser = require("body-parser"),
    sessions = require("client-sessions"),
    helpers = require("./functions.js");

module.exports = function(app) {

    app.use(express.static("public"));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    app.use(sessions({
    	cookieName: "session",
    	secret: "asdasdmi2319k0asdkj12)(@#*nj",
    	cookie: {
    		ephemeral: true
    	}
    }));

    app.use(helpers.checkLogin);

    app.use(function(req, res, next) {

        res.format({

            json: function() {
                next();
            },

            html: function() {
                if(req.url !== "/" && req.url !== "/login" && req.url !== "/logout" && req.url !== "/garage") {
                    res.redirect("/");
                } else {
                    next();
                }
            }

        });

    });

};