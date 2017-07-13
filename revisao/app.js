let express = require("express");
let bodyParser = require("body-parser");
let load = require("express-load");

app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json({limit: '100mb'}))

load("controller").then("route").into(app);

app.listen (4000, ()=>{
	console.log("Servidor subiu!");
})