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
        code: 1,
        result: app.locals.usuario
    })
    }
    function listById (req, res){
        let id = req.params.idUser;
        let user = undefined;
        app.locals.usuario.forEach((item)=>{
           if(item.id == id){
            user = item;
        }
        });

        if(user){
            res.status(200);
            return res.json({
                message: "Usuário listado com sucesso!",
                code: 0,
                result: user
            });
        }
        else{
            res.status(404);
            return res.json({
                message: "Usuário não encontrado!",
                code: 1
            });
        }
    }
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
    function update (req, res){
        let params = {
            id: req.params.idUser,
            nome: req.body.nome,
            sobrenome: req.body.sobrenome
        }

        let achou = 0;

        for(let i=0; i< app.locals.usuario.length; i++){
            if(app.locals.usuario[i].id == params.id){
                app.locals.usuario[i] = params;
                achou = 1;
            }
        }

        if(achou){
            res.status(200);
            return res.json({
                message: "Usuário editado com sucesso!",
                code: 0
            });
        }
        else {
            res.status(404);
            return res.json({
                message: "Usuário não encontrado!",
                code: 1
            });
        }
    }
function remove (req, res){
    let id = req.params.idUser;

    let achou = 0;

    for(let i=0; i< app.locals.usuario.length; i++){
        if(app.locals.usuario[i].id == id){
            app.locals.usuario.splice(i, 1);
            achou = 1;
        }
    }

    if(achou){
        res.status(200);
        return res.json({
            message: "Usuário removido com sucesso!",
            code: 0
        });
    }
    else {
        res.status(404);
        return res.json({
            message: "Usuário não encontrado!",
            code: 1
        });
    }
}
};