module.exports = function(app, fns) {

	var login = fns.database.login,
		logout = fns.database.logout,
		registration = fns.database.registration;

	// Rejestracja użytkownika
	app.post("/registration", registration);

	// Logowanie użytkownika
	app.post("/login", login);

	// Wylogowanie użytkownika
	app.get("/logout", logout);

};