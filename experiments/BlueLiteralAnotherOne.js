// This code is inspired by the YouTube video "Easy Perlin Noise Flow Fields" by [Barney Codes] (Published: 2021-11-17). URL: https://www.youtube.com/watch?v=sZBfLgfsvSk&ab_channel=BarneyCodes

let particles = [];
const num = 1000;
const noiseScale = 0.01 / 2;

const colors = [
  "#003366", // Some blue color
  "#0047AB", // Some blue color
  "#87CEEB", // Some blue color
  "#00FFFF", // Cyan
  "#F5F5F5", // Kinda white
  "#F5F5DC", // Beige
  "#fc60a8", // piiink
  "#7a28cb", // purple
  "#ceec97", // green
];

const colorTwo = [
  "#CDB4DB", //color
  "#FFC8DD", //color
  "#FFAFCC", //color
  "#BDE0FE", //color
  "#A2D2FF", //color
];

const colorThree = [
  "#4CC9F0", //color
  "#4361EE", //color
  "#3A0CA3", //color
  "#7209B7", //color
  "#F72585", //color
];

const colorFour = [
  "#FFDC5E", //color
  "#FFBF81", //color
  "#FFA3A5", //color
  "#FF86C8", //color
  "#FF69EB", //color
];

const maxLineLength = 10;
let currentColorSet = 0;

function setup() {
  createCanvas(innerWidth, innerHeight);
  for (let i = 0; i < num; i++) {
    let p = createVector(random(width), random(height));
    particles.push({
      pos: p,
      prevPos: p.copy(),
      length: random(0.1, maxLineLength),
      color: random(colors),
    });
  }

  clear();
}

function draw() {
  if (currentColorSet === 1) {
    background("#ff6aa0"); // Background for colorTwo
  } else if (currentColorSet === 2) {
    background("#0b1e79"); // Background for colorThree
  } else if (currentColorSet === 3) {
    background("#ff4c49"); //colorFour with gradient
  } else {
    background(25, 25, 50); // default background for colors
  }

  for (let i = 0; i < num; i++) {
    let p = particles[i];

    //LINE
    if (dist(p.prevPos.x, p.prevPos.y, p.pos.x, p.pos.y) < width / 2) {
      stroke(p.color);
      strokeWeight(2);
      line(p.prevPos.x, p.prevPos.y, p.pos.x, p.pos.y);
    }

    // PERLIN NOISE POSITION
    let n = noise(
      p.pos.x * noiseScale,
      p.pos.y * noiseScale,
      frameCount * noiseScale * noiseScale
    );
    let a = TAU * n;

    let direction = createVector(cos(a), sin(a)).mult(p.length);
    p.prevPos.set(p.pos);
    p.pos.add(direction);

    // CONTINUE FLOW FIELDS
    if (p.pos.x < 0 || p.pos.x > width || p.pos.y < 0 || p.pos.y > height) {
      p.pos.set(random(width), random(height));
      p.prevPos.set(p.pos);
    }
  }
}

function mousePressed() {
  currentColorSet = (currentColorSet + 1) % 4;

  let newColors;
  if (currentColorSet === 0) {
    newColors = colors;
  } else if (currentColorSet === 1) {
    newColors = colorTwo;
  } else if (currentColorSet === 2) {
    newColors = colorThree;
  } else if (currentColorSet === 3) {
    newColors = colorFour;
  }

  for (let i = 0; i < num; i++) {
    particles[i].color = random(newColors);
  }
}
