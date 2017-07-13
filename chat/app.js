let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

// IO é o socket do servidor
// Tudo entre servidor/cliente fica na function abaixo
io.on('connection', function(socket){
    //socket é o cliente
    console.log('a user connected');

    socket.on('batata', function(message){
        console.log(message);
        io.emit('batata', message);
    });

    socket.on('disconnect', function(){
        console.log('user disconnected');
    });
});

http.listen(3000, function(){
    console.log('Servidor em pé!');
});