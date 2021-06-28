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

  var player3Input =
  {
    "LEFTA": 65,  
    "RIGHTD": 68,
    "ENTER": 13,
    "BACK": 8,
  };

  var player4Input =
  {
    "LEFT": 37,  
    "RIGHT": 39,
    "ENTER": 13,
    "BACK": 8,
  };
  
  // Game Item Objects
  var rightPaddle = makeObject('#rightPaddle');
  var leftPaddle = makeObject('#leftPaddle');
  var topPaddle = makeObject('#topPaddle');
  var bottomPaddle = makeObject('#bottomPaddle');

  var ball = makeObject('#ball');

    //UI & Score Elements

  var p1Score = 0;
  var p2Score = 0;
  var p3Score = 0;
  var p4Score = 0;

  var p1Counter = document.getElementById("p1Score");
  var p2Counter = document.getElementById("p2Score");
  var p3Counter = document.getElementById("p3Score");
  var p4Counter = document.getElementById("p4Score");

  //Helper Vars
  var didP1Score = false;

  var startingX = ball.x;
  var startingY = ball.y;

  var p1Touched = false;    
  var p2Touched = false;
  var p3Touched = false;
  var p4Touched = false;

  var someoneScored = false;

  var theGameisAfoot = false;   //triggered if a paddle hits the ball, otherwise the ball just bounces around

  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)

    $(document).on('keydown', handleP1KeyDown); 
    $(document).on('keydown', handleP2KeyDown);
    $(document).on('keydown', handleP3KeyDown);
    $(document).on('keydown', handleP4KeyDown);
  
    $(document).on('keyup', handleP2KeyUp); 
    $(document).on('keyup', handleP1KeyUp);
    $(document).on('keyup', handleP3KeyUp);
    $(document).on('keyup', handleP4KeyUp);
    

    $('#rightPaddleDown').appendTo('#rightPaddle');
    $('#leftPaddleDown').appendTo('#leftPaddle');
    $('#topPaddleDown').appendTo('#topPaddle');
    $('#bottomPaddleDown').appendTo('#bottomPaddle');

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
    playerWins()
    ballPaddleCollides() 
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
    if (p3Score === 10)        
    {
        window.confirm("PLAYER 3 (TOP) WINS! Reset Game? ");
 
        if(confirm)
        {
            resetGame();
        }
    }
    if (p4Score === 10)        
    {
        window.confirm("PLAYER 4 (BOTTOM) WINS! Reset Game? ");
  
        if(confirm)
        {
            resetGame();
        }
    }
}

      
  /* 
  Called in response to events.
  */

function handleP1KeyDown(event) //handles game starting and round restarting and 4 player switching
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

function handleP3KeyDown(event) 
{
    if (event.which === player3Input.RIGHTD) 
     {
        topPaddle.speedX = 5;
    }
    if (event.which === player3Input.LEFTA) 
    {
        topPaddle.speedX = -5;
    }
}

