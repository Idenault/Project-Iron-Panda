// Ian Denault 101 057 419
// Lukas McClelland 101 057 299

var http = require('http');
var url = require ('url');
var fs = require ('fs');
var operations = require("./operations");
var ROOT_DIR = 'html';
var staticServer = require('ecstatic');
var socket = require('socket.io');
player1 = ({teamName: "", name: "", teamColor: "", num: 1});
player2 = ({teamName: "", name: "", teamColor: "", num:2});

//launch server
var server = http.createServer(staticServer({root:ROOT_DIR}));
server.listen(3000);

// launch Socket
var socketIO = socket(server);


socketIO.on('connection', function(socket)
{
    if(player1.name=== "" || player2.name === "") {

        if (player1.name=== "") {
            socketIO.sockets.emit('Login', {user: player1,other: player2})
        }
        else if(player2.name=== "")
        {
            socketIO.sockets.emit('Login', {user: player2, other: player1})
        }
    }

/*
    socket.on('selected', function (data) {
        if(data.ID = player1.name && player2.teamColor !== data.co)
        {
            player1.teamColor = data.co;
            console.log("this is a test");
            socketIO.sockets.emit('ownership', {co: data.co, ID: data.ID})
        }
        else if(data.ID = player2.name && player2.teamColor !== data.co)
        {
            player2.teamColor = data.co;
            socketIO.sockets.emit('ownership', {co: data.co, ID: data.ID})
        }

    });
*/
    socket.on('disable',function(data){
        socketIO.sockets.emit('disable',{disableBtn: data.btn});
    });
    socket.on('player',function(data){

        if(data.player.num===1){player1 = data.player}
        else if(data.player.num===2){player2 = data.player}
        console.log(player1.name);
        console.log(player2.name);
        socketIO.sockets.emit('player');
    });
    socket.on('move',function(data){
        socketIO.sockets.emit('move',data);
    });
    socket.on('fight',function (data) {
        if(data.red.att === 0){data.red.att = operations.attack();}
        if(data.blue.att === 0)data.blue.att = operations.attack();
        if(data.blue.hp === 0)data.blue.hp = operations.hp();
        if(data.red.hp === 0)data.red.hp = operations.hp();
        var winner = operations.battle(data.red, data.blue);

        if(winner==="continue")
        {
            data.red.hp -= data.blue.att;
            data.blue.hp -= data.red.att;
            socketIO.emit('continue',{win: winner, red: data.red, blue:data.blue})
        }
        else {socketIO.emit('winner', {win:winner})}
    });


});

console.log("Server Running at http://127.0.0.1:3000/assignment2.html Ctrl-C to stop server.");
