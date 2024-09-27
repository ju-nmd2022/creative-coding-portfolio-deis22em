const synth = new Tone.Synth().toDestination();

// Brahms' Lullaby notes
const song = [
  "G4",
  "D5",
  "B4",
  "G4",
  "C5",
  "B4",
  "A4",
  "G4",
  "G4",
  "D5",
  "B4",
  "G4",
  "C5",
  "B4",
  "A4",
  "G4",
  "E5",
  "E5",
  "D5",
  "C5",
  "G4",
];

let currentNote = 0;

const numCols = 12;
const numRows = 12;
const squareSize = 20;

let pixelX;
let pixelY;
let dx = 10; // Horizontal speed
let dy = 10; // Vertical speed
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

  // Move the square
  pixelX += dx;
  pixelY += dy;

  // Check for collisions with the canvas edges
  if (pixelX < 0 || pixelX + numCols * squareSize > width) {
    dx *= -1; // Reverse horizontal direction
    changeColor();
    playNextNote(); // Play the note when hitting the edge
  }
  if (pixelY < 0 || pixelY + numRows * squareSize > height) {
    dy *= -1; // Reverse vertical direction
    changeColor();
    playNextNote(); // Play the note when hitting the edge
  }

  // Draw the square
  noFill();
  stroke(currentColor);
  strokeWeight(1);

  push();
  translate(pixelX, pixelY);

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
  currentColor = color(random(255), random(255), random(255)); // Change to a random color
}

function playNextNote() {
  const now = Tone.now();
  const note = song[currentNote];

  synth.triggerAttackRelease(note, "8n", now); // Play the current note

  currentNote++; // Move to the next note

  if (currentNote >= song.length) {
    currentNote = 0; // Reset to the beginning of the song
  }
}
