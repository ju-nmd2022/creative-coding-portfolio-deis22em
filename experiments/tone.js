const synth = new Tone.Synth().toDestination();

//twinkle twinkle little star - chatgpt knew the notes for the song
const song = [
  "C4",
  "C4",
  "G4",
  "G4",
  "A4",
  "A4",
  "G4",
  "F4",
  "F4",
  "E4",
  "E4",
  "D4",
  "D4",
  "C4",
  "G4",
  "G4",
  "F4",
  "F4",
  "E4",
  "E4",
  "D4",
  "G4",
  "G4",
  "F4",
  "F4",
  "E4",
  "E4",
  "D4",
  "C4",
  "C4",
  "G4",
  "G4",
  "A4",
  "A4",
  "G4",
  "F4",
  "F4",
  "E4",
  "E4",
  "D4",
  "D4",
  "C4",
];

let currentNote = 0;

const numCols = 12;
const numRows = 12;
const squareSize = 20;

let pixelX;
let pixelY;
let dx = 10;
let dy = 10;
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
  playNextNote();
}

function playNextNote() {
  const now = Tone.now();
  const note = song[currentNote];

  synth.triggerAttackRelease(note, "8n", now);

  currentNote++;

  if (currentNote >= song.length) {
    currentNote = 0;
  }
}
