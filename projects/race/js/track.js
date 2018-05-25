const TRACK_WIDTH = 40;
const TRACK_HEIGHT = 40; 
const TRACK_GAP = 2;
const TRACK_COLS = 20;
const TRACK_ROWS = 15; 
var levelOne = [4, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4,
                4, 4, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
                4, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
                1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1,
                1, 0, 0, 0, 1, 1, 1, 4, 4, 4, 4, 4, 1, 1, 1, 1, 1, 0, 0, 1,
                1, 0, 0, 1, 1, 0, 0, 1, 4, 4, 4, 1, 0, 0, 0, 0, 1, 0, 0, 1,
                1, 0, 0, 1, 0, 0, 0, 0, 1, 4, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1,
                1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 5, 0, 0, 1, 0, 0, 1,
                1, 0, 0, 1, 0, 0, 5, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1,
                1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 5, 0, 0, 1, 0, 0, 1, 0, 0, 1,
                1, 2, 2, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 5, 0, 0, 1,
                1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1,
                0, 3, 0, 0, 0, 0, 1, 4, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1,
                0, 3, 0, 0, 0, 0, 1, 4, 4, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1,
                1, 1, 1, 1, 1, 1, 1, 4, 4, 4, 4, 4, 4, 1, 1, 1, 1, 1, 1, 4,];

var trackGrid = [];
const TRACK_ROAD = 0;
const TRACK_WALL = 1;
const TRACK_PLAYERSTART = 2;
const TRACK_GOAL = 3;
const TRACK_TREE = 4;
const TRACK_FLAG = 5;


function drawTracks() {

    var arrayIndex = 0;
    var drawTileX = 0;
    var drawTileY = 0;
    for (var eachRow=0;eachRow<TRACK_ROWS;eachRow++) {
        for (var eachCol=0;eachCol<TRACK_COLS;eachCol++) {
            var tileKindHere = trackGrid[arrayIndex];
            var useImg = trackPics[tileKindHere];
            canvasContext.drawImage(useImg, drawTileX, drawTileY);
            drawTileX += TRACK_WIDTH;
            arrayIndex++;
        } // end of for each col
        drawTileX = 0;
        drawTileY += TRACK_HEIGHT;
    } // end of for each row
} // end of drawTracks func

function carTrackHandling(whichCar) {
    var carTrackCol = Math.floor(whichCar.x / TRACK_WIDTH);
    var carTrackRow = Math.floor(whichCar.y / TRACK_HEIGHT);
    var trackIndexUnderCar = rowColToArrayIndex(carTrackCol,carTrackRow)
    
    // test its a legal track tile
    if (carTrackCol >= 0 &&
        carTrackCol < TRACK_COLS &&
        carTrackRow >= 0 &&
        carTrackRow < TRACK_ROWS) {
        
        var tileHere = returnTileTypeAtColRow(carTrackCol, carTrackRow);
       

        if (tileHere == TRACK_GOAL) { // test if finish line hit
            console.log(whichCar.name + " WINS");
            loadLevel(levelOne);
        }

        else if (tileHere != TRACK_ROAD) {  // test collision with anything non-road
            // Undoes car movement that gets it stuck inside wall
            whichCar.x -= Math.cos(whichCar.ang) * whichCar.speed;
            whichCar.y -= Math.sin(whichCar.ang) * whichCar.speed;
            
            whichCar.speed *= -0.5;

        } // of collision with non-road found
    } // end of valid col and row
} // end of carTrackHandling func

function returnTileTypeAtColRow (col, row) {
    // test its a legal track
    if (col >= 0 &&
        col < TRACK_COLS &&
        row >= 0 &&
        row < TRACK_ROWS) {

        var trackIndexUnderCoord = rowColToArrayIndex(col,row)
        return trackGrid[trackIndexUnderCoord];
    } else {
        return TRACK_WALL;
    }
}

function rowColToArrayIndex(col, row) {
    return col + (TRACK_COLS * row);
}