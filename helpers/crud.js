var helpers = require("./functions.js"),
    dbConnect = helpers.dbConnect,
    handleError = helpers.handleError,
    createObjectId = helpers.createObjectId,
    createEmptyObjectId = helpers.createEmptyObjectId,
    isValidId = helpers.isValidId;

routes = {
    "/user": "users",

    "/user/:id": "users"
};

module.exports = {

    createItem: function(req, res) {

        var colname = routes[req.route.path];

        if(colname === "rents") {
            req.body.date = new Date();
        }

        dbConnect(req, res, function(req, res, db) {

            db.collection(colname).insert(req.body, function(err, doc) {

                if(err) return handleError(res);

                res.json(doc[0]);

                db.close();

            });

        });

    },

    getItem: function(req, res) {

        var id = req.params.id,
            isValid = isValidId(id),
            colname = routes[req.route.path];

        if(!isValid) return handleError(res);

        dbConnect(req, res, function(req, res, db) {

            db.collection(colname).find({_id: createObjectId(id)}).toArray(function(err, docs) {

                if(err) return handleError(res);

                res.json(docs[0]);

                db.close();

            });

        });

    },

    updateItem: function(req, res) {

        var id = req.params.id,
            isValid = isValidId(id),
            colname = routes[req.route.path];

        if(!isValid) return handleError(res);

        dbConnect(req, res, function(req, res, db) {

            delete req.body._id;
            delete req.body.email;
            delete req.body.password;
            delete req.body.emptyGarage;
            delete req.body.cars;
            req.body._idCar = createEmptyObjectId();

            db.collection(colname).findAndModify({_id: createObjectId(id)}, {}, {$push: {cars: req.body}, $unset: {emptyGarage: ""}}, {new: true}, function(err, doc) {

                if(err) return handleError(res);

                res.json(doc);

                db.close();

            });

       });

    },

    removeItem: function(req, res) {

        var id = req.params.id,
            isValid = isValidId(id),
            colname = routes[req.route.path];

        if(!isValid) return handleError(res);

        dbConnect(req, res, function(req, res, db) {

            db.collection(colname).findAndRemove({_id: createObjectId(id)}, function(err, doc) {

                if(err) return handleError(res);

                res.json({deleted: true});

                db.close();

            });

        });

    }

};