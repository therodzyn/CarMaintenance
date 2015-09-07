var multer = require('multer'),
    upload = multer({ dest: 'public/img/avatars' });

module.exports = function(app, fns) {

	var login = fns.database.login,
		logout = fns.database.logout,
		registration = fns.database.registration,
		resetPassAsk = fns.database.resetPassAsk,
		resetPass = fns.database.resetPass,
		editAccount = fns.database.editAccount,
		deleteAccount = fns.database.deleteAccount,
		getAccount = fns.database.getAccount,
		addAvatar = fns.database.addAvatar,
		deleteAvatar = fns.database.deleteAvatar;

	// Rejestracja użytkownika
	app.post("/registration", registration);

	// Logowanie użytkownika
	app.post("/login", login);

	// Logowanie użytkownika
	app.post("/resetPass", resetPassAsk);

	// Logowanie użytkownika
	app.get("/resetPass/:hash", resetPass);

	// Odebranie zdjęcia użytkownika
	app.post("/account/addAvatar", upload.single("image"), addAvatar);

	// Odebranie zdjęcia użytkownika
	app.post("/account/deleteAvatar", deleteAvatar);

	// Wylogowanie użytkownika
	app.get("/logout", logout);

	// Pobranie danych użytkownika
	app.get("/account", getAccount);

	// Edycja konta użytkownika
	app.put("/account", editAccount);

	// Usunięcie konta użytkownika
	app.delete("/account", deleteAccount);

};