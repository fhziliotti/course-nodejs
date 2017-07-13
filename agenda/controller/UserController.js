module.exports = (app)=>{
    return {
        list,
        listById,
        insert,
        update,
        remove
    }

    function list(req, res){
    return res.json({
        message: "Usuários retornados com sucesso!",
        result: app.locals.usuario
    })
    }
    function listById (req, res){}
    function insert (req, res){
    // JSON no corpo da requisição
    // PATHPARAM manda o parâmetro no caminho, exemplo ....../3
    // user?q=p

        let params = {
            id: req.body.id,
            nome: req.body.nome,
            sobrenome: req.body.sobrenome
        }

        app.locals.usuario.push(params);

        return res.json({
            message: "Usuário adicionado com sucesso!",
            code: 0
        });
    }
    function update (req, res){}
    function remove (req, res){}
};