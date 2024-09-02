const numCols = 12;
const numRows = 23;
const squareSize = 20;
let squares = [];

function setup() {
  createCanvas((numCols + 2) * squareSize, (numRows + 2) * squareSize);
  noFill();
  stroke(0);
  strokeWeight(1);

  for (let col = 0; col < numCols; col++) {
    let columnSquares = [];
    for (let row = 0; row < numRows; row++) {
      columnSquares.push({
        x: col * squareSize + 1.5 * squareSize,
        y: row * squareSize - 45 + 1.5 * squareSize,
        speed: random(0.5, 2),
        offsetX: random(-10, 10),
        offsetY: random(-10, 10),
        angle: random(-PI / 6, PI / 6),
      });
    }
    squares.push(columnSquares);
  }
}

function draw() {
  background(255);

  for (let col = 0; col < numCols; col++) {
    for (let row = 0; row < numRows; row++) {
      let sq = squares[col][row];

      sq.y += sq.speed;

      if (sq.y > height + squareSize) {
        sq.y = -squareSize;
        sq.offsetX = random(-10, 10);
        sq.offsetY = random(-10, 10);
        sq.angle = random(-PI / 6, PI / 6);
      }

      push();
      translate(sq.x + sq.offsetX, sq.y + sq.offsetY);
      rotate(sq.angle);
      rect(-squareSize / 2, -squareSize / 2, squareSize, squareSize);
      pop();
    }
  }
}
