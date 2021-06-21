// This is a small program. There are only two sections. This first section is what runs
// as soon as the page loads and is where you should call your functions.
$(document).ready(function(){
    const $display = $('#display');

    // TODO: Call your apply function(s) here
    // applyFilter(increaseGreenByBlue);
    applyFilterNoBackground(reddify);
    // applyFilterNoBackground(decreaseBlue);

    render($display, image);
});

/////////////////////////////////////////////////////////
// "apply" and "filter" functions should go below here //
/////////////////////////////////////////////////////////

// TODO 1 & 3: Create the applyFilter function here
function applyFilter(filterFunction)
{
    for (var x = 0; x < image.length; x++)
    {
        var row = image[x];
        for (var y = 0; y < row.length; y++)
        {
            var rgbString = image[x][y];
            var rgbNumbers = rgbStringToArray(rgbString);
            filterFunction(rgbNumbers);
            rgbString = rgbArrayToString(rgbNumbers);
            image[x][y] = rgbString;
        }
    }
}


// TODO 6: Create the applyFilterNoBackground function
function applyFilterNoBackground(filterFunction)
{
    var backgroundColor = image[0][0];
    for (var x = 0; x < image.length; x++)
    {
        var row = image[x];

        for (var y = 0; y < row.length; y++)
        {
            if (image[y] != backgroundColor && image[x] != backgroundColor)
            {
                var value = image[x][y];
                var rgbString = image[x][y];
                var rgbNumbers = rgbStringToArray(rgbString);
                filterFunction(rgbNumbers);
                rgbString = rgbArrayToString(rgbNumbers);
                image[x][y] = rgbString
            }
        }
    }
}

// TODO 2 & 5: Create filter functions

function reddify(array)       //increases rgb red value to maximmum
{
    array[RED] = 255;
}

function decreaseBlue(array)      // decreases the rgb blue value by a number between 30 and 255
{
    array[BLUE] -= 50
}

function increaseGreenByBlue(array)     //increase the rgb green value by blue's valuu
{                                       //looks awful, mission accomplished
    array[GREEN] += array[BLUE];
    array[GREEN] = Math.min(255);
}

// CHALLENGE code goes below here
