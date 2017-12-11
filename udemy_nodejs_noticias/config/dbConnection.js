let mysql = require('mysql');

let connMySQL = function(){
	return mysql.createConnection({
		host: 'ziliotti.com.br',
		user: 'zilio186_user',
		password: 'pgdlms1515',
		database: 'zilio186_db'
	});	
}
module.exports = function(){
	return connMySQL;
}
