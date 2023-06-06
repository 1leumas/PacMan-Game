const canvas = document.querySelector(`canvas`);
const c = canvas.getContext(`2d`);

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

  draw() {
    c.fillStyle = `blue`;
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}

const map = [
  //map
  [`-`, `-`, `-`, `-`, `-`, `-`],
  [`-`, ` `, ` `, ` `, ` `, `-`],
  [`-`, ` `, `-`, `-`, ` `, `-`],
  [`-`, ` `, ` `, ` `, ` `, `-`],
  [`-`, `-`, `-`, `-`, `-`, `-`],
];

const boundaries = [
  //boundaries array, to keep all the boundaries
];

map.forEach((row, index) => {
  //para cada fileira do mapa
  row.forEach((symbol, jindex) => {
    //para cada simbolo em cada fileira
    switch ( //switch case para cada fileira
      symbol 
    ) {
      case `-`: // caso for " - " trocar por uma boundary
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

boundaries.forEach((boundary) => {
  //forEach loop to use the method draw in boundaryClass for each boundary within the array
  boundary.draw();
});
