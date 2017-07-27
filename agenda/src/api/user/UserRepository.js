module.exports = {
    list,
    listById,
    insert,
    update,
    remove
}

function list(connectionString, q, callback){
    let db = require("pg-db")(connectionString);

    db.query("SELECT * FROM CONTATO.LISTUSER($1);", [q], (err, rows)=>{
        return callback(err, rows);
    });
}

function listById(connectionString, params, callback){
    let db = require("pg-db")(connectionString);

    db.query("SELECT * FROM CONTATO.LISTUSER($1);", [params.id], (err, rows)=>{
        return callback(err, rows);
    });
}

function insert(connectionString, params, callback){
    let db = require("pg-db")(connectionString);

    db.query("SELECT * FROM CONTATO.INSERTUSERFULL($1, $2, $3, $4, $5);", [params.nome, params.dataNascimento, params.sexo, params.telefone, params.endereco], (err, rows)=>{
            return callback(err, rows);
    });
}

function update(connectionString, params, callback){
    let db = require("pg-db")(connectionString);

    db.query("SELECT * FROM CONTATO.UPDATEUSERFULL($1, $2, $3, $4, $5, $6);", [params.id, params.nome, params.dataNascimento, params.sexo, params.telefone, params.endereco], (err, rows)=>{
        return callback(err, rows);
    });
}

function remove(connectionString, params, callback){
    let db = require("pg-db")(connectionString);

    db.query("SELECT * FROM CONTATO.REMOVEUSERFULL($1);", [params.id], (err, rows)=>{
        return callback(err, rows);
    });
}