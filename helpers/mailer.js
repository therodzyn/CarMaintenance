var schedule = require('node-schedule'),
	getUsers = require("../helpers/database").getUsers;

module.exports = function(app) {

	var nodemailer = require('nodemailer'),
		hbs = require('nodemailer-express-handlebars');

	var transporter = nodemailer.createTransport({
	    service: 'Gmail',
	    auth: {
	        user: 'carmaintenancepwsz@gmail.com',
	        pass: 'cmpwsz2015'
	    }
	});

	transporter.use('compile', hbs({viewEngine: "handlebars", viewPath: "views/"}));

	// Pobierz dane o terminach po uruchomieniu serwera.
	getUsers(transporter);

	// Pobierz dane o terminach codziennie o północy.
	var checkEmail = schedule.scheduleJob("0 0 * * *", function() {

		getUsers(transporter);

	});

};