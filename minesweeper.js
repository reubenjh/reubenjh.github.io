document.addEventListener('DOMContentLoaded', startGame)

// Define your `board` object here!
var board = {};

function startGame () {
  // Don't remove this function call: it makes the game work!
  // calling makeBoard first to generate the contents of the board object.
  makeBoard ()

  for (var i = 0; i < board.cells.length; i++) {
    var surroundingMines = countSurroundingMines(board.cells[i]);
    board.cells[i].surroundingMines = surroundingMines;
  }

  document.addEventListener('click', checkForWin);
  document.addEventListener('contextmenu', checkForWin);

  lib.initBoard()
}

// Define this function to look for a win condition:
//
// 1. Are all of the cells that are NOT mines visible?
// 2. Are all of the mines marked?
function checkForWin () {
  for (i = 0; i < board.cells.length; i++) {
    if (board.cells[i].isMine == false && board.cells[i].hidden == true) {
      return;
    }

    if (board.cells[i].isMine == true && board.cells[i].isMarked == false) {
      return;
    }
  }
  
  // You can use this function call to declare a winner (once you've
  // detected that they've won, that is!)
  lib.displayMessage('You win!')
  removeListeners()
  
  // Giving reset options on game win
  // First, write 'play again?' section below board.
  document.getElementById('play-again').innerHTML = '<p class="title">PLAY AGAIN?</p><button id="same">SAME SIZE</button><button id="bigger">BIGGER</button><button id="smaller">SMALLER</button><p class="context">Min 2x2, max 8x8 board size</p>'
  
  // Then give the buttons the hover class on mouseenter, 
  // and take it off on mouseout, for cool looking buttons
  let buttons = document.getElementsByTagName('button')
  for (count = 0; count < buttons.length; count++) {
    buttons[count].addEventListener('mouseenter', function(evt) {
      evt.target.classList.add('hover');
      }
    )
    buttons[count].addEventListener('mouseout', function(evt) {
      evt.target.classList.remove('hover');
      }
    )
  }
  
  // Give buttons their click functions
  document.getElementById('same').addEventListener('click', makeSameBoard)
  document.getElementById('bigger').addEventListener('click', makeBiggerBoard)
  document.getElementById('smaller').addEventListener('click', makeSmallerBoard)
}


// Defining makeBoard
function makeBoard () {
  // Reinitializing board to be empty
  board = {};

  // Setting board size
  board.width = 5;
  board.height = 5;
  board.area = board.width * board.height;
  
  // Setting board cells
  board.cells = [];
  for (cell = 0; cell < board.area; cell++) {
    board.cells.push({});
  }

  // Initializing row and col variables
  let myRow = 0;
  let myCol = 0;

  // Looping through cell objects and assigning row and col properties.
  // Only works up to width * 6 since game can only cope with 36 cells
  for (cell = 0; cell < board.cells.length; cell++) {
    if (cell == board.width || cell == (board.width * 2) || cell == (board.width * 3) || cell == (board.width * 4) || cell == (board.width * 5) || cell == (board.width * 6)) {
      myRow++;
      myCol = myCol - board.width;
    }

    board.cells[cell].row = myRow;
    board.cells[cell].col = myCol;
    myCol++;
  }

  // Looping through cell objects and assigning hidden and isMarked
  // properties.
  for (cell = 0; cell < board.cells.length; cell++) {
    board.cells[cell].hidden = true;
    board.cells[cell].isMarked = false;

  // Assigning isMine = true to 30% of cells.
    let mineChance = Math.floor(Math.random() * 100)
    if (mineChance >= 70) {
      board.cells[cell].isMine = true;
    } else {
      board.cells[cell].isMine = false;
    }
  }
}


// Defining makeSameBoard function
function makeSameBoard () {
  // Delete the contents of old board
  document.getElementById('message').innerHTML = "";
  document.getElementById('message').classList = "";
  document.getElementById('notes').innerHTML = "";
  document.getElementById('notes').classList = "";
  document.getElementsByClassName('board')[0].innerHTML = "";
  document.getElementsByClassName('board')[0].classList = "board";
  document.getElementById('play-again').innerHTML = "";
  

  // Setting board size as the same
  let newBoardWidth = board.width;
  let newBoardHeight = board.height;
  board = {};
  board.width = newBoardWidth;
  board.height = newBoardHeight;
  board.area = board.width * board.height;
  
  // Setting board cells
  board.cells = [];
  for (cell = 0; cell < board.area; cell++) {
    board.cells.push({});
  }

  // Initializing row and col variables
  let myRow = 0;
  let myCol = 0;

  // Looping through cell objects and assigning row and col properties.
  // Only works up to width * 6 since game can only cope with 36 cells
  for (cell = 0; cell < board.cells.length; cell++) {
    if (cell == board.width || cell == (board.width * 2) || cell == (board.width * 3) || cell == (board.width * 4) || cell == (board.width * 5) || cell == (board.width * 6)) {
      myRow++;
      myCol = myCol - board.width;
    }
    board.cells[cell].row = myRow;
    board.cells[cell].col = myCol;
    myCol++;
  }

  // Looping through cell objects and assigning hidden and isMarked
  // properties.
  for (cell = 0; cell < board.cells.length; cell++) {
    board.cells[cell].hidden = true;
    board.cells[cell].isMarked = false;

  // Assigning isMine = true to 30% of cells.
    let mineChance = Math.floor(Math.random() * 100)
    if (mineChance >= 70) {
      board.cells[cell].isMine = true;
    } else {
      board.cells[cell].isMine = false;
    }
  }

  for (var i = 0; i < board.cells.length; i++) {
    var surroundingMines = countSurroundingMines(board.cells[i]);
    board.cells[i].surroundingMines = surroundingMines;
  }

  document.addEventListener('click', checkForWin);
  document.addEventListener('contextmenu', checkForWin);

  lib.initBoard()
}


