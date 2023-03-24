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

const foregroundImage = new Image();
foregroundImage.src = './img/foreground.png';
const foreground = new Sprite({
  position: { x: offset.x, y: offset.y },
  image: foregroundImage,
});

const playerImageDown = new Image();
playerImageDown.src = './img/playerDown.png';
const playerImageUp = new Image();
playerImageUp.src = './img/playerUp.png';
const playerImageLeft = new Image();
playerImageLeft.src = './img/playerLeft.png';
const playerImageRight = new Image();
playerImageRight.src = './img/playerRight.png';

const playerImageWidth = 192;
const playerImageHeight = 68;

const player = new Sprite({
  image: playerImageDown,
  frames: {
    max: 4,
  },
  position: {
    x: canvas.width / 2 - playerImageWidth / 4 / 2,
    y: canvas.height / 1.5 - playerImageHeight / 2,
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

const movables = [background, foreground, ...boundaries];

const stepValue = 2;

const move = (movable, axis, value) => {
  movable.position[axis] = movable.position[axis] + value;
};

const animate = () => {
  window.requestAnimationFrame(animate); // repaints the screen each frame rate (60fps by default?) with the animate function
  let canMove = true;
  background.draw();
  boundaries.forEach((boundary) => {
    boundary.draw();
  });
  player.draw();
  foreground.draw();

  if (keys.ArrowUp.isPressed && lastKeyPressed == 'ArrowUp') {
    canMove = canGoThroughBoundaries(boundaries, 'y', stepValue);
    if (canMove) {
      movables.forEach((movable) => move(movable, 'y', stepValue));
      player.image = playerImageUp;
    }
  }
  if (keys.ArrowDown.isPressed && lastKeyPressed == 'ArrowDown') {
    canMove = canGoThroughBoundaries(boundaries, 'y', -stepValue);
    if (canMove) {
      movables.forEach((movable) => move(movable, 'y', -stepValue));
      player.image = playerImageDown;
    }
  }
  if (keys.ArrowLeft.isPressed && lastKeyPressed == 'ArrowLeft') {
    canMove = canGoThroughBoundaries(boundaries, 'x', stepValue);
    if (canMove) {
      movables.forEach((movable) => move(movable, 'x', stepValue));
      player.image = playerImageLeft;
    }
  }
  if (keys.ArrowRight.isPressed && lastKeyPressed == 'ArrowRight') {
    canMove = canGoThroughBoundaries(boundaries, 'x', -stepValue);
    if (canMove) {
      movables.forEach((movable) => move(movable, 'x', -stepValue));
      player.image = playerImageRight;
    }
  }
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

function canGoThroughBoundaries(boundaries, axis, stepValue) {
  try {
    if (axis == 'x' || axis == 'y') {
      for (let i = 0; i < boundaries.length; i++) {
        const boundary = boundaries[i];
        if (
          detectRectangularCollision({
            rectangle1: player,
            rectangle2: {
              ...boundary,
              position: {
                ...boundary.position,
                [axis]: boundary.position[axis] + stepValue,
              },
            },
          })
        ) {
          return false;
        }
      }
      return true;
    } else {
      throw new SyntaxError(`The input axis ${axis} is not valid. Please use x or y`);
    }
  } catch (error) {
    console.error(error);
  }
}
