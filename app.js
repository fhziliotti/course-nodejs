let express = require('express');

let bodyParser = require('body-parser');

app = express();
app.use(bodyParser.urlencoded({extended:false}));

app.listen(3000, ()=>{
	console.log("Servidor iniciado com sucesso!");
});
