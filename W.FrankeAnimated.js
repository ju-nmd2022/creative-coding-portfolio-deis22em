function setup() {
  createCanvas(500, 500, WEBGL);
  angleMode(DEGREES);
}

function draw() {
  background(30);

  noFill();
  rotateX(60);
  let time = frameCount * 0.7; // Control animation speed

  // Calculate the number of segments and their colors
  let segments = 20;
  let colors = [];
  for (let i = 0; i < segments; i++) {
    let t = map(i, 0, segments, 0, 1);
    colors.push(lerpColor(color(255, 0, 0), color(0, 0, 255), t)); // Gradient from red to blue
  }

  for (let i = 1; i <= segments; i++) {
    stroke(colors[i % segments]); // Cycle through the colors
    beginShape();
    for (let j = 0; j < 360; j += 10) {
      let rad = i * 15;
      let x = rad * cos(j);
      let y = rad * sin(j);
      let z = sin(i * 10 + j + time) * -100;

      vertex(x, y, z);
    }
    endShape(CLOSE);
  }
}
