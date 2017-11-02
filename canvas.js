//Establishing connection to server
var socket = io.connect('http://localhost:3000');
var tokens = [];
tokens.push({colour: "red", x:50, y:250, width: 100, height: 100, playerID: 0, att: 0, hp: 0});
tokens.push({colour: "blue", x:850, y:250, width: 100, height: 100, playerID: 0, att: 0, hp: 0});
var canvas = document.getElementById("canvas1");
document.getElementById("btn").addEventListener("click", handleClick);

var innerSquareTop = 0;
var innerSquareLeft = 250;



var deltaX;
var deltaY;
var tokenBeingMoved;



function getTokenAtLocation(x, y){
    console.log("grab token");

    for (var i=0; i < tokens.length;i++){
        var token = tokens[i];
        if((token.x < x) && (token.x + token.width > x) &&
            (token.y < y) && (token.y + token.height > y)){
            console.log("token grabbed");
            return token;
        }
    }
    return null;
}
function getTokenByColor(inputCo){
    for (var i=0; i < tokens.length;i++){
        var token = tokens[i];
        if(token.colour ===inputCo){return token;}
    }
    return null;
}

var drawCanvas = function(){

    var context = canvas.getContext('2d');

    context.fillStyle = '#222222';
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.font = '16pt Arial';
    context.fillStyle = '#999999';
    context.strokeStyle = '#999999';

    for (var i=0; i < tokens.length; i++){
        var token = tokens[i];
        context.strokeStyle = token.colour;
        context.fillStyle = token.colour;
        context.fillRect(token.x, token.y, token.width, token.height);
        context.strokeRect(token.x, token.y, token.width, token.height);
    }
};

function loginPlayer(data)
{
    alert("welcome To the Iron Panda Battle Arena");
    var teamName = prompt("Enter your team name to begin the cubic Caranage");
    var name = prompt("Enter your name");
    if(teamName===null||teamName==='')
    {
        alert("Unfortunatly for legal and moral reasons we cannot allow you to compete without a team name");
        login();
    }
    if(name ===null||name === '')
    {
        alert("Sadly we cannot allow nameless entities to die in the arena....fire code violation");
        login();
    }
    else
    {
        data.user.teamName = teamName;
        data.user.name = name;
        socket.id = name;
        alert("please seleact your Team by Clicking on one of the deadly cubes");
    }
}
function handleMouseDown(event){
    var rect = canvas.getBoundingClientRect();
    var canvasX = event.pageX - innerSquareLeft;
    var canvasY = event.pageY - innerSquareTop;
/*    if(getTokenAtLocation(canvasX,canvasY).playerID===0)
    {
        socket.emit('selected', {co: getTokenAtLocation(canvasX,canvasY).colour, ID: socket.id})
    }*/
    tokenBeingMoved = getTokenAtLocation(canvasX, canvasY);


    if(tokenBeingMoved !== null){
        deltaX = tokenBeingMoved.x - canvasX;
        deltaY = tokenBeingMoved.y - canvasY;
    }

    $("#canvas1").mousemove(handleMouseMove);
    $("#canvas1").mouseup(handleMouseUp);

    event.stopPropagation();
    event.preventDefault();
    drawCanvas();
}

//event handler for when a paddle(mouse) is being dragged
function handleMouseMove(event){
    var rect = canvas.getBoundingClientRect();
    var canvasX = event.pageX - innerSquareLeft;
    var canvasY = event.pageY - innerSquareTop;

    tokenBeingMoved.x = canvasX + deltaX;
    tokenBeingMoved.y = canvasY + deltaY;


    if(tokenBeingMoved.y + tokenBeingMoved.height > rect.bottom){
        tokenBeingMoved.y = rect.bottom - tokenBeingMoved.height;
    }
    if(tokenBeingMoved.y < rect.top){
        tokenBeingMoved.y = rect.top
    }
    socket.emit('move',{cX: tokenBeingMoved.x, cY: tokenBeingMoved.y, co: tokenBeingMoved.colour});
    event.stopPropagation();
    drawCanvas();
}

//event handler for when left mouse button is released
function handleMouseUp(event){

    event.stopPropagation();

    $("#canvas1").off("mousemove", handleMouseMove);
    $("#canvas1").off("mouseup", handleMouseUp);

    drawCanvas();
}

$(document).ready(function(){
    $("#canvas1").mousedown(handleMouseDown);
    drawCanvas();
    console.log("Thing on");
});

function handleClick()
{
    socket.emit('fight', {blue: tokens[0], red: tokens[1]})
}


// listen for events

socket.on('move',function(data){
    tokenBeingMoved = getTokenByColor(data.co);
    tokenBeingMoved.x = data.cX;
    tokenBeingMoved.y = data.cY;
    drawCanvas();
});

socket.on('winner',function (data) {
    alert(data.win);
    getTokenByColor("red").att =0;
    getTokenByColor("red").hp =0;
    getTokenByColor("blue").hp =0;
    getTokenByColor("blue").hp =0;
});

socket.on('continue',function (data) {
    alert("The Battle Continues Press Fight to continue");
    getTokenByColor("red").att =data.red.att;
    getTokenByColor("red").hp =data.re.hp;
    getTokenByColor("blue").hp =data.blue.att;
    getTokenByColor("blue").hp =data.blue.hp;
});

socket.on('Login',function (data) {

    if(socket.id === data.other.name){alert("a new enemy joins the battle")}
    else
        {
            loginPlayer(data);
        }
    socket.emit('player', {player: data.user});
});

socket.on('player', function () {

});

/*socket.on('ownership', function (data) {

    if(getTokenByColor(data.co).playerID===0)
    {
        getTokenByColor(data.co).playerID= data.ID;
    }

});*/


