class Sprite {
  constructor({ image, position, velocity, frames = { max: 1 } }) {
    this.image = image;
    this.position = position;
    this.velocity = velocity;
    this.frames = { ...frames, value: 0, elapsed: 0 };

    this.image.onload = () => {
      this.width = this.image.width / this.frames.max;
      this.height = this.image.height;
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
      this.frames.value * this.width,
      0,
      this.width,
      this.height,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );

    if (this.frames.max > 1) {
      this.frames.elapsed++;
    }

    if (this.frames.max > 1 && this.frames.elapsed % 10 === 0) {
      if (this.frames.value < this.frames.max - 1) {
        this.frames.value++;
      } else {
        this.frames.value = 0;
      }
    }
  }
}
