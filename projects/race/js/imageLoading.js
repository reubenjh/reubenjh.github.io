var carPic = document.createElement("img");
var otherCarPic = document.createElement("img");
var trackPics = [];

var picsToLoad = 0; // Set automatically based on imageList.length in loadImages

function countLoadedImagesAndLaunchIfReady() {
    picsToLoad--;
    //console.log(picsToLoad);
    if(picsToLoad == 0) {
        imageLoadingDoneSoStartGame();
    }
}

function beginLoadingImages(imgVar, fileName) {
    imgVar.onload = countLoadedImagesAndLaunchIfReady;
    imgVar.src = "images/"+fileName;
}

function loadImageForTrackCode(trackCode, fileName) {
    trackPics[trackCode] = document.createElement("img");
    beginLoadingImages(trackPics[trackCode], fileName);
}

function loadImages() {
    var imageList = [
        {varName: carPic, fileName: "player1car.png"},
        {varName: otherCarPic, fileName: "player2car.png"},
        
        {trackType: TRACK_ROAD, fileName: "track_road.png"},
        {trackType: TRACK_WALL, fileName: "track_wall.png"},
        {trackType: TRACK_GOAL, fileName: "track_goal.png"},
        {trackType: TRACK_TREE, fileName: "track_tree.png"},
        {trackType: TRACK_FLAG, fileName: "track_flag.png"}
    ]

    picsToLoad = imageList.length;

    for (var i=0;i<imageList.length;i++) {
        if (imageList[i].varName != undefined) {
            beginLoadingImages(imageList[i].varName, imageList[i].fileName);
        } else {
            loadImageForTrackCode(imageList[i].trackType, imageList[i].fileName);
        }
    }
}