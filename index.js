const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// GAME VARIABLES
let SCORE = 0;
const FPS = 60;
const EGGS = [];
const EGG_WIDTH = 100;
const EGG_HEIGHT = 100;
const SCORE_WIDTH = 400;
const SCORE_HEIGHT = 200;
const EGG_IMAGE = "./egg.png";
const MOUSE = { x: 100, y: 100 };
const BASKET_IMAGE = "./basket.png";
const SCORE_IMAGE = "./score.png";
const EGG_SPAWN = 3000; // 3 seconds

// Mouse position
canvas.addEventListener("mousemove", (e) => {
  MOUSE.x = e.clientX;
});

class Score {
  constructor(x, y, img) {
    this.x = x;
    this.y = y;
    this.image = new Image();
    this.image.src = img;
  }

  draw() {
    context.drawImage(this.image, this.x, this.y, SCORE_WIDTH, SCORE_HEIGHT);

    context.font = "50px Pixel";
    context.fillStyle = "blue";
    context.fillText(SCORE, canvas.width / 2 + 250, 0 + SCORE_HEIGHT / 2 + 30);
  }
}

class Basket {
  constructor(x, y, img) {
    this.x = x;
    this.y = y;
    this.width = 500;
    this.height = 250;
    this.image = new Image();
    this.image.src = img;
  }

  draw() {
    context.drawImage(this.image, this.x, this.y, this.width, this.height);
  }

  update(x) {
    if (MOUSE.x > 0 && MOUSE.x + this.width < canvas.width) {
      this.x = x;
    }
  }
}

class Egg {
  constructor(x, y, img) {
    this.x = x;
    this.y = y;
    this.velocity = 3;
    this.image = new Image();
    this.image.src = img;
    this.width = EGG_WIDTH;
    this.height = EGG_HEIGHT;
  }

  draw() {
    context.drawImage(this.image, this.x, this.y, this.width, this.height);
  }

  update() {
    this.y += this.velocity;
  }
}

const basket = new Basket(MOUSE.x, canvas.height - 220, BASKET_IMAGE);
const scoreBoard = new Score((canvas.width - SCORE_WIDTH) / 2, 20, SCORE_IMAGE);

// Spawn eggs
const spawEggs = () => {
  setInterval(() => {
    const coordinate = {
      xAxis: Math.random() * canvas.width,
      yAxis: 0,
    };

    const egg = new Egg(coordinate.xAxis, coordinate.yAxis, EGG_IMAGE);
    EGGS.push(egg);

    egg.image.onload = () => {
      egg.draw();
    };
  }, EGG_SPAWN);
};

/**
 * Runs only once
 */
const start = () => {
  basket.image.onload = () => {
    basket.draw();
  };

  scoreBoard.image.onload = () => {
    scoreBoard.draw();
  };
};

/**
 * Runs on every frame
 */
const update = () => {
  basket.update(MOUSE.x);
  basket.draw();

  scoreBoard.draw();

  for (let i = 0; i < EGGS.length; i++) {
    EGGS[i].update();
    EGGS[i].draw();

    if (
      EGGS[i].x < basket.x + basket.width &&
      EGGS[i].x + EGGS[i].width > basket.x &&
      EGGS[i].y < basket.y + basket.height &&
      EGGS[i].y + EGGS[i].height > basket.y
    ) {
      EGGS.splice(i, 1);
      SCORE++;
    }

    /**
     * Remove eggs from the array if it goes out of bound
     */
    if (EGGS[i].y > window.innerHeight) {
      EGGS.splice(i, 1);
    }
  }
};

start();
spawEggs();

setInterval(() => {
  context.clearRect(0, 0, canvas.width, canvas.height);
  update();
}, 1000 / FPS);
