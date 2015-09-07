var mongo = require("mongodb"),
    MongoClient = mongo.MongoClient,
    dbUrl = "mongodb://localhost:27017/CarMaintenance";

module.exports = {

    handleError: function(res) {

        res.status(500);
        res.json({error: "Błąd na serwerze. Proszę skontaktować się z administratorem."});

    },

    isValidId: function(id) {

        return mongo.ObjectID.isValid(id);

    },

    createObjectId: function(id) {

        return new mongo.ObjectID(id);

    },

    createEmptyObjectId: function() {

        return new mongo.ObjectID();

    },

    dbConnect: function (req, res, callback) {

        MongoClient.connect(dbUrl, function(err, db) {

            if(err) return this.handleError(res);

            callback(req, res, db);

        });

    },

    checkLogin: function(req, res, next) {

        if(req.url === "/login" || req.url === "/registration" || (req.url.indexOf("/resetPass") !== -1)) {
            return next();
        }

        if(req.url === "/" && req.session && req.session.user) {
        	return res.redirect("/garage");
        }

        if(req.url === "/") {
        	return next();
        }

        if(req.session && req.session.user) {
            return next();
        } else {

        	if(!req.xhr) {
        		res.redirect("/");
        	} else {
        		res.status(401);
        		res.json({error: "logout"});
        	}

        }

    },

    sendMail: function(transporter, to, subject, context, id, field) {

    	var mailOptions = {
		    from: 'CarMaintenance <carmaintenancepwsz@gmail.com>', // sender address
		    to: to, // list of receivers
		    subject: subject, // Subject line
			template: 'email',
			context: context
		};

		transporter.sendMail(mailOptions, function(error, info){
		    if(error){
		        return console.log(error);
		    }

		    console.log('Message sent: ' + info.response);
		    require("./database.js").setSentEmail(id, field);
		});

    }

};