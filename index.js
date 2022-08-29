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
};

animate();

window.addEventListener('keydown', (event) => {
  console.log('Yay');
});
