var canvas, canvasContext;

var blueCar = new carClass();
var greenCar = new carClass();


window.onload = function() {
    canvas = document.getElementById("gameCanvas");
    canvasContext = canvas.getContext("2d");

    // Welcome screen
    colorRect(0,0,canvas.width,canvas.height, "black");
    colorText("PRESS ANY KEY TO GOOOOOO", (canvas.width/2) - 70, (canvas.height/2) - 5, "white");
    colorText("Directional arrows control blue car aka Blue Storm, and W, A, S, and D keys control green car aka Green Machine.", 140, 550, "white");
    document.addEventListener("keydown", startGameOnKeyPress);
}

function imageLoadingDoneSoStartGame() {
    var framesPerSecond = 30;
    setInterval(updateAll, 1000/framesPerSecond);

    setupInput();

    loadLevel(levelOne);
}

function loadLevel(whichLevel) {
    trackGrid = whichLevel.slice();
    greenCar.reset(otherCarPic, "Green Machine");
    blueCar.reset(carPic, "Blue Storm");
}

function updateAll() {
    moveAll();
    drawAll();
}

function moveAll() {
    blueCar.move();
    greenCar.move();
}

function drawAll() {
    drawTracks();
    blueCar.draw();
    greenCar.draw();
}