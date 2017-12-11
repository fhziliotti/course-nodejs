module.exports.noticias = function(application, req, res){
	let connection = application.config.dbConnection();
	let noticiasModel = new application.app.models.NoticiasDAO(connection);

	noticiasModel.getNoticias(function(error, result){
		res.render("noticias/noticias", {noticias: result});
	});
}

module.exports.noticia = function(application, req, res){
	let connection = application.config.dbConnection();
	let noticiasModel = new application.app.models.NoticiasDAO(connection);

	let id = req.query;

	noticiasModel.getNoticia(id, function(error, result){
		res.render("noticias/noticia", {noticia: result});
	});
}