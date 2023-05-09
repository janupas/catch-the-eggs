const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// GAME VARIABLES
const FPS = 60;
const BASKET_IMAGE = "./basket.png";
const MOUSE = { x: 100, y: 100 };

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

// Mouse position
canvas.addEventListener("mousemove", (e) => {
  MOUSE.x = e.clientX;
  MOUSE.y = e.clientY;
});

const basket = new Basket(MOUSE.x, MOUSE.y, BASKET_IMAGE);

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
};

start();

setInterval(() => {
  context.clearRect(0, 0, canvas.width, canvas.height);
  update();
}, 1000 / FPS);
