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

const canvas = document.querySelector('canvas');

canvas.width = 1024;
canvas.height = 576;

const context = canvas.getContext('2d');

context.fillStyle = 'white';
context.fillRect(0, 0, canvas.width, canvas.height);

const backgroundImage = new Image();
backgroundImage.src = './img/town.png';
const background = new Sprite({ position: { x: -750, y: -600 }, image: backgroundImage });

const playerDown = new Image();
playerDown.src = './img/playerDown.png';

const keys = {
  ArrowUp: { isPressed: false },
  ArrowDown: { isPressed: false },
  ArrowLeft: { isPressed: false },
  ArrowRight: { isPressed: false },
};

const animate = () => {
  window.requestAnimationFrame(animate);
  background.draw();
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

  if (keys.ArrowDown.isPressed) background.position.y -= 2;
  if (keys.ArrowUp.isPressed) background.position.y += 2;
  if (keys.ArrowLeft.isPressed) background.position.x += 2;
  if (keys.ArrowRight.isPressed) background.position.x -= 2;
};

animate();

const lastKeyPressed = '';

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
    case 'a':
      console.log(keys);
  }
});
