/**
 * Classes
 */

class Sprite {
  constructor({ image, position, velocity, frames = { max: 1 } }) {
    this.image = image;
    this.position = position;
    this.velocity = velocity;
    this.frames = frames;

    this.image.onload = () => {
      this.width = this.image.width / this.frames.max;
      this.height = image.height;
    };
  }

  /**
   * 2nd to 5th arguments: cropping image
   * 6th-7th arguments: x & y position
   * 8th-9th arguments: size of the image
   */
  draw() {
    context.drawImage(
      this.image,
      0,
      0,
      this.width,
      this.height,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
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

const playerImage = new Image();
playerImage.src = './img/playerDown.png';
const playerImageWidth = 192;
const playerImageHeight = 68;

const player = new Sprite({
  image: playerImage,
  frames: {
    max: 4,
  },
  position: {
    x: canvas.width / 2 - playerImageWidth / 4 / 2,
    y: canvas.height / 2 - playerImageHeight / 2,
  },
});

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

const testBoundary = new Boundary({
  position: {
    x: 400,
    y: 400,
  },
});

const keys = {
  ArrowUp: { isPressed: false },
  ArrowDown: { isPressed: false },
  ArrowLeft: { isPressed: false },
  ArrowRight: { isPressed: false },
};

let lastKeyPressed = '';

const detectRectangularCollision = ({ rectangle1, rectangle2 }) => {
  return (
    rectangle1.position.x + rectangle1.width >= rectangle2.position.x &&
    rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
    rectangle1.position.y + rectangle1.height >= rectangle2.position.y &&
    rectangle1.position.y <= rectangle2.position.y + rectangle2.height
  );
};

const movables = [background, testBoundary];

const move = (movable, axis, value) => {
  movable.position[axis] = movable.position[axis] + value;
};

const animate = () => {
  window.requestAnimationFrame(animate); // repaints the screen each frame rate (60fps by default?) with the animate function
  background.draw();
  // boundaries.forEach((boundary) => boundary.draw());
  testBoundary.draw();
  player.draw();

  if (detectRectangularCollision({ rectangle1: player, rectangle2: testBoundary })) {
    console.log('colliding');
  }

  if (keys.ArrowUp.isPressed && lastKeyPressed == 'ArrowUp')
    movables.forEach((movable) => move(movable, 'y', 2));
  if (keys.ArrowDown.isPressed && lastKeyPressed == 'ArrowDown')
    movables.forEach((movable) => move(movable, 'y', -2));
  if (keys.ArrowLeft.isPressed && lastKeyPressed == 'ArrowLeft')
    movables.forEach((movable) => move(movable, 'x', 2));
  if (keys.ArrowRight.isPressed && lastKeyPressed == 'ArrowRight')
    movables.forEach((movable) => move(movable, 'x', -2));
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
