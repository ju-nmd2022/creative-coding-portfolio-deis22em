// This code is inspired by the YouTube video "Easy Perlin Noise Flow Fields" by [Barney Codes] (Published: 2021-11-17). URL: https://www.youtube.com/watch?v=sZBfLgfsvSk&ab_channel=BarneyCodes

let particles = [];
const num = 1000;
const noiseScale = 0.01 / 2;
const colors = [
  "#003366", //Some blue color
  "#0047AB", // Some blue color
  "#87CEEB", // Some blue color
  "#00FFFF", // Cyan
  "#F5F5F5", // Kinda white
  "#F5F5DC", // Beige
  "#fc60a8", // piiink
  "#7a28cb", // purple
  "#ceec97", // green
];

const maxLineLength = 10;
let directionOffset = 0;

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
  background(25, 25, 50);

  for (let i = 0; i < num; i++) {
    let p = particles[i];

    // Draw the line
    if (dist(p.prevPos.x, p.prevPos.y, p.pos.x, p.pos.y) < width / 2) {
      stroke(p.color);
      strokeWeight(2);
      line(p.prevPos.x, p.prevPos.y, p.pos.x, p.pos.y);
    }

    // direction offset
    let n = noise(
      p.pos.x * noiseScale,
      p.pos.y * noiseScale,
      frameCount * noiseScale * noiseScale + directionOffset
    );
    let a = TAU * n;

    let direction = createVector(cos(a), sin(a)).mult(p.length);
    p.prevPos.set(p.pos);
    p.pos.add(direction);

    // Continue flow fields
    if (p.pos.x < 0 || p.pos.x > width || p.pos.y < 0 || p.pos.y > height) {
      p.pos.set(random(width), random(height));
      p.prevPos.set(p.pos);
    }
  }
}

//Chatgpt helped with the logic of click
function mousePressed() {
  directionOffset += PI / 2;
}
