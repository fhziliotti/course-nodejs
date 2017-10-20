module.exports = {
    list,
    listById
}

function list(connectionString, q, callback){
    let db = require("pg-db")(connectionString);

    db.query("SELECT * FROM CONTATO.LISTUSER($1);", [q], (err, rows)=>{
        return callback(err, rows);
    });
}

function listById(connectionString, params, callback){
    let db = require("pg-db")(connectionString);

    db.query("SELECT * FROM CONTATO.LISTUSER($1::INTEGER);", [params.id], (err, rows)=>{
        return callback(err, rows);
    });
}
