// importar as configuracoes do servidor
let app = require('./config/server.js');

// parametrizar a porta de escuta
let server = app.listen(80, function(){
	console.log('Servidor online');
});

let io = require('socket.io').listen(server);

app.set('io', io);

// criar conexao por websocket
io.on('connection', function(socket){
	console.log('Usuário conectou');

	socket.on('disconnect', function(){
		console.log('Usuário desconectou');
	});

	socket.on('msgParaServidor', function(data){
		// dialogo
		socket.emit('msgParaCliente', {apelido: data.apelido, mensagem: data.mensagem});
		socket.broadcast.emit('msgParaCliente', {apelido: data.apelido, mensagem: data.mensagem});

		// participantes
		if(parseInt(data.apelido_atualizado_nos_clientes) == 0){
			socket.emit('participantesParaCliente', {apelido: data.apelido});
			socket.broadcast.emit('participantesParaCliente', {apelido: data.apelido});
		}
	});
});

