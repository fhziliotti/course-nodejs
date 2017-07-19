let express = require('express');
let bodyParser = require('body-parser');
let load = require("express-load");
let notFound = require("./src/core/middleware/NotFount.js");
let auth = require("./src/core/middleware/Authentication.js");

app = express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json({limit: "100mb"}));

//segurança
app.use(auth.auth);

load("src/api/ping/PingController.js")
	.then("src/api/user/UserController.js")
	.then("src/core/route")
	.into(app);

app.use(notFound.notFound);

app.listen(3000, ()=>{
	app.locals.usuario = [];
	console.log("Servidor iniciado com sucesso!");
});

