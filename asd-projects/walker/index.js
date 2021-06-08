/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var FRAME_RATE = 60;
  var FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  var KEY =
  {
      "LEFT": 37,
      "RIGHT": 39,
      "UP": 38,  
      "DOWN": 40,
      "LEFTA": 65,
      "RIGHTD": 68,
      "UPW": 87,   
      "DOWNS": 83
  };

var boardWidth = $("#board").width();
var boardHeight =$("#board").height();


  // Game Item Objects
      var positionX = 0; // the x-coordinate location for the gameitem
      var positionY = 0; //the y-coordinate location for the gameitem

      var speedX = 0; // the speed for the box along the x-axis
      var speedY = 0; //  the speed for the box along the y-axis

      

  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyDown);                           // change 'eventType' to the type of event you want to handle
  $(document).on('keyup', handleKeyUp); 
  

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
    boardBounds();

  }
  

  /* 
  Called in response to events.
  */
  function handleKeyDown(event) 
    {
        if (event.which === KEY.LEFT) 
        {
            speedX = -5;
        }
        if (event.which === KEY.LEFTA) 
        {
            speedX = -5;
        }

        if (event.which === KEY.RIGHT) 
        {
            speedX = 5;
        }       
        if (event.which === KEY.RIGHTD) 
        {
            speedX = 5;
        }

        if (event.which === KEY.UP)      //These pairs of conditionals change x & y speed according  
        {                                //to arrow keys/ WASD presses.
            speedY = -5;                              
        }
        if (event.which === KEY.UPW) 
        {
            speedY = -5;
        }

        if (event.which === KEY.DOWN) 
        {
            speedY = 5;
        }
        if (event.which === KEY.DOWNS) 
        {
            speedY = 5;
        }
    }

  function handleKeyUp(event)
    {
          if (event.which === KEY.LEFT || KEY.LEFTA) 
        {
            speedX = 0;
        }        

        if (event.which === KEY.RIGHT || KEY.RIGHTD ) 
        {
            speedX = 0;
        }

        if (event.which === KEY.UP || KEY.UPW ) 
        {
            speedY = 0;
        }
        if (event.which === KEY.DOWN || KEY.DOWNS ) 
        {
            speedY = 0;
        }
    }
  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

    function repositionGameItem()
    {
        positionX += speedX; // update the position of the gameitem along the x-axis
        positionY += speedY; // update the position of the gameitem along the y-axis
    }

    function redrawGameItem()
    {
        $("#gameItem").css("left", positionX);    // draw the gameitem in the new location, positionX pixels away from the "left"
        $("#gameItem").css("top", positionY);    // draw the gameitem in the new location, positionY pixels away from the "top"
    }

    function boardBounds()
    {
        if (positionX >= boardWidth -40)
        {
           positionX = boardWidth -50;
        }

        if ( positionX < 0)
        {
           positionX = 0;
        }

           if (positionY >= boardHeight -40)
        {
           positionY = boardHeight -50;
        }

        if (positionY < 0)
        {
            positionY = 0;
        }
    }

  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  
}
