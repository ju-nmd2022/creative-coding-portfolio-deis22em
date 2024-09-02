const numCols = 12;
const numRows = 23;
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
  currentColor = color(0); // Initial color

  frameRate(30); // Set frame rate
  noLoop(); // Stop looping to create a static grid
}
function artwork() {
  background(255); // Clear canvas with a solid background

  noFill();
  stroke(currentColor);
  strokeWeight(1);
  noLoop();
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

  // Draw the grid
  for (let col = 0; col < numCols; col++) {
    for (let row = 0; row < numRows; row++) {
      const x = col * squareSize;
      const y = row * squareSize;

      push();
      let deltaX = pow(random(-(y / numRows), y / numRows), 1) + squareSize;
      let deltaY = pow(random(-(y / numRows), y / numRows), 1) + squareSize;
      translate(pixelX + deltaX, pixelY + deltaY);

      rect(x, y, squareSize, squareSize);
      pop();
    }
  }
}
function draw() {
  artwork();
}

function changeColor() {
  // Change color randomly
  currentColor = color(random(255), random(255), random(255));
}

// Uncomment if you want to start animation on mouse press
// function mousePressed() {
// loop();  // Start continuous drawing
//}
