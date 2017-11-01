// Ian Denault 101 057 419
// Lukas McClelland 101 057 299

var http = require('http');
var url = require ('url');
var fs = require ('fs');
var operations = require("./operations");
var ROOT_DIR = 'html';
var staticServer = require('ecstatic');
var socket = require('socket.io');
var players = {player1: 0, player2: 0};


//create MIME types and get method
var MIME_TYPES = {
    'html': 'text/html',
    'js': 'text/javascript',
    'json': 'application/json',
    'txt': 'text/plain'
};

var get_mime = function(filename){
    var ext, type;
    for (ext in MIME_TYPES){
        type = MIME_TYPES[ext];
        if(filename.indexOf(ext, filename.length - ext.length) !== -1){
            return type;
        }
    }
    return MIME_TYPES['txt'];
};


//launch server
var server = http.createServer(staticServer({root:ROOT_DIR}));
server.listen(3000);

// launch Socket
var socketIO = socket(server);


socketIO.on('connection', function(socket)
{
    if(players.player1===0)
    {
        players.player1= socket.id;
        console.log("Player 1: " + players.player1)
    }
    else if(players.player2===0)
    {
        players.player2= socket.id;
        console.log("Player 2: " + players.player2)
    }
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