function handleP4KeyDown(event) 
{
    if (event.which === player4Input.RIGHT) 
     {
        bottomPaddle.speedX = 5;
    }
    if (event.which === player4Input.LEFT) 
    {
        bottomPaddle.speedX = -5;
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

function handleP3KeyUp(event) 
{
    if (event.which === player3Input.RIGHTD) 
     {
        topPaddle.speedX = 0;
    }
    if (event.which === player3Input.LEFTA) 
    {
        topPaddle.speedX = 0;
    }
}

function handleP4KeyUp(event) 
{
    if (event.which === player4Input.RIGHT) 
     {
        bottomPaddle.speedX = 0;
    }
    if (event.which === player4Input.LEFT) 
    {
        bottomPaddle.speedX = 0;
    }
}

function paddleCol()
{
    if (leftPaddle.y >= boardHeight - 80) //the paddle seems to collide from the left edge,                                        
    {                                     //meaning the right edge goes over the box. paddles are 80px tall 
        leftPaddle.speedY = -5;
    }
    if (leftPaddle.y < 0)
    {            
        leftPaddle.speedY = 5;
    }
    if (rightPaddle.y >= boardHeight - 80)                                       
    {           
        rightPaddle.speedY = -5;
    }
    if (rightPaddle.y < 0)
    {            
        rightPaddle.speedY = 5;
    }
    if (topPaddle.x >= boardWidth -80)
    {
        topPaddle.speedX = -5;
    }
    if (topPaddle.x < 0)
    {
        topPaddle.speedX = 5;
    }

    if (bottomPaddle.x >= boardWidth -80)
    {
        bottomPaddle.speedX = -5;
    }
    if (bottomPaddle.x < 0)
    {
        bottomPaddle.speedX = 5;
    }

    }
function ballCol()    
{
    
    if (theGameisAfoot === true)
    {
        if (ball.y >= boardHeight)                                         
        {           
            someoneScored = true;
            whoScored();
        }
        if (ball.y < 0)
        {            
            someoneScored = true;
            whoScored();
        }
        if (ball.x >= boardWidth)
        {
            someoneScored = true;
            whoScored();
        }
        if (ball.x < 0)
        {
            someoneScored = true;
            whoScored();
        }
    }

    else
    {
        if (ball.y >= boardHeight)                                         
        {           
            ball.speedY = -5
        }
        if (ball.y < 0)
        {            
            ball.speedY = 5
        }
        if (ball.x >= boardWidth)
        {
            ball.speedX = -5
        }
        if (ball.x < 0)
        {
            ball.speedX = 5
        }
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

function ballPaddleCollides()
{
    if (doCollide(ball, leftPaddle) === true) 
    {
        ball.speedX = 5; // bounce ball off paddle Left
        theGameisAfoot = true;
        p1touchManager()
    }

    if (doCollide(ball, rightPaddle) === true) 
    {
        ball.speedX = -5; // bounce ball off paddle right 
        theGameisAfoot = true;   
        p2touchManager()
    }

    if (doCollide(ball, topPaddle) === true) 
    {
        ball.speedY = 5; // bounce ball off paddle top
        theGameisAfoot = true;
        p3touchManager()
    }

    if (doCollide(ball, bottomPaddle) === true) 
    {
        ball.speedY = -5; // bounce ball off paddle bottom
        theGameisAfoot = true;
        p4touchManager() 
    }

}

function p1touchManager()    //the touch managers set one player most recent touch to true and all others to false
{
    p1Touched = true;
    p2Touched = false;
    p3Touched = false;
    p4Touched = false;
}

function p2touchManager()    //
{
    p2Touched = true;
    p1Touched = false;
    p3Touched = false;
    p4Touched = false;
}

function p3touchManager()    //
{
    p3Touched = true;
    p1Touched = false;
    p2Touched = false;
    p4Touched = false;
}

function p4touchManager()    //
{
    p4Touched = true;
    p1Touched = false;
    p2Touched = false;
    p3Touched = false;
}

function whoScored()
{
    if (someoneScored === true && p1Touched === true)
    {
        p1Scored();
    }
    if (someoneScored === true && p2Touched === true)
    {
        p2Scored();
    }
    if (someoneScored === true && p3Touched === true)
    {
        p3Scored();
    }
    if (someoneScored === true && p4Touched === true)
    {
        p4Scored();
    }
}

function p1Scored()
{
    p1Score++;
    p1Counter.innerHTML = p1Score;
    didP1Score = true;
    someoneScored = false;
    resetBall();
}

function p2Scored()
{
    p2Score++;
    p2Counter.innerHTML = p2Score;
    didP1Score = false;
    someoneScored = false;
    resetBall();
}

function p3Scored()
{
    p3Score++;
    p3Counter.innerHTML = p3Score;
    someoneScored = false;
    resetBall();
}

function p4Scored()
{
    p4Score++;
    p4Counter.innerHTML = p4Score;
    someoneScored = false;
    resetBall();
}
    function repositionGameItem()   // update the position of the gameitem along the y-axis
    {
        leftPaddle.y += leftPaddle.speedY;
        rightPaddle.y += rightPaddle.speedY;
        topPaddle.x += topPaddle.speedX; 
        bottomPaddle.x += bottomPaddle.speedX; 

        ball.x += ball.speedX;
        ball.y += ball.speedY;
    }

    function redrawGameItem()  // draw the gameitem in the new location, position pixels away from the "top"/left
    {
        $('#leftPaddle').css("top", leftPaddle.y); 
        $('#rightPaddle').css("top", rightPaddle.y); 
        $('#topPaddle').css("left", topPaddle.x); 
        $('#bottomPaddle').css("left", bottomPaddle.x); 

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

        theGameisAfoot = false;
        p1Touched = false;
        p2Touched = false;
        p3Touched = false;
        p4Touched = false;
    

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
    p1Score = 0;
    p2Score = 0;
    p3Score = 0;
    p4Score = 0;

    theGameisAfoot = false;
    p1Touched = false;
    p2Touched = false;
    p3Touched = false;
    p4Touched = false;

    p1Counter.innerHTML = p1Score;
    p2Counter.innerHTML = p2Score;
    p3Counter.innerHTML = p3Score;
    p4Counter.innerHTML = p4Score;

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