// Defining makeBiggerBoard function
function makeBiggerBoard () {
  // First check we're not making a board bigger than max 36 cells
  let newBoardWidth = board.width + 1;
  let newBoardHeight = board.height + 1;
  if (newBoardWidth > 6 || newBoardHeight > 6) {
    alert('Go home, you\'re drunk')
    return;
  }

  // Delete the contents of old board
  document.getElementById('message').innerHTML = "";
  document.getElementById('message').classList = "";
  document.getElementById('notes').innerHTML = "";
  document.getElementById('notes').classList = "";
  document.getElementsByClassName('board')[0].innerHTML = "";
  document.getElementsByClassName('board')[0].classList = "board";
  document.getElementById('play-again').innerHTML = "";

  // Rebuilding board object and properties
  board = {};
  board.width = newBoardWidth;
  board.height = newBoardHeight;
  board.area = board.width * board.height;
  board.cells = [];

  // Creating cell objects
  for (cell = 0; cell < board.area; cell++) {
    board.cells.push({});
  }

  // Initializing row and col variables
  let myRow = 0;
  let myCol = 0;

  // Looping through cell objects and assigning row and col properties.
  // Only works up to width * 8 since I don't want the board to go any bigger
  for (cell = 0; cell < board.cells.length; cell++) {
    if (cell == board.width || cell == (board.width * 2) || cell == (board.width * 3) || cell == (board.width * 4) || cell == (board.width * 5) || cell == (board.width * 6) || cell == (board.width * 7) || cell == (board.width * 8)) {
      myRow++;
      myCol = myCol - board.width;
    }
    board.cells[cell].row = myRow;
    board.cells[cell].col = myCol;
    myCol++;
  }

  // Looping through cell objects and assigning hidden and isMarked
  // properties.
  for (cell = 0; cell < board.cells.length; cell++) {
    board.cells[cell].hidden = true;
    board.cells[cell].isMarked = false;

  // Assigning isMine = true to 30% of cells.
    let mineChance = Math.floor(Math.random() * 100)
    if (mineChance >= 70) {
      board.cells[cell].isMine = true;
    } else {
      board.cells[cell].isMine = false;
    }
  }

  for (var i = 0; i < board.cells.length; i++) {
    var surroundingMines = countSurroundingMines(board.cells[i]);
    board.cells[i].surroundingMines = surroundingMines;
  }

  document.addEventListener('click', checkForWin);
  document.addEventListener('contextmenu', checkForWin);

  lib.initBoard()
}



// Defining makeSmallerBoard function
function makeSmallerBoard () {
  // First check we're not making a smaller board than the minimum cells
  let newBoardWidth = board.width - 1;
  let newBoardHeight = board.height - 1;
  if (newBoardWidth < 2 || newBoardHeight < 2) {
    alert('Go home, you\'re drunk')
    return;
  }
  

  // Delete the contents of old board
  document.getElementById('message').innerHTML = "";
  document.getElementById('message').classList = "";
  document.getElementById('notes').innerHTML = "";
  document.getElementById('notes').classList = "";
  document.getElementsByClassName('board')[0].innerHTML = "";
  document.getElementsByClassName('board')[0].classList = "board";
  document.getElementById('play-again').innerHTML = "";

  // Rebuilding board object and properties
  board = {};
  board.width = newBoardWidth;
  board.height = newBoardHeight;
  board.area = board.width * board.height;
  board.cells = [];

  // Creating cell objects
  for (cell = 0; cell < board.area; cell++) {
    board.cells.push({});
  }

  // Initializing row and col variables
  let myRow = 0;
  let myCol = 0;

  // Looping through cell objects and assigning row and col properties.
  // Only works up to width * 8 since I don't want the board to go any bigger
  for (cell = 0; cell < board.cells.length; cell++) {
    if (cell == board.width || cell == (board.width * 2) || cell == (board.width * 3) || cell == (board.width * 4) || cell == (board.width * 5) || cell == (board.width * 6) || cell == (board.width * 7) || cell == (board.width * 8)) {
      myRow++;
      myCol = myCol - board.width;
    }
    board.cells[cell].row = myRow;
    board.cells[cell].col = myCol;
    myCol++;
  }

  // Looping through cell objects and assigning hidden and isMarked
  // properties.
  for (cell = 0; cell < board.cells.length; cell++) {
    board.cells[cell].hidden = true;
    board.cells[cell].isMarked = false;

  // Assigning isMine = true to 30% of cells.
    let mineChance = Math.floor(Math.random() * 100)
    if (mineChance >= 70) {
      board.cells[cell].isMine = true;
    } else {
      board.cells[cell].isMine = false;
    }
  }

  for (var i = 0; i < board.cells.length; i++) {
    var surroundingMines = countSurroundingMines(board.cells[i]);
    board.cells[i].surroundingMines = surroundingMines;
  }

  document.addEventListener('click', checkForWin);
  document.addEventListener('contextmenu', checkForWin);

  lib.initBoard()
}





// Define this function to count the number of mines around the cell
// (there could be as many as 8). You don't have to get the surrounding
// cells yourself! Just use `lib.getSurroundingCells`: 
//
//   var surrounding = lib.getSurroundingCells(cell.row, cell.col)
//
// It will return cell objects in an array. You should loop through 
// them, counting the number of times `cell.isMine` is true.
function countSurroundingMines (cell) {
  var surroundingCells = lib.getSurroundingCells(cell.row, cell.col);
  var count = 0;
  for (var i = 0; i < surroundingCells.length; i++) {
    if (surroundingCells[i].isMine == true) {
      count++;
    } else count = count;
  }
  return count;
}

