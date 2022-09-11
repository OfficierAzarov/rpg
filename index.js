/**
 * Classes
 */

class Sprite {
  constructor({ image, position, velocity }) {
    this.image = image;
    this.position = position;
    this.velocity = velocity;
  }

  draw() {
    context.drawImage(this.image, this.position.x, this.position.y);
  }
}

class Boundary {
  static width = 48;
  static height = 48;

  constructor({ position }) {
    this.position = position;
    this.width = 48;
    this.height = 48;
  }

  draw() {
    context.fillStyle = 'red';
    context.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}

const offset = {
  x: -750,
  y: -600,
};

const canvas = document.querySelector('canvas');

canvas.width = 1024;
canvas.height = 576;

const context = canvas.getContext('2d');

const backgroundImage = new Image();
backgroundImage.src = './img/town.png';
const background = new Sprite({ position: { x: offset.x, y: offset.y }, image: backgroundImage });

const collisionsMap = [];

for (let i = 0; i < collisions.length; i += 70) {
  collisionsMap.push(collisions.slice(i, i + 70));
}

const boundaries = [];

collisionsMap.forEach((row, i) => {
  row.forEach((element, j) => {
    if (element != 0) {
      boundaries.push(
        new Boundary({
          position: {
            x: j * Boundary.width + offset.x,
            y: i * Boundary.height + offset.y,
          },
        })
      );
    }
  });
});

console.log(boundaries);

const playerDown = new Image();
playerDown.src = './img/playerDown.png';

const keys = {
  ArrowUp: { isPressed: false },
  ArrowDown: { isPressed: false },
  ArrowLeft: { isPressed: false },
  ArrowRight: { isPressed: false },
};

let lastKeyPressed = '';

const animate = () => {
  window.requestAnimationFrame(animate); // repaints the screen each frame rate (60fps by default?) with the animate function
  background.draw();
  boundaries.forEach((boundary) => boundary.draw());
  context.drawImage(
    playerDown,
    0,
    0,
    playerDown.width / 4,
    playerDown.height,
    canvas.width / 2 - playerDown.width / 4 / 2,
    canvas.height / 2 - playerDown.height / 2,
    playerDown.width / 4,
    playerDown.height
  );

  if (keys.ArrowUp.isPressed && lastKeyPressed == 'ArrowUp') background.position.y += 2;
  if (keys.ArrowDown.isPressed && lastKeyPressed == 'ArrowDown') background.position.y -= 2;
  if (keys.ArrowLeft.isPressed && lastKeyPressed == 'ArrowLeft') background.position.x += 2;
  if (keys.ArrowRight.isPressed && lastKeyPressed == 'ArrowRight') background.position.x -= 2;
};

animate();

window.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'ArrowUp':
      keys.ArrowUp.isPressed = true;
      lastKeyPressed = 'ArrowUp';
      break;
    case 'ArrowDown':
      keys.ArrowDown.isPressed = true;
      lastKeyPressed = 'ArrowDown';
      break;
    case 'ArrowLeft':
      keys.ArrowLeft.isPressed = true;
      lastKeyPressed = 'ArrowLeft';
      break;
    case 'ArrowRight':
      keys.ArrowRight.isPressed = true;
      lastKeyPressed = 'ArrowRight';
      break;
    case 'a':
      console.log(keys);
  }
});

window.addEventListener('keyup', (event) => {
  switch (event.key) {
    case 'ArrowUp':
      keys.ArrowUp.isPressed = false;
      break;
    case 'ArrowDown':
      keys.ArrowDown.isPressed = false;
      break;
    case 'ArrowLeft':
      keys.ArrowLeft.isPressed = false;
      break;
    case 'ArrowRight':
      keys.ArrowRight.isPressed = false;
      break;
  }
});
