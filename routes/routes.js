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

};