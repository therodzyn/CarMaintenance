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

        if(req.url === "/login" || req.url === "/registration") {
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

    }

};