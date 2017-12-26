let express = require('express');
let bodyParser = require('body-parser');
let mongodb = require('mongodb');
let objectId = require('mongodb').ObjectId;
let multiparty = require('connect-multiparty');
let fs = require('fs');

let app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(multiparty());
app.use(function(req, res, next){
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
	res.setHeader("Access-Control-Allow-Headers", "content-type");
	res.setHeader("Access-Control-Allow-Credentials", true);

	next();
});

let port = 8080;

app.listen(port);

let db = new mongodb.Db(
	'instagram',
	new mongodb.Server('localhost', 27017, {}),
	{}
	);
console.log('Servidor HTTP está executando na porta '+port);

app.get('/', function(req, res){
	res.send({msg:'Olá'});
});

app.post('/api', function(req, res){
	let date = new Date();
	time_stamp = date.getTime();



	let path_origem = req.files.arquivo.path;
	let url_imagem = time_stamp + '_' +req.files.arquivo.originalFilename;
	let path_destino = './uploads/' + url_imagem;
	
	fs.rename(path_origem, path_destino, function(err){
		if(err){
			res.status(500).json({error: err});
			return;
		}
		var dados = {
			url_imagem: url_imagem,
			titulo: req.body.titulo
		}

		db.open(function(err, mongoclient){
			mongoclient.collection('postagens', function(err, collection){
				collection.insert(dados, function(err, records){
					if(err){
						res.json({'status' : 'erro'});
					}else{
						res.json({'status' : 'inclusão realizada com sucesso'});
					}
					mongoclient.close();
				});
			})
		});
	});
});

app.get('/api', function(req, res){
	db.open(function(err, mongoclient){
		mongoclient.collection('postagens', function(err, collection){
			collection.find().toArray(function(err, results){
				if(err){
					res.json(err);
				}else{
					res.json(results);
				}
				mongoclient.close();
			});
		});
	});
});

app.get('/api/:id', function(req, res){
	db.open(function(err, mongoclient){
		mongoclient.collection('postagens', function(err, collection){
			collection.find(objectId(req.params.id)).toArray(function(err, results){
				if(err){
					res.json(err);
				}else{
					res.status(200).json(results);
				}
				mongoclient.close();
			});
		});
	});
});

app.put('/api/:id', function(req, res){
	db.open(function(err, mongoclient){
		mongoclient.collection('postagens', function(err, collection){
			collection.update(
				{ _id : objectId(req.params.id)},
				{ $push : {
					comentarios : {
						id_comentario : new objectId(),
						comentario : req.body.comentario
					}
				}
			},
			{},
			function(err, records){
				if(err){
					res.json(err);
				}else{
					res.json(records);
				}
				mongoclient.close();
			});
		});
	});
});

app.delete('/api/:id', function(req, res){
	db.open(function(err, mongoclient){
		mongoclient.collection('postagens', function(err, collection){
			collection.update(
				{}, 
				{ $pull: {
					comentarios:{id_comentario : objectId(req.params.id)}
				}
			},
			{multi: true},
			function(err, records){
				if(err){
					res.json(err);
				}else{
					res.json(records);
				}
				mongoclient.close();
			});
		});
	});
});

app.get('/imagens/:imagem', function(req, res){
	let img = req.params.imagem;

	fs.readFile('./uploads/' + img, function(err, content){
		if(err){
			res.status(400).json(err);
			return;
		}
		res.writeHead(200, {'content-type' : 'image/jpg'});
		res.end(content);
	});
});