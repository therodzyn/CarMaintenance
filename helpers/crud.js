var helpers = require("./functions.js"),
    dbConnect = helpers.dbConnect,
    handleError = helpers.handleError,
    createObjectId = helpers.createObjectId,
    isValidId = helpers.isValidId;

routes = {
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

            db.collection(colname).findAndModify({_id: createObjectId(id)}, {}, {$set: req.body}, {new: true}, function(err, doc) {

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