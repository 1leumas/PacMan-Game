class Player {
  constructor({ position, velocity }) {
    this.position = position;
    this.velocity = velocity;
    this.radius = 15;

    this.radians = 0.7;
    this.openRate = 0.03;
    this.rotation = 0;
  }

  // Method to draw the Pacman object on the screen
  draw() {
    c.save();

    c.translate(this.position.x, this.position.y);
    c.rotate(this.rotation);
    c.translate(-this.position.x, -this.position.y);

    c.beginPath();
    c.arc(
      this.position.x,
      this.position.y,
      this.radius,
      this.radians,
      Math.PI * 2 - this.radians
    );
    c.lineTo(this.position.x, this.position.y);
    c.fillStyle = `yellow`;
    c.fill();
    c.closePath;

    c.restore();
  }

  //player movement
  moveUp(boundaries) {
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i];
      if (
        circleCollidesWithRectangle({
          circle: {
            ...this,
            velocity: {
              x: 0,
              y: -3,
            },
          },
          rectangle: boundary,
        })
      ) {
        this.velocity.y = 0;
        break;
      } else {
        this.velocity.y = -3;
      }
    }
  }

  moveLeft(boundaries) {
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i];
      if (
        circleCollidesWithRectangle({
          circle: {
            ...this,
            velocity: {
              x: -3,
              y: 0,
            },
          },
          rectangle: boundary,
        })
      ) {
        this.velocity.x = 0;
        break;
      } else {
        this.velocity.x = -3;
      }
    }
  }

  moveDown(boundaries) {
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i];
      if (
        circleCollidesWithRectangle({
          circle: {
            ...this,
            velocity: {
              x: 0,
              y: 3,
            },
          },
          rectangle: boundary,
        })
      ) {
        this.velocity.y = 0;
        break;
      } else {
        this.velocity.y = 3;
      }
    }
  }

  moveRight(boundaries) {
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i];
      if (
        circleCollidesWithRectangle({
          circle: {
            ...this,
            velocity: {
              x: 3,
              y: 0,
            },
          },
          rectangle: boundary,
        })
      ) {
        this.velocity.x = 0;
        break;
      } else {
        this.velocity.x = 3;
      }
    }
  }

  // Method to update the position of the Pacman object
  update() {
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    if (this.radians < 0 || this.radians > 0.7) this.openRate = -this.openRate;

    this.radians += this.openRate;
  }
}
