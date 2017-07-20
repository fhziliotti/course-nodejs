module.exports = (app)=>{
    const connectionString = require("../../../config/Environment.js").database;
    const userRepository = require("./UserRepository.js");

    return {
        list,
        listById,
        insert,
        update,
        remove
    }

    function list(req, res){
        userRepository.list(connectionString, (err, rows)=>{
           if(err){
               res.status(500);
               return res.json({
                   message: "Internal Server Error!",
                   code: 1,
                   error: err
               });
           }
            else{
                return res.json({
                    message: "Usuários listados com sucesso!",
                    code: 0,
                    error: rows
                });
            }
        });
    }
    function listById (req, res){
        let params = {
            id: req.params.idUser
        }

        userRepository.listById(connectionString, params, (err, rows)=>{
            if(err){
                res.status(500);
                return res.json({
                    message: "Internal Server Error!",
                    code: 1,
                    error: err
                });
            }
            else{
                res.status(rows.length ? 200 : 404);
                return res.json({
                    message: "Usuário listado com sucesso!",
                    code: 0,
                    error: rows
                });
            }
        });
    }

    function insert (req, res){
    // JSON no corpo da requisição
    // PATHPARAM manda o parâmetro no caminho, exemplo ....../3
    // user?q=p

        let params = {
            nome: req.body.nome,
            dataNascimento: req.body.dataNascimento,
            sexo: req.body.sexo
        }

        userRepository.insert(connectionString, params, (err, rows)=>{
            res.status(err ? 500 : 200);
                return res.json({
                    message: err ? "Erro ao inserir usuário!" : "Usuário inserido com sucesso!",
                    code: err ? 1 : 0,
                    error: err ? err : undefined
                });
        });
    }
    function update (req, res){
        let params = {
            id: req.params.idUser,
            nome: req.body.nome,
            dataNascimento: req.body.dataNascimento,
            sexo: req.body.sexo
        }

        userRepository.update(connectionString, params, (err, rows)=>{
            res.status(err ? 500 : 200);
            return res.json({
                message: err ? "Erro ao modificar usuário!" : "Usuário modificado com sucesso!",
                code: err ? 1 : 0,
                error: err ? err : undefined
            });
        });
    }
function remove (req, res){
    let params = {
        id: req.params.idUser
    }

    userRepository.remove(connectionString, params, (err, rows)=>{
        res.status(err ? 500 : 200);
        return res.json({
            message: err ? "Erro ao remover usuário!" : "Usuário removido com sucesso!",
            code: err ? 1 : 0,
            error: err ? err : undefined
        });
    });
}
};