let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);

app.get('/', function(req, res){
   res.sendFile(__dirname + "/index.html");
});

io.on('connection', function(socket){
    console.log('alguem conectou');

    socket.on('enviaMsg', function(msg){
       console.log(msg);
       io.emit('broadcastMsg', msg);
    });

    socket.on('disconnect', function(){
        console.log("alguem desconectou");
    });
});

http.listen(3000, function(){
   console.log("subiu");
});