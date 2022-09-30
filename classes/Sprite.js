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