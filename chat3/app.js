let express = require('express');
let app = express();
let http = require('http').Server(app);
let io = require('socket.io')(http);

app.use(express.static(__dirname + '/public/'));

io.on('connection', function(socket){
   console.log('connect');

   socket.on('disconnect', function(){
       console.log('disconnect');
   })
});

http.listen(4000, function(){
   console.log('Servidor rodando...');
});