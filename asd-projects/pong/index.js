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
    "UPW": 87,   
    "DOWNS": 83,
    "ENTER": 13,
    "BACK": 8,
  };

  var player2Input =
  {
    "UP": 38,  
    "DOWN": 40,
    "ENTER": 13,
    "BACK": 8,

  };
  
  // Game Item Objects
  var rightPaddle = makeObject('#rightPaddle');
  var leftPaddle = makeObject('#leftPaddle');
  var ball = makeObject('#ball');

    //UI Elements

  var p1Score = 0;
  var p2Score = 0;
  var p1Counter = document.getElementById("p1Score");
  var p2Counter = document.getElementById("p2Score");

  //Helper Vars
  var didP1Score = false;
  var didP2Score = false;

  var startingX = ball.x;
  var startingY = ball.y;


  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)

    $(document).on('keydown', handleP1KeyDown); 
    $(document).on('keydown', handleP2KeyDown);
  
    $(document).on('keyup', handleP2KeyUp); 
    $(document).on('keyup', handleP1KeyUp);
    
    $('#rightPaddleDown').appendTo('#rightPaddle');
    $('#leftPaddleDown').appendTo('#leftPaddle');

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
    

    if (doCollide(ball, rightPaddle) === true) 
    {
        ball.speedX = -5; // bounce ball off paddle Left
    }

    if (doCollide(ball, leftPaddle) === true) 
    {
        ball.speedX = 5; // bounce ball off paddle right
    }   
  }

  }
  //scoring
  function playerWins()
  {
       if (p1Score === 10)
       {
         window.confirm("PLAYER 1 (LEFT SIDE) WINS! Reset Game? ");

         if(confirm)
         {
             resetGame();
         }
       }
       
         if (p2Score === 10)        
       {
         window.confirm("PLAYER 2 (RIGHT SIDE) WINS! Reset Game? ");

          if(confirm)
         {
            resetGame();
        }
    }
  
  /* 
  Called in response to events.
  */

function handleP1KeyDown(event) //handles game starting and round restarting as well
{
    if (event.which === player1Input.UPW) 
    {
        leftPaddle.speedY = -5;
    }
    if (event.which === player1Input.DOWNS) 
    {
        leftPaddle.speedY = 5;
    }

    if (event.which === player1Input.ENTER || event.which === player2Input.ENTER)
    {
        resetBall();
    }
}

function handleP2KeyDown(event) 
{
    if (event.which === player2Input.UP) 
     {
        rightPaddle.speedY = -5;
    }
    if (event.which === player2Input.DOWN) 
    {
       rightPaddle.speedY = 5;
    }
}

function handleP1KeyUp(event) 
{
    if (event.which === player1Input.UPW) 
     {
        leftPaddle.speedY = 0;
    }
    if (event.which === player1Input.DOWNS) 
    {
        leftPaddle.speedY = 0;
    }
}

function handleP2KeyUp(event) 
{
    if (event.which === player2Input.UP) 
     {
        rightPaddle.speedY = 0;
    }
    if (event.which === player2Input.DOWN) 
    {
        rightPaddle.speedY = 0;
    }
}
function paddleCol()
{
    if (leftPaddle.y >= boardHeight - 80) //the board height is taller than the white box by one paddle, paddles are 80px tall                                        
    {           
        leftPaddle.speedY = -5;
    }
    if (leftPaddle.y < 0)
    {            
        leftPaddle.speedY = 5;
    }
    if (rightPaddle.y >= boardHeight - 80) //the board height is taller than the white box by one paddle, paddles are 80px tall                                        
    {           
        rightPaddle.speedY = -5;
    }
    if (rightPaddle.y < 0)
    {            
        rightPaddle.speedY = 5;
    }

    }
function ballCol()    
{
    if (ball.y >= boardHeight) //the board height is taller than the white box by one paddle, paddles are 80px tall                                        
    {           
        ball.speedY = -5;
    }
    if (ball.y < 0)
    {            
        ball.speedY = 5;
    }
    if (ball.x >= boardWidth)
    {
        p2Scored();
    }
    if (ball.x < 0)
    {
        p1Scored();
    }
     
}
  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
function makeObject(id) {
    var gameitem = 
    {
        id: id,
        x: parseFloat($(id).css('left')),
        y: parseFloat($(id).css('top')),
        width: $(id).width(),
        height: $(id).height(),
        speedX: 0,
        speedY: 0,
    }
   return gameitem;

}

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

function p1Scored()
{
    p1Score++;
    p1Counter.innerHTML = p1Score;
    didP1Score = true;
    didP2Score = false;
    resetBall();
}

function p2Scored()
{
    p2Score++;
    p2Counter.innerHTML = p2Score;
    didP2Score = true;
    didP1Score = false;
    resetBall();
}
    function repositionGameItem()   // update the position of the gameitem along the y-axis
    {
        leftPaddle.y += leftPaddle.speedY;
        rightPaddle.y += rightPaddle.speedY; 

        ball.x += ball.speedX;
        ball.y += ball.speedY;
    }

    function redrawGameItem()  // draw the gameitem in the new location, position pixels away from the "top"/left
    {
        $('#leftPaddle').css("top", leftPaddle.y); 
        $('#rightPaddle').css("top", rightPaddle.y); 

        $('#ball').css("left", ball.x); 
        $('#ball').css("top", ball.y); 
    }

function resetBall()
{
    var ranNum = Math.ceil(Math.random() * 3) * (Math.round(Math.random()) ? 1 : -1)
    //this gets a random number between 1 and 3, adds a minus sign 50% of the time

        ball.x = startingX;
        ball.y = startingY;
        ball.speedX = 0;
        ball.speedY = 0;

        if (didP1Score === false)
        {
            ball.speedX = -5;
        }  
        else 
        {
            ball.speedX = 5;
        }

        ball.speedY = ranNum;
}

function resetGame()
    {
        ball.x = startingX;
        ball.y = startingY;
        ball.speedX = 0;
        ball.speedY = 0;
    }

  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }

}
 
