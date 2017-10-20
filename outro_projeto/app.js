let express = require('express');
let bodyParser = require('body-parser');
let fs = require('fs');
let load = require("express-load");

app = express();
let http = require('http').Server(app);

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json({limit: "100mb"}));

app.all('*', function(req, res, next){
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
	res.header('Access-Control-Allow-Headers', 'Content-Type, Option');
	if(req.method === 'OPTIONS'){
		res.status(200).send();
		return;
	}
	next();
});

load("src/api/user/UserController.js")
.then("src/core/route")
.into(app);

http.listen(3000, ()=>{
	console.log("Servidor iniciado com sucesso!");
});