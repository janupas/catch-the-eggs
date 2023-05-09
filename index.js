const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// GAME VARIABLES
const FPS = 60;
const EGGS = [];
const EGG_WIDTH = 100;
const EGG_HEIGHT = 100;
const EGG_IMAGE = "./egg.png";
const MOUSE = { x: 100, y: 100 };
const BASKET_IMAGE = "./basket.png";
const EGG_SPAWN = 3000; // 3 seconds

class Basket {
  constructor(x, y, img) {
    this.x = x;
    this.y = y;
    this.image = new Image();
    this.image.src = img;
  }

  draw() {
    context.drawImage(this.image, this.x, this.y);
  }

  update(x, y) {
    this.x = x;
    this.y = y;
  }
}

class Egg {
  constructor(x, y, img) {
    this.x = x;
    this.y = y;
    this.velocity = 3;
    this.image = new Image();
    this.image.src = img;
  }

  draw() {
    context.drawImage(this.image, this.x, this.y, EGG_WIDTH, EGG_HEIGHT);
  }

  update() {
    this.y += this.velocity;
  }
}

// Mouse position
canvas.addEventListener("mousemove", (e) => {
  MOUSE.x = e.clientX;
  MOUSE.y = e.clientY;
});

const basket = new Basket(MOUSE.x, MOUSE.y, BASKET_IMAGE);

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
};

/**
 * Runs on every frame
 */
const update = () => {
  basket.update(MOUSE.x, MOUSE.y);
  basket.draw();

  for (let i = 0; i < EGGS.length; i++) {
    EGGS[i].update();
    EGGS[i].draw();
  }
};

start();
spawEggs();

setInterval(() => {
  context.clearRect(0, 0, canvas.width, canvas.height);
  update();
}, 1000 / FPS);
