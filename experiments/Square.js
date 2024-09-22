const numCols = 12;
const numRows = 12;
const squareSize = 20;

let offsetX = 55;
let offsetY = -45;
let pixelX;
let pixelY;
let dx = 2;
let dy = 1;
let currentColor;

function setup() {
  createCanvas(innerWidth, innerHeight);
  pixelX = width / 2 - (numCols * squareSize) / 2; 
  pixelY = height / 2 - (numRows * squareSize) / 2; 
  currentColor = color(255); 

  frameRate(30);
}

function draw() {
  background(0);

  pixelX += dx;
  pixelY += dy;

  if (pixelX < 0 || pixelX + numCols * squareSize > width) {
    dx *= -1;
    changeColor();
  }
  if (pixelY < 0 || pixelY + numRows * squareSize > height) {
    dy *= -1;
    changeColor();
  }

  noFill();
  stroke(currentColor);
  strokeWeight(1);

  push();
  translate(pixelX, pixelY);

  //SQUARE
  for (let col = 0; col < numCols; col++) {
    for (let row = 0; row < numRows; row++) {
      const x = col * squareSize;
      const y = row * squareSize;

      push();
      translate(x + squareSize / 2, y + squareSize / 2);
      rotate(frameCount * 0.07);
      const sizeOffset = sin(frameCount * 0.1) * (squareSize * 0.3);
      const currentSize = squareSize + sizeOffset;
      rectMode(CENTER);
      rect(0, 0, currentSize, currentSize);
      pop();
    }
  }

  pop();
}

function changeColor() {
  currentColor = color(random(255), random(255), random(255));
}
