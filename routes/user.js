var multer = require('multer'),
	storage = multer.diskStorage({
		destination: function (req, file, cb) {
			cb(null, 'public/img/avatars');
		},
		filename: function (req, file, cb) {
			cb(null, req.session.user + "." + file.mimetype.split("/")[1]);
		}
	}),
    upload = multer({ storage: storage });

module.exports = function(app, fns) {

	var login = fns.database.login,
		logout = fns.database.logout,
		registration = fns.database.registration,
		editAccount = fns.database.editAccount,
		deleteAccount = fns.database.deleteAccount,
		getAccount = fns.database.getAccount,
		addAvatar = fns.database.addAvatar;

	// Rejestracja użytkownika
	app.post("/registration", registration);

	// Logowanie użytkownika
	app.post("/login", login);

	// Odebranie zdjęcia użytkownika
	app.post("/account/addAvatar", upload.single("image"), addAvatar);

	// Wylogowanie użytkownika
	app.get("/logout", logout);

	// Pobranie danych użytkownika
	app.get("/account", getAccount);

	// Edycja konta użytkownika
	app.put("/account", editAccount);

	// Usunięcie konta użytkownika
	app.delete("/account", deleteAccount);

};