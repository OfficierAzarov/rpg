const canvas = document.querySelector('canvas');

canvas.width = 1024;
canvas.height = 576;

const context = canvas.getContext('2d');

context.fillStyle = 'white';
context.fillRect(0, 0, canvas.width, canvas.height);

const image = new Image();
image.src = './img/town.png';

const playerDown = new Image();
playerDown.src = './img/playerDown.png';

image.onload = () => {
  context.drawImage(image, -750, -600);
  context.drawImage(
    playerDown,
    0,
    0,
    playerDown.width / 4,
    playerDown.height,
    canvas.width / 2 - playerDown.width / 4,
    canvas.height / 2 - playerDown.height / 2,
    playerDown.width / 4,
    playerDown.height
  );
};
