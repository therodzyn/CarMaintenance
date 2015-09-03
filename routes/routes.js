var fns = {
    helpers: require("../helpers/functions.js"),
    database: require("../helpers/database.js")
};

module.exports = function(app) {

	require("./garage.js")(app, fns);
    require("./index.js")(app);

    require("./cars.js")(app, fns);
    require("./user.js")(app, fns);
    require("./news.js")(app, fns);
    require("./database.js")(app, fns);


    // MAILER
    var mailer = require('express-mailer');

    mailer.extend(app, {
		from: 'rodzyn2007@gmail.com',
		host: 'smtp.gmail.com', // hostname
		secureConnection: true, // use SSL
		port: 465, // port for secure SMTP
		transportMethod: 'SMTP', // default is SMTP. Accepts anything that nodemailer accepts
		auth: {
			user: 'rodzyn2007@gmail.com',
			pass: '726577123'
		}
	});

	app.get('/sendMailToMe', function (req, res, next) {
		app.mailer.send('email', {
			to: 'jakub.rodzinski@gmail.com', // REQUIRED. This can be a comma delimited string just like a normal email to field.
			subject: 'Test Email', // REQUIRED.
			otherProperty: 'Other Property' // All additional properties are also passed to the template as local variables.
		}, function (err) {
			if (err) {
				// handle error
				console.log(err);
				res.send('There was an error sending the email');
				return;
			}
			res.send('Email Sent');
		});
	});

};