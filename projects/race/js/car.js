const GROUNDSPEED_DECAY_MULT = 0.96;
const DRIVE_POWER = 0.5;
const REVERSE_POWER = 0.2;
const TURN_RATE = 0.06;
const MIN_SPEED_TO_TURN = 0.5;

function carClass() {
    this.x = 75;
    this.y = 75;
    this.ang = 0;
    this.speed = 0;
    this.myCarPic; // which picture to use
    this.name = "untitled car";

    this.keyHeldGas = false;
    this.keyHeldReverse = false;
    this.keyHeldTurnLeft = false;
    this.keyHeldTurnRight = false;

    this.controlKeyUp;
    this.controlKeyRight;
    this.controlKeyDown;
    this.controlKeyLeft;

    this.inputSetup = function (upKey, rightKey, downKey, leftKey) {
        this.controlKeyUp = upKey;
        this.controlKeyRight = rightKey;
        this.controlKeyDown = downKey;
        this.controlKeyLeft = leftKey;
    }

    this.reset = function(whichImage, carName) {
        this.name = carName;
        this.myCarPic = whichImage;
        this.speed = 0;
        
        for (var eachRow=0;eachRow<TRACK_ROWS;eachRow++) {
            for (var eachCol=0;eachCol<TRACK_COLS;eachCol++) {
                var arrayIndex = rowColToArrayIndex(eachCol, eachRow);
                if (trackGrid[arrayIndex] == TRACK_PLAYERSTART) {
                    trackGrid[arrayIndex] = TRACK_ROAD;
                    this.ang = -Math.PI/2;
                    this.x = (eachCol * TRACK_WIDTH) +(TRACK_WIDTH/2);
                    this.y = (eachRow * TRACK_HEIGHT) + (TRACK_HEIGHT/2);
                    return;
                }// end of if car found, set it's coordinates and angle
            } // end of search columns
        } // end of search rows
        console.log("NO PLAYER START FOUND");
    } // end of carReset func

    this.move = function () {
        this.speed *= GROUNDSPEED_DECAY_MULT; // Handling natural deceleration

        if (this.keyHeldGas) { // Accelerate
            this.speed += DRIVE_POWER;
        }
        if (this.keyHeldReverse) { // Brake
            this.speed -= REVERSE_POWER;
        }
        if (Math.abs(this.speed) > MIN_SPEED_TO_TURN) { // Stop turning in place
            if (this.keyHeldTurnRight) { // Turn right
                this.ang += TURN_RATE;
            }
            if (this.keyHeldTurnLeft) { // Turn left
                this.ang -= TURN_RATE;
            }
        }
        // Account for angle
        this.x += Math.cos(this.ang) * this.speed;
        this.y += Math.sin(this.ang) * this.speed;

        carTrackHandling(this);
    }

    this.draw = function () {
        drawBitmapCenteredWithRotation(this.myCarPic, this.x, this.y, this.ang);
    }
}