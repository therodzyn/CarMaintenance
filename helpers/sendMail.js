var nodemailer = require('nodemailer'),
	hbs = require('nodemailer-express-handlebars');

module.exports = {

	sendMail: function(to, subject, context) {

		var transporter = nodemailer.createTransport({
		    service: 'Gmail',
		    auth: {
		        user: 'carmaintenancepwsz@gmail.com',
		        pass: 'cmpwsz2015'
		    }
		});

		transporter.use('compile', hbs({viewEngine: "handlebars", viewPath: "views/"}));

    	var mailOptions = {
		    from: 'CarMaintenance <carmaintenancepwsz@gmail.com>', // sender address
		    to: to, // list of receivers
		    subject: subject, // Subject line
			template: 'emailResetPass',
			context: context
		};

		transporter.sendMail(mailOptions, function(error, info){
		    if(error){
		        return console.log(error);
		    }
		    console.log('Message sent: ' + info.response);
		});

	}

};