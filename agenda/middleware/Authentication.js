exports.auth = (req, res, next)=>{
    let token = req.headers.dunha;

    if(!token){
        res.status(401);
        return res.json({
            message: "Faltou o token maluco!"
        })
    }
    else{
        if(token === "Se n conhece nem eu"){
            next();
        }
        else{
            res.status(401);
            return res.json({
                message: "Token inválido!"
            })
        }
    }
}