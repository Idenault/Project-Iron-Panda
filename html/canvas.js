
var tokens = [];
tokens.push({colour: "red", x:600, y:400, width: 100, height: 100});
tokens.push({colour: "blue", x:500, y:300, width: 100, height: 100});

var canvas = document.getElementById("canvas1");

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

var drawCanvas = function(){

    var context = canvas.getContext('2d');

    context.fillStyle = '#222222';
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.font = '16pt Arial';
    context.fillStyle = '#999999';
    context.strokeStyle = '#999999';

    // --------------------------------------------------------
    //this will be where paddles, buttons, and scores are drawn

    for (var i=0; i < tokens.length; i++){
        var token = tokens[i];
        context.strokeStyle = token.colour;
        context.fillStyle = token.colour;
        context.fillRect(token.x, token.y, token.width, token.height);
        context.strokeRect(token.x, token.y, token.width, token.height);
    }
};

//event handler for when left mouse button is clicked (hopefully on a paddle)
function handleMouseDown(event){
    var rect = canvas.getBoundingClientRect();
    var canvasX = event.pageX - rect.left;
    var canvasY = event.pageY - rect.top;

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
    var canvasX = event.pageX - rect.left;
    var canvasY = event.pageY - rect.top;

    tokenBeingMoved.y = canvasY + deltaY;
    tokenBeingMoved.x = canvasX + deltaX;

    if(tokenBeingMoved.y + tokenBeingMoved.height > rect.bottom){
        tokenBeingMoved.y = rect.bottom - tokenBeingMoved.height;
    }
    else if(tokenBeingMoved.y < rect.top){
        tokenBeingMoved.y = rect.top
    }

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
