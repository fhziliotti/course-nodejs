module.exports = {
    list,
    listById,
    insert,
    update,
    remove
}

function list(connectionString, callback){
    let db = require("pg-db")(connectionString);

    db.query("SELECT * FROM CONTATO.AGENDA;", [], (err, rows)=>{
        return callback(err, rows);
    });
}

function listById(connectionString, params, callback){
    let db = require("pg-db")(connectionString);

    db.query("SELECT * FROM CONTATO.AGENDA WHERE ID = $1;", [params.id], (err, rows)=>{
        return callback(err, rows);
    });
}

function insert(connectionString, params, callback){
    let db = require("pg-db")(connectionString);

    db.query("INSERT INTO CONTATO.AGENDA (NOME, DATANASCIMENTO, SEXO) VALUES($1, $2, $3);", [params.nome, params.dataNascimento, params.sexo], (err, rows)=>{
        return callback(err, rows);
    });
}

function update(connectionString, params, callback){
    let db = require("pg-db")(connectionString);

    db.query("UPDATE CONTATO.AGENDA SET NOME = $2, DATANASCIMENTO = $3, SEXO = $4 WHERE ID = $1;", [params.id, params.nome, params.dataNascimento, params.sexo], (err, rows)=>{
        return callback(err, rows);
    });
}


function remove(connectionString, params, callback){
    let db = require("pg-db")(connectionString);

    db.query("DELETE FROM CONTATO.AGENDA WHERE ID = $1;", [params.id], (err, rows)=>{
        return callback(err, rows);
    });
}