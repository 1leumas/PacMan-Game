const canvas = document.querySelector(`canvas`);
const c = canvas.getContext(`2d`);

//fill out the whole screen
canvas.width = innerWidth;
canvas.height = innerHeight;

class Boundary {
  //boundary class, to create an object, those are the blue squares.
  static width = 40;
  static height = 40;

  constructor({ position }) {
    this.position = position;
    this.width = 40;
    this.height = 40;
  }
  //draw method to put it in screen
  draw() {
    c.fillStyle = `blue`;
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}

class Player {
  //Player class, to create pacman which has a position and a velocity
  constructor({ position, velocity }) {
    this.position = position;
    this.velocity = velocity;
    this.radius = 15;
  }
  //draw method to put it in screen
  draw() {
    c.beginPath();
    c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
    c.fillStyle = `yellow`;
    c.fill();
    c.closePath;
  }
  update() {
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }
}

const boundaries = [
  //boundaries array, to keep all the boundaries
];
//created object player
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

const keys = {
  w: {
    pressed: false,
  },
  a: {
    pressed: false,
  },
  s: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
};

let lastKey = ``;

const map = [
  //map
  [`-`, `-`, `-`, `-`, `-`, `-`],
  [`-`, ` `, ` `, ` `, ` `, `-`],
  [`-`, ` `, `-`, `-`, ` `, `-`],
  [`-`, ` `, ` `, ` `, ` `, `-`],
  [`-`, `-`, `-`, `-`, `-`, `-`],
];

map.forEach((row, index) => {
  //for each row of the map
  row.forEach((symbol, jindex) => {
    //for each symbol in each row
    switch (
      //switch case for each row
      symbol
    ) {
      case `-`: // case " - " switch for an boundary object
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

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);
  boundaries.forEach((boundary) => {
    //forEach loop to use the method draw in boundaryClass for each boundary within the array
    boundary.draw();
    //collision
    if (
      player.position.y - player.radius + player.velocity.y <= boundary.position.y + boundary.height &&
      player.position.x + player.radius + player.velocity.x >= boundary.position.x &&
      player.position.y + player.radius + player.velocity.y >= boundary.position.y &&
      player.position.x - player.radius + player.velocity.x <= boundary.position.x + boundary.width
    ) {
      player.velocity.y = 0;
      player.velocity.x = 0;
    }
  });
  //put player in game
  player.update();
//   player.velocity.y = 0;
//   player.velocity.x = 0;

  if (keys.w.pressed && lastKey === `w`) {
    player.velocity.y = -3;
  } else if (keys.a.pressed && lastKey === `a`) {
    player.velocity.x = -3;
  } else if (keys.s.pressed && lastKey === `s`) {
    player.velocity.y = 3;
  } else if (keys.d.pressed && lastKey === `d`) {
    player.velocity.x = 3;
  }
}

animate();

//when key w/a/s/d is pressed add velocity
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

//when key w/a/s/d is unpressed remove velocity
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
