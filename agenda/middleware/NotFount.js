exports.notFound = (req, res)=>{
    res.status(404);
    return res.json({
        calledUrl: req.path,
        result: "URL chamada não existe"
    })
}