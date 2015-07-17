var fns = {
    helpers: require("../helpers/functions.js")
};

module.exports = function(app) {

    require("./index.js")(app);
    require("./routesTemp.js")(app);

};