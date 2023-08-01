let frame, ctx;
const blockSize = 25,
  cols = 15,
  rows = 15,
  snake = { x: 0, y: 0, body: [] },
  food = { x: 0, y: 0 },
  velocity = { x: 0, y: 0 },
  speed = 10;

window.onload = () => {
  frame = document.getElementById("frame");
  ctx = frame.getContext("2d");
  frame.width = cols * blockSize;
  frame.height = rows * blockSize;

  randomPlace(food);
  randomPlace(snake);

  document.addEventListener("keydown", handleKey);
  setInterval(render, 1000 / speed);
};

const render = () => {
  // render background
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, cols * blockSize, rows * blockSize);

  // follow body
  for (let i = snake.body.length - 1; i > 0; i--) {
    snake.body[i] = snake.body[i - 1];
  }

  if (snake.body.length) {
    snake.body[0] = { x: snake.x, y: snake.y };
  }

  if (snake.x === food.x && snake.y === food.y) {
    snake.body.push({ x: snake.x, y: snake.y });
    randomPlace(food);
  }

  // render food
  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, blockSize, blockSize);

  // render snake
  snake.x += velocity.x * blockSize;
  snake.y += velocity.y * blockSize;
  ctx.fillStyle = "lime";
  ctx.fillRect(snake.x, snake.y, blockSize, blockSize);

  // snake body
  ctx.fillStyle = "green";
  for (let i = 0; i < snake.body.length; i++) {
    ctx.fillRect(snake.body[i].x, snake.body[i].y, blockSize, blockSize);
  }

  // rules
  if (
    snake.x < 0 ||
    snake.y < 0 ||
    snake.x >= cols * blockSize ||
    snake.y >= rows * blockSize
  ) {
    gameOver("Head Crash!");
  }

  for (let i = 0; i < snake.body.length; i++) {
    if (snake.body[i].x === snake.x && snake.body[i].y === snake.y) {
      gameOver("Body Crash!");
    }
  }
};

const randomPlace = (obj) => {
  obj.x = Math.floor(Math.random() * cols) * blockSize;
  obj.y = Math.floor(Math.random() * rows) * blockSize;
};

const handleKey = (e) => {
  if (e.code === "ArrowDown") {
    velocity.x = 0;
    velocity.y = 1;
  } else if (e.code === "ArrowUp") {
    velocity.x = 0;
    velocity.y = -1;
  } else if (e.code === "ArrowLeft") {
    velocity.x = -1;
    velocity.y = 0;
  } else if (e.code === "ArrowRight") {
    velocity.x = 1;
    velocity.y = 0;
  }
};

const gameOver = (str) => {
  alert(str);
  location.reload();
  location.reload();
  location.reload();
  location.reload();
};
