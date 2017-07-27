let express = require('express');
let app = express();
let http = require('http').Server(app);
let io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));

let numUsers = 0;

io.on('connection', function(socket){
    let addedUser = false;
    console.log('Um usuário conectou');

    socket.on('adduser', function(userName){
        if (addedUser) return;
        
        numUsers++;
        addedUser = true;
        socket.userName = userName;

        socket.emit('login', {
            numUsers : numUsers
        });
    
        socket.broadcast.emit('userJoined', {
            userName: socket.userName,
            numUsers: numUsers
        });
    });

    socket.on('newMessage', function(mensagem){
        if(mensagem == '/help'){
            socket.broadcast.emit('sendMessage', {
                username: socket.userName,
                message: '#desconectar - para desconectar;<br/>/help - Para ajuda'
            });
        }
        else if(mensagem == '/room:'){
            let sala = mensagem.substr(6);
            sala = sala.replace(' ', '');
            socket.salaAtual = sala;
            socket.join(sala);
        }
        else {
            console.log(socket);
            if(socket.salaAtual){
                io.to(socket.salaAtual).emit('sendMessage', {
                    username: socket.userName,
                    message: mensagem
                });
            }else{
                socket.broadcast.emit('sendMessage', {
                    username: socket.userName,
                    message: mensagem
                });
            }
        }
    });

    socket.on('typing', function(){
       socket.broadcast.emit('stopTyping', {username: socket.userName});
    });

    socket.on('stopTyping2', function(){
        socket.broadcast.emit('stopTyping2', {username: socket.userName});
    });

    socket.on('disconnect', function(){
        if (addedUser) {
            --numUsers;
            console.log('Usuário desconectado');
            socket.broadcast.emit('userLeft', {
                userName: socket.userName,
                numUsers: numUsers
            })

        }
    });
});


app.get('/', function(req, res){

});

http.listen(3000, function(){
    console.log('Servidor rodando.');
});