module.exports = function(app, fns) {

	var getNews = fns.database.getNews,
		getNewsItem = fns.database.getNewsItem;

	// Pobranie wiadomości
	app.get("/news", getNews);

	app.get("/news/:id", getNewsItem);

};