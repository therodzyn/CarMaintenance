var fns = {
    helpers: require("../helpers/functions.js"),
    crud: require("../helpers/crud.js")
};

module.exports = function(app) {

    require("./index.js")(app);
    require("./login.js")(app, fns);
    require("./registration.js")(app, fns);
    require("./garage.js")(app, fns);
    require("./routesTemp.js")(app);

};