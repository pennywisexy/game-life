const CANVAS = document.querySelector('.canvas');
const START = document.querySelector('.start-btn');
const CLEAR = document.querySelector('.clear-btn');
const CTX = CANVAS.getContext('2d');
const GRID = [];
let arrField = [];
let arrFieldAfterStep = [];
let interval;

CANVAS.addEventListener('click', (event) => {
  let x = event.offsetX;
  let y = event.offsetY;

  x = Math.floor(x / 10);
  y = Math.floor(y / 10);

  arrField[y][x] = 1;

  drawSqr(arrField);
});

START.addEventListener('click', () => {
  interval = setInterval(() => lifeCycle(), 100)
});

CLEAR.addEventListener('click', () => {
  gameField();
  CTX.clearRect(0, 0, 300, 300);
});

const gameField = () => {
  clearInterval(interval);
  const iLength = 30, jLength = 30;

  arrField = [];
  arrFieldAfterStep = [];

  for (let i = 0; i < iLength; i++) {
    arrField[i] = [];
    arrFieldAfterStep[i] = [];
    GRID[i] = [];

    for (let j = 0; j < jLength; j++) {
      arrField[i][j] = 0;
      arrFieldAfterStep[i][j] = 0;
      GRID[i][j] = 0;
    }
  }
}
gameField();

function drawSqr(arr) {
  CTX.clearRect(0, 0, 300, 300);

  arr.forEach((iArr, iIndex) => {
    iArr.forEach((elem, jIndex) => {
      if (elem) {
        CTX.fillRect(jIndex * 10, iIndex * 5, 10, 5);
      }
    })
  })
}

function lifeCycle() {
  arrField.forEach((iArr, iIndex) => {
    iArr.forEach((_, jIndex) => {
      isNeighbour(iIndex, jIndex);
      drawSqr(arrFieldAfterStep);
    });
  });
  arrField = JSON.parse(JSON.stringify(arrFieldAfterStep));
  arrFieldAfterStep = JSON.parse(JSON.stringify(GRID));
}

function isNeighbour(iIndex, jIndex) {
  let neighbourCount = 0;
  let neighbour = 0;

  const MIN_X = 0, MIN_Y = 0, MAX_X = 29, MAX_Y = 29;
  let posX = iIndex, posY = jIndex;

  let startPosX = (posX - 1 < MIN_X) ? posX : posX - 1;
  let startPosY = (posY - 1 < MIN_Y) ? posY : posY - 1;
  let endPosX = (posX + 1 > MAX_X) ? posX : posX + 1;
  let endPosY = (posY + 1 > MAX_Y) ? posY : posY + 1;

  for (let rowNum = startPosX; rowNum <= endPosX; rowNum++) {
      for (let colNum = startPosY; colNum <= endPosY; colNum++) {
        arrField[rowNum][colNum] === 1 ? neighbourCount++ : neighbourCount;
      }
  }
  neighbour = neighbourCount === 0 
    ? neighbourCount 
    : neighbourCount - 1;

  if (neighbour === 2 || neighbour === 3) {
    arrFieldAfterStep[iIndex][jIndex] = 1;
    if (!arrField[iIndex][jIndex]) {
      neighbour === 3 
        ? arrFieldAfterStep[iIndex][jIndex] = 0 
        : arrFieldAfterStep[iIndex][jIndex] = 1;
    }
  } 
}





