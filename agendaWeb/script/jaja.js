function teste(){
    console.log('batata');
}

function listar(){
    $.ajax({
        method: "GET",
        url: "http://localhost:3000/user",
    }).done(function (res){
        contatos = res.result;
        addContatosList(contatos);
        console.log(contatos);
    })
}

function addContatosList(contatos){
    $('#messages').empty();
    contatos.forEach(function (contato){
        $('#messages').append(
            '<li><div>'+
            '<h4>'+contato.id+' - '+contato.nome+'</h4>'+
            +'</div></li>'
        )
    })
}

function deletar(){
    $.ajax({
        method: "DELETE",
        url: "http://localhost:3000/user/" + $('#id').val(),
    }).done(function (res){
        console.log('EXCLUIU', res);
    });
    $('#id').empty();
}