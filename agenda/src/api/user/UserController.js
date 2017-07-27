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
        let q = req.query.q;

        userRepository.list(connectionString, q, (err, rows)=>{
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
            sexo: req.body.sexo,
            telefone: req.body.telefone ? JSON.stringify(req.body.telefone) : null,
            endereco: req.body.endereco ? JSON.stringify(req.body.endereco) : null
        }

        userRepository.insert(connectionString, params, (err, rows)=>{
            if(err){
                res.status(500);
                return res.json({
                    message: "Deu pau!",
                    code: 1,
                    err: err
                });
            }
            else {
                let result = rows[0].insertuserfull;
                    res.status(result.httpCode);
                    return res.json({
                        message: result.result,
                        code: result.code,
                        err: undefined
                    });
            }
        });
    }
    function update (req, res){
        let params = {
            id: req.params.idUser,
            nome: req.body.nome,
            dataNascimento: req.body.dataNascimento,
            sexo: req.body.sexo,
            telefone: req.body.telefone ? JSON.stringify(req.body.telefone) : null,
            endereco: req.body.endereco ? JSON.stringify(req.body.endereco) : null
        }

        userRepository.update(connectionString, params, (err, rows)=>{
            if(err){
                res.status(500);
                return res.json({
                    message: "Deu pau!",
                    code: 1,
                    err: err
                });
            }
            else {
                let result = rows[0].updateuserfull;
                res.status(result.httpCode);
                return res.json({
                    message: result.result,
                    code: result.code,
                    err: undefined
                });
            }
        });
    }
function remove (req, res){
    let params = {
        id: req.params.idUser
    }

    userRepository.remove(connectionString, params, (err, rows)=>{
        if(err){
            res.status(500);
            return res.json({
                message: "Deu pau!",
                code: 1,
                err: err
            });
        }
        else {
            let result = rows[0].removeuserfull;
            res.status(result.httpCode);
            return res.json({
                message: result.result,
                code: result.code,
                err: undefined
            });
        }
    });
}
};