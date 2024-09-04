let particles = [];
const num = 1000;
const noiseScale = 0.01 / 2;
const colors = [
  "#003366", // Deep Navy Blue
  "#0047AB", // Cobalt Blue
  "#87CEEB", // Sky Blue
  "#00FFFF", // Cyan Blue
  "#F5F5F5", // Off-White
  "#F5F5DC", // Beige
];
const maxLineLength = 10;

function setup() {
  createCanvas(400, 400);
  for (let i = 0; i < num; i++) {
    let p = createVector(random(width), random(height));
    particles.push({
      pos: p,
      prevPos: p.copy(),
      length: random(0.1, maxLineLength),
      color: random(colors), // Random color including black
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

    // Update the position based on Perlin noise
    let n = noise(
      p.pos.x * noiseScale,
      p.pos.y * noiseScale,
      frameCount * noiseScale * noiseScale
    );
    let a = TAU * n;

    let direction = createVector(cos(a), sin(a)).mult(p.length);
    p.prevPos.set(p.pos);
    p.pos.add(direction);

    // If a particle is close to the edge, reset it randomly within the canvas
    if (p.pos.x < 0 || p.pos.x > width || p.pos.y < 0 || p.pos.y > height) {
      p.pos.set(random(width), random(height));
      p.prevPos.set(p.pos); // Reset prevPos to avoid long lines
    }
  }
}

function mouseReleased() {
  noiseSeed(millis());
}
