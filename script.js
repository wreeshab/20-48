var board;
var score;
var rows = 4;
var columns = 4;
var t;

window.onload = function () {
  setGame();

  setTwo();
  setTwo();
};

function setGame() {
  score = 0; // Reset score
  document.querySelector("span").innerText = score;
  board = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];

  // board = [
  //     [2, 2, 2, 2],
  //     [2, 2, 2, 2],
  //     [4, 4, 8, 8],
  //     [4, 4, 8, 8],
  // ];
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      let tile = document.createElement("div");
      tile.id = i.toString() + "-" + j.toString();
      let num = board[i][j];

      updateTile(tile, num);

      document.getElementById("game-board").append(tile);
    }
  }
}

function empFound() {
  for (i = 0; i < 4; i++) {
    for (j = 0; j < 4; j++)
      if (board[i][j] == 0) {
        return true;
      }
  }
  return false;
}

function setTwo() {
  if (!empFound()) {
    return;
  }

  let found = false;
  while (!found) {
    let i = Math.floor(Math.random() * rows);
    let j = Math.floor(Math.random() * columns);

    if (board[i][j] == 0) {
      board[i][j] = 2;
      let tile = document.getElementById(i.toString() + "-" + j.toString());
      tile.innerText = "2";
      tile.classList.add("x2");
      found = true;
    }
  }
}

function updateTile(tile, num) {
  tile.innerText = "";
  tile.classList.value = "";
  tile.classList.add("tile");
  if (num > 0) {
    tile.innerText = num;
    if (num <= 4096) {
      tile.classList.add("x" + num.toString());
    } else {
      tile.classList.add("x8192");
    }
  }
}

document.addEventListener("keyup", (e) => {
  if (e.code == "ArrowLeft") {
    slideLeft();
    setTwo();
  } else if (e.code == "ArrowRight") {
    slideRight();
    setTwo();
  } else if (e.code == "ArrowUp") {
    console.log("hello");
    slideUp();
    setTwo();
  } else if (e.code == "ArrowDown") {
    console.log("hello");
    slideDown();
    setTwo();
  }
});

function filterZeros(row) {
  return row.filter((num) => num != 0);
}

function slide(row) {
  row = filterZeros(row);

  for (let i = 0; i < row.length - 1; i++) {
    if (row[i] == row[i + 1]) {
      row[i] = row[i] * 2;
      row[i + 1] = 0;
      score += row[i];
      document.querySelector("span").innerText = Number(score);
    }
  }
  row = filterZeros(row);

  while (row.length < columns) {
    row.push(0);
  }
  return row;
}

function slideRight() {
  for (let i = 0; i < rows; i++) {
    let row = board[i];
    row = row.reverse();
    row = slide(row);
    row = row.reverse();
    board[i] = row;

    for (let j = 0; j < columns; j++) {
      let tile = document.getElementById(i.toString() + "-" + j.toString());
      let num = board[i][j];
      updateTile(tile, num);
    }
  }
}

function slideLeft() {
  for (let i = 0; i < rows; i++) {
    let row = board[i];
    row = slide(row);
    board[i] = row;

    for (let j = 0; j < columns; j++) {
      let tile = document.getElementById(i.toString() + "-" + j.toString());
      let num = board[i][j];
      updateTile(tile, num);
    }
  }
}
function transpose(board) {
  const transposedBoard = [];
  for (let i = 0; i < board.length; i++) {
    transposedBoard[i] = [];
    for (let j = 0; j < board[i].length; j++) {
      transposedBoard[i][j] = board[j][i];
    }
  }
  return transposedBoard;
}

function slideUp() {
  board = transpose(board);
  slideLeft();
  board = transpose(board);

  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      let tile = document.getElementById(i.toString() + "-" + j.toString());
      let num = board[i][j];
      updateTile(tile, num);
    }
  }
}

function slideDown() {
  board = transpose(board);
  slideRight();
  board = transpose(board);

  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      let tile = document.getElementById(i.toString() + "-" + j.toString());
      let num = board[i][j];
      updateTile(tile, num);
    }
  }
}

// function slideUp(){
//     for(let j=0;j<columns;j++){
//         let row = [board[0][j],board[1][j],board[2][j],board[3][j]];
//         row = slide(row);
//         console.log(row);
//         board[0][j]=row[0];
//         board[1][j]=row[1];
//         board[2][j]=row[2];
//         board[3][j]=row[3];

//         for (let i = 0; i < rows; i++) {
//             let tile = document.getElementById(i.toString() + "-" + j.toString())
//             let num = board[i][j];
//             updateTile(tile, num);
//         }

//     }

// }
