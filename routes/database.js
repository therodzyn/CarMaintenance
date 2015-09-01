module.exports = function(app, fns) {

	var getDatabaseBrands = fns.database.getDatabaseBrands,
		getDatabaseModels = fns.database.getDatabaseModels,
		getDatabaseEngines = fns.database.getDatabaseEngines,
		getDatabaseItem = fns.database.getDatabaseItem,
		getDatabaseItems = fns.database.getDatabaseItems;

	// Pobranie marek
	app.get("/database/brands", getDatabaseBrands);

	// Pobranie marek
	app.get("/database/models/:brand", getDatabaseModels);

	// Pobranie marek
	app.get("/database/engines/:brand/:model", getDatabaseEngines);

	// Pobranie konkretnego modelu
	app.get("/database/item/:id", getDatabaseItem);

	// Pobranie modeli
	app.get("/database/items", getDatabaseItems);

};