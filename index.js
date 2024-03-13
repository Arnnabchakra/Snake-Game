const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

class snakePart {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

let speed = 7;
let tileCount = 20;
let tileSize = canvas.width / (tileCount * 1.5) - 2;
let headX = 15;
let headY = 15;

const snakeParts = [];
let tailLength = 2;

let appleX = 5;
let appleY = 5;

let xVelocity = 0;
let yVelocity = 0;

let inputXVelocity = 0;
let inputYVelocity = 0;

let score = 0;
const gulpSound = new Audio("gulp.mp3");

let previousXVelocity = 0;
let previousYVelocity = 0;
//game loop
function drawGame() {
  xVelocity = inputXVelocity;
  yVelocity = inputYVelocity;
  // was moving right and try to move left
  if (previousXVelocity === 1 && xVelocity === -1) {
    xVelocity = previousXVelocity;
  }
  // was moving left and try to move right
  if (previousXVelocity === -1 && xVelocity === 1) {
    xVelocity = previousXVelocity;
  }
  // was moving up and try to move down
  if (previousYVelocity === 1 && yVelocity === -1) {
    yVelocity = previousYVelocity;
  }
  // was moving down and try to move up
  if (previousYVelocity === -1 && yVelocity === 1) {
    yVelocity = previousYVelocity;
  }
  previousXVelocity = xVelocity;
  previousYVelocity = yVelocity;
  changeSnakePosition();
  let result = isGameOver();
  if (result) {
    document.removeEventListener("keydown", keydown);
    return;
  }
  clearScreen();
  checkAppleCollision();
  drawApple();
  drawSnake();
  drawScore();
  if (score > 5) {
    speed = 11;
  }
  if (score > 10) {
    speed = 15;
  }
  if (score > 15) {
    speed = 18;
  }
  if (score > 20) {
    speed = 21;
  }
  if (score > 40) {
    speed = 25;
  }
  setTimeout(drawGame, 1000 / speed);
}
function isGameOver() {
  let gameOver = false;
  if (yVelocity === 0 && xVelocity === 0) {
    return false;
  }
  //walls
  if (headX < 0) {
    gameOver = true;
  } else if (headX == tileCount + 10) {
    gameOver = true;
  } else if (headY < 0) {
    gameOver = true;
  } else if (headY == tileCount + 10) {
    gameOver = true;
  }

  for (let i = 0; i < snakeParts.length; i++) {
    let part = snakeParts[i];
    if (part.x === headX && part.y === headY) {
      gameOver = true;
      break;
    }
  }
  if (gameOver) {
    ctx.fillStyle = "white";
    ctx.font = "50px Verdana";
    ctx.fillText("Game Over!", canvas.width / 3.8, canvas.height / 2);
  }
  return gameOver;
}
function drawScore() {
  ctx.fillStyle = "white";
  ctx.font = "14px Verdana";
  ctx.fillText("Score " + score, canvas.width - 65, 16);
}
function clearScreen() {
  ctx.fillStyle = "rgb(16, 0, 7)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}
function drawSnake() {
  ctx.fillStyle = "yellow";
  for (let i = 0; i < snakeParts.length; i++) {
    let part = snakeParts[i];
    ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize);
  }
  snakeParts.push(new snakePart(headX, headY));
  while (snakeParts.length > tailLength) {
    snakeParts.shift();
  }
  ctx.fillStyle = "Green";
  ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize);
}
function changeSnakePosition() {
  headX = headX + xVelocity;
  headY = headY + yVelocity;
}
function drawApple() {
  ctx.fillStyle = "white";
  ctx.fillRect(appleX * tileCount, appleY * tileCount, tileSize, tileSize);
}
function checkAppleCollision() {
  if (appleX === headX && appleY == headY) {
    appleX = Math.floor(Math.random() * tileCount);
    appleY = Math.floor(Math.random() * tileCount);
    tailLength++;
    score++;
    gulpSound.play();
  }
}
document.addEventListener("keydown", keydown);
function keydown(event) {
  // up
  if (event.keyCode == 38 || event.keyCode == 87) {
    inputYVelocity = -1;
    inputXVelocity = 0;
  }
  // down
  if (event.keyCode == 40 || event.keyCode == 83) {
    inputYVelocity = 1;
    inputXVelocity = 0;
  }
  // left
  if (event.keyCode == 37 || event.keyCode == 65) {
    inputYVelocity = 0;
    inputXVelocity = -1;
  }
  // right
  if (event.keyCode == 39 || event.keyCode == 68) {
    inputYVelocity = 0;
    inputXVelocity = 1;
  }
}

drawGame();
