module.exports = (app)=>{
    const connectionString = require("../../../config/Environment.js").database;
    const userRepository = require("./UserRepository.js");

    return {
        list,
        listById
    }

    function list(req, res){
        let q = req.query.q;

        userRepository.list(connectionString, q, (err, rows)=>{
           if(err){
               res.status(500);
               return res.json({
                   message: "Internal Server Error!",
                   code: 1,
                   err: err
               });
           }
            else{
                return res.json({
                    message: "Usuários listados com sucesso!",
                    code: 0,
                    result: rows
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
                    err: err
                });
            }
            else{
                res.status(rows.length ? 200 : 404);
                return res.json({
                    message: "Usuário listado com sucesso!",
                    code: 0,
                    result: rows
                });
            }
        });
    }
};