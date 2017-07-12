let express = require('express');
let bodyParser = require('body-parser');
let load = require("express-load");

app = express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

load("controller").then("route").into(app);

app.listen(3000, ()=>{
	app.locals.usuario = [];
	console.log("Servidor iniciado com sucesso!");
});

