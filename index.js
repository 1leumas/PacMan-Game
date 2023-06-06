// Get the canvas element and its 2D rendering context
const canvas = document.querySelector(`canvas`);
const c = canvas.getContext(`2d`);

// Set the canvas dimensions to fill the entire screen
canvas.width = innerWidth;
canvas.height = innerHeight;

// Define the Boundary class for creating blue square objects
class Boundary {
  static width = 40;
  static height = 40;

  constructor({ position }) {
    this.position = position;
    this.width = 40;
    this.height = 40;
  }

  // Method to draw the boundary object on the screen
  draw() {
    c.fillStyle = `blue`;
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}

// Define the Player class for creating the yellow Pacman object
class Player {
  constructor({ position, velocity }) {
    this.position = position;
    this.velocity = velocity;
    this.radius = 15;
  }

  // Method to draw the Pacman object on the screen
  draw() {
    c.beginPath();
    c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
    c.fillStyle = `yellow`;
    c.fill();
    c.closePath;
  }

  // Method to update the position of the Pacman object
  update() {
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }
}

// Array to store all the boundaries (blue squares)
const boundaries = [];

// Create a player object (yellow Pacman)
const player = new Player({
  position: {
    x: Boundary.width + Boundary.width / 2,
    y: Boundary.height + Boundary.height / 2,
  },
  velocity: {
    y: 0,
    x: 0,
  },
});

// Object to track the state of keyboard keys
const keys = {
  w: { pressed: false },
  a: { pressed: false },
  s: { pressed: false },
  d: { pressed: false },
};

let lastKey = ``;

// Map representing the game layout
const map = [
  [`-`, `-`, `-`, `-`, `-`, `-`, `-`],
  [`-`, ` `, ` `, ` `, ` `, ` `, `-`],
  [`-`, ` `, `-`, ` `, `-`, ` `, `-`],
  [`-`, ` `, ` `, ` `, ` `, ` `, `-`],
  [`-`, ` `, `-`, ` `, `-`, ` `, `-`],
  [`-`, ` `, ` `, ` `, ` `, ` `, `-`],
  [`-`, `-`, `-`, `-`, `-`, `-`, `-`],
];

// Iterate over each row of the map
map.forEach((row, index) => {
  // Iterate over each symbol in the row
  row.forEach((symbol, jindex) => {
    // Create a boundary object for each "-" symbol in the map
    switch (symbol) {
      case `-`:
        boundaries.push(
          new Boundary({
            position: {
              x: Boundary.width * jindex,
              y: Boundary.height * index,
            },
          })
        );
        break;
    }
  });
});

// Function to check collision between a circle and a rectangle
function circleCollidesWithRectangle({ circle, rectangle }) {
  return (
    circle.position.y - circle.radius + circle.velocity.y <=
      rectangle.position.y + rectangle.height &&
    circle.position.x + circle.radius + circle.velocity.x >=
      rectangle.position.x &&
    circle.position.y + circle.radius + circle.velocity.y >=
      rectangle.position.y &&
    circle.position.x - circle.radius + circle.velocity.x <=
      rectangle.position.x + rectangle.width
  );
}

// Function to animate the game
function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);

  // Update player velocity based on collision
  if (keys.w.pressed && lastKey === `w`) {
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i];
      if (
        circleCollidesWithRectangle({
          circle: { ...player, velocity: { x: 0, y: -3 } },
          rectangle: boundary,
        })
      ) {
        player.velocity.y = 0;
        break;
      } else {
        player.velocity.y = -3;
      }
    }
  } else if (keys.a.pressed && lastKey === `a`) {
    for (let i = 0; i < boundaries.length; i++) {
        const boundary = boundaries[i];
        if (
          circleCollidesWithRectangle({
            circle: { ...player, velocity: { x: -3, y: 0 } },
            rectangle: boundary,
          })
        ) {
          player.velocity.x = 0;
          break;
        } else {
          player.velocity.x = -3;
        }
      }
  } else if (keys.s.pressed && lastKey === `s`) {
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i];
      if (
        circleCollidesWithRectangle({
          circle: { ...player, velocity: { x: 0, y: 3 } },
          rectangle: boundary,
        })
      ) {
        player.velocity.y = 0;
        break;
      } else {
        player.velocity.y = 3;
      }
    }
  } else if (keys.d.pressed && lastKey === `d`) {
    for (let i = 0; i < boundaries.length; i++) {
        const boundary = boundaries[i];
        if (
          circleCollidesWithRectangle({
            circle: { ...player, velocity: { x: 3, y: 0 } },
            rectangle: boundary,
          })
        ) {
          player.velocity.x = 0;
          break;
        } else {
          player.velocity.x = 3;
        }
      }
  }

  // Draw and update each boundary
  boundaries.forEach((boundary) => {
    boundary.draw();

    if (
      circleCollidesWithRectangle({
        circle: player,
        rectangle: boundary,
      })
    ) {
      player.velocity.y = 0;
      player.velocity.x = 0;
    }
  });

  // Update and draw the player (Pacman)
  player.update();
}

// Start the animation loop
animate();

// Event listener to handle keydown events
addEventListener(`keydown`, ({ key }) => {
  switch (key) {
    case `w`:
      keys.w.pressed = true;
      lastKey = `w`;
      break;
    case `a`:
      keys.a.pressed = true;
      lastKey = `a`;
      break;
    case `s`:
      keys.s.pressed = true;
      lastKey = `s`;
      break;
    case `d`:
      keys.d.pressed = true;
      lastKey = `d`;
      break;
  }
});

// Event listener to handle keyup events
addEventListener(`keyup`, ({ key }) => {
  switch (key) {
    case `w`:
      keys.w.pressed = false;
      break;
    case `a`:
      keys.a.pressed = false;
      break;
    case `s`:
      keys.s.pressed = false;
      break;
    case `d`:
      keys.d.pressed = false;
      break;
  }
});