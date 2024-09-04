const numCols = 12;
const numRows = 12;
const squareSize = 20;

let offsetX = 55;
let offsetY = -45;
let pixelX;
let pixelY;
let dx = 2; // Speed in x-direction
let dy = 1; // Speed in y-direction
let currentColor;

function setup() {
  createCanvas(innerWidth, innerHeight);
  pixelX = width / 2 - (numCols * squareSize) / 2; // Center artwork
  pixelY = height / 2 - (numRows * squareSize) / 2; // Center artwork
  currentColor = color(255); // Initial color

  frameRate(30);
}

function draw() {
  background(0); // Clear canvas with a solid background

  // Update positions
  pixelX += dx;
  pixelY += dy;

  // Boundary check
  if (pixelX < 0 || pixelX + numCols * squareSize > width) {
    dx *= -1; // Reverse x direction
    changeColor(); // Change color
  }
  if (pixelY < 0 || pixelY + numRows * squareSize > height) {
    dy *= -1; // Reverse y direction
    changeColor(); // Change color
  }

  noFill();
  stroke(currentColor);
  strokeWeight(1);

  // Apply translation for the entire grid
  push();
  translate(pixelX, pixelY);

  // Draw the grid
  for (let col = 0; col < numCols; col++) {
    for (let row = 0; row < numRows; row++) {
      const x = col * squareSize;
      const y = row * squareSize;

      rect(x, y, squareSize, squareSize);
    }
  }

  pop();
}

function changeColor() {
  // Change color randomly
  currentColor = color(random(255), random(255), random(255));
}
