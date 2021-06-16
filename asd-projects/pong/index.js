/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables 
  var FRAME_RATE = 60;
  var FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;

  var boardWidth = $("#board").width();
  var boardHeight =$("#board").height();

  var player1Input =
  {
    "UP": 38,  
    "DOWN": 40,
  };

  var player2Input =
  {
    "UPW": 87,   
    "DOWNS": 83
  }
  
  // Game Item Objects
  var rightPaddle = makeObject('#rightPaddle');
  var leftPaddle = makeObject('#leftPaddle');
  var ball = makeObject('#ball');

    var positionY = 0;    //player1 paddle yposition/speed
    var speedY = 0;

    var position2Y = 0;   //paddles should appear centered, numbers represent pixels                          
    var speed2Y = 0;        //player 2 paddle yposition/speed

    var ballPositionX = 0;   //ball position/speeds
    var ballSpeedX = 5;
    var ballPositionY = 0;   
    var ballSpeedY = 5;
    //UI Elements
  var p1Score = 0;
  var p2Score = 0;

  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)

    $(document).on('keydown', handleP1KeyDown); 
    $(document).on('keydown', handleP2KeyDown);
  
    $(document).on('keyup', handleP2KeyUp); 
    $(document).on('keyup', handleP1KeyUp); 

  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {

    repositionGameItem();
    redrawGameItem();
    ballCol();
    paddleCol();
  }

  if (doCollide(ball, leftPaddle) === true) {
  ballSpeedX = -5; // bounce ball off paddle Left
}

  if (doCollide(ball, rightPaddle) === true) {
  ballSpeedX = 5; // bounce ball off paddle right
}
  
  /* 
  Called in response to events.
  */

function handleP1KeyDown(event) 
{
    if (event.which === player1Input.UP) 
    {
        speedY = -5;
    }
    if (event.which === player1Input.DOWN) 
    {
        speedY = 5;
    }
}

function handleP2KeyDown(event) 
{
    if (event.which === player2Input.UPW) 
     {
        speed2Y = -5;
    }
    if (event.which === player2Input.DOWNS) 
    {
        speed2Y = 5;
    }
}

function handleP1KeyUp(event) 
{
    if (event.which === player1Input.UP) 
     {
        speedY = 0;
    }
    if (event.which === player1Input.DOWN) 
    {
        speedY = 0;
    }
}

function handleP2KeyUp(event) 
{
    if (event.which === player2Input.UPW) 
     {
        speed2Y = 0;
    }
    if (event.which === player2Input.DOWNS) 
    {
        speed2Y = 0;
    }
}
function paddleCol()
{
    if (positionY >= boardHeight - 80) //the board height is taller than the white box by one paddle, paddles are 80px tall                                        
    {           
        speedY = -5;
    }
    if (positionY < 0)
    {            
        speedY = 5;
    }
    if (position2Y >= boardHeight - 80) //the board height is taller than the white box by one paddle, paddles are 80px tall                                        
    {           
        speed2Y = -5;
    }
    if (position2Y < 0)
    {            
        speed2Y = 5;
    }

    }
    function ballCol()    
    {
        if (ballPositionY >= boardHeight) //the board height is taller than the white box by one paddle, paddles are 80px tall                                        
        {           
           ballSpeedY = -5;
           
        }
        if (ballPositionY < 0)
        {            
            ballSpeedY = 5;
        }
        if (ballPositionX >= boardWidth)
        {
            ballSpeedX = -5;
        }
        if (ballPositionX < 0)
        {
            ballSpeedX = 5;
        }
     
    }
  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
// for use if wish to use JS objects rather than CSS. Tried this and had issues/bugs

function makeObject($id) {
 	var gameItem = {};
	gameItem.$id = $($id); 
    gameItem.x = gameItem.$id.width();
	gameItem.y = gameItem.$id.height();
	return gameItem;
}

// this code also broke everything.

function doCollide(obj1, obj2) {
    // sides of the objects
    obj1.topY = obj1.y;
    obj1.leftX = obj1.x;
    obj1.rightX = obj1.x + $(obj1.id).width();
    obj1.bottomY = obj1.y + $(obj1.id).height();
    
    obj2.leftX = obj2.x;
    obj2.topY = obj2.y;
    obj2.rightX = obj2.x + $(obj2.id).width();
    obj2.bottomY = obj2.y + $(obj2.id).height();
              
	if ((obj1.rightX > obj2.leftX) &&
        (obj1.leftX < obj2.rightX) &&
        (obj1.bottomY > obj2.topY) &&
        (obj1.topY < obj2.bottomY))
          {
            return true;
          }
        else
          {
            return false;
          }
}

    function repositionGameItem()   // update the position of the gameitem along the y-axis
    {
        positionY += speedY;
        position2Y += speed2Y; 

        ballPositionX += ballSpeedX;
        ballPositionY += ballSpeedY;
    }

    function redrawGameItem()  // draw the gameitem in the new location, position pixels away from the "top"
    {
        $(leftPaddle).css("top", positionY); 
        $(rightPaddle).css("top", position2Y); 

        $(ball).css("left", ballPositionX); 
        $(ball).css("top", ballPositionY); 
    }

    // function between0And4(X, Y)      //sets a slightly random angle of bounce, not working right now
    // {
    //    var result = Math.floor(Math.random() * 4);

    //    if (result = 4)
    //    {
    //        if (X = x)
    //        {
    //          ballSpeedX =+ 3; 
    //        }
    //        else if(Y = y)
    //        {
    //            ballSpeedY =+ 3;
    //        }
    //    }
    // }

    function resetBall()
    {
        ballPositionX = 0;
        ballPositionY = 0;
        
    }

  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  
}
