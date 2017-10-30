




var paddleBeingMoved;
var ENTER_KEY = 13;

var drawCanvas = function(){

    var context = canvas.getContext('2d');

    context.fillStyle = '#222222';
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.font = '16pt Arial';
    context.fillStyle = '#999999';
    context.strokeStyle = '#999999';

    // --------------------------------------------------------
    //this will be where paddles, names, and scores are drawn
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //----------------------------------------------------------
};

//event handler for when left mouse button is clicked (hopefully on a paddle)
function handleMouseDown(event){
    var rect = canvas.getBoundingClientRect();
    var canvasX = event.pageX - rect.left;
    var canvasY = event.pageY - rect.top;

    paddleBeingMoved = getPaddleAtLocation(canvasX, canvasY);

    if(paddleBeingMoved !== null){
        deltaY = paddleBeingMoved.y - canvasY;
    }

    $("#canvas").mousemove(handleMouseMove);
    $("#canvas").mouseup(handleMouseUp);

    event.stopPropagation();
    event.preventDefault();

    drawCanvas();
}

//event handler for when a paddle(mouse) is being dragged
function handleMouseMove(event){
    var rect = canvas.getBoundingClientRect();
    var canvasX = event.pageX - rect.left;
    var canvasY = event.pageY - rect.top;

    paddleBeingMoved.y = canvasY + deltaY;

    event.stopPropagation();

    drawCanvas();
}

//event handler for when left mouse button is released
function handleMouseUp(event){

    event.stopPropagation();

    $("#canvas").off("mousemove", handleMouseMove);
    $("#canvas").off("mouseup", handleMouseUp);

    drawCanvas();
}

function handleKeyUp(event){
    if(event.which === ENTER_KEY){
        handleSubmitButton();
        //$("#userTextField").val("");   maybe clear text field. maybe not **
    }

    event.stopPropagation();
    event.preventDefault();
}

function handleSubmitButton(){
    var requestText = $("#userTextField").val();

    if(requestText && requestText !== ""){

        var userRequestObj = {text: requestText};
        var userRequestJSON = JSON.stringify(userRequestObj);

        //send a post with some stuff
        $.post("userText", userRequestJSON, function(data, status){

            //process the response

            var responseObj = JSON.parse(data);



            drawCanvas();

        });
    }
}

$(document).ready(function(){
   $("#canvas").mousedown(handleMouseDown);
   $(document).keyup(handleKeyUp);
   drawCanvas()
});
