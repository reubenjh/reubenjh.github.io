const KEY_LEFT_ARROW = 37;
const KEY_UP_ARROW = 38;
const KEY_RIGHT_ARROW = 39;
const KEY_DOWN_ARROW = 40;

const KEY_A = 65;
const KEY_W = 87;
const KEY_D = 68;
const KEY_S = 83;

var mouseX = 0;
var mouseY = 0;


function startGameOnKeyPress(evt) {
    evt.preventDefault();
    loadImages(); // starts game once image loading complete
    document.removeEventListener("keydown", startGameOnKeyPress);
}

function setupInput() {
    canvas.addEventListener("mousemove", updateMousePos);

    document.addEventListener("keydown", keyPressed);
    document.addEventListener("keyup", keyReleased);

    greenCar.inputSetup(KEY_W, KEY_D, KEY_S, KEY_A);
    blueCar.inputSetup(KEY_UP_ARROW, KEY_RIGHT_ARROW, KEY_DOWN_ARROW, KEY_LEFT_ARROW);
}

function updateMousePos(evt) {
    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement;

    mouseX = evt.clientX - rect.left
    mouseY = evt.clientY - rect.top

    /*// cheat to test car in any position
    carX = mouseX;
    carY = mouseY;
    carSpeedX = 3;
    carSpeedY = -4;
    */
}

function keySet(keyEvent, whichCar, setTo) {
    if (keyEvent.keyCode == whichCar.controlKeyLeft) {
        whichCar.keyHeldTurnLeft = setTo;
    }
    if (keyEvent.keyCode == whichCar.controlKeyRight) {
        whichCar.keyHeldTurnRight = setTo;
    }
    if (keyEvent.keyCode == whichCar.controlKeyUp) {
        whichCar.keyHeldGas = setTo;
    }
    if (keyEvent.keyCode == whichCar.controlKeyDown) {
        whichCar.keyHeldReverse = setTo;
    }
    keyEvent.preventDefault();
}

function keyPressed(evt) {
    keySet(evt,greenCar, true);
    keySet(evt,blueCar, true);
}

function keyReleased(evt) {
    keySet(evt,greenCar, false);
    keySet(evt,blueCar, false);
}