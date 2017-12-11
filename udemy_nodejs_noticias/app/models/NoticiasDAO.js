function NoticiasDAO(connection){
	this._connection = connection;
}

NoticiasDAO.prototype.getNoticias = function(callback){
	this._connection.query('SELECT * FROM noticias ORDER BY data_inclusao DESC', callback);
}
NoticiasDAO.prototype.getNoticia = function(id, callback){
	this._connection.query('SELECT * FROM noticias WHERE id = ' + id.id,  callback);
}
NoticiasDAO.prototype.salvarNoticia = function(noticia, callback){
	this._connection.query('INSERT INTO noticias SET ? ', noticia, callback);
}

NoticiasDAO.prototype.get5UltimasNoticias = function(callback) {
	this._connection.query('SELECT * FROM noticias ORDER BY data_inclusao DESC LIMIT 5', callback);
};

module.exports = function(){
	return NoticiasDAO;
};