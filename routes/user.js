module.exports = function(app, fns) {

	var login = fns.database.login,
		logout = fns.database.logout,
		registration = fns.database.registration,
		editAccount = fns.database.editAccount,
		deleteAccount = fns.database.deleteAccount,
		getAccount = fns.database.getAccount;

	// Rejestracja użytkownika
	app.post("/registration", registration);

	// Logowanie użytkownika
	app.post("/login", login);

	// Wylogowanie użytkownika
	app.get("/logout", logout);

	// Pobranie danych użytkownika
	app.get("/account", getAccount);

	// Edycja konta użytkownika
	app.put("/account", editAccount);

	// Usunięcie konta użytkownika
	app.delete("/account", deleteAccount);

};