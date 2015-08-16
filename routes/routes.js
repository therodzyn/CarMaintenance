var fns = {
    helpers: require("../helpers/functions.js"),
    crud: require("../helpers/crud.js")
};

module.exports = function(app) {

    require("./garage.js")(app, fns);
    require("./cars.js")(app, fns);
    require("./index.js")(app);
    // require("./app.js")(app);
    require("./login.js")(app, fns);
    require("./registration.js")(app, fns);
    // require("./routesTemp.js")(app);
    require("./user.js")(app, fns);

};