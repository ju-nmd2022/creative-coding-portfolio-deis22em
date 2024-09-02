// This code is inspired by the YouTube video "How to Recreate "Schotter" (1960) Using P5JS" (Published: 2020-01-09). URL: https://www.youtube.com/watch?v=mCZ76eymEKU

const numCols = 12;
const numRows = 23;
const squareSize = 20;

function setup() {
  createCanvas((numCols + 10) * squareSize, (numRows + 2) * squareSize);
  background(255);
  noLoop();
}

function draw() {
  noFill();
  stroke(0);
  strokeWeight(1);

  const offsetX = 55;
  const offsetY = -45;
  let pixelX = 1.5 * squareSize;
  let pixelY = 1.5 * squareSize;

  //Following 4 lines of code was given by ChatGPT
  for (let col = 0; col < numCols; col++) {
    for (let row = 0; row < numRows; row++) {
      const x = col * squareSize + offsetX;
      const y = row * squareSize + offsetY;

      push();
      let deltaX = pow(random(-(y / numRows), y / numRows), 1) + squareSize;
      let deltaY = pow(random(-(y / numRows), y / numRows), 1) + squareSize;
      translate(pixelX + deltaX, pixelY + deltaY);

      rect(x, y, squareSize, squareSize);
      pop();
    }
  }
}
