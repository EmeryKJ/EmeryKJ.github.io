// This is a small program. There are only two sections. This first section is what runs
// as soon as the page loads and is where you should call your functions.
$(document).ready(function(){
    const $display = $('#display');

    // TODO: Call your apply function(s) here
    applyFilter ()




    render($display, image);
});

/////////////////////////////////////////////////////////
// "apply" and "filter" functions should go below here //
/////////////////////////////////////////////////////////

// TODO 1 & 3: Create the applyFilter function here
function applyFilter ()
{
    
}
// TODO 5: Create the applyFilterNoBackground function


// TODO 2 & 4: Create filter functions
for (var x = 1; x <= 14; x++)
{
    var row = image[x];
    for (var y = 1; y <= 17; y++)
    {
        var value = image[x][y];
        var rgbString = image[1][2];
        var rgbNumbers = rgbStringToArray(rgbString);
        rgbNumbers[RED] = 255;
        rgbString = rgbArrayToString(rgbNumbers);
        image[1][2] = rgbString;
    }
}

// CHALLENGE code goes below here
